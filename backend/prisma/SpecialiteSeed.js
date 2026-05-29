import prisma from "../src/config/prisma.js";

async function main() {
        const specialties = [
        {
            name: "General Medicine",
            description: "Primary healthcare and general medical consultations."
        },
        {
            name: "Cardiology",
            description: "Diagnosis and treatment of heart and cardiovascular diseases."
        },
        {
            name: "Dermatology",
            description: "Diagnosis and treatment of skin, hair, and nail conditions."
        },
        {
            name: "Pediatrics",
            description: "Medical care and treatment for infants, children, and adolescents."
        },
        {
            name: "Gynecology",
            description: "Women's reproductive health and gynecological care."
        },
        {
            name: "Ophthalmology",
            description: "Diagnosis and treatment of eye and vision disorders."
        },
        {
            name: "Neurology",
            description: "Diagnosis and treatment of disorders of the nervous system."
        },
        {
            name: "Psychiatry",
            description: "Assessment and treatment of mental health disorders."
        },
        {
            name: "Otolaryngology (ENT)",
            description: "Treatment of ear, nose, and throat conditions."
        },
        {
            name: "Dentistry",
            description: "Oral health, dental care, and treatment of dental diseases."
        },
        {
            name: "Orthopedics",
            description: "Treatment of musculoskeletal system disorders and injuries."
        },
        {
            name: "Endocrinology",
            description: "Diagnosis and treatment of hormonal and metabolic disorders."
        },
        {
            name: "Gastroenterology",
            description: "Diagnosis and treatment of digestive system disorders."
        },
        {
            name: "Urology",
            description: "Treatment of urinary tract and male reproductive system conditions."
        },
        {
            name: "Pulmonology",
            description: "Diagnosis and treatment of lung and respiratory diseases."
        }
        ];

  for (const specialty of specialties) {
    await prisma.specialty.upsert({
      where: {
        name: specialty.name,
      },
      update: {
        description: specialty.description,
        isActive: true,
      },
      create: {
        name: specialty.name,
        description: specialty.description,
        isActive: true,
      },
    });
  }

  console.log("Spécialités insérées avec succès.");
}

main()
  .catch((error) => {
    console.error("Erreur pendant le seed :", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });