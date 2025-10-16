// routes/cart.js
import express from 'express';
import admin from 'firebase-admin';

const router = express.Router();
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

// DELETE single item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('cart').doc(id).delete();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// DELETE all items
router.delete('/', async (req, res) => {
  try {
    const snapshot = await db.collection('cart').get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    res.json({ message: 'All items cleared from cart' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

// PUT update quantity
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }
    await db.collection('cart').doc(id).update({ quantity });
    res.json({ message: 'Quantity updated successfully' });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ error: 'Failed to update quantity' });
  }
});

export default router;
