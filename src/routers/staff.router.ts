import Elysia from "elysia";

import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  addStaffQualification,
  removeStaffQualification,
  addEmploymentHistory,
  assignShift,
  removeShiftAssignment,
  // Types
  staffInput,
  qualificationInput,
  employmentHistoryInput,
  shiftAssignmentInput,
} from "../services/staff.service";

export const StaffRouter = new Elysia({ prefix: "/staff" })
  // Get all staff with pagination
  .get("/", async ({ query }) => {
    const page = parseInt(query.page || "1");
    const count = parseInt(query.count || "5");
    const name = query.name || "";

    return await getAllStaff({ page, count, name });
  })
  // Get staff by ID
  .get("/:id", async ({ params, set }) => {
    const staff = await getStaffById(params.id);

    if (!staff) {
      set.status = "Not Found";
      return { message: "Staff member not found", statusCode: 404 };
    }

    return staff;
  })
  // Create new staff member
  .post("/", async ({ body, set }) => {
    try {
      const data = staffInput.parse(body);
      const staff = await createStaff(data);

      set.status = "Created";
      return staff;
    } catch (error) {
      set.status = "Bad Request";
      return {
        message: "Invalid staff data",
        error,
        statusCode: 400,
      };
    }
  })
  // Update staff member
  .put("/:id", async ({ params, body, set }) => {
    try {
      const data = staffInput.partial().parse(body);
      const staff = await updateStaff(params.id, data);

      return staff;
    } catch (error) {
      set.status = "Bad Request";
      return {
        message: "Invalid staff data",
        error,
        statusCode: 400,
      };
    }
  })
  // Delete staff member
  .delete("/:id", async ({ params, set }) => {
    try {
      await deleteStaff(params.id);
      return { message: "Staff member deleted successfully" };
    } catch (error) {
      set.status = "Not Found";
      return {
        message: "Staff member not found",
        error,
        statusCode: 404,
      };
    }
  })
  // Add qualification to staff
  .post("/:id/qualifications", async ({ params, body, set }) => {
    try {
      const data = qualificationInput.parse(body);
      const qualification = await addStaffQualification(params.id, data);

      set.status = "Created";
      return qualification;
    } catch (error) {
      set.status = "Bad Request";
      return {
        message: "Invalid qualification data",
        error,
        statusCode: 400,
      };
    }
  })
  // Remove qualification from staff
  .delete("/:id/qualifications/:qualificationId", async ({ params, set }) => {
    try {
      await removeStaffQualification(params.id, params.qualificationId);
      return { message: "Qualification removed successfully" };
    } catch (error) {
      set.status = "Not Found";
      return {
        message: "Qualification not found",
        error,
        statusCode: 404,
      };
    }
  })
  // Add employment history
  .post("/:id/employment-history", async ({ params, body, set }) => {
    try {
      const data = employmentHistoryInput.parse(body);
      const history = await addEmploymentHistory(params.id, data);

      set.status = "Created";
      return history;
    } catch (error) {
      set.status = "Bad Request";
      return {
        message: "Invalid employment history data",
        error,
        statusCode: 400,
      };
    }
  })
  // Assign shift to staff
  .post("/:id/shifts", async ({ params, body, set }) => {
    try {
      const data = shiftAssignmentInput.parse(body);
      const shift = await assignShift(params.id, data);

      set.status = "Created";
      return shift;
    } catch (error) {
      set.status = "Bad Request";
      return {
        message: "Invalid shift assignment data",
        error,
        statusCode: 400,
      };
    }
  })
  // Remove shift assignment
  .delete("/:id/shifts/:shiftId", async ({ params, set }) => {
    try {
      await removeShiftAssignment(params.id, params.shiftId);
      return { message: "Shift assignment removed successfully" };
    } catch (error) {
      set.status = "Not Found";
      return {
        message: "Shift assignment not found",
        error,
        statusCode: 404,
      };
    }
  });
