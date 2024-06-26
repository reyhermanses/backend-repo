import { Request, Response } from "express";
import { buildApiResponse } from "../utils/Response";
import { db } from "../config/firebaseConfig";
const bcrypt = require("bcrypt");

type UserType = {
  email: string;
  password: string;
  id: string;
};

export class UserController {
  static async readUser(req: Request, res: Response): Promise<any> {
    try {
      const allUsers: UserType[] = [];
      const querySnapshot = await db.collection("USERS").get();
      console.log(querySnapshot);
      // querySnapshot.forEach((doc: any) => allUsers.push(doc.data()));
      querySnapshot.forEach((doc: any) => {
        console.log(doc);
        allUsers.push(doc.data());
      });
      return res.status(200).json(allUsers);
    } catch (error) {
      console.log(error);
    }
  }

  static async createUser(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    try {
      const user = db.collection("USERS").doc();

      const saltRounds: number = 12;
      const newPassword: string = password;
      const hashedPassword: string = await bcrypt.hashSync(newPassword, saltRounds);

      const userObject = {
        id: user.id,
        email,
        hashedPassword,
      };

      await user.set(userObject);

      return res.send(buildApiResponse(true, 200, userObject));
    } catch (error) {
      console.log("error");
      return res.send(buildApiResponse(true, 500, "Error"));
    }
  }

  static async updateUser(req: Request, res: Response): Promise<any> {
    const {
      body: { email, password },
      params: { userId },
    } = req;

    try {
      const user = db.collection("USERS").doc(userId);
      const currentData = (await user.get()).data() || {};

      const userObject = {
        email: email || currentData.username,
        password: password || currentData.password,
      };

      await user.set(userObject).catch((error) => {
        return res.status(400).json({
          status: "error",
          message: error.message,
        });
      });

      return res.status(200).json({
        status: "success",
        message: "entry updated successfully",
        data: userObject,
      });
    } catch (error) {}
  }

  static async deleteUser(req: Request, res: Response): Promise<any> {
    const { userId } = req.params;

    try {
      const user = db.collection("USERS").doc(userId);

      await user.delete().catch((error) => {
        return res.status(400).json({
          status: "error",
          message: error.message,
        });
      });

      return res.status(200).json({
        status: "success",
        message: "entry deleted successfully",
      });
    } catch (error) {}
  }
}
