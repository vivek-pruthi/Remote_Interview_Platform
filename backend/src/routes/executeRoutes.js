import express from "express";

const router = express.Router();

router.post("/execute", async (req, res) => {
  try {
    const { language, version, files } = req.body;

    if (!language || !version || !files) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const response = await fetch(
      "https://emkc.org/api/v2/piston/execute",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          version,
          files,
        }),
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: `Piston API error: ${response.status}`,
      });
    }

    const data = await response.json();

    return res.json({
      success: true,
      output: data.run?.output || "",
      stderr: data.run?.stderr || "",
      compileOutput: data.compile?.output || "",
    });
  } catch (error) {
    console.error("Execution error:", error);
    return res.status(500).json({
      success: false,
      message: "Execution failed",
    });
  }
});

export default router;