import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    description: {
      text: {
        type: String,
        required: true,
      },
      notes: {
        type: [String],
        default: [],
      },
    },
    tags: {
      type: [String],
      default: [],
    },
    testCases: {
      type: Object,
      default: {},
    },
    examples: {
      type: [
        {
          input: String,
          output: String,
          explanation: String,
        },
      ],
      default: [],
    },
    constraints: {
      type: [String],
      default: [],
    },
    starterCode: {
      type: Object,
      default: {},
    },
    expectedOutput: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

problemSchema.index({ title: "text", category: "text", tags: "text" });

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
