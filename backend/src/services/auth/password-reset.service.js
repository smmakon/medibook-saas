import crypto from "crypto";
import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js";
import { sendMail } from "../mail/mail.service.js";

function throwError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function forgotPasswordService(email) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) {
    throwError("User With This Email Does Not Exist", 404);
  }

  await prisma.passwordResetToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  const resetToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(resetToken);

  const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/set-new-password/${resetToken}`;

  await sendMail({
    to: user.email,
    subject: "Reset Your MediBook Password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Password Reset Request</h2>
        <p>Hello ${user.firstName || ""},</p>
        <p>You requested to reset your MediBook password.</p>
        <p>Click the button below to set a new password:</p>

        <p>
          <a href="${resetLink}"
             style="background:#2563eb;color:white;padding:12px 18px;text-decoration:none;border-radius:6px;display:inline-block;">
            Set New Password
          </a>
        </p>

        <p>This link will expire in 6 hours.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `,
  });

  return {
    message: "Password Reset Link Sent Successfully",
  };
}

export async function resetPasswordService({ token, password }) {
  const tokenHash = hashToken(token);

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: {
      tokenHash,
    },
    include: {
      user: true,
    },
  });

  if (!resetToken) {
    throwError("Invalid Or Expired Reset Link", 400);
  }

  if (resetToken.expiresAt < new Date()) {
    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    throwError("Reset Link Has Expired", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      id: resetToken.userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: {
      id: resetToken.id,
    },
  });

  return {
    message: "Password Reset Successfully",
  };
}