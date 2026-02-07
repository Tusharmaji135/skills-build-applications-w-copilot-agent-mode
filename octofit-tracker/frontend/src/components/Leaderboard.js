import React, { useCallback, useEffect, useMemo, useState } from "react";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [filter, setFilter] = useState("");
  const endpoint =
    "https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/leaderboard/";

  const fetchLeaderboard = useCallback(async () => {
    console.log("Leaderboard endpoint:", endpoint);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log("Leaderboard data:", data);
      const items = Array.isArray(data) ? data : data?.results || [];
      setLeaders(items);
    } catch (error) {
      console.error("Leaderboard fetch error:", error);
      setLeaders([]);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const filteredLeaders = useMemo(() => {
    const normalized = filter.trim().toLowerCase();
    if (!normalized) {
      return leaders;
    }
    return leaders.filter((leader) =>
      JSON.stringify(leader).toLowerCase().includes(normalized),
    );
  }, [leaders, filter]);

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
            <div>
              <h2 className="h4 mb-1">Leaderboard</h2>
              <a
                className="link-primary"
                href={endpoint}
                target="_blank"
                rel="noreferrer"
              >
                View API endpoint
              </a>
            </div>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={fetchLeaderboard}
              >
                Refresh
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#leaderboardApiModal"
              >
                API Info
              </button>
            </div>
          </div>

          <form
            className="row g-2 align-items-end mb-3"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="col-sm-6 col-md-4">
              <label className="form-label" htmlFor="leaderboardFilter">
                Filter leaderboard
              </label>
              <input
                id="leaderboardFilter"
                className="form-control"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Search by keyword"
              />
            </div>
            <div className="col-sm-6 col-md-3">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => setFilter("")}
              >
                Clear filter
              </button>
            </div>
          </form>

          {filteredLeaders.length === 0 ? (
            <div className="alert alert-secondary mb-0">
              No leaderboard entries yet.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: "90px" }}>#</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaders.map((leader, index) => (
                    <tr key={leader.id || leader._id || index}>
                      <td className="fw-semibold">{index + 1}</td>
                      <td>
                        <pre className="mb-0 small">
                          {JSON.stringify(leader, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div
        className="modal fade"
        id="leaderboardApiModal"
        tabIndex="-1"
        aria-labelledby="leaderboardApiModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="leaderboardApiModalLabel">
                Leaderboard API
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p className="mb-2">
                This view pulls leaderboard data from the backend REST API.
              </p>
              <p className="mb-0">
                <span className="fw-semibold">Endpoint:</span>{" "}
                <a
                  className="link-primary"
                  href={endpoint}
                  target="_blank"
                  rel="noreferrer"
                >
                  {endpoint}
                </a>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
