import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { admin, db } from "../config/firebaseConfig";

export class UserAuthController {
  static async login(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      // Query db to find the user by email
      const userQuery = db.collection("USERS").where("email", "==", email).limit(1);
      const userSnapshot = await userQuery.get();

      if (userSnapshot.empty) {
        return res.status(400).json({ error: "Invalid Email" });
      }

      const userDoc = userSnapshot.docs[0];
      const user = userDoc.data();

      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid Password" });
      }

      // admin.auth().signInWithEmailAndPassword(email, password);

      // Generate custom token
      const customToken = await admin.auth().createCustomToken(userDoc.id);
      const idToken = customToken;
      // const customToken = await admin.auth

      // Optionally, you can create a Firebase ID token from the custom token
      // For this example, we return the custom token
      res.json({ customToken, idToken });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async loginOAuth(req: Request, res: Response): Promise<any> {}
}
