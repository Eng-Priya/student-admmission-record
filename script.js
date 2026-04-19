// Auth check
if (!localStorage.getItem("auth")) {
  window.location.href = "index.html";
}

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

// Navigation
function showPage(page) {
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("add").style.display = "none";
  document.getElementById(page).style.display = "block";
}

// Add / Edit
function addStudent(e) {
  e.preventDefault();

  let student = {
    name: name.value,
    email: email.value,
    marks: marks.value,
    status: status.value
  };

  if (editIndex === -1) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = -1;
  }

  localStorage.setItem("students", JSON.stringify(students));

  e.target.reset();
  showPage("dashboard");
  display();
}

// Display
function display(data = students) {
  let html = "";
  let admitted=0, pending=0, rejected=0;

  data.forEach((s,i) => {

    if(s.status==="Admitted") admitted++;
    if(s.status==="Pending") pending++;
    if(s.status==="Rejected") rejected++;

    html += `
      <tr>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.marks}</td>
        <td>${s.status}</td>
        <td>
          <button onclick="editStudent(${i})">Edit</button>
          <button onclick="deleteStudent(${i})">Delete</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("list").innerHTML = html;
  document.getElementById("total").innerText = students.length;
  document.getElementById("admitted").innerText = admitted;
  document.getElementById("pending").innerText = pending;
  document.getElementById("rejected").innerText = rejected;
}

// Edit
function editStudent(i) {
  let s = students[i];

  name.value = s.name;
  email.value = s.email;
  marks.value = s.marks;
  status.value = s.status;

  editIndex = i;
  showPage("add");
}

// Delete
function deleteStudent(i) {
  students.splice(i,1);
  localStorage.setItem("students", JSON.stringify(students));
  display();
}

// Search
function search(val) {
  let filtered = students.filter(s =>
    s.name.toLowerCase().includes(val.toLowerCase())
  );
  display(filtered);
}

// Logout
function logout() {
  localStorage.removeItem("auth");
  window.location.href = "index.html";
}

// Init
display();