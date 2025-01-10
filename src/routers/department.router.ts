import Elysia from "elysia";
import {
  getAllDepartments,
  getDepartmentById,
  getDepartmentList,
} from "../services/department.service";

export const DepartmentRouter = new Elysia({ prefix: "/department" })
  .get("/", async ({ query }) => {
    const page = parseInt(query.page || "1");
    const count = parseInt(query.count || "5");
    const name = query.name || "";

    return await getAllDepartments({ page, count, name });
  })
  .get("/:id", async ({ params, set }) => {
    try {
      const department = await getDepartmentById(params.id);

      if (!department) {
        set.status = "Not Found";
        return { message: "Patient not found", statusCode: 404 };
      }

      return department;
    } catch (error) {
      set.status = "Internal Server Error";
      return { message: "Invalid department data", statusCode: 500, error };
    }
  })
  .get("/list", async ({ set }) => {
    set.status = "OK";
    return await getDepartmentList();
  });
