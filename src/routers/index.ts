import Elysia from "elysia";

import { PatientRouter } from "./patient.router";

const route = new Elysia({ prefix: "/v1" }).use(PatientRouter);

export { route as APIRoute };
