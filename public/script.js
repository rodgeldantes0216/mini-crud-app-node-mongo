const API_URL = '/api/users';
const tableBody = document.querySelector('#userTable tbody');
const form = document.getElementById('userForm');
const firstNameInput = document.getElementById('first_name');
const lastNameInput = document.getElementById('last_name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

let editingUserId = null;

// Fetch and display users
async function loadUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();
  tableBody.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.first_name}</td>
      <td>${user.last_name}</td>
      <td>${user.email}</td>
      <td>${new Date(user.created_at).toLocaleString()}</td>
      <td>
        <button onclick="editUser('${user._id}', '${user.first_name}', '${user.last_name}', '${user.email}')">Update</button>
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
    first_name: firstNameInput.value,
    last_name: lastNameInput.value,
    email: emailInput.value,
    password: passwordInput.value // plain here, hash it in backend
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

// Edit user (we don't update password from here)
function editUser(id, first_name, last_name, email) {
  editingUserId = id;
  firstNameInput.value = first_name;
  lastNameInput.value = last_name;
  emailInput.value = email;
  passwordInput.value = '';
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
