const fs = require("fs");

fs.readFile("quiz6.txt", "utf8", (err, data) => {
  if (err) throw err;

  const lines = data.split("\n");

  lines.forEach((line, index) => {
    let [x, a, b, c] = line.split(",").map(Number);
    let A = a * x ** 2 + b * x + c;

    console.log(`Satır ${index + 1} için polinomun değeri:`, A);
  });
});
