import prisma from "../../config/prisma.js";

export async function getSpecialties() {
  return prisma.specialty.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      name: "asc",
    },
  });
}

export async function createSpecialty(data) {
  const existing =
    await prisma.specialty.findUnique({
      where: {
        name: data.name,
      },
    });

  if (existing) {
    throw new Error(
      "Specialty already exists"
    );
  }

  return prisma.specialty.create({
    data: {
      name: data.name,
      description:
        data.description || null,
    },
  });
}

export async function updateSpecialty(
  id,
  data
) {
  return prisma.specialty.update({
    where: {
      id,
    },

    data: {
      name: data.name,
      description:
        data.description || null,
    },
  });
}

export async function archiveSpecialty(
  id
) {
  return prisma.specialty.update({
    where: {
      id,
    },

    data: {
      isActive: false,
    },
  });
}