import React, { useCallback, useEffect, useMemo, useState } from "react";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [filter, setFilter] = useState("");
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiBase = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : "http://localhost:8000/api";
  const endpoint = `${apiBase}/teams/`;

  const fetchTeams = useCallback(async () => {
    console.log("Teams endpoint:", endpoint);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log("Teams data:", data);
      const items = Array.isArray(data) ? data : data?.results || [];
      setTeams(items);
    } catch (error) {
      console.error("Teams fetch error:", error);
      setTeams([]);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const filteredTeams = useMemo(() => {
    const normalized = filter.trim().toLowerCase();
    if (!normalized) {
      return teams;
    }
    return teams.filter((team) =>
      JSON.stringify(team).toLowerCase().includes(normalized),
    );
  }, [teams, filter]);

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
            <div>
              <h2 className="h4 mb-1">Teams</h2>
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
                onClick={fetchTeams}
              >
                Refresh
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#teamsApiModal"
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
              <label className="form-label" htmlFor="teamsFilter">
                Filter teams
              </label>
              <input
                id="teamsFilter"
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

          {filteredTeams.length === 0 ? (
            <div className="alert alert-secondary mb-0">No teams yet.</div>
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
                  {filteredTeams.map((team, index) => (
                    <tr key={team.id || team._id || index}>
                      <td className="fw-semibold">{index + 1}</td>
                      <td>
                        <pre className="mb-0 small">
                          {JSON.stringify(team, null, 2)}
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
        id="teamsApiModal"
        tabIndex="-1"
        aria-labelledby="teamsApiModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="teamsApiModalLabel">
                Teams API
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
                This view pulls team data from the backend REST API.
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

export default Teams;
