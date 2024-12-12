import { Patient, PrismaClient, Staff } from "@prisma/client";

import { faker } from "@faker-js/faker";

import { allergens, departments, medicines } from "./data";

const prisma = new PrismaClient();

const reset = async () => {
  await Promise.all([
    prisma.patient.deleteMany(),
    prisma.department.deleteMany(),
    prisma.allergy.deleteMany(),
    prisma.staff.deleteMany(),
  ]);
};
// Generate a random blood type
const getRandomBloodType = () => {
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const randomIndex = Math.floor(Math.random() * bloodTypes.length);
  return bloodTypes[randomIndex];
};

// Generate a random address for a patient
const generateRandomAddress = () => {
  return {
    addressLine: faker.location.streetAddress(),
    ward: faker.location.state(),
    district: faker.location.state(),
    city: faker.location.city(),
  };
};

const generateRandomInsurance = () => {
  return {
    code: faker.string.uuid(),
    expiredDate: faker.date.future(),
  };
};

const generateRandomPatient = async (): Promise<Patient> => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dob: faker.date.birthdate(),
    gender: faker.person.sex(),
    bloodType: getRandomBloodType(),
    cid: faker.string.uuid(),
    id: faker.string.uuid(),
  };
};

// Generate a random staff with jobType (Doctor/Nurse)
const generateRandomStaff = (jobType: "Doctor" | "Nurse"): Staff => {
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

const generateDepartment = (name: string) => {
  return {
    name,
    id: faker.string.uuid(),
  };
};

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

  const patients = await Promise.all(
    faker.helpers.multiple(generateRandomPatient, { count: 100 })
  );

  console.log("Creating patients...");
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
