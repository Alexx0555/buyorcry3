# 💸 BuyOrCry3

**BuyOrCry3** is a sleek, full-stack e‑commerce web application designed for a seamless shopping experience. Built with modern technologies, it features a responsive frontend, robust backend, and secure **Stripe-powered** payment integration.

---

## 🚀 Features

- 🛍️ **Product Management** – Browse and search a catalog of products
- 🛒 **Shopping Cart** – Add, update, and remove items with real-time cart totals
- 🔐 **User Authentication** – Secure signup/login with encrypted passwords and JWT
- 💳 **Stripe Payment Integration** – Complete orders with secure online payments
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop
- 🧱 **Modular Architecture** – Separated frontend and backend structure
- 🐳 **Docker Support (Optional)** – For easy containerized deployment

---

🌐**Live URLs:**

* **User Frontend:** 🛍️ https://buyorcry3.onrender.com
* **Backend URL:** ⚙️ https://bbuyorcry3.onrender.com

---


## 🛠️ Tech Stack

| Layer        | Technologies                         |
|--------------|--------------------------------------|
| Frontend     | HTML5, CSS3, JavaScript              |
| Backend      | Node.js, Express.js                  |
| Database     | MongoDB                              |
| Authentication | JWT, bcrypt                        |
| Payments     | Stripe API                           |
| Styling      | Custom CSS                           |
| Deployment   | Render                               |

---

## 📋 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- [Stripe Account](https://stripe.com/) (for API keys)
- *(Optional)* [Docker](https://www.docker.com/)

---

## 💻 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Alexx0555/buyorcry3.git
cd buyorcry3
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `backend/` directory:

```env
# backend/.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/buyorcry
JWT_SECRET=your_super_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

> ⚠️ Replace `your_stripe_secret_key` with the actual key from your Stripe dashboard.

### 4. Start the development servers

```bash
# Run backend
cd backend
npm run dev

# Run frontend (in a separate terminal)
cd frontend
npm start
```

### 5. Open in browser

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Testing

Testing features are not yet implemented but planned for future versions.

Suggested frameworks:

- Unit: Jest / Mocha
- Integration: Supertest
- UI: Cypress

---

## 🛳️ Deployment

### 🔧 Deploying with Docker (optional)

Create `Dockerfile` for backend:

```dockerfile
# backend/Dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 5000
```

Create `docker-compose.yml` (for frontend and backend):

```yaml
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    env_file:
      - ./backend/.env
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
```

Then run:

```bash
docker-compose up --build
```

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

Happy coding, happy shopping – or cry trying! 😅
