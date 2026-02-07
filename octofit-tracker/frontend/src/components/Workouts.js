import React, { useCallback, useEffect, useMemo, useState } from "react";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [filter, setFilter] = useState("");
  const endpoint =
    "https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/workouts/";

  const fetchWorkouts = useCallback(async () => {
    console.log("Workouts endpoint:", endpoint);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log("Workouts data:", data);
      const items = Array.isArray(data) ? data : data?.results || [];
      setWorkouts(items);
    } catch (error) {
      console.error("Workouts fetch error:", error);
      setWorkouts([]);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const filteredWorkouts = useMemo(() => {
    const normalized = filter.trim().toLowerCase();
    if (!normalized) {
      return workouts;
    }
    return workouts.filter((workout) =>
      JSON.stringify(workout).toLowerCase().includes(normalized),
    );
  }, [workouts, filter]);

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
            <div>
              <h2 className="h4 mb-1">Workouts</h2>
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
                onClick={fetchWorkouts}
              >
                Refresh
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#workoutsApiModal"
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
              <label className="form-label" htmlFor="workoutsFilter">
                Filter workouts
              </label>
              <input
                id="workoutsFilter"
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

          {filteredWorkouts.length === 0 ? (
            <div className="alert alert-secondary mb-0">No workouts yet.</div>
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
                  {filteredWorkouts.map((workout, index) => (
                    <tr key={workout.id || workout._id || index}>
                      <td className="fw-semibold">{index + 1}</td>
                      <td>
                        <pre className="mb-0 small">
                          {JSON.stringify(workout, null, 2)}
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
        id="workoutsApiModal"
        tabIndex="-1"
        aria-labelledby="workoutsApiModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="workoutsApiModalLabel">
                Workouts API
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
                This view pulls workout data from the backend REST API.
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

export default Workouts;
