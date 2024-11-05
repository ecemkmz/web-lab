require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("MySQL bağlantısı başarıyla gerçekleştirildi.");

  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS employees (
      EmployeesID INT AUTO_INCREMENT PRIMARY KEY,
      FirstName VARCHAR(50),
      LastName VARCHAR(50),
      DepartmentName VARCHAR(50)
  )`;

  connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("employees tablosu başarıyla oluşturuldu.");

    const checkIfEmptyQuery = `SELECT COUNT(*) AS count FROM employees`;
    connection.query(checkIfEmptyQuery, (err, results) => {
      if (err) throw err;

      if (results[0].count === 0) {
        const insertQuery = `
        INSERT INTO employees (FirstName, LastName, DepartmentName)
        VALUES 
        ('Ken', 'Sanchez', 'Executive'),
        ('Terri', 'Duffy', 'Engineering'),
        ('Roberto', 'Tamburello', 'Engineering'),
        ('Rob', 'Walters', 'Engineering'),
        ('Gail', 'Erickson', 'Engineering'),
        ('Josef', 'Goldberg', 'Engineering'),
        ('Dylan', 'Miller', 'Support'),
        ('Diane', 'Margheim', 'Support'),
        ('Gigi', 'Matthew', 'Support'),
        ('Michael', 'Raheem', 'Support')
        `;

        connection.query(insertQuery, (err, result) => {
          if (err) throw err;
          console.log("Tüm veriler başarıyla eklendi.");
          handleEmployeeOperations();
        });
      } else {
        console.log("Tablo zaten dolu, veri eklenmedi.");
        handleEmployeeOperations();
      }
    });
  });
});

function handleEmployeeOperations() {
  const selectQuery = `SELECT * FROM employees WHERE DepartmentName = 'Engineering'`;
  connection.query(selectQuery, (err, results) => {
    if (err) throw err;
    console.log("Engineering bölümündeki çalışanlar:", results);
    const updateQuery = `
      UPDATE employees
      SET DepartmentName = 'Executive'
      WHERE FirstName = 'Terri'`;
    connection.query(updateQuery, (err, result) => {
      if (err) throw err;
      console.log("Terri'nin departmanı başarıyla güncellendi.");
      connection.end((err) => {
        if (err) throw err;
        console.log("MySQL bağlantısı başarıyla kapatıldı.");
      });
    });
  });
}
