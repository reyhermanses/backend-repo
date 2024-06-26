import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY,
    clientEmail: process.env.CLIENT_EMAIL,
  }),
  databaseURL: "https://technical-test-ebuddy.firebaseio.com",
});

const db = admin.firestore();
export { admin, db };
