import mongoose from "mongoose";
import dotenv from "dotenv";
import Problem from "../models/Problem.js";
import { ENV } from "../lib/env.js";

dotenv.config();

const problems = [
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: { text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.", notes: ["You may assume there is exactly one solution.", "You may not use the same element twice."] },
    tags: ["arrays", "hash-table"],
    testCases: { javascript: `const nums = [2,7,11,15];\nconst target = 9;\nconsole.log(twoSum(nums, target));`, python: "nums = [2,7,11,15]\ntarget = 9\nprint(twoSum(nums, target))", java: "int[] nums = {2,7,11,15};\nint target = 9;" },
    examples: [{ input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." }],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "-10⁹ ≤ target ≤ 10⁹"],
    starterCode: { javascript: `function twoSum(nums, target) {\n  // Write your solution here\n}`, python: `def twoSum(nums, target):\n    # Write your solution here\n    pass`, java: `import java.util.*;\n\nclass Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[0];\n    }\n}` },
    expectedOutput: { javascript: "[0,1]", python: "[0, 1]", java: "[0, 1]" },
  },
  {
    title: "Reverse String",
    slug: "reverse-string",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: { text: "Write a function that reverses an array of characters in place.", notes: ["Use O(1) extra memory."] },
    tags: ["strings", "two-pointers"],
    testCases: { javascript: `const s = ['h','e','l','l','o'];\nconsole.log(reverseString(s));`, python: "s = ['h','e','l','l','o']\nprint(reverseString(s))", java: "char[] s = {'h','e','l','l','o'};" },
    examples: [{ input: "s = ['h','e','l','l','o']", output: "['o','l','l','e','h']" }],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ASCII character"],
    starterCode: { javascript: `function reverseString(s) {\n  // Write your solution here\n}`, python: `def reverseString(s):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static void reverseString(char[] s) {\n        // Write your solution here\n    }\n}` },
    expectedOutput: { javascript: "['o','l','l','e','h']", python: "['o', 'l', 'l', 'e', 'h']", java: "[o, l, l, e, h]" },
  },
  {
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: { text: "Given a string, determine if it is a palindrome after cleaning non-alphanumeric characters and ignoring case.", notes: ["An empty string is a valid palindrome."] },
    tags: ["strings", "two-pointers"],
    examples: [{ input: "s = 'A man, a plan, a canal: Panama'", output: "true" }, { input: "s = 'race a car'", output: "false" }],
    constraints: ["1 ≤ s.length ≤ 2 × 10⁵", "s consists only of printable ASCII characters"],
    starterCode: { javascript: `function isPalindrome(s) {\n  // Write your solution here\n}`, python: `def isPalindrome(s):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static boolean isPalindrome(String s) {\n        // Write your solution here\n        return false;\n    }\n}` },
    expectedOutput: { javascript: "true\nfalse", python: "True\nFalse", java: "true\nfalse" },
    testCases: { javascript: `const s = 'A man, a plan, a canal: Panama';\nconsole.log(isPalindrome(s));`, python: "s = 'A man, a plan, a canal: Panama'\nprint(isPalindrome(s))", java: "String s = 'A man, a plan, a canal: Panama';" },
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Medium",
    category: "Dynamic Programming • Array",
    description: { text: "Find the contiguous subarray with the largest sum and return its sum.", notes: ["The subarray must contain at least one element."] },
    tags: ["dynamic-programming", "arrays"],
    examples: [{ input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" }],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: { javascript: `function maxSubArray(nums) {\n  // Write your solution here\n}`, python: `def maxSubArray(nums):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int maxSubArray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "6", python: "6", java: "6" },
    testCases: { javascript: `const nums = [-2,1,-3,4,-1,2,1,-5,4];\nconsole.log(maxSubArray(nums));`, python: "nums = [-2,1,-3,4,-1,2,1,-5,4]\nprint(maxSubArray(nums))", java: "int[] nums = {-2,1,-3,4,-1,2,1,-5,4};" },
  },
  {
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order-traversal",
    difficulty: "Medium",
    category: "Tree • Breadth-First Search",
    description: { text: "Return the level order traversal of a binary tree.", notes: ["The tree may be empty."] },
    tags: ["trees", "bfs"],
    examples: [{ input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" }],
    constraints: ["The number of nodes in the tree is in the range [0, 2000]."],
    starterCode: { javascript: `function levelOrder(root) {\n  // Write your solution here\n}`, python: `def levelOrder(root):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static List<List<Integer>> levelOrder(TreeNode root) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}` },
    expectedOutput: { javascript: "[[3],[9,20],[15,7]]", python: "[[3],[9,20],[15,7]]", java: "[[3],[9,20],[15,7]]" },
    testCases: { javascript: `const root = { val: 3, left: { val: 9 }, right: { val: 20, left: { val: 15 }, right: { val: 7 } } };\nconsole.log(levelOrder(root));`, python: "root = None\nprint(levelOrder(root))", java: "TreeNode root = new TreeNode(3);" },
  },
  {
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "Medium",
    category: "Graph • DFS",
    description: { text: "Given a grid of 1s and 0s, count the number of islands.", notes: ["A land cell is connected to adjacent cells horizontally or vertically."] },
    tags: ["graph", "dfs", "grid"],
    examples: [{ input: "grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]", output: "1" }],
    constraints: ["m, n <= 300"],
    starterCode: { javascript: `function numIslands(grid) {\n  // Write your solution here\n}`, python: `def numIslands(grid):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int numIslands(char[][] grid) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "1", python: "1", java: "1" },
    testCases: { javascript: `const grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']];\nconsole.log(numIslands(grid));`, python: "grid = [['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]\nprint(numIslands(grid))", java: "char[][] grid = {{'1','1','1','1','0'},{'1','1','0','1','0'},{'1','1','0','0','0'},{'0','0','0','0','0'}};" },
  },
  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    category: "Dynamic Programming • Fibonacci",
    description: { text: "Count the number of distinct ways to climb to the top of a staircase.", notes: ["You can climb 1 or 2 steps at a time."] },
    tags: ["dynamic-programming", "math"],
    examples: [{ input: "n = 2", output: "2" }, { input: "n = 3", output: "3" }],
    constraints: ["1 ≤ n ≤ 45"],
    starterCode: { javascript: `function climbStairs(n) {\n  // Write your solution here\n}`, python: `def climbStairs(n):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "2\n3", python: "2\n3", java: "2\n3" },
    testCases: { javascript: `console.log(climbStairs(2));\nconsole.log(climbStairs(3));`, python: "print(climbStairs(2))\nprint(climbStairs(3))", java: "int n = 2;" },
  },
  {
    title: "Validate Parentheses",
    slug: "validate-parentheses",
    difficulty: "Easy",
    category: "String • Stack",
    description: { text: "Given a string of parentheses, determine whether the input string is valid.", notes: ["Open brackets must be closed in the correct order."] },
    tags: ["strings", "stack"],
    examples: [{ input: "s = '()[]{}'", output: "true" }, { input: "s = '(]'", output: "false" }],
    constraints: ["1 ≤ s.length ≤ 10⁴"],
    starterCode: { javascript: `function isValid(s) {\n  // Write your solution here\n}`, python: `def isValid(s):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static boolean isValid(String s) {\n        // Write your solution here\n        return false;\n    }\n}` },
    expectedOutput: { javascript: "true\nfalse", python: "True\nFalse", java: "true\nfalse" },
    testCases: { javascript: `const s = '()[]{}';\nconsole.log(isValid(s));`, python: "s = '()[]{}'\nprint(isValid(s))", java: "String s = '()[]{}';" },
  },
  {
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    category: "Array • Greedy",
    description: { text: "Find the maximum profit you can achieve by choosing one day to buy and one later day to sell.", notes: ["You must buy before you sell."] },
    tags: ["arrays", "greedy"],
    examples: [{ input: "prices = [7,1,5,3,6,4]", output: "5" }],
    constraints: ["1 ≤ prices.length ≤ 10⁵"],
    starterCode: { javascript: `function maxProfit(prices) {\n  // Write your solution here\n}`, python: `def maxProfit(prices):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int maxProfit(int[] prices) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "5", python: "5", java: "5" },
    testCases: { javascript: `const prices = [7,1,5,3,6,4];\nconsole.log(maxProfit(prices));`, python: "prices = [7,1,5,3,6,4]\nprint(maxProfit(prices))", java: "int[] prices = {7,1,5,3,6,4};" },
  },
  {
    title: "Word Search",
    slug: "word-search",
    difficulty: "Medium",
    category: "Graph • Backtracking",
    description: { text: "Given a grid and a word, determine whether the word can be found in the grid by moving adjacent cells.", notes: ["A cell cannot be used more than once."] },
    tags: ["graph", "backtracking", "grid"],
    examples: [{ input: "board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'", output: "true" }],
    constraints: ["1 ≤ board.length, board[0].length ≤ 6"],
    starterCode: { javascript: `function exist(board, word) {\n  // Write your solution here\n}`, python: `def exist(board, word):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static boolean exist(char[][] board, String word) {\n        // Write your solution here\n        return false;\n    }\n}` },
    expectedOutput: { javascript: "true", python: "True", java: "true" },
    testCases: { javascript: `const board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']];\nconsole.log(exist(board, 'ABCCED'));`, python: "board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']]\nprint(exist(board, 'ABCCED'))", java: "char[][] board = {{'A','B','C','E'},{'S','F','C','S'},{'A','D','E','E'}};" },
  },
  {
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "Medium",
    category: "Dynamic Programming • Array",
    description: { text: "Return the fewest coins needed to make up the target amount.", notes: ["If no combination is possible, return -1."] },
    tags: ["dynamic-programming", "arrays"],
    examples: [{ input: "coins = [1,2,5], amount = 11", output: "3" }],
    constraints: ["1 ≤ coins.length ≤ 12", "1 ≤ amount ≤ 10⁴"],
    starterCode: { javascript: `function coinChange(coins, amount) {\n  // Write your solution here\n}`, python: `def coinChange(coins, amount):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int coinChange(int[] coins, int amount) {\n        // Write your solution here\n        return -1;\n    }\n}` },
    expectedOutput: { javascript: "3", python: "3", java: "3" },
    testCases: { javascript: `const coins = [1,2,5];\nconsole.log(coinChange(coins, 11));`, python: "coins = [1,2,5]\nprint(coinChange(coins, 11))", java: "int[] coins = {1,2,5};" },
  },
  {
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "Medium",
    category: "Array • Sorting",
    description: { text: "Given an array of intervals, merge all overlapping intervals and return a sorted list.", notes: ["The input intervals are assumed to be closed intervals."] },
    tags: ["arrays", "sorting"],
    examples: [{ input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }],
    constraints: ["1 ≤ intervals.length ≤ 10⁴"],
    starterCode: { javascript: `function merge(intervals) {\n  // Write your solution here\n}`, python: `def merge(intervals):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int[][] merge(int[][] intervals) {\n        // Write your solution here\n        return new int[0][0];\n    }\n}` },
    expectedOutput: { javascript: "[[1,6],[8,10],[15,18]]", python: "[[1,6],[8,10],[15,18]]", java: "[[1,6],[8,10],[15,18]]" },
    testCases: { javascript: `const intervals = [[1,3],[2,6],[8,10],[15,18]];\nconsole.log(merge(intervals));`, python: "intervals = [[1,3],[2,6],[8,10],[15,18]]\nprint(merge(intervals))", java: "int[][] intervals = {{1,3},{2,6},{8,10},{15,18}};" },
  },
  {
    title: "Top K Frequent Elements",
    slug: "top-k-frequent-elements",
    difficulty: "Medium",
    category: "Hash Map • Heap",
    description: { text: "Return the k most frequent elements in the array.", notes: ["The answer should be sorted by frequency."] },
    tags: ["hashmap", "heap"],
    examples: [{ input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" }],
    constraints: ["1 ≤ nums.length ≤ 10⁵"],
    starterCode: { javascript: `function topKFrequent(nums, k) {\n  // Write your solution here\n}`, python: `def topKFrequent(nums, k):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int[] topKFrequent(int[] nums, int k) {\n        // Write your solution here\n        return new int[0];\n    }\n}` },
    expectedOutput: { javascript: "[1,2]", python: "[1, 2]", java: "[1, 2]" },
    testCases: { javascript: `const nums = [1,1,1,2,2,3];\nconsole.log(topKFrequent(nums, 2));`, python: "nums = [1,1,1,2,2,3]\nprint(topKFrequent(nums, 2))", java: "int[] nums = {1,1,1,2,2,3};" },
  },
  {
    title: "Graph Course Schedule",
    slug: "course-schedule",
    difficulty: "Medium",
    category: "Graph • Topological Sort",
    description: { text: "Determine whether all courses can be completed given prerequisite pairs.", notes: ["The graph is directed."] },
    tags: ["graph", "topological-sort"],
    examples: [{ input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" }],
    constraints: ["1 ≤ numCourses ≤ 2000", "0 ≤ prerequisites.length ≤ 5000"],
    starterCode: { javascript: `function canFinish(numCourses, prerequisites) {\n  // Write your solution here\n}`, python: `def canFinish(numCourses, prerequisites):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static boolean canFinish(int numCourses, int[][] prerequisites) {\n        // Write your solution here\n        return false;\n    }\n}` },
    expectedOutput: { javascript: "true", python: "True", java: "true" },
    testCases: { javascript: `const numCourses = 2;\nconst prerequisites = [[1,0]];\nconsole.log(canFinish(numCourses, prerequisites));`, python: "numCourses = 2\nprerequisites = [[1,0]]\nprint(canFinish(numCourses, prerequisites))", java: "int numCourses = 2;" },
  },
  {
    title: "House Robber",
    slug: "house-robber",
    difficulty: "Medium",
    category: "Dynamic Programming • Array",
    description: { text: "Find the maximum amount of money you can rob without robbing adjacent houses.", notes: ["Each house has a non-negative amount."] },
    tags: ["dynamic-programming", "arrays"],
    examples: [{ input: "nums = [1,2,3,1]", output: "4" }],
    constraints: ["1 ≤ nums.length ≤ 10⁵"],
    starterCode: { javascript: `function rob(nums) {\n  // Write your solution here\n}`, python: `def rob(nums):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int rob(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "4", python: "4", java: "4" },
    testCases: { javascript: `const nums = [1,2,3,1];\nconsole.log(rob(nums));`, python: "nums = [1,2,3,1]\nprint(rob(nums))", java: "int[] nums = {1,2,3,1};" },
  }
];

try {
  const dbUrl = ENV.DB_URL || process.env.DB_URL;
  if (!dbUrl) {
    throw new Error("DB_URL is missing");
  }

  await mongoose.connect(dbUrl, {
    serverSelectionTimeoutMS: 10000,
    family: 4,
  });

  await Problem.deleteMany({});
  await Problem.insertMany(problems);

  console.log(`Seeded ${problems.length} problems`);
  process.exit(0);
} catch (error) {
  console.error("Seed error:", error);
  process.exit(1);
} finally {
  await mongoose.disconnect();
}
