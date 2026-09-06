# 🛒 E-Commerce API

A production-style RESTful E-commerce API built with Node.js, Express.js, MongoDB, and Mongoose.

The API supports multiple user roles, authentication, product management, shopping carts, orders, payments, reviews & ratings, and admin management.

---

## 🚀 Features

### 🔐 Authentication & Authorization

- Consumer registration and login
- Merchant registration and login
- Admin authentication
- JWT access and refresh tokens
- HTTP-only refresh token cookies
- Role-based authorization
- OTP-based account verification
- Secure password hashing with Argon2id
- Account activation and deactivation

### 🛍️ Product Management

- Create, update, delete, and retrieve products
- Merchant-specific product ownership
- Product search
- Category filtering
- Price filtering
- Sorting
- Pagination

### 🛒 Cart Management

- Add products to cart
- Update item quantity
- Remove cart items
- Clear cart
- Stock validation
- Dynamic subtotal calculation

### 📦 Order Management

- Create orders from cart
- View personal orders
- View individual orders
- Merchant order management
- Update order status
- Cancel pending orders
- Automatic stock deduction
- Stock restoration after cancellation

### 💳 Payment Management

- Cash on Delivery support
- Online payment flow structure
- Payment status management
- Transaction ID generation
- Payment ownership protection
- Automatic order confirmation after successful payment

### ⭐ Reviews & Ratings

- Create product reviews
- Purchase verification
- One review per consumer/product
- Update own reviews
- Delete own reviews
- Product review listing
- Reviewer information
- Average rating calculation
- Total review count

### 👑 Admin Management

- View all users
- View individual users
- Activate/deactivate users
- Permanently delete users
- View all merchants
- View individual merchants
- View all orders
- View individual orders
- Admin-only authorization

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Zod
- JSON Web Token (JWT)
- Argon2id
- Nodemailer
- Gmail OAuth2

---

## 👥 User Roles

| Role | Description |
|---|---|
| Consumer | Browse products, manage cart, place orders, make payments, and review products |
| Merchant | Manage own products and manage orders containing their products |
| Admin | Manage users, merchants, and orders |

---

# 📚 API Endpoints

## 🔐 Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register consumer |
| POST | `/api/auth/register-merchant` | Register merchant |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/verify-otp` | Verify account |
| POST | `/api/auth/refresh-token` | Refresh access token |
| POST | `/api/auth/logout` | Logout |

## 👤 Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/me` | Get current user |
| PATCH | `/api/users/me` | Update current user |

## 🛍️ Products

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/products` | Create product |
| GET | `/api/products` | Get products |
| GET | `/api/products/:id` | Get product by ID |
| PATCH | `/api/products/:id` | Update own product |
| DELETE | `/api/products/:id` | Delete own product |

### Product Search, Filtering, Sorting & Pagination

```text
GET /api/products?search=phone&category=electronics&minPrice=100&maxPrice=1000&page=1&limit=10&sort=price_asc
```

| Parameter | Description |
|---|---|
| `search` | Search products by title |
| `category` | Filter by category |
| `minPrice` | Minimum product price |
| `maxPrice` | Maximum product price |
| `page` | Page number |
| `limit` | Number of products per page |
| `sort` | `price_asc`, `price_desc`, `newest`, or `oldest` |

Pagination response includes current page, total pages, total products, and result limit.

## 🛒 Cart

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cart` | Get cart |
| POST | `/api/cart/items` | Add item to cart |
| PATCH | `/api/cart/items/:productId` | Update item quantity |
| DELETE | `/api/cart/items/:productId` | Remove item |
| DELETE | `/api/cart` | Clear cart |

## 📦 Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Create order |
| GET | `/api/orders/my-orders` | Get own orders |
| GET | `/api/orders/:orderId` | Get order by ID |
| GET | `/api/orders/merchant` | Get merchant orders |
| PATCH | `/api/orders/:orderId/status` | Update order status |
| PATCH | `/api/orders/:orderId/cancel` | Cancel order |

## 💳 Payments

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/payments` | Create payment |
| PATCH | `/api/payments/:paymentId/status` | Update payment status |

## ⭐ Reviews & Ratings

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/reviews` | Create review |
| GET | `/api/reviews/product/:productId` | Get product reviews |
| GET | `/api/reviews/product/:productId/rating` | Get product rating |
| PATCH | `/api/reviews/:reviewId` | Update own review |
| DELETE | `/api/reviews/:reviewId` | Delete own review |

## 👑 Admin

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/users/:userId` | Get user |
| PATCH | `/api/admin/users/:userId/status` | Activate/deactivate user |
| DELETE | `/api/admin/users/:userId` | Delete user |
| GET | `/api/admin/merchants` | Get all merchants |
| GET | `/api/admin/merchants/:merchantId` | Get merchant |
| GET | `/api/admin/orders` | Get all orders |
| GET | `/api/admin/orders/:orderId` | Get order |

---

## 🔐 Authentication & Authorization

Protected endpoints require:

```text
Authorization: Bearer <access-token>
```

Role-based authorization restricts operations according to the authenticated user's role.

Refresh tokens are stored using HTTP-only cookies.

---

## 🧱 Project Structure

```text
src/
├── config/
├── features/
│   ├── admin/
│   ├── carts/
│   ├── merchant/
│   ├── orders/
│   ├── payments/
│   ├── products/
│   ├── reviews/
│   └── user/
├── middleware/
└── utils/
```

Each feature follows the existing feature-based structure with models, services, controllers, routes, and validation where required.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root and configure the environment variables required by the application.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

Configure the email/OAuth credentials required by the Nodemailer Gmail OAuth2 setup as well.

> Never commit `.env` or expose secret credentials publicly.

---

## 💻 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Greycode009/E-commerce-API.git
```

### 2. Navigate into the project

```bash
cd E-commerce-API
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file and add the required configuration.

### 5. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

---

## 🧪 Testing

The API was tested using Postman.

Testing covered:

- Authentication and authorization
- User management
- Merchant operations
- Product CRUD
- Product search and filtering
- Pagination and sorting
- Cart operations
- Order creation and cancellation
- Stock management
- Payment flow
- Reviews and ratings
- Admin operations
- Ownership and role-based security
- Validation and edge cases

---

## 👑 Admin Login

Admin accounts are created directly in the database and cannot be registered publicly.

Example:

```json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

Do not store real admin credentials in this README.

---

## 📁 Repository

https://github.com/Greycode009/E-commerce-API

---

## 🚀 Live API

Coming soon — deployment will be added after production setup is completed.

---

## 📖 API Documentation

Detailed API documentation will be added as part of the final production setup.

---

## 📌 Project Status

**Development completed — preparing for production deployment.**
