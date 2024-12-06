import Elysia from "elysia";

import {
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
  // Types
  patientInput,
  addressInput,
  insuranceInput,
  allergyInput,
  treatmentInput,
} from "../services/patient.service";

export const PatientRouter = new Elysia({ prefix: "/patients" })
  // Get all patients with pagination
  .get("/", async ({ query }) => {
    const page = parseInt(query.page || "1");
    const count = parseInt(query.count || "5");

    return await getAllPatients({ page, count });
  })
  // Get patient by ID
  .get("/:id", async ({ params, set }) => {
    const patient = await getPatientById(params.id);

    if (!patient) {
      set.status = "Not Found";
      return { message: "Patient not found", statusCode: 404 };
    }

    return patient;
  })
  // Create new patient
  .post("/", async ({ body, set }) => {
    try {
      const data = patientInput.parse(body);
      const patient = await createPatient(data);

      set.status = "Created";

      return patient;
    } catch (error) {
      set.status = "Bad Request";
      return { message: "Invalid patient data", statusCode: 400, error };
    }
  })
  // Update patient
  .put("/:id", async ({ params, body, set }) => {
    try {
      const data = patientInput.partial().parse(body);
      const patient = await updatePatient(params.id, data);

      return patient;
    } catch (error) {
      set.status = "Bad Request";
      return { message: "Invalid patient data", statusCode: 400, error };
    }
  })
  // Delete patient
  .delete("/:id", async ({ params, set }) => {
    try {
      await deletePatient(params.id);
      return { message: "Patient deleted successfully" };
    } catch (error) {
      set.status = "Not Found";
      return { message: "Patient not found", statusCode: 404 };
    }
  })
  // Upsert patient address
  .put("/:id/address", async ({ params, body, set }) => {
    try {
      const data = addressInput.parse(body);
      const address = await upsertPatientAddress(params.id, data);
      return address;
    } catch (error) {
      set.status = "Bad Request";
      return { message: "Invalid address data", statusCode: 400, error };
    }
  })
  // Upsert patient insurance
  .put("/:id/insurance", async ({ params, body, set }) => {
    try {
      const data = insuranceInput.parse(body);
      const insurance = await upsertPatientInsurance(params.id, data);
      return insurance;
    } catch (error) {
      set.status = "Bad Request";
      return { message: "Invalid insurance data", statusCode: 400, error };
    }
  })
  // Add patient allergy
  .post("/:id/allergies", async ({ params, body, set }) => {
    try {
      const data = allergyInput.parse(body);
      const allergy = await addPatientAllergy(params.id, data);
      set.status = "Created";
      return allergy;
    } catch (error) {
      set.status = "Bad Request";
      return { message: "Invalid allergy data", statusCode: 400, error };
    }
  })
  // Remove patient allergy
  .delete("/:id/allergies/:allergyId", async ({ params }) => {
    await removePatientAllergy(params.id, params.allergyId);
    return { message: "Allergy removed successfully" };
  })
  // Add treatment history
  .post("/:id/treatments", async ({ params, body, set }) => {
    try {
      const data = treatmentInput.parse(body);
      const treatment = await addTreatmentHistory(params.id, data);
      set.status = "Created";
      return treatment;
    } catch (error) {
      set.status = "Bad Request";
      return { message: "Invalid treatment data", statusCode: 400, error };
    }
  });
