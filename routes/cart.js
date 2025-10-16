// routes/cart.js
import express from 'express';
import admin from 'firebase-admin';
import serviceAccount from '../firebaseServiceAccount.json' assert { type: "json" };

const router = express.Router();

// ✅ Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// GET all cart items
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('cart').get();
    const cartItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// POST new item
router.post('/', async (req, res) => {
  try {
    const product = req.body;
    await db.collection('cart').doc(product.id.toString()).set(product);
    res.json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// PUT update quantity
router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    await db.collection('cart').doc(req.params.id).update({ quantity });
    res.json({ message: 'Quantity updated successfully' });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ error: 'Failed to update quantity' });
  }
});

// DELETE single item
router.delete('/:id', async (req, res) => {
  try {
    await db.collection('cart').doc(req.params.id).delete();
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// DELETE all items (clear cart)
router.delete('/', async (req, res) => {
  try {
    const snapshot = await db.collection('cart').get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    res.json({ message: 'All items cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

export default router;
