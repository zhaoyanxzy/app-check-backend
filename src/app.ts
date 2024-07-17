import express, { Request, Response } from "express";
import admin from "firebase-admin";
import { appCheckVerification } from "./middlewares/app-check-verification";
import "dotenv/config";
import * as https from "https";

const app = express();
const PORT = process.env.PORT || 2000;

const agent = new https.Agent({
  keepAlive: true,
});
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? "")
  ),
  httpAgent: agent,
});

app.get("/", (req: Request, res: Response) => {
  console.log(">>>>", JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? ""));

  res.send("Appcheck Hello World from Express and TypeScript!");
});

app.get("/app-check", [appCheckVerification], (req: Request, res: Response) => {
  res.send({ isTokenValid: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
