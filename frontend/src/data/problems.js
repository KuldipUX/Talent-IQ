//problems
export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",

    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },

    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],

    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],

    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
}`,

      python: `def twoSum(nums, target):
    # Write your solution here
    pass`,

      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}`,
    },

    expectedOutput: {
      javascript: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
    },
  },

  "reverse-string": {
    id: "reverse-string", title: "Reverse String", difficulty: "Easy", category: "Array • Two Pointers",
    description: { text: "Write a function that reverses an array of characters in place.", notes: ["Use O(1) extra memory."] },
    examples: [{ input: "s = ['h','e','l','l','o']", output: "['o','l','l','e','h']" }, { input: "s = ['H','a','n','n','a','h']", output: "['h','a','n','n','a','H']" }],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ASCII character"],
    starterCode: { javascript: `function reverseString(s) {\n  // Write your solution here\n}`, python: `def reverseString(s):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static void reverseString(char[] s) {\n        // Write your solution here\n    }\n}` },
    expectedOutput: { javascript: "[\"o\",\"l\",\"l\",\"e\",\"h\"]\n[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]", python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']", java: "[o, l, l, e, h]\n[h, a, n, n, a, H]" },
  },
  "valid-palindrome": {
    id: "valid-palindrome", title: "Valid Palindrome", difficulty: "Easy", category: "String • Two Pointers",
    description: { text: "Given a string, determine if it is a palindrome after converting uppercase letters to lowercase and removing non-alphanumeric characters.", notes: ["An empty string is a valid palindrome."] },
    examples: [{ input: "s = 'A man, a plan, a canal: Panama'", output: "true" }, { input: "s = 'race a car'", output: "false" }],
    constraints: ["1 ≤ s.length ≤ 2 × 10⁵", "s consists only of printable ASCII characters"],
    starterCode: { javascript: `function isPalindrome(s) {\n  // Write your solution here\n}`, python: `def isPalindrome(s):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static boolean isPalindrome(String s) {\n        // Write your solution here\n        return false;\n    }\n}` },
    expectedOutput: { javascript: "true\nfalse\ntrue", python: "True\nFalse\nTrue", java: "true\nfalse\ntrue" },
  },
  "maximum-subarray": {
    id: "maximum-subarray", title: "Maximum Subarray", difficulty: "Medium", category: "Array • Dynamic Programming",
    description: { text: "Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.", notes: ["A subarray must contain at least one number."] },
    examples: [{ input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" }, { input: "nums = [5,4,-1,7,8]", output: "23" }],
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    starterCode: { javascript: `function maxSubArray(nums) {\n  // Write your solution here\n}`, python: `def maxSubArray(nums):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int maxSubArray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "6\n1\n23", python: "6\n1\n23", java: "6\n1\n23" },
  },
  "container-with-most-water": {
    id: "container-with-most-water", title: "Container With Most Water", difficulty: "Medium", category: "Array • Two Pointers",
    description: { text: "Given n non-negative integers representing vertical lines, find two lines that together with the x-axis form a container that holds the most water.", notes: ["The container cannot be tilted."] },
    examples: [{ input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }, { input: "height = [1,1]", output: "1" }],
    constraints: ["2 ≤ height.length ≤ 10⁵", "0 ≤ height[i] ≤ 10⁴"],
    starterCode: { javascript: `function maxArea(height) {\n  // Write your solution here\n}`, python: `def maxArea(height):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int maxArea(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "49\n1", python: "49\n1", java: "49\n1" },
  },

  "best-time-to-buy-and-sell-stock": {
    id: "best-time-to-buy-and-sell-stock", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", category: "Array • Greedy",
    description: { text: "Given an array prices where prices[i] is the price of a stock on day i, return the maximum profit you can achieve by choosing one day to buy and a different day to sell.", notes: ["You cannot sell before you buy.", "Return 0 if no profit is possible."] },
    examples: [{ input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 at 1 and sell on day 5 at 6." }, { input: "prices = [7,6,4,3,1]", output: "0" }],
    constraints: ["1 ≤ prices.length ≤ 10⁵", "0 ≤ prices[i] ≤ 10⁴"],
    starterCode: { javascript: `function maxProfit(prices) {\n  // Write your solution here\n}`, python: `def maxProfit(prices):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int maxProfit(int[] prices) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "5\n0", python: "5\n0", java: "5\n0" },
  },
  "valid-parentheses": {
    id: "valid-parentheses", title: "Valid Parentheses", difficulty: "Easy", category: "Stack • String",
    description: { text: "Given a string containing only brackets, determine whether the input string is valid. Brackets must close in the correct order.", notes: ["An empty string is valid.", "Every closing bracket must match the most recent unmatched opening bracket."] },
    examples: [{ input: "s = '()[]{}'", output: "true" }, { input: "s = '(]'", output: "false" }],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses, braces, and brackets"],
    starterCode: { javascript: `function isValid(s) {\n  // Write your solution here\n}`, python: `def isValid(s):\n    # Write your solution here\n    pass`, java: `import java.util.*;\n\nclass Solution {\n    public static boolean isValid(String s) {\n        // Write your solution here\n        return false;\n    }\n}` },
    expectedOutput: { javascript: "true\nfalse", python: "True\nFalse", java: "true\nfalse" },
  },
  "binary-search": {
    id: "binary-search", title: "Binary Search", difficulty: "Easy", category: "Array • Binary Search",
    description: { text: "Given a sorted array of distinct integers and a target value, return the index of target. Return -1 if target is not present.", notes: ["The array is sorted in ascending order.", "Aim for O(log n) time complexity."] },
    examples: [{ input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" }, { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" }],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "-10⁴ ≤ nums[i], target ≤ 10⁴", "All values are distinct"],
    starterCode: { javascript: `function search(nums, target) {\n  // Write your solution here\n}`, python: `def search(nums, target):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int search(int[] nums, int target) {\n        // Write your solution here\n        return -1;\n    }\n}` },
    expectedOutput: { javascript: "4\n-1", python: "4\n-1", java: "4\n-1" },
  },
  "climbing-stairs": {
    id: "climbing-stairs", title: "Climbing Stairs", difficulty: "Easy", category: "Dynamic Programming",
    description: { text: "You are climbing a staircase with n steps. Each time you can climb either 1 or 2 steps. Return the number of distinct ways to reach the top.", notes: ["The answer fits in a signed 32-bit integer."] },
    examples: [{ input: "n = 2", output: "2" }, { input: "n = 5", output: "8" }],
    constraints: ["1 ≤ n ≤ 45"],
    starterCode: { javascript: `function climbStairs(n) {\n  // Write your solution here\n}`, python: `def climbStairs(n):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "2\n8", python: "2\n8", java: "2\n8" },
  },
  "product-except-self": {
    id: "product-except-self", title: "Product of Array Except Self", difficulty: "Medium", category: "Array • Prefix Product",
    description: { text: "Given an integer array nums, return an array answer such that answer[i] equals the product of every element except nums[i].", notes: ["Solve it without division.", "Use O(1) extra space apart from the output array."] },
    examples: [{ input: "nums = [1,2,3,4]", output: "[24,12,8,6]" }, { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" }],
    constraints: ["2 ≤ nums.length ≤ 10⁵", "-30 ≤ nums[i] ≤ 30"],
    starterCode: { javascript: `function productExceptSelf(nums) {\n  // Write your solution here\n}`, python: `def productExceptSelf(nums):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int[] productExceptSelf(int[] nums) {\n        // Write your solution here\n        return new int[0];\n    }\n}` },
    expectedOutput: { javascript: "[24,12,8,6]\n[0,0,9,0,0]", python: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]", java: "[24, 12, 8, 6]\n[0, 0, 9, 0, 0]" },
  },
  "longest-substring-without-repeating": {
    id: "longest-substring-without-repeating", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", category: "String • Sliding Window",
    description: { text: "Given a string s, find the length of the longest substring without repeating characters.", notes: ["A substring is a contiguous sequence of characters."] },
    examples: [{ input: "s = 'abcabcbb'", output: "3" }, { input: "s = 'bbbbb'", output: "1" }, { input: "s = 'pwwkew'", output: "3" }],
    constraints: ["0 ≤ s.length ≤ 5 × 10⁴", "s consists of English letters, digits, symbols, and spaces"],
    starterCode: { javascript: `function lengthOfLongestSubstring(s) {\n  // Write your solution here\n}`, python: `def lengthOfLongestSubstring(s):\n    # Write your solution here\n    pass`, java: `import java.util.*;\n\nclass Solution {\n    public static int lengthOfLongestSubstring(String s) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "3\n1\n3", python: "3\n1\n3", java: "3\n1\n3" },
  },
  "merge-intervals": {
    id: "merge-intervals", title: "Merge Intervals", difficulty: "Medium", category: "Array • Sorting",
    description: { text: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.", notes: ["Intervals that touch at an endpoint are considered overlapping."] },
    examples: [{ input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]" }, { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" }],
    constraints: ["1 ≤ intervals.length ≤ 10⁴", "intervals[i].length = 2", "0 ≤ starti ≤ endi ≤ 10⁴"],
    starterCode: { javascript: `function merge(intervals) {\n  // Write your solution here\n}`, python: `def merge(intervals):\n    # Write your solution here\n    pass`, java: `import java.util.*;\n\nclass Solution {\n    public static int[][] merge(int[][] intervals) {\n        // Write your solution here\n        return new int[0][0];\n    }\n}` },
    expectedOutput: { javascript: "[[1,6],[8,10],[15,18]]\n[[1,5]]", python: "[[1, 6], [8, 10], [15, 18]]\n[[1, 5]]", java: "[[1, 6], [8, 10], [15, 18]]\n[[1, 5]]" },
  },
  "coin-change": {
    id: "coin-change", title: "Coin Change", difficulty: "Medium", category: "Dynamic Programming • BFS",
    description: { text: "Given coin denominations and an amount, return the fewest number of coins needed to make up that amount. Return -1 if impossible.", notes: ["You may use each coin denomination unlimited times."] },
    examples: [{ input: "coins = [1,2,5], amount = 11", output: "3" }, { input: "coins = [2], amount = 3", output: "-1" }],
    constraints: ["1 ≤ coins.length ≤ 12", "0 ≤ amount ≤ 10⁴"],
    starterCode: { javascript: `function coinChange(coins, amount) {\n  // Write your solution here\n}`, python: `def coinChange(coins, amount):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int coinChange(int[] coins, int amount) {\n        // Write your solution here\n        return -1;\n    }\n}` },
    expectedOutput: { javascript: "3\n-1", python: "3\n-1", java: "3\n-1" },
  },
  "number-of-islands": {
    id: "number-of-islands", title: "Number of Islands", difficulty: "Medium", category: "Graph • DFS • Matrix",
    description: { text: "Given a 2D grid of '1' land and '0' water, return the number of islands. An island is surrounded by water and formed by connecting adjacent land cells horizontally or vertically.", notes: ["The grid border is surrounded by water.", "Mutating the grid during traversal is allowed."] },
    examples: [{ input: "grid = [['1','1','0'],['1','0','0'],['0','0','1']]", output: "2" }, { input: "grid = [['1','1'],['1','1']]", output: "1" }],
    constraints: ["1 ≤ rows, columns ≤ 300", "grid[i][j] is '0' or '1'"],
    starterCode: { javascript: `function numIslands(grid) {\n  // Write your solution here\n}`, python: `def numIslands(grid):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int numIslands(char[][] grid) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "2\n1", python: "2\n1", java: "2\n1" },
  },
  "house-robber": {
    id: "house-robber", title: "House Robber", difficulty: "Medium", category: "Dynamic Programming",
    description: { text: "You are a professional robber planning to rob houses along a street. Adjacent houses have security systems connected, so you cannot rob two adjacent houses. Return the maximum amount you can rob.", notes: ["The first and last houses are not adjacent."] },
    examples: [{ input: "nums = [1,2,3,1]", output: "4" }, { input: "nums = [2,7,9,3,1]", output: "12" }],
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 400"],
    starterCode: { javascript: `function rob(nums) {\n  // Write your solution here\n}`, python: `def rob(nums):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int rob(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "4\n12", python: "4\n12", java: "4\n12" },
  },
  "trapping-rain-water": {
    id: "trapping-rain-water", title: "Trapping Rain Water", difficulty: "Hard", category: "Array • Two Pointers",
    description: { text: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.", notes: ["The width of every bar is 1.", "Aim for O(n) time and O(1) extra space."] },
    examples: [{ input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }, { input: "height = [4,2,0,3,2,5]", output: "9" }],
    constraints: ["1 ≤ height.length ≤ 2 × 10⁴", "0 ≤ height[i] ≤ 10⁵"],
    starterCode: { javascript: `function trap(height) {\n  // Write your solution here\n}`, python: `def trap(height):\n    # Write your solution here\n    pass`, java: `class Solution {\n    public static int trap(int[] height) {\n        // Write your solution here\n        return 0;\n    }\n}` },
    expectedOutput: { javascript: "6\n9", python: "6\n9", java: "6\n9" },
  },
};

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "/javascript.png",
    monacoLang: "javascript",
  },

  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },

  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
};