import { useState, useCallback } from 'react';

interface ApiRequestParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: any;
  queryParams?: Record<string, string>;
  pathParams?: Record<string, string | number>;
}

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async ({ endpoint, method, body, queryParams, pathParams }: ApiRequestParams) => {
    setLoading(true);
    setError(null);

    let interpolatedEndpoint = endpoint;
    if (pathParams) {
      Object.keys(pathParams).forEach((key) => {
        interpolatedEndpoint = interpolatedEndpoint.replace(`:${key}`, encodeURIComponent(pathParams[key].toString()));
      });
    }

    const baseUrl = `http://localhost:3001/flexihabit/${interpolatedEndpoint}`;
    const queryParamsString = queryParams ? new URLSearchParams(queryParams).toString() : '';
    const url = `${baseUrl}${queryParamsString ? '?' + queryParamsString : ''}`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
      }

      const responseData: T = await response.json();
      setData(responseData);
    } catch (e) {
      setError(`Failed to ${method} data: ${e instanceof Error ? e.message : String(e)}`);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
}
