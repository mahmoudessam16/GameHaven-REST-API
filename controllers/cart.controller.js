import { addItemToCart, getCart, removeItemFromCart } from '../services/cart.service.js';

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { gameId, quantity } = req.body;

        if (!gameId || !quantity || quantity <= 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide a valid gameId and quantity.'
            });
        }

        const cart = await addItemToCart(userId, gameId, quantity);
        res.status(200).json({
            status: 'success',
            message: 'Item added to cart successfully!',
            data: {
                cart
            }
        });
    } catch (error) {
        res.status(error.message.includes('stock') || error.message.includes('Game not found') ? 400 : 500).json({ // Heuristic for common errors
            status: 'error',
            message: error.message
        });
    }
};

const getUserCart = async (req, res) => {
    try {
        const userId = req.user.id; 

        const cart = await getCart(userId);
        res.status(200).json({
            status: 'success',
            data: {
                cart
            }
        });
    } catch (error) {
        res.status(error.message.includes('No cart found') ? 404 : 500).json({
            status: 'error',
            message: error.message
        });
    }
};

const removeGameFromCart = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { gameId } = req.params; 

        if (!gameId) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide a gameId to remove.'
            });
        }

        const cart = await removeItemFromCart(userId, gameId);
        res.status(200).json({
            status: 'success',
            message: 'Item removed from cart successfully!',
            data: {
                cart
            }
        });
    } catch (error) {
        res.status(error.message.includes('No cart found') || error.message.includes('Game not found in cart') ? 404 : 500).json({
            status: 'error',
            message: error.message
        });
    }
};

export {
    addToCart,
    getUserCart,
    removeGameFromCart
};