//user data//
let users = [];

// here we hve print jobs data
const printJobs = [
    { date: '2024-01-20', time: '10:30 AM', fileName: 'document1.pdf', status: 'completed' },
    { date: '2024-01-20', time: '11:45 AM', fileName: 'image1.jpg', status: 'converting' },
    { date: '2024-01-20', time: '12:15 PM', fileName: 'document2.docx', status: 'error' },
    { date: '2024-01-21', time: '09:30 AM', fileName: 'report.pdf', status: 'completed' },
    { date: '2024-01-22', time: '14:20 PM', fileName: 'presentation.pptx', status: 'converting' }
];

 
function toggleForms(formToShow) {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById(formToShow).classList.remove('hidden');
}

// Here we handle  signup
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    users.push({ name, email, password });
    alert('Signup successful! Please login.');
    toggleForms('loginForm');
}

// Here we handle login
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
    
    // Format date with day name
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
    
    // Format time with seconds
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    timeElement.textContent = now.toLocaleTimeString('en-US', timeOptions);
}

// Show dashboard
function showDashboard() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    populateTable();
    
    // update for immediate display
    updateDateTime();
    // Update every second
    const timeInterval = setInterval(updateDateTime, 1000);
    // Store interval ID
    window.timeUpdateInterval = timeInterval;
}

// Logout function
function logout() {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    // Clear the interval when logging out
    if (window.timeUpdateInterval) {
        clearInterval(window.timeUpdateInterval);
    }
}

// table with print jobs
function populateTable(filterDate = '') {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const filteredJobs = filterDate 
        ? printJobs.filter(job => job.date === filterDate)
        : printJobs;

    filteredJobs.forEach(job => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${job.date}</td>
            <td>${job.time}</td>
            <td>${job.fileName}</td>
            <td><span class="status ${job.status}">${job.status}</span></td>
        `;
        tableBody.appendChild(row);
    });

    // Update dashboard cards
    updateDashboardCounts(filteredJobs);
}

 
function handleDateFilter() {
    const dateFilter = document.getElementById('dateFilter').value;
    // Convert the date to match our format (YYYY-MM-DD)
    const formattedDate = dateFilter ? new Date(dateFilter).toISOString().split('T')[0] : '';
    populateTable(formattedDate);
}

// Update dashboard counts based on filtered data
function updateDashboardCounts(jobs) {
    document.getElementById('totalDocs').textContent = jobs.length;
    document.getElementById('totalImages').textContent = jobs.filter(job => job.fileName.match(/\.(jpg|jpeg|png|gif)$/i)).length;
    document.getElementById('totalUploads').textContent = jobs.filter(job => job.status === 'completed').length;
    document.getElementById('totalPending').textContent = jobs.filter(job => job.status === 'converting').length;
}

// Password visibility Add here//
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
