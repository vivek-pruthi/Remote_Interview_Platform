// Detect if we are running locally or on Render

const BACKEND_URL = "/api/execute/run";

/**
 * Calls your CodeBridge backend to execute code via Judge0.
 */
export async function executeCode(language, code) {
  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        language: language.toLowerCase(), 
        code 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        success: false, 
        error: `Server Error (${response.status}): ${errorData.error || "Execution failed"}` 
      };
    }

    const data = await response.json();

    // Data format returned by our new backend route:
    // { success: boolean, output: string, error: string }
    return {
      success: data.success,
      output: data.output || (data.success ? "No output" : ""),
      error: data.error || "",
    };

  } catch (error) {
    return {
      success: false,
      error: `Connection Failed: ${error.message}. Is the backend running?`,
    };
  }
}