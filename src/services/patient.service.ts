import { t } from "elysia";
import prisma from "../lib/prisma";

// Define types for request bodies
const patientLimit = t.Object({
  page: t.Number(),
  count: t.Number(),
});

const patientInput = t.Object({
  firstName: t.String(),
  lastName: t.String(),
  dob: t.String(),
  gender: t.String(),
  bloodType: t.String(),
  cid: t.String(),
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
type TreatmentInput = typeof treatmentInput.static;

// Function to get all patients with pagination
const getAllPatients = async ({ page = 1, count = 5 }: PatientLimit) => {
  const patients = await prisma.patient.findMany({
    skip: (page - 1) * count,
    take: count,
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
    meta: {
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
        include: {
          allergy: true,
        },
      },
      treatmentHistories: {
        include: {
          admissions: true,
          procedures: true,
          billing: true,
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
    },
  });
};

// Function to update a patient
const updatePatient = async (id: string, data: Partial<PatientInput>) => {
  return await prisma.patient.update({
    where: { id },
    data,
  });
};

// Function to delete a patient
const deletePatient = async (id: string) => {
  return await prisma.patient.delete({
    where: { id },
  });
};

// Function to upsert patient address
const upsertPatientAddress = async (patientId: string, data: AddressInput) => {
  return await prisma.address.upsert({
    where: {
      patientId,
    },
    create: {
      ...data,
      patientId,
    },
    update: data,
  });
};

// Function to upsert patient insurance
const upsertPatientInsurance = async (
  patientId: string,
  data: InsuranceInput
) => {
  return await prisma.insurance.upsert({
    where: {
      patientId,
    },
    create: {
      ...data,
      expiredDate: new Date(data.expiredDate),
      patientId,
    },
    update: {
      ...data,
      expiredDate: new Date(data.expiredDate),
    },
  });
};

// Function to add patient allergy
const addPatientAllergy = async (patientId: string, data: AllergyInput) => {
  return await prisma.patientAllergy.create({
    data: {
      patientId,
      allergyId: data.allergyId,
      severity: data.severity,
    },
    include: {
      allergy: true,
    },
  });
};

// Function to remove patient allergy
const removePatientAllergy = async (patientId: string, allergyId: string) => {
  return await prisma.patientAllergy.delete({
    where: {
      patientId_allergyId: {
        patientId,
        allergyId,
      },
    },
  });
};

// Function to add treatment history
const addTreatmentHistory = async (patientId: string, data: TreatmentInput) => {
  return await prisma.treatmentHistory.create({
    data: {
      patientId,
      type: data.type,
      disease: data.disease,
      visitedDate: new Date(data.visitedDate),
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
  addTreatmentHistory,
  // Export types
  patientLimit,
  patientInput,
  addressInput,
  insuranceInput,
  allergyInput,
  treatmentInput,
};
