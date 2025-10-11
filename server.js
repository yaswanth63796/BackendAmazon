// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Mount each route separately with proper base paths
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);

// Optional root route for quick testing
app.get("/", (req, res) => {
  res.send("✅ Backend is running on Render");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
