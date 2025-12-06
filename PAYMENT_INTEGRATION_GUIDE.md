# Free and Paid Books Feature - Implementation Guide

## Overview
This feature allows users to read free books immediately and purchase paid books to gain access. The system tracks user purchases and grants access accordingly.

## Backend Changes

### 1. Updated Models

#### Book Model (`Backend/model/books.js`)
- Added `free` boolean field (default: false)
- Added `content` string field for book content

#### User Model (`Backend/model/User.js`)
- Added `purchasedBooks` array to track purchased book IDs

### 2. New API Endpoints

#### Check Book Access
```
POST /book/:bookId/check-access
Body: { userId: "..." }
Response: { hasAccess: true/false, reason: "free"|"purchased"|"not_purchased", price: number }
```

#### Get Book Content
```
POST /book/:bookId/content
Body: { userId: "..." }
Response: { book: { _id, name, title, content } }
```

#### Grant Book Access (After Payment)
```
POST /book/grant-access
Body: { bookId: "...", userId: "..." }
Response: { message: "...", book: {...} }
```

## Frontend Changes

### 1. Updated Components

#### Cards & Cards2 Components
- Shows "Free" or "Paid" badge
- "Read Now" button for free books or purchased paid books
- "Buy Now" button for unpaid books
- Automatically checks user access

#### New BookReader Component
- Displays full book content
- Checks access before loading
- Redirects to payment if access denied

#### New Payment Component
- Shows book details and price
- Handles payment processing
- Grants access after successful payment

### 2. New Routes
- `/book/:id` - Book reading page
- `/book/:id/payment` - Payment page

## Payment Integration

### Current Implementation
The payment system currently uses a demo/simulated payment flow. For production, integrate with Razorpay or Stripe.

### Razorpay Integration Steps

1. **Install Razorpay SDK**
```bash
npm install razorpay
```

2. **Add Environment Variables**
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

3. **Update Payment Component**
Replace the simulated payment in `Payment.jsx` with actual Razorpay integration:

```javascript
// Load Razorpay script
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.onload = () => setRazorpayLoaded(true);
  document.body.appendChild(script);
}, []);

// Create order and open Razorpay checkout
const handlePayment = async () => {
  const orderRes = await axios.post('http://localhost:4000/payment/create-order', {
    bookId: id,
    userId: authUser._id
  });

  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    amount: orderRes.data.amount * 100,
    currency: 'USD',
    name: book.name,
    order_id: orderRes.data.orderId,
    handler: async (response) => {
      // Verify payment
      await axios.post('http://localhost:4000/payment/verify', {
        bookId: id,
        userId: authUser._id,
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature
      });
      
      // Grant access and redirect
      navigate(`/book/${id}`);
    }
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
```

## Testing

### Test Free Books
1. Create a book with `free: true` or `price: 0`
2. User should see "Free" badge
3. Click "Read Now" should work without payment

### Test Paid Books
1. Create a book with `free: false` and `price > 0`
2. User should see "Paid" badge
3. Click "Buy Now" → Complete payment → Access granted
4. After purchase, "Read Now" should work

## Database Updates

When updating existing books, you may need to:

1. Set `free: true` for books that should be free
2. Add `content` field with book content
3. Update `price` field if needed

Example MongoDB update:
```javascript
// Make all books with price 0 free
db.books.updateMany(
  { price: 0 },
  { $set: { free: true } }
);

// Add sample content
db.books.updateMany(
  {},
  { $set: { content: "Sample book content here..." } }
);
```

## Security Considerations

1. **Authentication**: All book access endpoints require user authentication
2. **Authorization**: Users can only read books they have access to
3. **Payment Verification**: Always verify payment signatures server-side
4. **Content Protection**: Book content should only be sent to authorized users

## Future Enhancements

1. Add payment history tracking
2. Add refund functionality
3. Add book preview (first few pages)
4. Add reading progress tracking
5. Add bookmarks and notes
6. Add download functionality for purchased books

