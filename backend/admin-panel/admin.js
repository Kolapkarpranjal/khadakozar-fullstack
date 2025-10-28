// Admin Panel JavaScript with Marathi Language Support
const API_BASE_URL = 'http://localhost:5000/api';

let currentToken = localStorage.getItem('adminToken');
let currentPage = 1;
let currentFilters = {};
let currentSection = 'dashboard';

// Form type labels in Marathi
const formTypeLabels = {
    'bandhkam-parvangi': 'बांधकाम परवानगी',
    'janm-nond-dakhla': 'जन्म नोंद दाखला',
    'mrutyu-nond-dakhla': 'मृत्यू नोंद दाखला',
    'vivah-nondani-dakhla': 'विवाह नोंदणी दाखला',
    'namuna-no08': 'नमुना क्र. ०८',
    'ferfar-nondani': 'फेरफार नोंदणी',
    'namuna-no04-kam': 'नमुना क्र. ०४ काम',
    'vyavasay-naharakat-dakhla': 'व्यवसाय ना हरकत दाखला',
    'daridrya-resha-dakhla': 'दारिद्र्य रेषा दाखला',
    'rahivashi-dakhla': 'रहिवाशी दाखला',
    'takrar-suchana': 'तक्रार सूचना'
};

// Status labels in Marathi
const statusLabels = {
    'pending': 'प्रलंबित',
    'under-review': 'तपासणी अंतर्गत',
    'completed': 'पूर्ण'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    if (currentToken) {
        showAdminPanel();
        loadStats();
        loadRecentSubmissions();
    } else {
        showLoginPage();
    }
    
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Sidebar toggle
    document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
    
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            navigateToSection(section);
        });
    });
    
    // Filter button
    document.getElementById('filterBtn').addEventListener('click', applyFilters);
    
    // Close modal
    document.getElementById('closeModal').addEventListener('click', closeSubmissionModal);
    document.getElementById('closeModalBtn').addEventListener('click', closeSubmissionModal);
    
    // Search input
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });
    
    // Event delegation for action buttons (डाउनलोड करा)
    document.body.addEventListener('click', function(e) {
        // Check if click is on button or its child elements
        const button = e.target.closest('.action-btn');
        if (button) {
            e.preventDefault();
            e.stopPropagation();
            
            const action = button.getAttribute('data-action');
            const id = button.getAttribute('data-id');
            
            console.log('🔘 Button clicked!');
            console.log('   Action:', action);
            console.log('   ID:', id);
            
            if (action === 'download') {
                console.log('🚀 Calling downloadSubmission...');
                downloadSubmission(id);
            } else {
                console.warn('⚠️ Unknown action:', action);
            }
        }
    });
}

// Show login page
function showLoginPage() {
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('adminPanel').classList.add('hidden');
}

// Show admin panel
function showAdminPanel() {
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('adminPanel').classList.remove('hidden');
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

// Navigate to section
function navigateToSection(section) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    const titles = {
        'dashboard': 'डॅशबोर्ड',
        'all-submissions': 'सर्व अर्ज',
        'bandhkam-parvangi': 'बांधकाम परवानगी',
        'janm-nond-dakhla': 'जन्म नोंद दाखला',
        'mrutyu-nond-dakhla': 'मृत्यू नोंद दाखला',
        'vivah-nondani-dakhla': 'विवाह नोंदणी दाखला',
        'namuna-no08': 'नमुना क्र. ०८',
        'ferfar-nondani': 'फेरफार नोंदणी',
        'namuna-no04-kam': 'नमुना क्र. ०४ काम',
        'vyavasay-naharakat-dakhla': 'व्यवसाय ना हरकत दाखला',
        'daridrya-resha-dakhla': 'दारिद्र्य रेषा दाखला',
        'rahivashi-dakhla': 'रहिवाशी दाखला',
        'takrar-suchana': 'तक्रार सूचना'
    };
    pageTitle.textContent = titles[section] || section;
    
    // Hide all content sections
    document.getElementById('dashboardContent').classList.add('hidden');
    document.getElementById('allSubmissionsContent').classList.add('hidden');
    document.getElementById('formSectionContent').classList.add('hidden');
    
    currentSection = section;
    
    // Show appropriate content
    if (section === 'dashboard') {
        document.getElementById('dashboardContent').classList.remove('hidden');
        loadRecentSubmissions();
    } else if (section === 'all-submissions') {
        document.getElementById('allSubmissionsContent').classList.remove('hidden');
        loadSubmissions();
    } else {
        // Form section
        document.getElementById('formSectionContent').classList.remove('hidden');
        document.getElementById('formSectionTitle').textContent = formTypeLabels[section] + ' - अर्ज';
        loadFormSectionSubmissions(section);
    }
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentToken = data.data.token;
            localStorage.setItem('adminToken', currentToken);
            
            document.getElementById('adminEmail').textContent = data.data.user.email;
            
            showAdminPanel();
            loadStats();
            loadRecentSubmissions();
        } else {
            throw new Error(data.message || 'लॉगिन अयशस्वी');
        }
    } catch (error) {
        errorDiv.textContent = error.message || 'लॉगिन अयशस्वी';
        errorDiv.classList.remove('hidden');
    }
}

