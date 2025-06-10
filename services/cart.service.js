import Cart from '../models/cart.model.js';
import Game from '../models/game.model.js'; //

const addItemToCart = async (userId, gameId, quantity) => {
    const game = await Game.findById(gameId); //

    if (!game) {
        throw new Error('Game not found!');
    }

    if (game.stock < quantity) { //
        throw new Error(`Not enough stock for ${game.title}. Available: ${game.stock}`); //
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        // If no cart exists, create a new one
        cart = await Cart.create({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
        item => item.game.toString() === gameId.toString()
    );

    if (existingItemIndex > -1) {
        // If item exists, update quantity
        const existingItem = cart.items[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;

        if (game.stock < newQuantity) { //
            throw new Error(`Adding ${quantity} to cart would exceed available stock for ${game.title}. Current in cart: ${existingItem.quantity}, Available: ${game.stock}`); //
        }
        existingItem.quantity = newQuantity;
        existingItem.priceAtAddToCart = game.price; // // Update price in case it changed
    } else {
        // If item does not exist, add new item
        cart.items.push({
            game: gameId,
            quantity: quantity,
            priceAtAddToCart: game.price //
        });
    }

    await cart.save();
    return cart;
};

const getCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate({
        path: 'items.game',
        select: 'title platform genera price coverImage stock' // // Select relevant game details, note 'genera'
    });

    if (!cart) {
        throw new Error('No cart found for this user!');
    }

    return cart;
};

const removeItemFromCart = async (userId, gameId) => {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new Error('No cart found for this user!');
    }

    const initialItemCount = cart.items.length;
    cart.items = cart.items.filter(item => item.game.toString() !== gameId.toString());

    if (cart.items.length === initialItemCount) {
        throw new Error('Game not found in cart.');
    }

    await cart.save();
    return cart;
};

// Utility function to clear a user's cart (used after order placement)
const clearCart = async (userId) => {
    await Cart.deleteOne({ user: userId });
};

export {
    addItemToCart,
    getCart,
    removeItemFromCart,
    clearCart
};