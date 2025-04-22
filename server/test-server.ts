import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.send("🔥 It works!");
});

app.listen(5000, "0.0.0.0", () => {
  console.log("✅ Minimal server is listening on http://localhost:5000");
});