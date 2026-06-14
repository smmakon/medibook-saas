import prisma from "../../config/prisma.js";

export async function getPatients() {
    return prisma.patientProfile.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    status: true,
                },
            },

            _count: {
                select: {
                    appointments: true,
                },
            },

            medicalHistory: {
                select: {
                    id: true,
                },
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });
}