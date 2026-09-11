import axios from "axios";

export const runCode = async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        error: "Language and code are required.",
      });
    }

    const languageIds = {
      javascript: 97,
      java: 91,
      python: 109,
      cpp: 105,
      c: 103,
      typescript: 101,
    };

    const languageId = languageIds[language.toLowerCase()];

    if (!languageId) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language: ${language}`,
      });
    }

    const response = await axios.post(
      "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
      {
        language_id: languageId,
        source_code: code,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data;

    res.json({
      success: !result.stderr && !result.compile_output,
      output: result.stdout || "",
      error: result.stderr || result.compile_output || "",
    });
  } catch (error) {
    console.error(
      "Judge0 execution error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Code execution failed.",
    });
  }
};