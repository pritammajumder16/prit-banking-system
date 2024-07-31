// src/lib/api/generateRequest.ts

interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any; // can be a string, FormData, etc.
}
type ResponseType = { success: boolean; data: any; message: string };
export const generateRequest = async (
  url: string,
  options: RequestOptions
): Promise<ResponseType> => {
  try {
    const response = await fetch(url, {
      method: options.method,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "An error occurred");
    }

    return (await response.json()) as ResponseType;
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
};
