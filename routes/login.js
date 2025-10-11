import express from "express";
import { db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const userData = userSnap.data();
    const match = await bcrypt.compare(password, userData.password);

    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { name: userData.name, email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
