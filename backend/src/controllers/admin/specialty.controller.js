import * as specialtyService
from "../../services/admin/specialty.service.js";

export async function getSpecialties(
  req,
  res
) {
  try {
    const specialties =
      await specialtyService.getSpecialties();

    res.json(specialties);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function createSpecialty(
  req,
  res
) {
  try {
    const specialty =
      await specialtyService.createSpecialty(
        req.body
      );

    res.status(201).json(
      specialty
    );
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function updateSpecialty(
  req,
  res
) {
  try {
    const specialty =
      await specialtyService.updateSpecialty(
        req.params.id,
        req.body
      );

    res.json(specialty);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function archiveSpecialty(
  req,
  res
) {
  try {
    await specialtyService.archiveSpecialty(
      req.params.id
    );

    res.json({
      message:
        "Specialty archived",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}