export const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? ""
).replace(/\/+$/, "");

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return API_BASE ? `${API_BASE}${normalizedPath}` : normalizedPath;
}

type FetchJsonRetryOptions = RequestInit & {
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
  init?: RequestInit;
  allowRetryUnsafeMethods?: boolean;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchJsonWithRetry<T>(
  path: string,
  options: FetchJsonRetryOptions = {},
): Promise<T> {
  const {
    timeoutMs = 25000,
    retries = 2,
    retryDelayMs = 800,
    init,
    headers,
    allowRetryUnsafeMethods = false,
    ...requestInit
  } = options;

  const requestUrl = /^https?:\/\//i.test(path) ? path : apiUrl(path);
  const method = String(init?.method ?? requestInit.method ?? "GET").toUpperCase();
  const isRetrySafeMethod = method === "GET" || method === "HEAD" || method === "OPTIONS";
  const effectiveRetries = isRetrySafeMethod || allowRetryUnsafeMethods ? retries : 0;
  let lastError: unknown = null;

  for (let attempt = 0; attempt <= effectiveRetries; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(requestUrl, {
        ...(init ?? {}),
        ...requestInit,
        headers: {
          ...(init?.headers ?? {}),
          ...(headers ?? {}),
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        let detail = "";
        try {
          const payload = (await response.json()) as { error?: string } | null;
          if (payload?.error) detail = `: ${payload.error}`;
        } catch {
          // Ignore non-JSON responses and use generic status fallback.
        }
        throw new Error(`HTTP ${response.status}${detail}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      if (attempt >= effectiveRetries) break;
      await sleep(retryDelayMs * (attempt + 1));
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Request failed after retries.");
}
