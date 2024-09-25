type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method: HttpMethod;
  headers: HeadersInit;
  body?: string;
  signal: AbortSignal;
}

interface ApiServiceOptions {
  baseURL: string;
}

class ApiService {
  private baseURL: string;
  private controller: AbortController | null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.controller = null;
  }

  private createAbortController(): AbortController {
    this.controller = new AbortController();
    return this.controller;
  }

  public abort(): void {
    if (this.controller) {
      this.controller.abort(); // Abort the current request if it exists
      console.log("Request aborted");
    }
  }

  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    data: unknown = null,
    customHeaders: HeadersInit = {}
  ): Promise<T> {
    if (this.controller) {
      this.controller.abort(); // Abort the previous request if it exists
    }

    const signal = this.createAbortController().signal;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    const options: RequestOptions = {
      method,
      headers,
      signal,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, options);
      console.log(response);
      if (!response.ok) {
        if (response.status == 401) {
          setTimeout(() => {
            localStorage.removeItem("user");
            window.location.reload();
          }, 3000);
          throw new Error("Authentication Error, Please Try Logging again");
        } else {
          const error = await response.json();
          throw new Error(
            error?.error?.message || (error?.name == "AbortError"
              ? "request was aborted!"
              : "Request Failed")
          );
        }
      }
      return response.json();
    } catch (error: any) {
      console.log(error)
      throw error;
    }
  }

  // Convenience methods for different HTTP methods
  public get<T>(endpoint: string, customHeaders: HeadersInit = {}): Promise<T> {
    return this.request<T>("GET", endpoint, null, customHeaders);
  }

  public post<T>(
    endpoint: string,
    data: unknown,
    customHeaders: HeadersInit = {}
  ): Promise<T> {
    return this.request<T>("POST", endpoint, data, customHeaders);
  }

  public put<T>(
    endpoint: string,
    data: unknown,
    customHeaders: HeadersInit = {}
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, data, customHeaders);
  }

  public delete<T>(
    endpoint: string,
    customHeaders: HeadersInit = {}
  ): Promise<T> {
    return this.request<T>("DELETE", endpoint, null, customHeaders);
  }
}

export default ApiService;
