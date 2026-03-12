import express from "express";
import { runCode } from "../controllers/executeController.js";

const router = express.Router();

router.post("/run", runCode);

export default router;