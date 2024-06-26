import * as express from "express";
import { Router } from "express";

import { UserController } from "../controller/UserController";
import { MiddlewareValidate } from "../middleware/MiddlewareValidate";

const userRoutes: Router = express.Router();

userRoutes.post("/", UserController.createUser);
userRoutes.get("/", MiddlewareValidate.validateToken, UserController.readUser);
userRoutes.put("/:userId", MiddlewareValidate.validateToken, UserController.updateUser);
userRoutes.delete("/:userId", MiddlewareValidate.validateToken, UserController.deleteUser);

export { userRoutes };
