// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import productsRoute from "./routes/products.js";
import cartRoutes from "./routes/cart.js";

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoutes);

// ✅ Test route to verify server
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running ✅" });
});

// ✅ Catch-all error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

