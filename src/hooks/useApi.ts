import { useCallback } from "react";
import { useStatusContext } from "../context/StatusContext";

interface ApiResponse<T> {
  apiRequest: (
    method?: string,
    body?: any,
    customHeaders?: HeadersInit,
    endpoint?: string
  ) => Promise<T | null>;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

export const useApi = <T>(defaultEndpoint: string): ApiResponse<T> => {
  const { setIsLoading, setError, setIsSuccessful } = useStatusContext();

  const apiRequest = useCallback(
    async (
      method: string = "GET",
      body?: any,
      customHeaders?: HeadersInit,
      endpoint?: string
    ): Promise<T | null> => {
      setIsLoading(true);
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

        const result: T = await response.json();
        method !== "GET" && setIsSuccessful(true)

        return result;
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [defaultEndpoint, setIsLoading, setError, setIsSuccessful]
  );

  return { apiRequest };
};
