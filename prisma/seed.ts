import { Patient, PatientAllergy, PrismaClient, Staff } from "@prisma/client";

import { faker } from "@faker-js/faker";

import { allergens, departments, medicines } from "./data";

import {
  reset,
  generateDepartment,
  generateRandomStaff,
  generateRandomPatient,
  generateRandomAddress,
  generateRandomInsurance,
  generateRandomAppointment,
  generateRandomTreatmentHistory,
  generateRandomPatientAllergy,
} from "./functions";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Resetting database...");
  await reset();
  console.log("Database reset.");

  console.log("Seeding...");

  console.log("Creating allergies...");
  await prisma.allergy.createMany({
    data: allergens,
  });
  console.log("Allergies created.");

  console.log("Creating departments...");
  await Promise.all(
    departments.map(async (d) => {
      const department = generateDepartment(d.name);
      const manager = generateRandomStaff("Doctor");

      await prisma.staff.create({
        data: manager,
      });

      await prisma.department.create({
        data: { ...department, managerId: manager.id },
      });

      // Generate additional staff (can be doctors or nurses)
      const staffs = faker.helpers.multiple(
        () => {
          const jobType = Math.random() > 0.5 ? "Doctor" : "Nurse";
          return generateRandomStaff(jobType);
        },
        { count: 20 }
      );

      // Assign department ID to all staff members
      staffs.forEach((s) => {
        s.departmentId = department.id;
      });

      // Create all staff members in the department
      await prisma.staff.createMany({
        data: staffs,
      });
    })
  );
  console.log("Departments created.");

  console.log("Creating patients...");
  const patients = await Promise.all(
    faker.helpers.multiple(generateRandomPatient, { count: 100 })
  );

  // Create patients in the database
  await prisma.patient.createMany({
    data: patients,
  });
  console.log("Patients created:");

  console.log("Creating addresses and insurances...");
  // Now create addresses for each patient
  const promises = patients.map(async (patient) => {
    const address = generateRandomAddress();
    const insurance = generateRandomInsurance();

    await Promise.all([
      prisma.insurance.create({
        data: {
          ...insurance,
          patientId: patient.id, // Link the insurance to the patient
        },
      }),
      prisma.address.create({
        data: {
          ...address,
          patientId: patient.id, // Link the address to the patient
        },
      }),
    ]);
  });
  // Wait for all address creation to finish
  await Promise.all(promises);
  console.log("Addresses and insurances created.");

  console.log("Creating medicines...");
  await prisma.medicine.createMany({
    data: medicines,
  });
  console.log("Medicines created.");

  console.log("Creating appointments...");
  const staffs = await prisma.staff.findMany();

  const appointments = patients.map((patient) => {
    // Randomly select a staff (doctor) for the appointment
    const staff = faker.helpers.arrayElement(staffs);
    return generateRandomAppointment(patient.id, staff.id);
  });

  await prisma.appointment.createMany({ data: appointments });
  console.log("Appointments created.");

  console.log("Creating treatment histories...");
  const treatmentHistories = patients.map((patient) =>
    generateRandomTreatmentHistory(patient.id)
  );
  await prisma.treatmentHistory.createMany({ data: treatmentHistories });
  console.log("Treatment histories created.");

  // Seed patient allergies
  console.log("Creating patient allergies...");
  const allergies = await prisma.allergy.findMany();

  const patientAllergies: PatientAllergy[] = [];

  patients.forEach((patient) => {
    // Randomly assign up to 3 allergies to each patient
    const assignedAllergies = faker.helpers.arrayElements(allergies, 3);

    assignedAllergies.forEach((allergy) => {
      patientAllergies.push(
        generateRandomPatientAllergy(patient.id, allergy.id)
      );
    });
  });

  await prisma.patientAllergy.createMany({ data: patientAllergies });
  console.log("Patient allergies created.");

  console.log("Creating procedures...");
  const allMedicines = await prisma.medicine.findMany();
  const allTreatmentHistories = await prisma.treatmentHistory.findMany();

  const procedures = allTreatmentHistories.flatMap((treatmentHistory) => {
    // Generate random number of procedures for each treatment history
    const procedureCount = faker.number.int({ min: 1, max: 5 });

    return Array.from({ length: procedureCount }).map(() => {
      const medicine = faker.helpers.arrayElement(allMedicines);
      const staff = faker.helpers.arrayElement(staffs);

      return {
        id: faker.string.uuid(),
        price: faker.number.float({ min: 50, max: 500 }),
        category: faker.lorem.word(),
        medicineQuantity: faker.number.int({ min: 1, max: 10 }),
        performedDate: faker.date.recent(),
        medicineId: medicine.id,
        staffId: staff.id,
        treatmentHistoryId: treatmentHistory.id,
      };
    });
  });

  await prisma.procedure.createMany({ data: procedures });
  console.log("Procedures created.");

  console.log("Seeding complete.");
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
