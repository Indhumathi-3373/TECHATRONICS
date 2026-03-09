function resolveApiBaseUrl() {
  const raw = (import.meta.env.VITE_API_BASE_URL || "").trim();
  if (!raw) {
    return "http://localhost:8080";
  }

  if (raw.startsWith(":")) {
    return `http://localhost${raw}`.replace(/\/$/, "");
  }

  if (raw.startsWith("//")) {
    return `${window.location.protocol}${raw}`.replace(/\/$/, "");
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw.replace(/\/$/, "");
  }

  return `http://${raw}`.replace(/\/$/, "");
}

const API_BASE_URL = resolveApiBaseUrl();

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }
  return response.json();
}

export async function postJson(path, payload) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error(`Cannot connect to backend at ${API_BASE_URL}. Make sure Spring Boot is running.`);
  }

  const body = await parseResponse(response);
  if (!response.ok) {
    throw new Error(body?.message || "Request failed.");
  }

  return body;
}

export { API_BASE_URL };
