# 🪙 Optimal Exchange Test

A React-based web application for testing and visualizing optimal coin exchange coding challenge

## 🌐 Live Demo

**Try it online:** [https://optimal-exchange-test.netlify.app/](https://optimal-exchange-test.netlify.app/)

## 📋 Problem Description

### The Optimal Exchange Problem

The Exchange of currency of a random country has 'k' number of denominations. For each denomination, there is a coin.

When a transaction happens with a cashier to pay an amount 'X', you give exactly or some amount greater than 'X' (let's say 'Y') to the cashier. The cashier then pays back the extra amount (Y-X) back to you. Both parties try to minimize the number of coins exchanged in the process.

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── forms/           # Form-related components
│   │   ├── BatchInputForm.tsx      # Main input form
│   │   └── ValidationMessage.tsx   # Validation feedback
│   └── sections/        # Page sections
│       └── ResultsSection.tsx      # Results display & stats
├── hooks/               # Custom React hooks
│   ├── useTestProcessor.ts         # Test case processing logic
│   └── useValidation.ts           # Input validation logic
├── types/               # TypeScript type definitions
│   └── optimalExchange.ts         # Core type definitions
├── utils/               # Utility functions & algorithms
│   ├── coinExchange.ts            # Core algorithm implementation
│   ├── testProcessing.ts          # Test case parsing & formatting
│   └── index.ts                   # Utility exports
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles (Tailwind + DaisyUI)
```

## 📊 Input Format

```
3                          # Number of test cases
100 6 1 2 5 10 20 50      # N=100, K=6, denominations=[1,2,5,10,20,50]
100 6 1 3 10 15 51 84     # N=100, K=6, denominations=[1,3,10,15,51,84]
100 6 1 4 9 16 25 36      # N=100, K=6, denominations=[1,4,9,16,25,36]
```

**Format Rules:**

- First line: Number of test cases
- Each case: `N K [K denominations]`
- N: Range [1, N] to test (max 100)
- K: Number of denominations (max 10)
- Denominations: Positive unique integers

## 📈 Expected Output

```
2.96 5    # Average: 2.96 coins, Maximum: 5 coins
2.56 3    # Average: 2.56 coins, Maximum: 3 coins
2.85 5    # Average: 2.85 coins, Maximum: 5 coins
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.13 + DaisyUI 5.1.7
- **Development**: ESLint with TypeScript support
- **Deployment**: Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/JD154/optimal-exchange-test.git

# Navigate to project directory
cd optimal-exchange-test

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
