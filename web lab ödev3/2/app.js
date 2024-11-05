const fs = require("fs");

fs.readFile("quiz6.txt", "utf8", (err, data) => {
  if (err) throw err;

  const values = data.split("\n");

  values.forEach((value, index) => {
    let [x, a, b, c] = value.split(",").map(Number);
    let A = a * x ** 2 + b * x + c;

    console.log(`Satır ${index + 1} için polinomun değeri:`, A);
  });
});
