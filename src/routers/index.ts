import Elysia from "elysia";

import { PatientRouter } from "./patient.router";
import { StaffRouter } from "./staff.router";
import { DepartmentRouter } from "./department.router";

const route = new Elysia({ prefix: "/v1" })
  .use(PatientRouter)
  .use(StaffRouter)
  .use(DepartmentRouter);

export { route as APIRoute };
