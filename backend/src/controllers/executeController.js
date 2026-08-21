import axios from "axios";

export const runCode = async (req, res) => {
  try {
    const { language, code } = req.body;

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
          Authorization: `Token ${process.env.GLOT_API_KEY}`,
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