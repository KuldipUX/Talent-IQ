
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDifficultyBadgeClass } from "../lib/utils";
import Navbar from "../components/Navbar";
import axiosInstance from "../lib/axios";
import { PlayIcon, Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { problemApi } from "../api/problem.js";

function ProblemPage() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await problemApi.getProblemBySlug(problemId);
        const found = response.problem;
        setProblem(found);
        if (found?.starterCode?.javascript) {
          setCode(found.starterCode.javascript);
        }
      } catch (error) {
        setProblem(null);
      }
    };

    if (problemId) {
      fetchProblem();
    }
  }, [problemId]);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(problem?.starterCode?.[newLanguage] || "");
    setOutput("");
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("");

    try {
      const res = await axiosInstance.post("/code/execute", {
        problemId: problem?._id,
        language,
        code,
      });

      if (res.data.success) {
        setOutput(res.data.output || "No output");
      } else {
        setOutput(res.data.error || "Something went wrong");
      }
    } catch (error) {
      setOutput(error.response?.data?.error || "Failed to run code");
      toast.error("Failed to run code");
    } finally {
      setIsRunning(false);
    }
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Problem Not Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{problem.title}</h1>
                <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>{problem.difficulty}</span>
              </div>
              <p className="text-sm text-base-content/60 mb-4">{problem.category}</p>

              <p className="text-base-content/80 leading-relaxed mb-6">
                {problem.description?.text}
              </p>

              {problem.description?.notes?.length > 0 && (
                <ul className="list-disc list-inside space-y-1 mb-6 text-sm text-base-content/70">
                  {problem.description.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              )}

              <h2 className="text-lg font-bold mb-3">Examples</h2>
              <div className="space-y-4 mb-6">
                {(problem.examples || []).map((example, index) => (
                  <div key={index} className="bg-base-200 rounded-lg p-4 font-mono text-sm">
                    <p className="font-semibold mb-2 font-sans">Example {index + 1}</p>
                    <p>
                      <span className="text-base-content/60">Input:</span> {example.input}
                    </p>
                    <p>
                      <span className="text-base-content/60">Output:</span> {example.output}
                    </p>
                    {example.explanation && (
                      <p className="mt-1 text-base-content/70 font-sans">
                        {example.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-bold mb-3">Constraints</h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-base-content/70 font-mono">
                {(problem.constraints || []).map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Code Editor</h2>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="select select-bordered select-sm"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[400px] bg-gray-900 text-white p-4 rounded-lg font-mono text-sm resize-none outline-none border border-base-300"
                spellCheck={false}
              />

              <button
                className="btn btn-primary mt-4 w-full"
                onClick={handleRunCode}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <PlayIcon className="size-4" />
                    Run Code
                  </>
                )}
              </button>

              {output && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-base-content/70 mb-2">Output</p>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                    {output}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemPage;
