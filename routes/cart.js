const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');

// Route to add product to cart
router.post('/add-to-cart/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
        }

        let cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.add(product, product.id);
        req.session.cart = cart;
        res.status(200).json({ success: true, message: 'Sản phẩm đã được thêm vào giỏ hàng', cart: cart });
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng' });
    }
});

// Route to get cart
router.get('/cart', (req, res) => {
    if (!req.session.cart) {
        return res.render('cart', { products: null });
    }
    const cart = new Cart(req.session.cart);
    res.render('cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});

// Route for checkout/payment
router.post('/checkout', async (req, res) => {
    // Check if user is logged in
    if (!req.session.user) {
        return res.status(401).json({ 
            success: false, 
            message: 'Vui lòng đăng nhập để tiếp tục thanh toán'
        });
    }
    
    // Check if user is admin
    if (req.session.user.isAdmin) {
        return res.status(403).render('cart', { 
            error: 'Tài khoản admin không được phép mua hàng', 
            cart: req.session.cart || [] 
        });
    }
    
    // Continue with checkout process for non-admin users
    try {
        // ...existing checkout logic...
        
    } catch (error) {
        console.error('Lỗi thanh toán:', error);
        return res.status(500).render('cart', { 
            error: 'Đã xảy ra lỗi khi xử lý thanh toán', 
            cart: req.session.cart || [] 
        });
    }
});

module.exports = router;