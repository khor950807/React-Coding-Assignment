
import axios, { AxiosError } from "axios";
import type { CancelTokenSource } from "axios";

export const cancelTokens = new Map<string, CancelTokenSource>();

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function requestWithRetry<T>(
  key: string,
  requestFn: () => Promise<T>,
  retryCount: number = 0,
  maxRetries: number = 3
): Promise<any> {
  getCancelToken(key);

  try {
    return await requestFn();
  } catch (error) {
    if (axios.isCancel(error)) {
      return undefined;
    }

    if (axios.isAxiosError(error) && error.response?.status === 429 && retryCount < maxRetries) {
      const retryDelay = Math.pow(2, retryCount) * 1000;
      await delay(retryDelay);
      return requestWithRetry(key, requestFn, retryCount + 1, maxRetries);
    }

    handleApiError(error);
  }
}

export function getCancelToken(key: string): CancelTokenSource {
  if (cancelTokens.has(key)) {
    cancelTokens.get(key)?.cancel("canceled previous request.");
  }
  
  const source = axios.CancelToken.source();

  cancelTokens.set(key, source);

  return source;
}

export function handleApiError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    const message = axiosError.message ?? "An unknown error occurred.";

    if (status === 429) {
      console.log("Rate limited. Try again later.");
    } else if (!axiosError.response) {
      console.log("Network error: Please check your connection.");
    } else {
      console.log(`API error (${status}): ${message}`);
    }
  } else {
    console.log("Unexpected error:", error);
  }

  throw error;
}