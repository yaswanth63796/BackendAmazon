// ✅ server.js (ESM version)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import productsRoute from "./routes/products.js";
import cartRoutes from "./routes/cart.js";   // ✅ converted to ESM import

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoutes);  // ✅ Cart route working now

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
