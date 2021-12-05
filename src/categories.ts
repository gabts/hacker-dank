export interface CategoryTask {
  name: string;
  description: string;
  initialCode: string;
  check: {
    exec: string;
    expectedOutput: undefined | null | number | boolean;
  }[];
}

export interface Category {
  name: string;
  tasks: CategoryTask[];
}

export const categories: Category[] = [
  {
    name: "Basic Math",
    tasks: [
      {
        name: "Addition",
        description: "Return the sum of two numbers.",
        initialCode: "function add(n1, n2) {\n  // TODO\n}",
        check: [
          { exec: "add(1, 1)", expectedOutput: 2 },
          { exec: "add(10, 0)", expectedOutput: 10 },
          { exec: "add(5, 7)", expectedOutput: 12 },
        ],
      },
      {
        name: "Subtraction",
        description: "Return the difference of two numbers.",
        initialCode: "function subtract(n1, n2) {\n  // TODO\n}",
        check: [
          { exec: "subtract(1, 1)", expectedOutput: 0 },
          { exec: "subtract(3, 5)", expectedOutput: -2 },
          { exec: "subtract(12, 7)", expectedOutput: 5 },
        ],
      },
      {
        name: "Multiplication",
        description: "Return the product of two numbers.",
        initialCode: "function multiply(n1, n2) {\n  // TODO\n}",
        check: [
          { exec: "multiply(1, 1)", expectedOutput: 1 },
          { exec: "multiply(4, 6)", expectedOutput: 24 },
          { exec: "multiply(18, 3)", expectedOutput: 54 },
        ],
      },
    ],
  },
  {
    name: "Random",
    tasks: [
      {
        name: "Test",
        description: "This is some random test...",
        initialCode: "function test() {\n  // TODO\n}",
        check: [],
      },
    ],
  },
];
