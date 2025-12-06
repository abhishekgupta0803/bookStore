const Book = require("../model/books");
const User = require("../model/User");

// Get all books
const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log("Error :", error);
    res.status(500).json(error);
  }
};

// Get single book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log("Error :", error);
    res.status(500).json(error);
  }
};

// Check if user has access to a book
const checkBookAccess = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.body.userId; // Get from authenticated user

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // If book is free, user has access
    if (book.free) {
      return res.status(200).json({ 
        hasAccess: true, 
        reason: "free" 
      });
    }

    // Check if user has purchased the book
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasPurchased = user.purchasedBooks.some(
      (book) => book.toString() === bookId
    );

    if (hasPurchased) {
      return res.status(200).json({ 
        hasAccess: true, 
        reason: "purchased" 
      });
    }

    return res.status(200).json({ 
      hasAccess: false, 
      reason: "not_purchased",
      price: book.price 
    });
  } catch (error) {
    console.log("Error :", error);
    res.status(500).json({ message: error.message });
  }
};

// Get book content (only if user has access)
const getBookContent = async (req, res) => {
  try {
    // Support both :bookId and :id parameter names
    const bookId = req.params.bookId || req.params.id;
    const userId = req.body.userId || req.query.userId; // Support both body and query

    if (!userId) {
      return res.status(401).json({ 
        message: "User not authenticated",
        requiresPurchase: false
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Generate content if missing (based on book name/title)
    if (!book.content || book.content === '') {
      const { generateBookContent } = require('../utils/bookContentGenerator');
      book.content = generateBookContent(book.name, book.title, book.category);
      await book.save();
    }

    // Check access - Free books
    if (book.free || book.price === 0) {
      return res.status(200).json({ 
        book: {
          _id: book._id,
          name: book.name,
          title: book.title,
          content: book.content || "Content is being generated..."
        },
        accessGranted: true,
        reason: "free"
      });
    }

    // Check if user has purchased - Paid books
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasPurchased = user.purchasedBooks.some(
      (purchasedBookId) => purchasedBookId.toString() === bookId
    );

    if (!hasPurchased) {
      return res.status(403).json({ 
        message: "Purchase Required. Please purchase this book to read the full content.",
        requiresPurchase: true,
        price: book.price,
        bookId: bookId
      });
    }

    // User has purchased - grant access
    return res.status(200).json({ 
      book: {
        _id: book._id,
        name: book.name,
        title: book.title,
        content: book.content
      },
      accessGranted: true,
      reason: "purchased"
    });
  } catch (error) {
    console.log("Error :", error);
    res.status(500).json({ message: error.message });
  }
};

// Grant access after payment
const grantBookAccess = async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ message: "User ID and Book ID are required" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already purchased
    const alreadyPurchased = user.purchasedBooks.some(
      (book) => book.toString() === bookId
    );

    if (alreadyPurchased) {
      return res.status(200).json({ 
        message: "Book already purchased",
        book: book 
      });
    }

    // Add book to purchased books
    user.purchasedBooks.push(bookId);
    await user.save();

    return res.status(200).json({ 
      message: "Book access granted successfully",
      book: book 
    });
  } catch (error) {
    console.log("Error :", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBook,
  getBookById,
  checkBookAccess,
  getBookContent,
  grantBookAccess
};
