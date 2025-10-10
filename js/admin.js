document.addEventListener('DOMContentLoaded', function() {
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('loginError');
    const submissionsLoading = document.getElementById('submissionsLoading');
    const submissionsError = document.getElementById('submissionsError');
    const submissionsList = document.getElementById('submissionsList');
    
    // Static password for admin access
    const ADMIN_PASSWORD = "chemloxadmin@345";
    
    // Check if user is already logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (isLoggedIn) {
        showDashboard();
        loadSubmissions();
    }
    
    // Login button click handler
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const password = passwordInput.value.trim();
            
            if (password === ADMIN_PASSWORD) {
                // Set login status in session storage
                sessionStorage.setItem('adminLoggedIn', 'true');
                showDashboard();
                loadSubmissions();
            } else {
                loginError.textContent = 'Invalid password. Please try again.';
            }
        });
    }
    
    // Logout button click handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear login status
            sessionStorage.removeItem('adminLoggedIn');
            showLogin();
        });
    }
    
    // Function to show dashboard and hide login
    function showDashboard() {
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
    }
    
    // Function to show login and hide dashboard
    function showLogin() {
        dashboardSection.style.display = 'none';
        loginSection.style.display = 'flex';
    }
    
    // Function to load submissions from Firestore
    function loadSubmissions() {
        submissionsLoading.style.display = 'block';
        submissionsError.style.display = 'none';
        submissionsList.innerHTML = '';
        
        // Get submissions from Firestore
        db.collection("contactSubmissions")
            .orderBy("timestamp", "desc")
            .get()
            .then(function(querySnapshot) {
                if (querySnapshot.empty) {
                    submissionsList.innerHTML = '<p>No submissions found.</p>';
                } else {
                    querySnapshot.forEach(function(doc) {
                        const data = doc.data();
                        const submission = {
                            id: doc.id,
                            ...data,
                            timestamp: data.timestamp.toDate()
                        };
                        const submissionCard = createSubmissionCard(submission);
                        submissionsList.appendChild(submissionCard);
                    });
                }
                submissionsLoading.style.display = 'none';
            })
            .catch(function(error) {
                console.error('Error loading submissions:', error);
                submissionsError.textContent = 'Failed to load submissions. Please try again later.';
                submissionsError.style.display = 'block';
                submissionsLoading.style.display = 'none';
            });
    }
    
    // Function to create a submission card element
    function createSubmissionCard(submission) {
        const card = document.createElement('div');
        card.className = 'submission-card';
        
        // Format date
        const date = new Date(submission.timestamp);
        const formattedDate = date.toLocaleString();
        
        card.innerHTML = `
            <div class="submission-header">
                <h3>${submission.subject}</h3>
                <span class="submission-date">${formattedDate}</span>
            </div>
            <div class="submission-content">
                <div class="submission-field">
                    <strong>Name:</strong>
                    <span>${submission.name}</span>
                </div>
                <div class="submission-field">
                    <strong>Email:</strong>
                    <span>${submission.email}</span>
                </div>
                <div class="submission-field">
                    <strong>Phone:</strong>
                    <span>${submission.phone || 'Not provided'}</span>
                </div>
                <div class="submission-field submission-message">
                    <strong>Message:</strong>
                    <p>${submission.message}</p>
                </div>
            </div>
        `;
        
        return card;
    }
});