import express from "express";
import { getProblemBySlug, getProblemByTitle, getProblems } from "../controller.js/problemController.js";

const router = express.Router();

router.get("/", getProblems);
router.get("/title/:title", getProblemByTitle);
router.get("/:slug", getProblemBySlug);

export default router;
