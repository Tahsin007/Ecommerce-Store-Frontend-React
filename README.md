# Ecommerce Frontend

This is the frontend for a modern Ecommerce application built with React, Vite, and TypeScript.

## Features

*   **User Authentication:** Secure login, registration, and password management.
*   **Product Catalog:** View and filter products by category.
*   **Product Details:** View detailed information for each product.
*   **Shopping Cart:** Add and remove products from the cart.
*   **Checkout:** Secure checkout process.
*   **User Profile:** View and update user information.
*   **Admin Dashboard:** Manage products, orders, and users.
*   **Responsive Design:** The application is optimized for all screen sizes.

## Folder Structure

```
ecommerce_frontend/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   └── vite.svg
└── src/
    ├── App.css
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── api/
    │   ├── axios.config.ts
    │   ├── interceptors.ts
    │   └── endpoints/
    │       ├── auth.api.ts
    │       ├── product.api.ts
    │       └── user.api.ts
    ├── assets/
    │   └── react.svg
    ├── components/
    │   ├── common/
    │   │   ├── Button/
    │   │   ├── Card/
    │   │   ├── ErrorMessage/
    │   │   ├── Input/
    │   │   ├── Loader/
    │   │   └── Modal/
    │   ├── features/
    │   │   ├── auth/
    │   │   ├── product/
    │   │   └── user/
    │   └── layout/
    │       ├── Footer/
    │       ├── Header/
    │       └── Layout/
    ├── hooks/
    │   ├── useAuth.ts
    │   ├── useLocalStorage.ts
    │   └── useProducts.ts
    ├── pages/
    │   ├── AdminDashboardPage.tsx
    │   ├── ForgotPasswordPage.tsx
    │   ├── HomePage.tsx
    │   ├── LoginPage.tsx
    │   ├── NotFoundPage.tsx
    │   ├── ProductForm.tsx
    │   ├── ProductPage.tsx
    │   ├── ResetPasswordPage.tsx
    │   ├── SettingsPage.tsx
    │   ├── SignupPage.tsx
    │   └── VerifyEmailPage.tsx
    ├── routes/
    │   ├── AdminRoute.tsx
    │   ├── AppRouter.tsx
    │   ├── ProtectedRoutes.tsx
    │   └── PublicRoute.tsx
    ├── store/
    │   ├── hooks.ts
    │   ├── index.ts
    │   └── slices/
    │       ├── authSlice.ts
    │       ├── uiSlice.ts
    │       └── userSlice.ts
    ├── types/
    │   ├── auth.types.ts
    │   ├── common.types.ts
    │   ├── product.types.ts
    │   └── user.types.ts
    └── utils/
        ├── constants.ts
        ├── formatters.ts
        ├── storage.ts
        └── validation.ts
```

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool and development server.
*   **TypeScript:** A typed superset of JavaScript.
*   **React Router:** For routing and navigation.
*   **Redux Toolkit:** For state management.
*   **React Query:** For data fetching and caching.
*   **Axios:** For making HTTP requests.
*   **ESLint:** For code linting.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ecommerce_frontend.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd ecommerce_frontend
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
5.  Open your browser and visit `http://localhost:5173` to see the application.

## Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm run lint`: Lints the code.
*   `npm run preview`: Starts a local server to preview the production build.