import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import registerRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import productsRoute from "./routes/products.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", registerRoute);
app.use("/api", loginRoute);
app.use("/api/products", productsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
