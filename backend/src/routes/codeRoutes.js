import express from "express";
import { executeCode } from "../lib/hackerEarth.js";
import Problem from "../models/Problem.js";

const router = express.Router();

router.post("/execute", async (req, res) => {
  try {
    const { problemId, language, code, input } = req.body;

    if (!problemId || !language || !code) {
      return res.status(400).json({
        success: false,
        error: "Problem ID, language and code are required.",
      });
    }

    let problem = null;

    if (problemId.match(/^[0-9a-f]{24}$/i)) {
      problem = await Problem.findById(problemId).lean();
    } else {
      problem = await Problem.findOne({
        $or: [
          { slug: problemId },
          { title: { $regex: `^${problemId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" } },
        ],
      }).lean();
    }

    if (!problem) {
      return res.status(404).json({
        success: false,
        error: "Problem not found in question bank.",
      });
    }

    const testCases = problem.testCases?.[language] || "";

    const result = await executeCode(language, code, testCases);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Code execution route error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal server error.",
    });
  }
});

export default router;