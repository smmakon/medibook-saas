import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const { PrismaClient } = pkg;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  const password = await bcrypt.hash("Password123!", 10);

  await prisma.appointment.deleteMany();
  await prisma.doctorAvailability.deleteMany();
  await prisma.medicalHistory.deleteMany();
  await prisma.patientProfile.deleteMany();
  await prisma.doctorProfile.deleteMany();
  await prisma.specialty.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      firstName: "System",
      lastName: "Administrator",
      email: "admin@medibook.com",
      password,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const cardiology = await prisma.specialty.create({
    data: {
      name: "Cardiology",
      description: "Heart and cardiovascular diseases",
    },
  });

  const dermatology = await prisma.specialty.create({
    data: {
      name: "Dermatology",
      description: "Skin diseases and treatments",
    },
  });

  const doctorUser1 = await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@medibook.com",
      password,
      role: "DOCTOR",
      status: "ACTIVE",
    },
  });

  const doctor1 = await prisma.doctorProfile.create({
    data: {
      userId: doctorUser1.id,
      specialtyId: cardiology.id,
      licenseNumber: "DOC-001",
      bio: "Experienced cardiologist specialized in cardiovascular care.",
      consultationFee: 150,
      clinicAddress: "100 Medibook Street, Ottawa",
      yearsOfExperience: 10,
      isAvailable: true,
    },
  });

  const doctorUser2 = await prisma.user.create({
    data: {
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@medibook.com",
      password,
      role: "DOCTOR",
      status: "ACTIVE",
    },
  });

  const doctor2 = await prisma.doctorProfile.create({
    data: {
      userId: doctorUser2.id,
      specialtyId: dermatology.id,
      licenseNumber: "DOC-002",
      bio: "Dermatologist focused on skin health and treatment.",
      consultationFee: 120,
      clinicAddress: "200 Medibook Avenue, Ottawa",
      yearsOfExperience: 7,
      isAvailable: true,
    },
  });

  const patientUser1 = await prisma.user.create({
    data: {
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@email.com",
      password,
      role: "PATIENT",
      status: "ACTIVE",
    },
  });

  const patient1 = await prisma.patientProfile.create({
    data: {
      userId: patientUser1.id,
      dateOfBirth: new Date("1990-04-12"),
      gender: "MALE",
      address: "10 Patient Road",
      city: "Ottawa",
      postalCode: "K1A 0B1",
      emergencyContactName: "Anna Brown",
      emergencyContactPhone: "613-555-1000",
      insuranceNumber: "INS-001",
    },
  });

  const patientUser2 = await prisma.user.create({
    data: {
      firstName: "Emma",
      lastName: "Wilson",
      email: "emma.wilson@email.com",
      password,
      role: "PATIENT",
      status: "ACTIVE",
    },
  });

  const patient2 = await prisma.patientProfile.create({
    data: {
      userId: patientUser2.id,
      dateOfBirth: new Date("1988-09-25"),
      gender: "FEMALE",
      address: "25 Health Street",
      city: "Gatineau",
      postalCode: "J8X 1A1",
      emergencyContactName: "Mark Wilson",
      emergencyContactPhone: "819-555-2000",
      insuranceNumber: "INS-002",
    },
  });

  await prisma.doctorAvailability.createMany({
    data: [
      {
        doctorId: doctor1.id,
        dayOfWeek: "MONDAY",
        startTime: "09:00",
        endTime: "12:00",
      },
      {
        doctorId: doctor1.id,
        dayOfWeek: "WEDNESDAY",
        startTime: "13:00",
        endTime: "17:00",
      },
      {
        doctorId: doctor2.id,
        dayOfWeek: "TUESDAY",
        startTime: "08:00",
        endTime: "11:00",
      },
      {
        doctorId: doctor2.id,
        dayOfWeek: "FRIDAY",
        startTime: "14:00",
        endTime: "18:00",
      },
    ],
  });

  await prisma.appointment.createMany({
    data: [
      {
        patientId: patient1.id,
        doctorId: doctor1.id,
        startDateTime: new Date("2026-06-01T10:00:00"),
        endDateTime: new Date("2026-06-01T10:30:00"),
        status: "CONFIRMED",
        reason: "Chest pain consultation",
        notes: "First cardiology consultation.",
      },
      {
        patientId: patient2.id,
        doctorId: doctor2.id,
        startDateTime: new Date("2026-06-03T15:00:00"),
        endDateTime: new Date("2026-06-03T15:30:00"),
        status: "PENDING",
        reason: "Skin irritation",
        notes: "Dermatology consultation request.",
      },
      {
        patientId: patient1.id,
        doctorId: doctor2.id,
        startDateTime: new Date("2026-06-05T14:00:00"),
        endDateTime: new Date("2026-06-05T14:30:00"),
        status: "COMPLETED",
        reason: "Routine skin check",
        notes: "Appointment completed successfully.",
        completedAt: new Date("2026-06-05T14:30:00"),
      },
    ],
  });

  console.log("✅ Database seeded successfully");
  console.log("Admin: admin@medibook.com / Password123!");
}

main()
  .catch((error) => {
    console.error("❌ Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });