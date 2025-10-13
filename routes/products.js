import express from "express";

const router = express.Router();

// Sample products
const products = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
    rating: 4,
    reviews: 1250,
  },
  {
    id: 2,
    title: "Smart Watch Series 5",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
    rating: 5,
    reviews: 892,
  },
  {
    id: 3,
    title: "Laptop Backpack",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
    rating: 4,
    reviews: 567,
  },
  {
    id: 4,
    title: "Wireless Mouse",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300",
    rating: 4,
    reviews: 2341,
  },
];

router.get("/", (req, res) => {
  res.json(products);
});

export default router;
