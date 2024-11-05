const fs = require("fs");

fs.readFile("asal_sayi.txt", "utf8", (err, data) => {
  if (err) throw err;

  const primesFromFile = data.split(",").map(Number);
  const allNumbers = [];

  for (let i = 1; i < 90; i++) {
    if (primesFromFile.includes(i)) {
      allNumbers.push(i + " (asal)");
    } else {
      allNumbers.push(i);
    }
  }

  fs.writeFile("tum_sayilar.txt", allNumbers.join(", "), (err) => {
    if (err) throw err;
    console.log(
      "1'den 89'a kadar tüm sayılar başarıyla tum_sayilar.txt dosyasına kaydedildi."
    );
  });
});
