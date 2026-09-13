import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { ChevronRightIcon, Code2Icon, SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { useEffect, useState } from "react";
import { problemApi } from "../api/problem.js";

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All topics");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const topics = ["All topics"];

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      try {
        const response = await problemApi.getProblems({
          page,
          limit: 12,
          difficulty: difficulty === "All" ? "" : difficulty,
          q: query,
          tag: topic === "All topics" ? "" : topic,
        });

        setProblems(response.problems || []);
        setPages(response.pages || 1);
        setTotal(response.total || 0);
        const nextTopics = Array.from(new Set((response.problems || []).map((problem) => problem.category?.split(" • ")[0]).filter(Boolean)));
        topics.push(...nextTopics);
      } catch (error) {
        setProblems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [query, difficulty, topic, page]);

  const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
          <p className="text-base-content/70">
            Sharpen your coding skills with these curated problems
          </p>
        </div>

        <div className="card bg-base-100 shadow-sm mb-8">
          <div className="card-body p-4">
            <div className="flex flex-col lg:flex-row gap-3">
              <label className="input input-bordered flex items-center gap-2 flex-1">
                <SearchIcon className="size-5 text-base-content/50" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search problems, topics, or keywords"
                  aria-label="Search problems"
                />
              </label>
              <label className="select select-bordered flex items-center gap-2">
                <SlidersHorizontalIcon className="size-4 text-base-content/50" />
                <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} aria-label="Filter by difficulty">
                  <option>All</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </label>
              <select className="select select-bordered" value={topic} onChange={(event) => setTopic(event.target.value)} aria-label="Filter by topic">
                {topics.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <p className="text-sm text-base-content/60 mt-2">
              Showing {problems.length} of {total} problems
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {loading && <div className="text-center py-4">Loading problems...</div>}
          {!loading && problems.map((problem) => (
            <Link
              key={problem._id || problem.slug}
              to={`/problem/${problem.slug}`}
              className="card bg-base-100 hover:scale-[1.01] transition-transform"
            >
              <div className="card-body">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Code2Icon className="size-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold">{problem.title}</h2>
                          <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>{problem.difficulty}</span>
                        </div>
                        <p className="text-sm text-base-content/60">{problem.category}</p>
                      </div>
                    </div>
                    <p className="text-base-content/80 mb-3">{problem.description?.text}</p>
                    {problem.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {problem.tags.map((tag) => <span className="badge badge-outline" key={tag}>{tag}</span>)}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-primary">
                    <span className="font-medium">Solve</span>
                    <ChevronRightIcon className="size-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {!loading && problems.length === 0 && (
            <div className="card bg-base-100">
              <div className="card-body items-center text-center py-12">
                <h2 className="text-xl font-bold">No matching problems</h2>
                <p className="text-base-content/60">Try a different search or reset the filters.</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-center gap-2">
          <button className="btn btn-sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
          <span className="btn btn-ghost btn-sm">Page {page} / {pages}</span>
          <button className="btn btn-sm" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>

        <div className="mt-12 card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value text-primary">{total}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Easy</div>
                <div className="stat-value text-success">{easyProblemsCount}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Medium</div>
                <div className="stat-value text-warning">{mediumProblemsCount}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Hard</div>
                <div className="stat-value text-error">{hardProblemsCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProblemsPage;