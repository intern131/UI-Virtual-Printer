// Mock user data
let users = [];

// Mock print jobs data
const printJobs = [
    { date: '2024-01-20', time: '10:30 AM', fileName: 'document1.pdf', progress: '100%', status: 'completed' },
    { date: '2024-01-20', time: '11:45 AM', fileName: 'image1.jpg', progress: '65%', status: 'converting' },
    { date: '2024-01-20', time: '12:15 PM', fileName: 'document2.docx', progress: '0%', status: 'error' }
];

// Form toggle function
function toggleForms(formToShow) {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById(formToShow).classList.remove('hidden');
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    users.push({ name, email, password });
    alert('Signup successful! Please login.');
    toggleForms('loginForm');
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        showDashboard();
    } else {
        alert('Invalid credentials!');
    }
}

// Update date and time
function updateDateTime() {
    const dateElement = document.getElementById('currentDate');
    const timeElement = document.getElementById('currentTime');
    
    const now = new Date();
    
    // Format date
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
    
    // Format time
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    timeElement.textContent = now.toLocaleTimeString('en-US', timeOptions);
}

// Show dashboard
function showDashboard() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    populateTable();
    
    // Initial update
    updateDateTime();
    // Update every second
    setInterval(updateDateTime, 1000);
}

// Logout function
function logout() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
}

// Populate table with print jobs
function populateTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    printJobs.forEach(job => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${job.date}</td>
            <td>${job.time}</td>
            <td>${job.fileName}</td>
            <td>${job.progress}</td>
            <td><span class="status ${job.status}">${job.status}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

// Password visibility toggle function
function togglePassword(inputId, icon) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}