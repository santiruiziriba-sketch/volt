const BASE_URL =
  import.meta.env.VITE_API_URL || "https://volt-api.cebollero.com/api";

function checkResponse(response) {
  if (response.ok) {
    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  return response
    .json()
    .catch(() => ({}))
    .then((error) => {
      throw new Error(
        error.message || error.error || `Error ${response.status}`,
      );
    });
}

function request(path, options = {}) {
  const token = localStorage.getItem("jwt");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  }).then(checkResponse);
}

export function register(data) {
  return request("/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function login(data) {
  return request("/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getUserInfo() {
  return request("/users/me");
}

export function getRoutines() {
  return request("/routines");
}

export function createRoutine(data) {
  return request("/routines", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function deleteRoutine(routineId) {
  return request(`/routines/${routineId}`, {
    method: "DELETE",
  });
}

export function updateRoutineExercise(routineId, exerciseIndex, hecho) {
  return request(`/routines/${routineId}/exercises/${exerciseIndex}`, {
    method: "PATCH",
    body: JSON.stringify({ hecho }),
  });
}
