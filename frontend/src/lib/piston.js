// Glot.io API - free code execution (requires a free API token from glot.io)

const GLOT_API = "https://glot.io/api/run";
const GLOT_TOKEN = "YOUR_GLOT_API_TOKEN"; // get this from your glot.io account

const LANGUAGE_VERSIONS = {
  javascript: "javascript",
  python: "python",
  java: "java",
};

const FILE_NAMES = {
  javascript: "main.js",
  python: "main.py",
  java: "Main.java",
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to execute
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const langKey = LANGUAGE_VERSIONS[language];

    if (!langKey) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(`${GLOT_API}/${langKey}/latest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${GLOT_TOKEN}`,
      },
      body: JSON.stringify({
        files: [
          {
            name: FILE_NAMES[language],
            content: code,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        return { success: false, error: "Invalid or missing Glot.io API token." };
      }
      if (response.status === 429) {
        return { success: false, error: "Rate limit exceeded. Please slow down requests." };
      }
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    const output = data.stdout || "";
    const stderr = data.stderr || "";
    const err = data.error || "";

    if (stderr || err) {
      return {
        success: false,
        output,
        error: stderr || err,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}