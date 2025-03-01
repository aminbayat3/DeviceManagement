import { useState, useCallback } from "react";

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  apiRequest: (
    method?: string,
    body?: any,
    customHeaders?: HeadersInit,
    endpoint?: string,
  ) => Promise<void>;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

export const useApi = <T>(defaultEndpoint: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiRequest = useCallback(
    async (
      method: string = "GET",
      body?: any,
      customHeaders?: HeadersInit,
      endpoint?: string
    ) => {
      setLoading(true);
      setError(null);
      try {
        const url = `${API_BASE_URL}${endpoint || defaultEndpoint}`;

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...customHeaders,
          },
          body: method !== "GET" && body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [defaultEndpoint]
  );

  return { data, loading, error, apiRequest };
};
