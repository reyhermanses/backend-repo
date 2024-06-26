import { Request, Response } from "express";
import { admin } from "../config/firebaseConfig";

export class MiddlewareValidate {
  static async validateToken(req: Request, res: Response, next: any): Promise<any> {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(403).json({ error: "Unauthorized token" });
    }

    const idToken = authorization.split("Bearer ")[1];

    try {
      // await admin.auth().signInWithCustomToken(idToken);
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log(decodedToken);
      if (!res.headersSent) {
        req.user = decodedToken;
        // next();
      }
      // if (!res.headersSent) {
      // return res.json({ message: "Token is valid", decodedToken });
      // req.user = {
      //   token: decodedToken,
      // };
      // next();
      // }
      // req.user = {
      //   token: decodedToken,
      // }; // Attach user information to the request object
      // req.user = {};
      // next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("Error verifying Firebase ID token:", error);
      return res.status(403).json({ error: "Unauthorized firebase id" });
    }
    next();
  }
}
