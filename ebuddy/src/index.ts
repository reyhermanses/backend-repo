import { onRequest } from "firebase-functions/v1/https";
import { userRoutes } from "./routes/UserRoutes";

import * as express from "express";
import { authRoutes } from "./routes/AuthRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Ebuddy User API Application!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/fetch-user-data", userRoutes);
app.use("/create-user", userRoutes);
app.use("/update-user-data", userRoutes);
app.use("/delete-user", userRoutes);

app.use("/login", authRoutes);

exports.app = onRequest(app);
