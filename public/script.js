const API_URL = '/api/users';
const tableBody = document.querySelector('#userTable tbody');
const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');

let editingUserId = null;

// Fetch and display users
async function loadUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();
  tableBody.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td>
        <button onclick="editUser('${user._id}', '${user.name}', '${user.email}', ${user.age})">Update</button>
        <button onclick="deleteUser('${user._id}')">Remove</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Add or update user
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = {
    name: nameInput.value,
    email: emailInput.value,
    age: Number(ageInput.value),
  };

  if (editingUserId) {
    await fetch(`${API_URL}/${editingUserId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    editingUserId = null;
    form.querySelector('button').textContent = 'Add User';
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  }

  form.reset();
  loadUsers();
});

// Edit user
function editUser(id, name, email, age) {
  editingUserId = id;
  nameInput.value = name;
  emailInput.value = email;
  ageInput.value = age;
  form.querySelector('button').textContent = 'Update User';
}

// Delete user
async function deleteUser(id) {
  if (confirm('Delete this user?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadUsers();
  }
}

loadUsers();
