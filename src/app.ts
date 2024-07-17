import express, { Request, Response } from "express";
import { initializeApp } from "firebase-admin/app";
import { appCheckVerification } from "./middlewares/app-check-verification";

const app = express();
const PORT = process.env.PORT || 2000;
const firebaseApp = initializeApp();

app.get("/", (req: Request, res: Response) => {
  res.send("Appcheck Hello World from Express and TypeScript!");
});

app.get("/app-check", [appCheckVerification], (req: Request, res: Response) => {
  res.send({ isTokenValid: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
