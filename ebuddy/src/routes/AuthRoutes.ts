import * as express from "express";
import { Router } from "express";
import { UserAuthController } from "../controller/UserAuthController";

const authRoutes: Router = express.Router();

authRoutes.post("/", UserAuthController.login);

export { authRoutes };