// Handle logout
function handleLogout() {
    currentToken = null;
    localStorage.removeItem('adminToken');
    showLoginPage();
}

// Load statistics
async function loadStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/stats`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        
        const data = await response.json();
        
        if (data.success) {
            const stats = data.data;
            document.getElementById('totalSubmissions').textContent = stats.totalSubmissions;
            document.getElementById('pendingSubmissions').textContent = stats.pendingSubmissions;
            document.getElementById('underReviewSubmissions').textContent = stats.underReviewSubmissions;
            document.getElementById('completedSubmissions').textContent = stats.completedSubmissions;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load recent submissions for dashboard
async function loadRecentSubmissions() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/submissions?page=1&limit=5`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        
        const data = await response.json();
        
        if (data.success) {
            displaySubmissions(data.data.submissions, 'recentSubmissionsTable');
        }
    } catch (error) {
        console.error('Error loading recent submissions:', error);
    }
}

// Load submissions
async function loadSubmissions(page = 1) {
    try {
        const params = new URLSearchParams({
            page: page,
            limit: 10,
            ...currentFilters
        });
        
        const response = await fetch(`${API_BASE_URL}/admin/submissions?${params}`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        
        const data = await response.json();
        
        if (data.success) {
            displaySubmissions(data.data.submissions, 'submissionsTable');
            displayPagination(data.data.pagination, 'pagination');
            currentPage = page;
        }
    } catch (error) {
        console.error('Error loading submissions:', error);
    }
}

// Load form section submissions
async function loadFormSectionSubmissions(formType, page = 1) {
    try {
        const params = new URLSearchParams({
            page: page,
            limit: 10,
            formType: formType
        });
        
        const response = await fetch(`${API_BASE_URL}/admin/submissions?${params}`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayFormSectionSubmissions(data.data.submissions);
            displayPagination(data.data.pagination, 'formSectionPagination');
            currentPage = page;
        }
    } catch (error) {
        console.error('Error loading form section submissions:', error);
    }
}

// Display submissions in table
function displaySubmissions(submissions, tableId) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = '';
    
    submissions.forEach(submission => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div>
                    <div class="text-sm font-medium text-gray-900">${submission.applicantName}</div>
                    <div class="text-sm text-gray-500">${submission.email}</div>
                    <div class="text-sm text-gray-500">${submission.contactNumber}</div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="form-type-badge bg-blue-100 text-blue-800">
                    ${formTypeLabels[submission.formType] || submission.formType}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="status-badge status-${submission.status}">
                    ${statusLabels[submission.status] || submission.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${new Date(submission.submittedAt).toLocaleDateString('mr-IN')}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button data-action="download" data-id="${submission._id}" class="action-btn inline-flex items-center px-3 py-1.5 rounded-md bg-green-50 text-green-700 hover:bg-green-100 border border-green-200">
                    डाउनलोड करा
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Display form section submissions
function displayFormSectionSubmissions(submissions) {
    const tbody = document.getElementById('formSectionTable');
    tbody.innerHTML = '';
    
    submissions.forEach(submission => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div>
                    <div class="text-sm font-medium text-gray-900">${submission.applicantName}</div>
                    <div class="text-sm text-gray-500">${submission.email}</div>
                    <div class="text-sm text-gray-500">${submission.contactNumber}</div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="status-badge status-${submission.status}">
                    ${statusLabels[submission.status] || submission.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${new Date(submission.submittedAt).toLocaleDateString('mr-IN')}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button data-action="download" data-id="${submission._id}" class="action-btn text-green-600 hover:text-green-900">
                    डाउनलोड करा
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Display pagination
function displayPagination(pagination, containerId) {
    const paginationDiv = document.getElementById(containerId);
    paginationDiv.innerHTML = '';
    
    if (pagination.pages <= 1) return;
    
    const paginationHTML = `
        <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
                पृष्ठ ${pagination.current} दाखवत आहे ${pagination.pages} पैकी (एकूण ${pagination.total})
            </div>
            <div class="flex space-x-2">
                ${pagination.current > 1 ? `<button onclick="loadPage(${pagination.current - 1})" class="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">मागील</button>` : ''}
                ${pagination.current < pagination.pages ? `<button onclick="loadPage(${pagination.current + 1})" class="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">पुढील</button>` : ''}
            </div>
        </div>
    `;
    
    paginationDiv.innerHTML = paginationHTML;
}

// Load page
function loadPage(page) {
    if (currentSection === 'all-submissions') {
        loadSubmissions(page);
    } else if (currentSection !== 'dashboard') {
        loadFormSectionSubmissions(currentSection, page);
    }
}

// Apply filters
function applyFilters() {
    currentFilters = {
        formType: document.getElementById('formTypeFilter').value,
        status: document.getElementById('statusFilter').value,
        search: document.getElementById('searchInput').value
    };
    
    // Remove empty filters
    Object.keys(currentFilters).forEach(key => {
        if (!currentFilters[key]) {
            delete currentFilters[key];
        }
    });
    
    loadSubmissions(1);
}

// View submission details
async function viewSubmission(submissionId) {
    console.log('🔍 viewSubmission called with ID:', submissionId);
    
    // First test: Simple alert to verify function is called
    console.log('📍 Function execution started');
    
    try {
        // Open modal immediately with loading state
        const modal = document.getElementById('submissionModal');
        const detailsDiv = document.getElementById('submissionDetails');
        
        console.log('🔍 Modal element:', modal);
        console.log('🔍 Details div:', detailsDiv);
        
        if (!modal) {
            console.error('❌ Modal element not found!');
            alert('मोडल सापडला नाही! पृष्ठ रीलोड करा.');
            return;
        }
        
        if (!detailsDiv) {
            console.error('❌ Details div not found!');
            alert('Details div सापडला नाही!');
            return;
        }
        
        console.log('✅ Modal found, opening...');
        console.log('📍 Modal current display:', modal.style.display);
        console.log('📍 Modal classes:', modal.className);
        
        // Set loading content
        detailsDiv.innerHTML = '<div class="text-center py-8"><div class="text-xl">⏳ लोड होत आहे...</div></div>';
        
        // Remove hidden class and set display
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        modal.style.zIndex = '9999';
        
        console.log('📍 After opening - display:', modal.style.display);
        console.log('📍 After opening - classes:', modal.className);

        console.log('📡 Fetching submission data from:', `${API_BASE_URL}/admin/submissions/${submissionId}`);
        const response = await fetch(`${API_BASE_URL}/admin/submissions/${submissionId}`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        
        console.log('✅ Response status:', response.status);
        
        const data = await response.json();
        console.log('✅ Response data:', data);
        
        if (data.success && data.data && data.data.submission) {
            console.log('✅ Displaying submission details...');
            displaySubmissionDetails(data.data.submission);
        } else {
            console.error('❌ No submission data:', data);
            detailsDiv.innerHTML = `<div class="text-center py-8"><div class="text-red-600 text-xl">त्रुटी: ${data.message || 'रेकॉर्ड लोड होत नाही'}</div></div>`;
        }
    } catch (error) {
        console.error('❌ Error in viewSubmission:', error);
        const detailsDiv = document.getElementById('submissionDetails');
        if (detailsDiv) {
            detailsDiv.innerHTML = `
                <div class="text-center py-8">
                    <div class="text-red-600 text-lg font-medium mb-4">❌ त्रुटी आली</div>
                    <div class="text-gray-600 mb-4">अर्ज तपशील लोड करताना समस्या आली.</div>
                    <div class="text-sm text-gray-500">Submission ID: ${submissionId}</div>
                    <div class="text-sm text-gray-500">Error: ${error.message}</div>
                    <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">पृष्ठ रीलोड करा</button>
                </div>
            `;
        }
    }
}

// Download submission details as formatted HTML document
async function downloadSubmission(submissionId) {
    console.log('📥 downloadSubmission called with ID:', submissionId);
    try {
        console.log('📡 Fetching submission for download...');
        const response = await fetch(`${API_BASE_URL}/admin/submissions/${submissionId}`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });

        const data = await response.json();
        if (!data.success) {
            alert('डाउनलोड करण्यात त्रुटी');
            return;
        }

        const submission = data.data.submission;
        
        // Create formatted HTML document
        const htmlContent = `
<!DOCTYPE html>
<html lang="mr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>अर्ज तपशील - ${submission.applicantName}</title>
    <style>
        body {
            font-family: 'Noto Sans Devanagari', Arial, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background: #f9f9f9;
        }
        .document {
            background: white;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #1e40af;
            margin: 0 0 10px 0;
            font-size: 28px;
        }
        .header h2 {
            color: #374151;
            margin: 0;
            font-size: 18px;
            font-weight: normal;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            background: #eff6ff;
            padding: 10px 15px;
            font-weight: bold;
            color: #1e40af;
            border-left: 4px solid #2563eb;
            margin-bottom: 15px;
        }
        .field-row {
            display: flex;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .field-label {
            font-weight: 600;
            color: #374151;
            width: 200px;
            flex-shrink: 0;
        }
        .field-value {
            color: #1f2937;
            flex: 1;
        }
        .status-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: 500;
            font-size: 14px;
        }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-under-review { background: #dbeafe; color: #1e40af; }
        .status-completed { background: #d1fae5; color: #065f46; }
        .documents-list {
            list-style: none;
            padding: 0;
        }
        .documents-list li {
            padding: 8px;
            background: #f9fafb;
            margin-bottom: 5px;
            border-radius: 4px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
        }
        @media print {
            body { background: white; margin: 0; }
            .document { box-shadow: none; padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="document">
        <div class="header">
            <h1>खडक ओझर ग्रामपंचायत</h1>
            <h2>अर्ज तपशील</h2>
        </div>

        <div class="section">
            <div class="section-title">अर्ज प्रकार आणि स्थिती</div>
            <div class="field-row">
                <div class="field-label">अर्ज प्रकार:</div>
                <div class="field-value">${formTypeLabels[submission.formType] || submission.formType}</div>
            </div>
            <div class="field-row">
                <div class="field-label">स्थिती:</div>
                <div class="field-value">
                    <span class="status-badge status-${submission.status}">
                        ${statusLabels[submission.status] || submission.status}
                    </span>
                </div>
            </div>
            <div class="field-row">
                <div class="field-label">सबमिशन तारीख:</div>
                <div class="field-value">${new Date(submission.submittedAt).toLocaleString('mr-IN', { 
                    dateStyle: 'full', 
                    timeStyle: 'short' 
                })}</div>
            </div>
            <div class="field-row">
                <div class="field-label">अर्ज क्रमांक:</div>
                <div class="field-value">${submission._id}</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">अर्जदाराची माहिती</div>
            <div class="field-row">
                <div class="field-label">नाव:</div>
                <div class="field-value">${submission.applicantName}</div>
            </div>
            <div class="field-row">
                <div class="field-label">संपर्क क्रमांक:</div>
                <div class="field-value">${submission.contactNumber}</div>
            </div>
            <div class="field-row">
                <div class="field-label">ईमेल:</div>
                <div class="field-value">${submission.email || 'N/A'}</div>
            </div>
            <div class="field-row">
                <div class="field-label">पत्ता:</div>
                <div class="field-value">${submission.address || 'N/A'}</div>
            </div>
        </div>

        ${submission.formData && Object.keys(submission.formData).length > 0 ? `
        <div class="section">
            <div class="section-title">अर्ज तपशील</div>
            ${Object.entries(submission.formData).map(([key, value]) => `
                <div class="field-row">
                    <div class="field-label">${getFieldLabel(key)}:</div>
                    <div class="field-value">${formatFieldValue(value)}</div>
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${submission.documents && submission.documents.length > 0 ? `
        <div class="section">
            <div class="section-title">संलग्न कागदपत्रे</div>
            <ul class="documents-list">
                ${submission.documents.map(doc => `
                    <li>
                        <strong>${doc.fieldName}:</strong> ${doc.filename}
                        ${doc.size ? ` (${formatFileSize(doc.size)})` : ''}
                    </li>
                `).join('')}
            </ul>
        </div>
        ` : ''}

        <div class="footer">
            <p>या दस्तऐवजाची छपाई खडक ओझर ग्रामपंचायत प्रशासन प्रणालीद्वारे ${new Date().toLocaleDateString('mr-IN')} रोजी केली गेली</p>
            <p>कृपया ही माहिती गोपनीय ठेवा</p>
        </div>
    </div>
    
    <script>
        // Auto-print dialog on load (optional)
        // window.onload = () => window.print();
    </script>
</body>
</html>
        `;

        // Create blob and download
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `arj_${submission.applicantName.replace(/\s+/g, '_')}_${submissionId.slice(-6)}.html`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        
        console.log('✅ Download successful');
    } catch (err) {
        console.error('Download error:', err);
        alert('डाउनलोड करताना त्रुटी');
    }
}

// Display submission details
function displaySubmissionDetails(submission) {
    const detailsDiv = document.getElementById('submissionDetails');
    
    // Debug: Log the submission data to console
    console.log('Full submission data:', submission);
    
    // Format form data with better field names
    const formDataHTML = Object.entries(submission.formData || {})
        .map(([key, value]) => {
            const fieldLabel = getFieldLabel(key);
            const displayValue = formatFieldValue(value);
            return `
            <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">${fieldLabel}</label>
                    <div class="text-sm text-gray-900 bg-gray-50 p-2 rounded">${displayValue}</div>
            </div>
            `;
        }).join('');
    
    // Format documents with better display
    const documentsHTML = submission.documents && submission.documents.length > 0 
        ? submission.documents.map(doc => `
            <div class="mb-3 p-3 border border-gray-200 rounded-lg">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-sm font-medium text-gray-900">${doc.originalName}</div>
                        <div class="text-xs text-gray-500">${formatFileSize(doc.size)} • ${doc.mimetype}</div>
                    </div>
                <a href="${API_BASE_URL.replace('/api', '')}/uploads/${submission.formType}/${doc.filename}" 
                       target="_blank" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        डाउनलोड करा
                </a>
                </div>
            </div>
        `).join('')
        : '<div class="text-gray-500 text-center py-4">कोणतेही दस्तऐवज अपलोड केले नाहीत</div>';
    
    // Format processing information
    const processingInfo = submission.processedBy ? `
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">प्रक्रिया केली</label>
            <div class="text-sm text-gray-900">${submission.processedBy.email || 'Unknown'}</div>
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">प्रक्रिया दिनांक</label>
            <div class="text-sm text-gray-900">${submission.processedAt ? new Date(submission.processedAt).toLocaleString('mr-IN') : 'N/A'}</div>
        </div>
    ` : '';
    
    detailsDiv.innerHTML = `
        <div class="space-y-6">
            <!-- Basic Information -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">मूलभूत माहिती</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">अर्जदाराचे नाव</label>
                        <div class="text-sm text-gray-900 bg-gray-50 p-2 rounded">${submission.applicantName || 'N/A'}</div>
                </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">संपर्क क्रमांक</label>
                        <div class="text-sm text-gray-900 bg-gray-50 p-2 rounded">${submission.contactNumber || 'N/A'}</div>
                </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">ईमेल</label>
                        <div class="text-sm text-gray-900 bg-gray-50 p-2 rounded">${submission.email || 'N/A'}</div>
                </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">पत्ता</label>
                        <div class="text-sm text-gray-900 bg-gray-50 p-2 rounded">${submission.address || 'N/A'}</div>
                </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">अर्ज प्रकार</label>
                        <div class="text-sm text-gray-900 bg-gray-50 p-2 rounded">${formTypeLabels[submission.formType] || submission.formType}</div>
                </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">स्थिती</label>
                        <div class="bg-gray-50 p-2 rounded">
                    <span class="status-badge status-${submission.status}">
                                ${statusLabels[submission.status] || submission.status}
                    </span>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">सबमिट केले</label>
                        <div class="text-sm text-gray-900 bg-gray-50 p-2 rounded">${new Date(submission.submittedAt).toLocaleString('mr-IN')}</div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">अर्ज ID</label>
                        <div class="text-sm text-gray-900 bg-gray-50 p-2 rounded font-mono">${submission._id}</div>
                    </div>
                </div>
                ${processingInfo}
            </div>
            
            <!-- Form Data -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">अर्ज माहिती</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${formDataHTML || '<div class="col-span-2 text-gray-500 text-center py-4">कोणतीही अतिरिक्त माहिती उपलब्ध नाही</div>'}
                </div>
            </div>
            
            <!-- Documents -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">अपलोड केलेले दस्तऐवज</h3>
                ${documentsHTML}
            </div>
            
            <!-- Admin Notes -->
            ${submission.adminNotes ? `
                <div class="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">प्रशासक नोट्स</h3>
                    <div class="text-sm text-gray-900 bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                        ${submission.adminNotes}
            </div>
        </div>
            ` : ''}
            
            <!-- Submission Info -->
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">तकनीकी माहिती</h4>
                <div class="text-xs text-gray-600 space-y-1">
                    <div>IP Address: ${submission.submittedFrom?.ip || 'N/A'}</div>
                    <div>User Agent: ${submission.submittedFrom?.userAgent ? submission.submittedFrom.userAgent.substring(0, 100) + '...' : 'N/A'}</div>
                    <div>Created: ${new Date(submission.createdAt).toLocaleString('mr-IN')}</div>
                    <div>Updated: ${new Date(submission.updatedAt).toLocaleString('mr-IN')}</div>
        </div>
            </div>
        </div>
    `;
}

// Update submission status
async function updateStatus(submissionId) {
    console.log('🔄 updateStatus called with ID:', submissionId);
    const newStatus = prompt('नवीन स्थिती प्रविष्ट करा (pending, under-review, completed):');
    const adminNotes = prompt('प्रशासक नोट्स प्रविष्ट करा (वैकल्पिक):');
    
    if (!newStatus) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/submissions/${submissionId}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}`
            },
            body: JSON.stringify({
            status: newStatus,
            adminNotes: adminNotes || undefined
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('स्थिती यशस्वीरित्या अपडेट केली');
            // Reload current section
            if (currentSection === 'dashboard') {
                loadRecentSubmissions();
            } else if (currentSection === 'all-submissions') {
            loadSubmissions(currentPage);
            } else {
                loadFormSectionSubmissions(currentSection, currentPage);
            }
            loadStats();
        }
    } catch (error) {
        console.error('Error updating status:', error);
        alert('स्थिती अपडेट करताना त्रुटी');
    }
}

// Close submission modal
function closeSubmissionModal() {
    const modal = document.getElementById('submissionModal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
}

// Test function to verify modal works
function testModal() {
    const detailsDiv = document.getElementById('submissionDetails');
    detailsDiv.innerHTML = `
        <div class="text-center py-8">
            <div class="text-green-600 text-lg font-medium mb-4">मोडल चाचणी</div>
            <div class="text-gray-600 mb-4">मोडल यशस्वीरित्या उघडला आहे!</div>
            <div class="text-sm text-gray-500">Modal is working correctly</div>
        </div>
    `;
    document.getElementById('submissionModal').classList.remove('hidden');
}

// Print submission details
function printSubmissionDetails() {
    const modalContent = document.getElementById('submissionDetails').innerHTML;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="mr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>अर्ज तपशील - खडक ओझर ग्रामपंचायत</title>
            <style>
                body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                    margin: 20px; 
                    color: #374151;
                    line-height: 1.6;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #e5e7eb;
                    padding-bottom: 20px;
                }
                .section {
                    margin-bottom: 25px;
                    page-break-inside: avoid;
                }
                .section-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #1f2937;
                    margin-bottom: 15px;
                    border-bottom: 1px solid #d1d5db;
                    padding-bottom: 5px;
                }
                .field {
                    margin-bottom: 10px;
                }
                .field-label {
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 3px;
                }
                .field-value {
                    color: #6b7280;
                    padding: 5px 0;
                }
                .grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>खडक ओझर ग्रामपंचायत</h1>
                <h2>अर्ज तपशील</h2>
                <p>प्रिंट दिनांक: ${new Date().toLocaleString('mr-IN')}</p>
            </div>
            ${modalContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Helper functions
function getFormTypeLabel(formType) {
    return formTypeLabels[formType] || formType;
}

function getStatusLabel(status) {
    return statusLabels[status] || status;
}

function formatFieldName(fieldName) {
    // Convert camelCase to readable format
    return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

// Get field label in Marathi
function getFieldLabel(fieldName) {
    const fieldLabels = {
        // Basic fields
        'applicantName': 'अर्जदाराचे नाव',
        'contactNumber': 'संपर्क क्रमांक',
        'mobileNumber': 'मोबाइल क्रमांक',
        'email': 'ईमेल',
        'emailId': 'ईमेल आयडी',
        'address': 'पत्ता',
        'applicantAddress': 'अर्जदाराचा पत्ता',
        
        // Birth Certificate fields
        'birthDate': 'जन्म तारीख',
        'birthPlace': 'जन्माचे ठिकाण',
        'gender': 'लिंग',
        'childName': 'बाळाचे नाव',
        'fatherName': 'वडिलांचे नाव',
        'fatherAadharNumber': 'वडिलांचा आधार नंबर',
        'motherName': 'आईचे नाव',
        'motherAadharNumber': 'आईचा आधार नंबर',
        'permanentAddress': 'कायमचा पत्ता',
        'addressAtBirth': 'जन्माच्या वेळीचा पत्ता',
        
        // Death Certificate fields
        'deathDate': 'मृत्यु दिनांक',
        'deceasedName': 'मृताचे नाव',
        'deceasedAadharNumber': 'मृताचा आधार नंबर',
        'fatherOrHusbandName': 'पती/वडिलांचे नाव',
        'deathPlace': 'मृत्यूचे ठिकाण',
        'otherInformation': 'इतर माहिती',
        
        // Marriage Certificate fields
        'husbandName': 'पतीचे नाव',
        'wifeName': 'पत्नीचे नाव',
        'marriageDate': 'विवाह दिनांक',
        'marriageRegistrationYear': 'विवाह नोंदणी वर्ष',
        
        // Property related fields
        'propertyNumber': 'मिळकत क्रमांक',
        'propertyLocation': 'मिळकत स्थान',
        'totalArea': 'एकूण क्षेत्रफळ',
        'constructionArea': 'बांधकाम क्षेत्रफळ',
        'taxPaid': 'कर भरणा',
        
        // Work related fields
        'familyHeadName': 'कुटुंब प्रमुखाचे नाव',
        'jobCardNumber': 'जॉब कार्ड नंबर',
        'workFromDate': 'काम सुरु करण्याची तारीख',
        'numberOfWorkers': 'मजुरांची संख्या',
        
        // Business related fields
        'businessDescription': 'व्यवसाय वर्णन',
        'propertyOwner': 'मिळकतीचा मालक',
        'propertyHolderName': 'मिळकत धारकाचे नाव',
        'mutationType': 'फेरफार प्रकार',
        
        // Other fields
        'daridryaReshaNumber': 'दारिद्र्य रेषा क्रमांक',
        'aadharNumber': 'आधार क्रमांक'
    };
    
    return fieldLabels[fieldName] || formatFieldName(fieldName);
}

// Format field value for display
function formatFieldValue(value) {
    if (value === null || value === undefined || value === '') {
        return 'N/A';
    }
    
    if (typeof value === 'boolean') {
        return value ? 'होय' : 'नाही';
    }
    
    if (typeof value === 'object') {
        return JSON.stringify(value, null, 2);
    }
    
    return String(value);
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Make functions globally accessible for inline onclick handlers
window.viewSubmission = viewSubmission;
window.downloadSubmission = downloadSubmission;
window.updateStatus = updateStatus;
window.printSubmissionDetails = printSubmissionDetails;
window.closeSubmissionModal = closeSubmissionModal;
window.testModal = testModal;

// Debug log to verify functions are loaded
console.log('✅ Admin panel functions loaded:', {
    viewSubmission: typeof window.viewSubmission,
    downloadSubmission: typeof window.downloadSubmission,
    updateStatus: typeof window.updateStatus
});