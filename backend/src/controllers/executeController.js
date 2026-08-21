import axios from "axios";

export const runCode = async (req, res) => {
  try {
    const { language, code } = req.body;
    const glotToken = process.env.GLOT_API_KEY || process.env.GLOT_TOKEN;

    if (!glotToken) {
      return res.status(500).json({
        success: false,
        error: "Missing GLOT_API_KEY or GLOT_TOKEN in environment variables",
      });
    }

    const response = await axios.post(
      `https://run.glot.io/languages/${language}/latest`,
      {
        files: [
          {
            name: language === "java" ? "Main.java" : "main",
            content: code
          }
        ]
      },
      {
        headers: {
          Authorization: `Token ${glotToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      success: true,
      output: response.data.stdout,
      error: response.data.stderr
    });

  } catch (error) {
    console.error("Execution Error:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
};