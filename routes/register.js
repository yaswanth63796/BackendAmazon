// backend/routes/register.js
import express from "express";
import { db } from "../firebase.js";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return res.status(400).json({ error: "Email already registered" });
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
