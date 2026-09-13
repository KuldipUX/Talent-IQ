export const PROBLEMS = {
  "two-sum": {
    testCases: {
      javascript: `
console.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)));
console.log(JSON.stringify(twoSum([3, 2, 4], 6)));
console.log(JSON.stringify(twoSum([3, 3], 6)));
`,
      python: `
print(twoSum([2, 7, 11, 15], 9))
print(twoSum([3, 2, 4], 6))
print(twoSum([3, 3], 6))
`,
      java: `
System.out.println(Arrays.toString(Solution.twoSum(new int[]{2, 7, 11, 15}, 9)));
System.out.println(Arrays.toString(Solution.twoSum(new int[]{3, 2, 4}, 6)));
System.out.println(Arrays.toString(Solution.twoSum(new int[]{3, 3}, 6)));
`,
    },
  },

  "reverse-string": {
    testCases: {
      javascript: `
let a = ["h","e","l","l","o"];
reverseString(a);
console.log(JSON.stringify(a));

let b = ["H","a","n","n","a","h"];
reverseString(b);
console.log(JSON.stringify(b));
`,
      python: `
a = ["h","e","l","l","o"]
reverseString(a)
print(a)

b = ["H","a","n","n","a","h"]
reverseString(b)
print(b)
`,
      java: `
char[] a = {'h','e','l','l','o'};
Solution.reverseString(a);
System.out.println(Arrays.toString(a));

char[] b = {'H','a','n','n','a','h'};
Solution.reverseString(b);
System.out.println(Arrays.toString(b));
`,
    },
  },

  "valid-palindrome": {
    testCases: {
      javascript: `
console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("race a car"));
console.log(isPalindrome(" "));
`,
      python: `
print(isPalindrome("A man, a plan, a canal: Panama"))
print(isPalindrome("race a car"))
print(isPalindrome(" "))
`,
      java: `
System.out.println(Solution.isPalindrome("A man, a plan, a canal: Panama"));
System.out.println(Solution.isPalindrome("race a car"));
System.out.println(Solution.isPalindrome(" "));
`,
    },
  },

  "maximum-subarray": {
    testCases: {
      javascript: `
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
console.log(maxSubArray([1]));
console.log(maxSubArray([5,4,-1,7,8]));
`,
      python: `
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))
print(maxSubArray([1]))
print(maxSubArray([5,4,-1,7,8]))
`,
      java: `
System.out.println(Solution.maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4}));
System.out.println(Solution.maxSubArray(new int[]{1}));
System.out.println(Solution.maxSubArray(new int[]{5,4,-1,7,8}));
`,
    },
  },

  "container-with-most-water": {
    testCases: {
      javascript: `
console.log(maxArea([1,8,6,2,5,4,8,3,7]));
console.log(maxArea([1,1]));
`,
      python: `
print(maxArea([1,8,6,2,5,4,8,3,7]))
print(maxArea([1,1]))
`,
      java: `
System.out.println(Solution.maxArea(new int[]{1,8,6,2,5,4,8,3,7}));
System.out.println(Solution.maxArea(new int[]{1,1}));
`,
    },
  },

      "best-time-to-buy-and-sell-stock": {
            testCases: {
                  javascript: `console.log(maxProfit([7,1,5,3,6,4]));\nconsole.log(maxProfit([7,6,4,3,1]));`,
                  python: `print(maxProfit([7,1,5,3,6,4]))\nprint(maxProfit([7,6,4,3,1]))`,
                  java: `System.out.println(Solution.maxProfit(new int[]{7,1,5,3,6,4}));\nSystem.out.println(Solution.maxProfit(new int[]{7,6,4,3,1}));`,
            },
      },
      "valid-parentheses": {
            testCases: {
                  javascript: `console.log(isValid("()[]{}"));\nconsole.log(isValid("(]"));`,
                  python: `print(isValid("()[]{}"))\nprint(isValid("(]"))`,
                  java: `System.out.println(Solution.isValid("()[]{}"));\nSystem.out.println(Solution.isValid("(]"));`,
            },
      },
      "binary-search": {
            testCases: {
                  javascript: `console.log(search([-1,0,3,5,9,12], 9));\nconsole.log(search([-1,0,3,5,9,12], 2));`,
                  python: `print(search([-1,0,3,5,9,12], 9))\nprint(search([-1,0,3,5,9,12], 2))`,
                  java: `System.out.println(Solution.search(new int[]{-1,0,3,5,9,12}, 9));\nSystem.out.println(Solution.search(new int[]{-1,0,3,5,9,12}, 2));`,
            },
      },
      "climbing-stairs": {
            testCases: {
                  javascript: `console.log(climbStairs(2));\nconsole.log(climbStairs(5));`,
                  python: `print(climbStairs(2))\nprint(climbStairs(5))`,
                  java: `System.out.println(Solution.climbStairs(2));\nSystem.out.println(Solution.climbStairs(5));`,
            },
      },
      "product-except-self": {
            testCases: {
                  javascript: `console.log(JSON.stringify(productExceptSelf([1,2,3,4])));\nconsole.log(JSON.stringify(productExceptSelf([-1,1,0,-3,3])));`,
                  python: `print(productExceptSelf([1,2,3,4]))\nprint(productExceptSelf([-1,1,0,-3,3]))`,
                  java: `System.out.println(Arrays.toString(Solution.productExceptSelf(new int[]{1,2,3,4})));\nSystem.out.println(Arrays.toString(Solution.productExceptSelf(new int[]{-1,1,0,-3,3})));`,
            },
      },
      "longest-substring-without-repeating": {
            testCases: {
                  javascript: `console.log(lengthOfLongestSubstring("abcabcbb"));\nconsole.log(lengthOfLongestSubstring("bbbbb"));\nconsole.log(lengthOfLongestSubstring("pwwkew"));`,
                  python: `print(lengthOfLongestSubstring("abcabcbb"))\nprint(lengthOfLongestSubstring("bbbbb"))\nprint(lengthOfLongestSubstring("pwwkew"))`,
                  java: `System.out.println(Solution.lengthOfLongestSubstring("abcabcbb"));\nSystem.out.println(Solution.lengthOfLongestSubstring("bbbbb"));\nSystem.out.println(Solution.lengthOfLongestSubstring("pwwkew"));`,
            },
      },
      "merge-intervals": {
            testCases: {
                  javascript: `console.log(JSON.stringify(merge([[1,3],[2,6],[8,10],[15,18]])));\nconsole.log(JSON.stringify(merge([[1,4],[4,5]])));`,
                  python: `print(merge([[1,3],[2,6],[8,10],[15,18]]))\nprint(merge([[1,4],[4,5]]))`,
                  java: `System.out.println(Arrays.deepToString(Solution.merge(new int[][]{{1,3},{2,6},{8,10},{15,18}})));\nSystem.out.println(Arrays.deepToString(Solution.merge(new int[][]{{1,4},{4,5}})));`,
            },
      },
      "coin-change": {
            testCases: {
                  javascript: `console.log(coinChange([1,2,5], 11));\nconsole.log(coinChange([2], 3));`,
                  python: `print(coinChange([1,2,5], 11))\nprint(coinChange([2], 3))`,
                  java: `System.out.println(Solution.coinChange(new int[]{1,2,5}, 11));\nSystem.out.println(Solution.coinChange(new int[]{2}, 3));`,
            },
      },
      "number-of-islands": {
            testCases: {
                  javascript: `console.log(numIslands([['1','1','0'],['1','0','0'],['0','0','1']]));\nconsole.log(numIslands([['1','1'],['1','1']]));`,
                  python: `print(numIslands([['1','1','0'],['1','0','0'],['0','0','1']]))\nprint(numIslands([['1','1'],['1','1']]))`,
                  java: `System.out.println(Solution.numIslands(new char[][]{{'1','1','0'},{'1','0','0'},{'0','0','1'}}));\nSystem.out.println(Solution.numIslands(new char[][]{{'1','1'},{'1','1'}}));`,
            },
      },
      "house-robber": {
            testCases: {
                  javascript: `console.log(rob([1,2,3,1]));\nconsole.log(rob([2,7,9,3,1]));`,
                  python: `print(rob([1,2,3,1]))\nprint(rob([2,7,9,3,1]))`,
                  java: `System.out.println(Solution.rob(new int[]{1,2,3,1}));\nSystem.out.println(Solution.rob(new int[]{2,7,9,3,1}));`,
            },
      },
      "trapping-rain-water": {
            testCases: {
                  javascript: `console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));\nconsole.log(trap([4,2,0,3,2,5]));`,
                  python: `print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))\nprint(trap([4,2,0,3,2,5]))`,
                  java: `System.out.println(Solution.trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1}));\nSystem.out.println(Solution.trap(new int[]{4,2,0,3,2,5}));`,
            },
      },
};