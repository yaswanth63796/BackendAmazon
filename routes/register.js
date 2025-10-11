import express from "express";
import { db } from "../firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await setDoc(userRef, { name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user: { name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

