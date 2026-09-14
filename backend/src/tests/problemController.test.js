import test from "node:test";
import assert from "node:assert/strict";
import { mock } from "node:test";

import Problem from "../models/Problem.js";
import Session from "../models/Session.js";
import { getProblems } from "../controller.js/problemController.js";
import { createSession } from "../controller.js/sessionController.js";
import { videoClient, chatClient } from "../lib/stream.js";

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

test("createSession should not fail the whole request when Stream video and chat provisioning errors", async () => {
  const req = {
    body: {
      problem: "Two Sum",
      difficulty: "easy",
    },
    user: {
      _id: "66c000000000000000000001",
      clerkId: "user_123",
      name: "Test User",
      profileImage: "https://example.test/avatar.png",
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

  const problemDocument = {
    title: "Two Sum",
    difficulty: "Easy",
  };

  const createdSession = {
    _id: "66c000000000000000000002",
    problem: "Two Sum",
    difficulty: "easy",
    host: "66c000000000000000000001",
    callId: "session_test",
  };

  const problemFindMock = mock.method(Problem, "findOne", async () => problemDocument);
  const sessionCreateMock = mock.method(Session, "create", async () => createdSession);

  const originalVideoCall = videoClient.video.call;
  const originalChatChannel = chatClient.channel;

  videoClient.video.call = () => ({
    getOrCreate: async () => {
      throw new Error("stream video unavailable");
    },
    delete: async () => {},
  });

  chatClient.channel = () => ({
    create: async () => {
      throw new Error("stream chat unavailable");
    },
    delete: async () => {},
  });

  await createSession(req, res);

  assert.equal(res.statusCode, 201);
  assert.equal(res.payload.session.problem, "Two Sum");
  assert.equal(res.payload.session.difficulty, "easy");

  problemFindMock.mock.restore();
  sessionCreateMock.mock.restore();
  videoClient.video.call = originalVideoCall;
  chatClient.channel = originalChatChannel;
});
