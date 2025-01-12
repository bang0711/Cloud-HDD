import { PatientAllergy, PrismaClient } from "@prisma/client";

import { faker } from "@faker-js/faker";

import { allergens, departments, shifts } from "./data";

import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

import {
  reset,
  generateDepartment,
  generateRandomStaff,
  generateRandomPatient,
  generateRandomAddress,
  generateRandomInsurance,
  generateRandomPatientAllergy,
  generateRandomQualification,
} from "./functions";

const prisma = new PrismaClient();

// Initialize DynamoDB Client
const ddbClient = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const docClient = DynamoDBDocumentClient.from(ddbClient);

const clearDynamoDBTable = async (tableName: string) => {
  try {
    console.log(`Clearing table: ${tableName}`);

    // Scan the table to get all items
    const scanResult = await docClient.send(
      new ScanCommand({
        TableName: tableName,
      })
    );

    const items = scanResult.Items || [];

    // Delete all items one by one
    await Promise.all(
      items.map((item) =>
        docClient.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              staffId: item.staffId, // Adjust based on table schema
              // Only include the sort key if the table schema requires it
              qualificationId: item.qualificationId, // Remove or rename if mismatched
            },
          })
        )
      )
    );

    console.log(`Table ${tableName} cleared successfully.`);
  } catch (error) {
    console.error(`Error clearing table ${tableName}:`, error);
  }
};

const main = async () => {
  console.log("Resetting database...");
  await reset();
  console.log("Database reset.");

  // console.log("Resetting DynamoDB tables...");
  // await clearDynamoDBTable("StaffQualifications");
  // console.log("DynamoDB tables reset.");

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
        { count: 10 }
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

  console.log("Creating shifts...");
  await prisma.shift.createMany({
    data: shifts,
  });
  console.log("Shifts created");

  console.log("Assigning staff to shifts...");

  // Fetch all shifts and staff from the database
  const allShifts = await prisma.shift.findMany();
  const allStaff = await prisma.staff.findMany();

  // Assign each staff member to at least 10 shifts
  await Promise.all(
    allStaff.map(async (staff) => {
      // Randomly select 10 unique shifts for each staff
      const assignedShifts = faker.helpers.arrayElements(allShifts, 10);

      // Create `ShiftStaff` entries for the selected shifts
      const shiftStaffAssignments = assignedShifts.map((shift) => ({
        staffId: staff.id,
        shiftId: shift.id,
      }));

      await prisma.shiftStaff.createMany({
        data: shiftStaffAssignments,
      });
    })
  );

  // Optionally, ensure that all shifts still have at least 10 staff members
  await Promise.all(
    allShifts.map(async (shift) => {
      const currentAssignments = await prisma.shiftStaff.count({
        where: { shiftId: shift.id },
      });

      if (currentAssignments < 10) {
        const additionalStaff = faker.helpers.arrayElements(
          allStaff,
          10 - currentAssignments
        );
        const additionalAssignments = additionalStaff.map((staff) => ({
          staffId: staff.id,
          shiftId: shift.id,
        }));

        await prisma.shiftStaff.createMany({
          data: additionalAssignments,
        });
      }
    })
  );

  console.log("Staff assigned to shifts.");

  console.log("Adding qualifications to DynamoDB...");
  await Promise.all(
    allStaff.map(async (staff) => {
      const qualifications = Array.from(
        { length: faker.number.int({ min: 1, max: 2 }) },
        () => generateRandomQualification()
      );

      await Promise.all(
        qualifications.map((qualification) =>
          docClient.send(
            new PutCommand({
              TableName: "StaffQualifications",
              Item: {
                staffId: staff.id,
                qualificationId: faker.string.uuid(),
                ...qualification,
              },
            })
          )
        )
      );
    })
  );

  console.log("Qualifications added to DynamoDB.");

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
