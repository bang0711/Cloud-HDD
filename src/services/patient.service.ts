import { t } from "elysia";
import prisma from "../lib/prisma";

// Define types for request bodies
const patientLimit = t.Object({
  page: t.Number(),
  count: t.Number(),
  name: t.String(),
});

const patientInput = t.Object({
  firstName: t.String(),
  lastName: t.String(),
  dob: t.String(),
  gender: t.String(),
  bloodType: t.String(),
  cid: t.String(),
  image: t.String(),
});

const addressInput = t.Object({
  addressLine: t.String(),
  ward: t.String(),
  district: t.String(),
  city: t.String(),
});

const insuranceInput = t.Object({
  code: t.String(),
  expiredDate: t.String(),
});

const allergyInput = t.Object({
  allergyId: t.String(),
  severity: t.String(),
});

const treatmentInput = t.Object({
  type: t.String(),
  disease: t.String(),
  visitedDate: t.String(),
});

type PatientLimit = typeof patientLimit.static;
type PatientInput = typeof patientInput.static;
type AddressInput = typeof addressInput.static;
type InsuranceInput = typeof insuranceInput.static;
type AllergyInput = typeof allergyInput.static;

// Function to get all patients with pagination
const getAllPatients = async ({
  page = 1,
  count = 5,
  name = "",
}: PatientLimit) => {
  const patients = await prisma.patient.findMany({
    skip: (page - 1) * count,
    take: count,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      OR: [
        {
          firstName: {
            contains: name,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: name,
            mode: "insensitive",
          },
        },
      ],
    },
    include: {
      address: true,
      insurance: true,
      patientAllergies: {
        include: {
          allergy: true,
        },
      },
    },
  });

  const total = await prisma.patient.count();

  return {
    data: patients,
    pagination: {
      total,
      page,
      count,
      totalPages: Math.ceil(total / count),
    },
  };
};

// Function to get a patient by ID with all related data
const getPatientById = async (id: string) => {
  return await prisma.patient.findUnique({
    where: { id },
    include: {
      address: true,
      insurance: true,
      patientAllergies: {
        select: {
          severity: true,
          allergy: {
            select: {
              allergen: true,
              category: true,
              symptoms: true,
            },
          },
        },
      },
    },
  });
};

// Function to create a new patient
const createPatient = async (data: PatientInput) => {
  return await prisma.patient.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      dob: new Date(data.dob),
      gender: data.gender,
      bloodType: data.bloodType,
      cid: data.cid,
      image: data.image,
    },
  });
};

// Function to update a patient
const updatePatient = async (id: string, data: Partial<PatientInput>) => {
  const patient = await getPatientById(id);
  if (!patient) {
    throw new Error("Patient not found");
  }

  return await prisma.patient.update({
    where: { id },
    data: {
      ...data,
      ...(data.dob && { dob: new Date(data.dob) }),
    },
  });
};

// Function to delete a patient
const deletePatient = async (id: string) => {
  const patient = await getPatientById(id);
  if (!patient) {
    throw new Error("Patient not found");
  }

  return await prisma.patient.delete({
    where: { id },
  });
};

// Function to upsert patient address
const upsertPatientAddress = async (patientId: string, data: AddressInput) => {
  const patient = await getPatientById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  return await prisma.address.upsert({
    where: {
      patientId,
    },
    update: data,
    create: {
      ...data,
      patientId,
    },
  });
};

// Function to upsert patient insurance
const upsertPatientInsurance = async (
  patientId: string,
  data: InsuranceInput
) => {
  const patient = await getPatientById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  return await prisma.insurance.upsert({
    where: {
      patientId,
    },
    update: {
      ...data,
      expiredDate: new Date(data.expiredDate),
    },
    create: {
      ...data,
      expiredDate: new Date(data.expiredDate),
      patientId,
    },
  });
};

// Function to add patient allergy
const addPatientAllergy = async (patientId: string, data: AllergyInput) => {
  const patient = await getPatientById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  return await prisma.patientAllergy.create({
    data: {
      patientId,
      allergyId: data.allergyId,
      severity: data.severity,
    },
  });
};

// Function to remove patient allergy
const removePatientAllergy = async (patientId: string, allergyId: string) => {
  const patient = await getPatientById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  return await prisma.patientAllergy.delete({
    where: {
      patientId_allergyId: {
        patientId,
        allergyId,
      },
    },
  });
};

// Export all functions
export {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  upsertPatientAddress,
  upsertPatientInsurance,
  addPatientAllergy,
  removePatientAllergy,

  // Export types
  patientLimit,
  patientInput,
  addressInput,
  insuranceInput,
  allergyInput,
  treatmentInput,
};
