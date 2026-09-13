function normalizeOutput(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function outputsMatch(actual, expected) {
  const normalizedActual = normalizeOutput(actual);
  const normalizedExpected = normalizeOutput(expected);

  if (!normalizedExpected) {
    return null;
  }

  return normalizedActual === normalizedExpected;
}

function OutputPanel({ output }) {
  if (output === null) {
    return (
      <div className="h-full bg-base-100 flex flex-col">
        <div className="px-4 py-2 bg-base-200 border-b border-base-300 font-semibold text-sm">
          Output
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-base-content/50 text-sm">
            Click "Run Code" to see the output here...
          </p>
        </div>
      </div>
    );
  }

  const actualOutput = normalizeOutput(output.output);
  const expectedOutput = normalizeOutput(output.expectedOutput);

  const passed =
    output.success && expectedOutput
      ? outputsMatch(actualOutput, expectedOutput)
      : null;

  const actualLines = actualOutput
    ? actualOutput.split("\n").map((line) => line.trim())
    : [];

  const expectedLines = expectedOutput
    ? expectedOutput.split("\n").map((line) => line.trim())
    : [];

  const successMessage =
    output.success && passed === true
      ? "✓ All test cases passed. Your solution matches the expected output."
      : output.success && passed === false
        ? "✗ Output did not match the expected answer yet."
        : output.success
          ? "✓ Code executed successfully."
          : "✗ Code execution failed.";

  const solvedMessage =
    output.success && passed === true
      ? "Problem solved — all test cases passed. You are ready for the next question."
      : "";

  return (
    <div className="h-full bg-base-100 flex flex-col">
      <div className="px-4 py-2 bg-base-200 border-b border-base-300 font-semibold text-sm flex items-center justify-between">
        <span>Output</span>

        {output.success ? (
          passed === true ? (
            <span className="badge badge-success badge-sm">
              All Tests Passed
            </span>
          ) : passed === false ? (
            <span className="badge badge-error badge-sm">
              Wrong Answer
            </span>
          ) : (
            <span className="badge badge-success badge-sm">
              Execution Successful
            </span>
          )
        ) : (
          <span className="badge badge-error badge-sm">
            Execution Failed
          </span>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {passed === true && (
          <div className="rounded-2xl border border-success/50 bg-success/10 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl leading-none">✓</span>
              <div>
                <div className="font-bold text-success text-lg">
                  Problem solved
                </div>
                <div className="text-sm text-base-content/70">
                  {solvedMessage}
                </div>
              </div>
            </div>
          </div>
        )}

        {output.success && (
          <div className={`rounded-lg border p-3 ${passed === true ? "border-success/30 bg-success/10" : "border-base-300 bg-base-200"}`}>
            <div className={`font-semibold text-sm ${passed === true ? "text-success" : "text-base-content"}`}> 
              {successMessage}
            </div>
          </div>
        )}
        {!output.success ? (
          <div className="space-y-3">
            {output.output && (
              <div>
                <p className="text-xs font-semibold text-base-content/60 mb-2">
                  Program Output
                </p>

                <pre className="text-sm font-mono whitespace-pre-wrap">
                  {output.output}
                </pre>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-error mb-2">
                Error
              </p>

              <pre className="text-sm font-mono text-error whitespace-pre-wrap">
                {output.error || "Code execution failed."}
              </pre>
            </div>
          </div>
        ) : (
          <>
            {expectedLines.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-base-content/60 mb-2">
                  Test Cases
                </p>

                <div className="space-y-2">
                  {expectedLines.map((expected, index) => {
                    const actual = actualLines[index] ?? "";
                    const testPassed =
                      normalizeOutput(actual) === normalizeOutput(expected);

                    return (
                      <div
                        key={index}
                        className={`rounded-lg border p-3 ${
                          testPassed
                            ? "border-success/30 bg-success/5"
                            : "border-error/30 bg-error/5"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            Test Case {index + 1}
                          </span>

                          {testPassed ? (
                            <span className="text-success text-sm font-semibold">
                              ✓ Passed
                            </span>
                          ) : (
                            <span className="text-error text-sm font-semibold">
                              ✗ Failed
                            </span>
                          )}
                        </div>

                        {!testPassed && (
                          <div className="mt-3 space-y-2 text-xs font-mono">
                            <div>
                              <span className="text-base-content/50">
                                Expected:
                              </span>

                              <pre className="mt-1 whitespace-pre-wrap">
                                {expected}
                              </pre>
                            </div>

                            <div>
                              <span className="text-base-content/50">
                                Received:
                              </span>

                              <pre className="mt-1 whitespace-pre-wrap">
                                {actual || "(no output)"}
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-base-content/60 mb-2">
                Program Output
              </p>

              <pre className="text-sm font-mono text-base-content whitespace-pre-wrap bg-base-200 rounded-lg p-3">
                {output.output || "No output"}
              </pre>
            </div>

            <div className="flex gap-4 text-xs text-base-content/60">
              {output.time && (
                <span>
                  Time:{" "}
                  <strong className="text-base-content">
                    {output.time}s
                  </strong>
                </span>
              )}

              {output.memory && (
                <span>
                  Memory:{" "}
                  <strong className="text-base-content">
                    {output.memory} KB
                  </strong>
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;