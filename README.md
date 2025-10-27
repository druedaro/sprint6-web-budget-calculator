# Budget Calculator

A modern React application for creating professional budget estimates for digital marketing and web development projects.

![Budget Calculator Preview](https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop)

---

## Table of Contents

- [Background](#background)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Testing](#testing)

---

## Background

This project was born from the need to quickly and reliably generate professional budget estimates for web and marketing services. The main goal is to explore and practice not only React itself, but also related technologies that are essential in modern React development, such as React Router for navigation, React Hook Form for form management, and Zod for schema validation.

The philosophy behind this app is:

- **Explore the React ecosystem:** Go beyond the basics of React and get hands-on experience with its most useful libraries and patterns.
- **Deepen understanding of React:** Focus on component architecture, hooks, state management, and best practices for building scalable apps.
- **Separation of concerns:** All static data, configuration, and types are centralized for easy maintenance.
- **Developer experience:** The stack and structure are chosen to maximize productivity and code quality.

---

## Features

- ✅ Service selection with dynamic pricing
- ✅ Web development configuration (pages & languages)
- ✅ Annual payment discount (20% off)
- ✅ Budget creation and management
- ✅ Search and sort functionality
- ✅ URL parameter synchronization
- ✅ Local storage persistence
- ✅ Responsive design with Tailwind CSS
- ✅ Full TypeScript support
- ✅ Comprehensive testing

---

## Tech Stack

- ⚛️ **React 19** with hooks
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 🧭 **React Router** for navigation
- 📋 **React Hook Form** for form state management
- ✅ **Zod** for schema validation
- 🧪 **Jest** for testing
- ⚡ **Vite** for build tooling

---

## Project Structure

```
src/
├── App.tsx
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── IconButton.tsx
│   │   ├── Input.tsx
│   │   └── Toggle.tsx
│   ├── molecules/
│   │   ├── HelpModal.tsx
│   │   ├── NumberInput.tsx
│   │   └── SearchBar.tsx
│   └── organisms/
│       ├── BudgetForm.tsx
│       ├── BudgetList.tsx
│       ├── ServicesList.tsx
│       └── WebConfigurationPanel.tsx
├── config/
│   ├── appData.ts
│   ├── budgetFormValidation.ts
│   └── types.ts
├── hooks/
│   ├── useEffectBudgetStorage.ts
│   ├── useEffectScrollToTop.ts
│   ├── useEffectUrlSync.ts
│   └── useStateCalculator.ts
├── index.css
├── main.tsx
├── pages/
│   ├── CalculatorPage.tsx
│   └── WelcomePage.tsx
├── routes/
│   └── paths.ts
├── services/
│   ├── budgetService.ts
│   └── tests/
│       ├── __mocks__/
│       │   └── testFixtures.ts
│       └── budgetService.moscow.test.ts
├── setupTests.ts
└── utils/
    └── formatters.ts
```

---

## Getting Started

### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/druedaro/sprint6-web-budget-calculator.git

# Navigate to the project directory
cd sprint6-web-budget-calculator
```

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

## Testing

The project features a comprehensive testing strategy focused on business logic validation:

### Testing Methodology
- **MoSCoW Method**: Business-critical functions are tested using MoSCoW prioritization (Must have, Should have, Could have, Won't have)

### Test Categories
- **Business Logic**: Budget calculations, pricing algorithms, currency formatting
- **Customer Scenarios**: Real-world usage patterns and edge cases
- **Component Integration**: Form validation, state management, user interactions
- **Utility Functions**: Helper functions and data transformations

Run tests with `npm test` or `npm run test:watch` for watch mode.

All tests focus on protecting revenue-critical calculations and ensuring reliable customer experience.

---
