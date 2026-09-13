import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { problemApi } from "../api/problem.js";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const [problems, setProblems] = useState([]);
  const [loadingProblems, setLoadingProblems] = useState(false);
  const [problemError, setProblemError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const loadProblems = async () => {
      setLoadingProblems(true);
      setProblemError("");

      try {
        const data = await problemApi.getProblems({ page: 1, limit: 100 });
        setProblems(data.problems || []);
      } catch (error) {
        const message =
          error?.response?.status === 401 || error?.response?.status === 403
            ? "Please sign in again to load problems."
            : "Problems could not be loaded from the backend.";

        setProblems([]);
        setProblemError(message);
      } finally {
        setLoadingProblems(false);
      }
    };

    loadProblems();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6">Create New Session</h3>

        <div className="space-y-8">
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Select Problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <select
              className="select w-full"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find((p) => p.title === e.target.value);
                setRoomConfig({
                  difficulty: selectedProblem?.difficulty || "",
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                {loadingProblems ? "Loading problems..." : "Choose a coding problem..."}
              </option>

              {problems.map((problem) => (
                <option key={problem._id} value={problem.title}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>

            {problemError && (
              <div className="text-sm text-error font-medium mt-2">{problemError}</div>
            )}
          </div>

          {roomConfig.problem && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem: <span className="font-medium">{roomConfig.problem}</span>
                </p>
                <p>
                  Max Participants: <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary gap-2"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}

            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
export default CreateSessionModal;