const fs = require("fs");

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const primeNumbers = [];
for (let i = 2; i <= 100; i++) {
  if (isPrime(i)) {
    primeNumbers.push(i);
  }
}

fs.writeFile("asal.txt", primeNumbers.join(", "), (err) => {
  if (err) throw err;
  console.log(
    "1 ile 100 arasındaki asal sayılar başarıyla asal.txt dosyasına yazıldı."
  );
});
