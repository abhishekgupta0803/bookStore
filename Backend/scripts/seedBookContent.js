// Script to seed book content based on book names/titles
// Run this script to populate book content: node Backend/scripts/seedBookContent.js

const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('../model/books');
const { generateBookContent } = require('../utils/bookContentGenerator');

const seedBookContent = async () => {
  try {
    // Connect to MongoDB
    const URI = process.env.MONGODBURI || process.env.LOCALURI;
    await mongoose.connect(URI);
    console.log('Connected to MongoDB');

    // Get all books
    const books = await Book.find();
    console.log(`Found ${books.length} books to update`);

    // Update each book with generated content
    for (const book of books) {
      // Only update if content is empty or default
      if (!book.content || book.content === '') {
        const content = generateBookContent(book.name, book.title, book.category);
        book.content = content;
        await book.save();
        console.log(`✓ Updated content for: ${book.name}`);
      } else {
        console.log(`- Skipped ${book.name} (already has content)`);
      }
    }

    console.log('\n✓ Book content seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding book content:', error);
    process.exit(1);
  }
};

// Run the script
seedBookContent();

