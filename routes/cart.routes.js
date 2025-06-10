import express from 'express';
import { addToCart, getUserCart, removeGameFromCart } from '../controllers/cart.controller.js';
import auth from '../middlewares/authMiddleware.js'; 

const router = express.Router();

// All cart routes require authentication
router.use(auth); //

router.route('/')
    .post(addToCart) // Add game to cart
    .get(getUserCart);      // View user's cart

router.route('/:gameId') // To remove a specific game from cart
    .delete(removeGameFromCart);

export default router;