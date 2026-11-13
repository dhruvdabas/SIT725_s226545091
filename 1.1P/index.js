// SIT725 - 1.1P Introduction to Programming
// Basic JavaScript concepts run with Node.js: variables, functions,
// conditionals, loops, arrays, objects and a small calculator.

// 1. Variables and data types
const unitCode = "SIT725";
const unitName = "Applied Software Engineering";
let week = 1;
const isEnrolled = true;

console.log("=== 1. Variables ===");
console.log(`Welcome to ${unitCode} - ${unitName}`);
console.log(`Week: ${week}, Enrolled: ${isEnrolled}`);
console.log(`typeof unitCode: ${typeof unitCode}, typeof week: ${typeof week}`);

// 2. Functions
function greet(name) {
  return `Hello, ${name}! Ready to start ${unitCode}?`;
}
const square = (n) => n * n;

console.log("\n=== 2. Functions ===");
console.log(greet("Student"));
console.log(`square(7) = ${square(7)}`);

// 3. Conditionals
function gradeFor(mark) {
  if (mark >= 80) return "HD";
  if (mark >= 70) return "D";
  if (mark >= 60) return "C";
  if (mark >= 50) return "P";
  return "N";
}

console.log("\n=== 3. Conditionals ===");
[95, 74, 63, 51, 40].forEach((m) => console.log(`Mark ${m} -> ${gradeFor(m)}`));

// 4. Loops
console.log("\n=== 4. Loops ===");
for (let i = 1; i <= 5; i++) {
  console.log(`for loop iteration ${i}`);
}
let countdown = 3;
while (countdown > 0) {
  console.log(`while countdown: ${countdown}`);
  countdown--;
}

// 5. Arrays
const techStack = ["JavaScript", "Node.js", "HTML", "CSS", "Materialize", "Git", "GitHub"];

console.log("\n=== 5. Arrays ===");
console.log(`Tech stack (${techStack.length} items): ${techStack.join(", ")}`);
console.log(`Uppercase: ${techStack.map((t) => t.toUpperCase()).join(", ")}`);
console.log(`Starts with 'G': ${techStack.filter((t) => t.startsWith("G")).join(", ")}`);

// 6. Objects
const student = {
  name: "Student",
  unit: unitCode,
  skills: ["JavaScript", "Git"],
  describe() {
    return `${this.name} is studying ${this.unit} and knows ${this.skills.join(" and ")}.`;
  },
};

console.log("\n=== 6. Objects ===");
console.log(student.describe());
console.log(`Keys: ${Object.keys(student).join(", ")}`);

// 7. Mini calculator
function calculate(a, operator, b) {
  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? "Error: divide by zero" : a / b;
    default: return `Error: unknown operator ${operator}`;
  }
}

console.log("\n=== 7. Calculator ===");
[[10, "+", 5], [10, "-", 5], [10, "*", 5], [10, "/", 5], [10, "/", 0]].forEach(([a, op, b]) =>
  console.log(`${a} ${op} ${b} = ${calculate(a, op, b)}`)
);

// 8. Sum of an array with reduce
const marks = [72, 85, 64, 90];
const average = marks.reduce((sum, m) => sum + m, 0) / marks.length;

console.log("\n=== 8. Reduce ===");
console.log(`Marks: ${marks.join(", ")} | Average: ${average.toFixed(2)} (${gradeFor(average)})`);

console.log("\nProgram finished successfully.");
