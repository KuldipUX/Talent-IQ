import axiosInstance from "../lib/axios.js";
import { PROBLEMS } from "../data/problems.js";

const localProblems = Object.values(PROBLEMS).map((problem, index) => ({
  ...problem,
  _id: problem.id || `local-problem-${index}`,
  title: problem.title,
  difficulty: problem.difficulty,
  category: problem.category,
  description: problem.description,
  examples: problem.examples,
  constraints: problem.constraints,
  starterCode: problem.starterCode,
  expectedOutput: problem.expectedOutput,
}));

const normalizeLocalProblems = (params = {}) => {
  const difficulty = String(params.difficulty || "").trim().toLowerCase();
  const tag = String(params.tag || "").trim().toLowerCase();
  const q = String(params.q || "").trim().toLowerCase();

  const filtered = localProblems.filter((problem) => {
    const matchesDifficulty = !difficulty || problem.difficulty.toLowerCase() === difficulty;
    const matchesTag = !tag || (problem.category || "").toLowerCase().includes(tag) || (problem.tags || []).some((entry) => String(entry).toLowerCase().includes(tag));
    const searchTarget = `${problem.title} ${problem.category} ${(problem.tags || []).join(" ")} ${(problem.description?.text || "")}`.toLowerCase();
    const matchesSearch = !q || searchTarget.includes(q);

    return matchesDifficulty && matchesTag && matchesSearch;
  });

  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(params.limit) || 10));
  const start = (page - 1) * limit;

  return {
    problems: filtered.slice(start, start + limit),
    page,
    limit,
    total: filtered.length,
    pages: Math.max(1, Math.ceil(filtered.length / limit)),
  };
};

export const problemApi = {
  getProblems: async (params = {}) => {
    try {
      const response = await axiosInstance.get("/problem", { params });
      return response.data;
    } catch (error) {
      return normalizeLocalProblems(params);
    }
  },

  getProblemBySlug: async (slug) => {
    try {
      const response = await axiosInstance.get(`/problem/${slug}`);
      return response.data;
    } catch (error) {
      const problem = localProblems.find((entry) => entry.id === slug || entry.title.toLowerCase().replace(/\s+/g, "-") === slug);
      return problem ? { problem } : { message: "Problem not found" };
    }
  },

  getProblemByTitle: async (title) => {
    try {
      const response = await axiosInstance.get(`/problem/title/${encodeURIComponent(title)}`);
      return response.data;
    } catch (error) {
      const problem = localProblems.find((entry) => entry.title.toLowerCase() === title.toLowerCase());
      return problem ? { problem } : { message: "Problem not found" };
    }
  },
};
