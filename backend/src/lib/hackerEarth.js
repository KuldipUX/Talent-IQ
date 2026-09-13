import { ENV } from "./env.js";

const HACKEREARTH_API =
  "https://api.hackerearth.com/v4/partner/code-evaluation/submissions/";

const LANGUAGE_MAP = {
  javascript: "JAVASCRIPT_NODE",
  python: "PYTHON3",
  java: "JAVA14",
  cpp: "CPP17",
  c: "C",
  csharp: "CSHARP",
  go: "GO",
  rust: "RUST",
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/*
 * Creates a complete executable program.
 *
 * The user only writes the function.
 * We add the test cases after their code.
 */
const buildExecutableCode = (language, code, testCases) => {
  if (!testCases) {
    return code;
  }

  // JavaScript
  if (language === "javascript") {
    return `${code}

${testCases}`;
  }

  // Python
  if (language === "python") {
    return `${code}

${testCases}`;
  }

  // Java
  if (language === "java") {
    return `
import java.util.*;

${code}

public class Main {
    public static void main(String[] args) {
        ${testCases}
    }
}
`;
  }

  return code;
};

export async function executeCode(
  language,
  code,
  testCases = ""
) {
  try {
    const lang = LANGUAGE_MAP[language];

    if (!lang) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    if (!ENV.HACKEREARTH_CLIENT_SECRET) {
      return {
        success: false,
        error: "HackerEarth client secret is not configured.",
      };
    }

    /*
     * Combine:
     *
     * User code
     * +
     * Test cases
     *
     * into one executable program.
     */
    const executableCode = buildExecutableCode(
      language,
      code,
      testCases
    );

    console.log("Executing language:", language);
    console.log("Executable code:");
    console.log(executableCode);

    // STEP 1: Submit code
    const submitResponse = await fetch(HACKEREARTH_API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "client-secret": ENV.HACKEREARTH_CLIENT_SECRET,
      },

      body: JSON.stringify({
        lang,
        source: executableCode,

        // We are no longer using stdin.
        // Test cases are part of the source code.
        input: "",

        memory_limit: 262144,
        time_limit: 5,
      }),
    });

    const submitData = await submitResponse.json();

    if (!submitResponse.ok) {
      console.error(
        "HackerEarth submit error:",
        submitData
      );

      return {
        success: false,
        error:
          submitData.message ||
          "Failed to submit code to HackerEarth.",
      };
    }

    const statusUrl = submitData.status_update_url;
    const heId = submitData.he_id;

    if (!statusUrl || !heId) {
      return {
        success: false,
        error:
          "HackerEarth did not return an execution ID.",
      };
    }

    console.log(
      "HackerEarth submission:",
      heId
    );

    // STEP 2: Poll execution status
    for (let attempt = 0; attempt < 20; attempt++) {
      await sleep(1000);

      const statusResponse = await fetch(
        statusUrl,
        {
          method: "GET",

          headers: {
            "client-secret":
              ENV.HACKEREARTH_CLIENT_SECRET,
          },
        }
      );

      const statusData =
        await statusResponse.json();

      if (!statusResponse.ok) {
        console.error(
          "HackerEarth status error:",
          statusData
        );

        return {
          success: false,
          error:
            statusData.message ||
            "Failed to get execution status.",
        };
      }

      const requestStatus =
        statusData.request_status?.code;

      console.log(
        `HackerEarth status [${attempt + 1}]:`,
        requestStatus
      );

      // Still processing
      if (
        requestStatus === "REQUEST_INITIATED" ||
        requestStatus === "REQUEST_QUEUED" ||
        requestStatus === "CODE_COMPILED"
      ) {
        continue;
      }

      // HackerEarth processing failed
      if (
        requestStatus === "REQUEST_FAILED"
      ) {
        return {
          success: false,
          error:
            "HackerEarth failed to process the request.",
        };
      }

      // Execution completed
      if (
        requestStatus === "REQUEST_COMPLETED"
      ) {
        const result = statusData.result;

        const compileStatus =
          result?.compile_status;

        const runStatus =
          result?.run_status;

        // Compilation error
        if (compileStatus !== "OK") {
          return {
            success: false,
            error:
              runStatus?.status_detail ||
              "Compilation failed.",
          };
        }

        const executionStatus =
          runStatus?.status;

        // Accepted
        if (executionStatus === "AC") {
          let output = "";

          // HackerEarth returns output as an S3 URL
          if (runStatus.output) {
            try {
              const outputResponse =
                await fetch(runStatus.output);

              if (outputResponse.ok) {
                output =
                  await outputResponse.text();
              }
            } catch (outputError) {
              console.error(
                "Error fetching HackerEarth output:",
                outputError
              );
            }
          }

          return {
            success: true,
            output,
            error: runStatus.stderr || "",
            time: runStatus.time_used,
            memory: runStatus.memory_used,
          };
        }

        // Runtime error / TLE / MLE
        return {
          success: false,
          output: "",

          error:
            runStatus?.stderr ||
            runStatus?.status_detail ||
            `Execution failed with status: ${executionStatus}`,

          time: runStatus?.time_used,
          memory: runStatus?.memory_used,
        };
      }
    }

    return {
      success: false,
      error: "Code execution timed out.",
    };

  } catch (error) {
    console.error(
      "HackerEarth execution error:",
      error
    );

    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}