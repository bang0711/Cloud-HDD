import { faker } from "@faker-js/faker";
import { Patient, Staff } from "@prisma/client";
import prisma from "../src/lib/prisma";

export const reset = async () => {
  await Promise.all([
    prisma.shiftStaff.deleteMany(), // Delete ShiftStaff first
    prisma.patientAllergy.deleteMany(),
    prisma.insurance.deleteMany(),
    prisma.address.deleteMany(),
  ]);

  await Promise.all([
    prisma.shift.deleteMany(), // Delete Shift after ShiftStaff
    prisma.staff.deleteMany(),
    prisma.department.deleteMany(),
    prisma.allergy.deleteMany(),
    prisma.patient.deleteMany(),
  ]);
};

// Generate a random blood type
export const getRandomBloodType = () => {
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const randomIndex = Math.floor(Math.random() * bloodTypes.length);
  return bloodTypes[randomIndex];
};

// Generate a random address for a patient
export const generateRandomAddress = () => {
  return {
    addressLine: faker.location.streetAddress(),
    ward: faker.location.state(),
    district: faker.location.state(),
    city: faker.location.city(),
  };
};

export const generateRandomInsurance = () => {
  return {
    code: faker.string.uuid(),
    expiredDate: faker.date.future(),
  };
};

export const generateRandomPatient = async (): Promise<Patient> => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dob: faker.date.birthdate(),
    gender: faker.person.sex(),
    bloodType: getRandomBloodType(),
    cid: faker.string.uuid(),
    id: faker.string.uuid(),
    createdAt: faker.date.recent(),
    image: faker.image.avatar(),
  };
};

// Generate a random staff with jobType (Doctor/Nurse)
export const generateRandomStaff = (jobType: "Doctor" | "Nurse"): Staff => {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dob: faker.date.birthdate(),
    jobType,
    salary: faker.number.float(),
    hiredDate: faker.date.past(),
    departmentId: null,
  };
};

export const generateDepartment = (name: string) => {
  return {
    name,
    id: faker.string.uuid(),
  };
};

export const generateRandomAppointment = (
  patientId: string,
  staffId: string
) => {
  const startTime = faker.date.future(); // Generate a random future date for start time

  // Randomly choose a duration: 0.5, 1, or 1.5 hours
  const durationInHours = faker.helpers.arrayElement([0.5, 1, 1.5]);

  // Calculate end time based on the chosen duration
  const endTime = new Date(
    startTime.getTime() + durationInHours * 60 * 60 * 1000
  );

  // Randomly select a status
  const status = faker.helpers.arrayElement([
    "Completed",
    "Upcoming",
    "Cancelled",
  ]);

  return {
    id: faker.string.uuid(),
    purpose: faker.lorem.sentence(),
    status,
    startTime,
    endTime,
    patientId,
    staffId,
  };
};

export const generateRandomTreatmentHistory = (patientId: string) => {
  return {
    id: faker.string.uuid(),
    type: faker.lorem.word(),
    disease: faker.lorem.words(),
    visitedDate: faker.date.past(),
    patientId,
  };
};

export const generateRandomPatientAllergy = (
  patientId: string,
  allergyId: string
) => {
  return {
    patientId,
    allergyId,
    severity: faker.helpers.arrayElement(["Mild", "Moderate", "Severe"]),
  };
};
