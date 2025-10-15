// backend/routes/cart.js
const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// ✅ Initialize Firebase Admin only once
if (!admin.apps.length) {
  const serviceAccount = require('../firebaseServiceAccount.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://clonebackend-1f3da.firebaseio.com'
  });
}

const db = admin.firestore();
const cartCollection = db.collection('cart');

// 🛒 GET all cart items
router.get('/', async (req, res) => {
  try {
    const snapshot = await cartCollection.get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 ADD item to cart
router.post('/', async (req, res) => {
  try {
    const newItem = req.body;  // {title, price, image, quantity}
    const docRef = await cartCollection.add(newItem);
    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✏️ UPDATE quantity
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    await cartCollection.doc(id).update({ quantity });
    res.json({ message: 'Quantity updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ❌ DELETE single item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await cartCollection.doc(id).delete();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🧹 CLEAR all items
router.delete('/', async (req, res) => {
  try {
    const snapshot = await cartCollection.get();
    const batch = db.batch();

    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    res.json({ message: 'All items cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
