import express from "express";

const router = express.Router();

// 🔥 MAKE THIS PUBLIC
router.post("/execute", async (req, res) => {
  try {
    const response = await fetch(
      "https://piston.helloworld.rs/api/v2/execute",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    console.log("Piston response:", data);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Execution failed" });
  }
});

export default router;