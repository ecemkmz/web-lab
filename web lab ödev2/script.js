function fetchStudents() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var xmlDoc = this.responseXML;
      window.studentData = xmlDoc;
      displayStudents(xmlDoc);
    }
  };
  xhttp.open("GET", "students.xml", true);
  xhttp.send();
}

function displayStudents(xml) {
  const students = xml.getElementsByTagName("student");
  let table = "";

  for (let i = 0; i < students.length; i++) {
    const number = getNodeValue(students[i], "number");
    const name = getNodeValue(students[i], "name");
    table += `<tr onclick="showDetails(${i})">
                <td>${number}</td>
                <td>${name}</td>
              </tr>`;
  }
  document.getElementById("student-list").innerHTML = table;
}

function showDetails(index) {
  const students = window.studentData.getElementsByTagName("student");
  const student = students[index];

  const number = getNodeValue(student, "number");
  const name = getNodeValue(student, "name");
  const department = getNodeValue(student, "department");
  const classLevel = getNodeValue(student, "class");

  const details = `
  <strong>Numara:</strong> <span>${number}</span><br>
  <strong>Ad Soyad:</strong> <span>${name}</span><br>
  <strong>Bölüm:</strong> <span>${department}</span><br>
  <strong>Sınıf:</strong> <span>${classLevel}</span>`;

  const studentDetailsDiv = document.getElementById("student-details");
  studentDetailsDiv.innerHTML = details;
  studentDetailsDiv.style.opacity = 0;
  setTimeout(() => {
    studentDetailsDiv.style.transition = "opacity 0.5s ease-in-out";
    studentDetailsDiv.style.opacity = 1;
  }, 100);
}

function getNodeValue(parent, tagName) {
  const node = parent.getElementsByTagName(tagName)[0];
  return node && node.textContent ? node.textContent : "Bilinmiyor";
}

window.onload = function () {
  fetchStudents();
  document.getElementById("main-container").style.display = "block";
};

function searchStudent() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("student-list");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
