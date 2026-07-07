import { authClient } from "./auth-client";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.EXPO_PUBLIC_BACKEND_API_URL ?? "http://localhost:3000";
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const cookies = authClient.getCookie();
    return { Cookie: cookies };
  }

  async get<T>(path: string): Promise<T> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers,
      credentials: "omit",
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "Unknown error");
      throw new ApiError(response.status, text);
    }

    return response.json();
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      credentials: "omit",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "Unknown error");
      throw new ApiError(response.status, text);
    }

    return response.json();
  }

  async put<T>(path: string, body: unknown): Promise<T> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      credentials: "omit",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "Unknown error");
      throw new ApiError(response.status, text);
    }

    return response.json();
  }

  async delete<T>(path: string): Promise<T> {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
      headers,
      credentials: "omit",
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "Unknown error");
      throw new ApiError(response.status, text);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();
