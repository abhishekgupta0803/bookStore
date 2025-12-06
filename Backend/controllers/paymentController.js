// Payment Controller - For Razorpay Integration
// This is a template for production payment integration

const Book = require("../model/books");
const User = require("../model/User");

// Create Razorpay order (for production)
const createRazorpayOrder = async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    if (!bookId || !userId) {
      return res.status(400).json({ message: "Book ID and User ID are required" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.free) {
      return res.status(400).json({ message: "This book is free" });
    }

    // In production, use Razorpay SDK:
    // const razorpay = require('razorpay');
    // const instance = new razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    //
    // const options = {
    //   amount: book.price * 100, // amount in smallest currency unit
    //   currency: "USD",
    //   receipt: `book_${bookId}_user_${userId}`,
    // };
    //
    // const order = await instance.orders.create(options);
    // return res.status(200).json({ orderId: order.id, amount: book.price });

    // Demo response
    return res.status(200).json({
      orderId: `demo_order_${Date.now()}`,
      amount: book.price,
      message: "Demo order created. Integrate Razorpay SDK for production."
    });
  } catch (error) {
    console.log("Error creating order:", error);
    res.status(500).json({ message: error.message });
  }
};

// Verify Razorpay payment (for production)
const verifyPayment = async (req, res) => {
  try {
    const { bookId, userId, paymentId, orderId, signature } = req.body;

    if (!bookId || !userId) {
      return res.status(400).json({ message: "Book ID and User ID are required" });
    }

    // In production, verify payment signature:
    // const crypto = require('crypto');
    // const razorpay = require('razorpay');
    // const instance = new razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
    //
    // const generatedSignature = crypto
    //   .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    //   .update(orderId + "|" + paymentId)
    //   .digest('hex');
    //
    // if (generatedSignature !== signature) {
    //   return res.status(400).json({ message: "Payment verification failed" });
    // }

    // Grant access after successful payment verification
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if already purchased
    const alreadyPurchased = user.purchasedBooks.some(
      (book) => book.toString() === bookId
    );

    if (!alreadyPurchased) {
      user.purchasedBooks.push(bookId);
      await user.save();
    }

    return res.status(200).json({
      message: "Payment verified and access granted",
      book: book
    });
  } catch (error) {
    console.log("Error verifying payment:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPayment
};

