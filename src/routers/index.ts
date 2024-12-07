import Elysia from "elysia";

import { PatientRouter } from "./patient.router";
import { StaffRouter } from "./staff.router";

const route = new Elysia({ prefix: "/v1" })
  .use(PatientRouter)
  .use(StaffRouter);

export { route as APIRoute };
