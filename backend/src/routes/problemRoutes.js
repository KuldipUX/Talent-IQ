import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getProblemBySlug, getProblemByTitle, getProblems } from "../controller.js/problemController.js";

const router = express.Router();

router.get("/", protectRoute, getProblems);
router.get("/title/:title", protectRoute, getProblemByTitle);
router.get("/:slug", protectRoute, getProblemBySlug);

export default router;
