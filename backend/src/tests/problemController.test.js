import test from "node:test";
import assert from "node:assert/strict";
import { mock } from "node:test";

import Problem from "../models/Problem.js";
import { getProblems } from "../controller.js/problemController.js";

test("getProblems should support Mongo-backed filtering and pagination", async () => {
  const req = {
    query: {
      page: "2",
      limit: "5",
      difficulty: "Easy",
      tag: "arrays",
      q: "sum",
    },
  };

  const res = {
    statusCode: null,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };

  const records = [
    {
      title: "Two Sum",
      difficulty: "Easy",
      tags: ["arrays"],
      description: { text: "Return the pair that sums to target." },
    },
  ];

  const chain = {
    sort() { return this; },
    skip() { return this; },
    limit() { return this; },
    lean: async () => records,
  };

  const findMock = mock.method(Problem, "find", () => chain);
  const countMock = mock.method(Problem, "countDocuments", async () => 1);

  await getProblems(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.payload.page, 2);
  assert.equal(res.payload.limit, 5);
  assert.equal(res.payload.total, 1);
  assert.equal(res.payload.pages, 1);
  assert.equal(res.payload.problems.length, 1);

  assert.equal(findMock.mock.calls.length, 1);
  assert.equal(countMock.mock.calls.length, 1);

  findMock.mock.restore();
  countMock.mock.restore();
});
