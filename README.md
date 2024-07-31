# Prit Banking System

Prit Banking System is a web application developed using Next.js that allows users to manage their bank accounts. Users can connect their accounts using Plaid, view transactions, make ACH transactions via Stripe and Dwolla, and view balance and account details.

## Features

- **Plaid Integration**: Connect your bank accounts securely using Plaid to view your transactions, balance, and account details.
- **Stripe Transactions**: Make ACH transactions using Stripe.
- **Dwolla Transactions**: Make ACH transactions using Dwolla.
- **User Authentication**: Sign up and sign in functionality to secure user data.
- **Responsive Design**: Mobile-friendly user interface.

## 🛠️ Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form with Zod for validation
- **Charts**: Chart.js with React integration
- **Notifications**: React Toastify
- **Authentication**: JSON Web Tokens (JWT)
- **Database**: MongoDB with Mongoose
- **API Clients**: Plaid, Stripe, Dwolla

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

## 🚀 Getting Started

To get started with this project locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/pritammajumder16/prit-banking-system.git
   cd prit-banking-systems
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Setup Environments

Check the .env.example file

### Usage

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## 📜 Scripts

- `npm run dev`: Starts the development server on port 3000.
- `npm run build`: Builds the project for production.
- `npm run preview`: Previews the production build.
- `npm run lint`: Lints the codebase with ESLint.

## 🌐 Deployment

The project is deployed and can be accessed at:

[https://prit-banking-system.vercel.app/](https://prit-banking-system.vercel.app/)

## 📧 Contact

For any questions or feedback, please reach out to:

- **Email**: [pritammajumder416@gmail.com](mailto:pritammajumder416@gmail.com)
- **GitHub**: [github.com/pritammajumder16](https://github.com/pritammajumder16)

## 📜 License

This project is licensed under the MIT License.
