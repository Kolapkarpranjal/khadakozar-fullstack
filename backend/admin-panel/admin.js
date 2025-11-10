// Admin Panel JavaScript with Marathi Language Support
// Use same-origin API base to work in local (http://localhost:5000) and production
const API_BASE_URL = `${window.location.origin}/api`;

let currentToken = localStorage.getItem('adminToken');
let currentPage = 1;
let currentFilters = {};
let currentSection = 'dashboard';
let currentCommitteePath = null;

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

// Verify token is valid (simplified - just check if token exists)
function hasValidToken() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        console.log('No token found in localStorage');
        return false;
    }
    
    // Basic token format check (JWT tokens have 3 parts separated by dots)
    if (token.split('.').length !== 3) {
        console.log('Invalid token format');
        localStorage.removeItem('adminToken');
        return false;
    }
    
    console.log('Token found in localStorage');
    return true;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== Admin Panel Initializing ===');
    
    // Re-check token from localStorage (in case it was updated)
    currentToken = localStorage.getItem('adminToken');
    
    console.log('Page loaded, checking token...');
    console.log('Token exists:', !!currentToken);
    console.log('Token value:', currentToken ? currentToken.substring(0, 20) + '...' : 'null');
    
    if (hasValidToken()) {
        console.log('✅ Token found, showing admin panel');
        showAdminPanel();
        
        // Load data asynchronously (don't wait for it)
        setTimeout(() => {
        loadStats();
        loadRecentSubmissions();
        // Bind management forms if present
        bindManagementForms();
        // Ensure management lists render immediately if their containers are on the page
        if (document.getElementById('bannersList')) {
            loadBanners();
        }
        if (document.getElementById('galleryList')) {
            loadGallery();
        }
        if (document.getElementById('eventsList')) {
            loadEvents();
        }
            if (document.getElementById('membersList')) {
                loadMembers();
            }
            if (document.getElementById('committeesList')) {
                loadCommittees();
            }
        }, 100);
    } else {
        console.log('❌ No valid token, showing login page');
        showLoginPage();
    }
    
    setupEventListeners();
    console.log('=== Initialization Complete ===');
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
    
    // Edit member modal buttons
    const closeEditModal = document.getElementById('closeEditMemberModal');
    const cancelEditMember = document.getElementById('cancelEditMember');
    const saveEditMemberBtn = document.getElementById('saveEditMember');
    
    if (closeEditModal) {
        closeEditModal.addEventListener('click', closeEditMemberModal);
    }
    if (cancelEditMember) {
        cancelEditMember.addEventListener('click', closeEditMemberModal);
    }
    if (saveEditMemberBtn) {
        saveEditMemberBtn.addEventListener('click', async () => {
            await saveEditMember();
        });
    }
    
    // Close edit member modal when clicking outside
    const editMemberModal = document.getElementById('editMemberModal');
    if (editMemberModal) {
        editMemberModal.addEventListener('click', function(e) {
            if (e.target === editMemberModal) {
                closeEditMemberModal();
            }
        });
    }
    
    // Edit committee modal buttons
    const closeEditCommitteeModalBtn = document.getElementById('closeEditCommitteeModal');
    const cancelEditCommitteeBtn = document.getElementById('cancelEditCommittee');
    const saveEditCommitteeBtn = document.getElementById('saveEditCommittee');
    
    if (closeEditCommitteeModalBtn) {
        closeEditCommitteeModalBtn.addEventListener('click', () => {
            closeEditCommitteeModal();
        });
    }
    if (cancelEditCommitteeBtn) {
        cancelEditCommitteeBtn.addEventListener('click', () => {
            closeEditCommitteeModal();
        });
    }
    if (saveEditCommitteeBtn) {
        saveEditCommitteeBtn.addEventListener('click', async () => {
            await saveEditCommittee();
        });
    }
    
    // Close edit committee modal when clicking outside
    const editCommitteeModal = document.getElementById('editCommitteeModal');
    if (editCommitteeModal) {
        editCommitteeModal.addEventListener('click', function(e) {
            if (e.target === editCommitteeModal) {
                closeEditCommitteeModal();
            }
        });
    }
    
    // Edit committee member modal buttons
    const closeEditCommitteeMemberModalBtn = document.getElementById('closeEditCommitteeMemberModal');
    const cancelEditCommitteeMemberBtn = document.getElementById('cancelEditCommitteeMember');
    const saveEditCommitteeMemberBtn = document.getElementById('saveEditCommitteeMember');
    
    if (closeEditCommitteeMemberModalBtn) {
        closeEditCommitteeMemberModalBtn.addEventListener('click', () => {
            closeEditCommitteeMemberModal();
        });
    }
    if (cancelEditCommitteeMemberBtn) {
        cancelEditCommitteeMemberBtn.addEventListener('click', () => {
            closeEditCommitteeMemberModal();
        });
    }
    if (saveEditCommitteeMemberBtn) {
        saveEditCommitteeMemberBtn.addEventListener('click', async () => {
            await saveEditCommitteeMember();
        });
    }
    
    // Close edit committee member modal when clicking outside
    const editCommitteeMemberModal = document.getElementById('editCommitteeMemberModal');
    if (editCommitteeMemberModal) {
        editCommitteeMemberModal.addEventListener('click', function(e) {
            if (e.target === editCommitteeMemberModal) {
                closeEditCommitteeMemberModal();
            }
        });
    }
    
    // Edit gallery modal buttons
    const closeEditGalleryModalBtn = document.getElementById('closeEditGalleryModal');
    const cancelEditGalleryBtn = document.getElementById('cancelEditGallery');
    const saveEditGalleryBtn = document.getElementById('saveEditGallery');
    
    if (closeEditGalleryModalBtn) {
        closeEditGalleryModalBtn.addEventListener('click', () => {
            closeEditGalleryModal();
        });
    }
    if (cancelEditGalleryBtn) {
        cancelEditGalleryBtn.addEventListener('click', () => {
            closeEditGalleryModal();
        });
    }
    if (saveEditGalleryBtn) {
        saveEditGalleryBtn.addEventListener('click', async () => {
            await saveEditGallery();
        });
    }
    
    // Close edit gallery modal when clicking outside
    const editGalleryModal = document.getElementById('editGalleryModal');
    if (editGalleryModal) {
        editGalleryModal.addEventListener('click', function(e) {
            if (e.target === editGalleryModal) {
                closeEditGalleryModal();
            }
        });
    }
    
    // Committee member form submission
    const committeeMemberForm = document.getElementById('committeeMemberForm');
    if (committeeMemberForm) {
        committeeMemberForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!currentCommitteePath) {
                alert('कृपया समिती निवडा');
                return;
            }
            
            try {
                // Auto-fill category for Shaley Vyavasthapan Samiti if category dropdown is selected
                let category = document.getElementById('cmCategory').value || undefined;
                let categoryMarathi = document.getElementById('cmCategoryMarathi').value || undefined;
                
                if (currentCommitteePath === 'shaleyvyavasthapansamiti') {
                    const categorySelect = document.getElementById('categorySelect');
                    if (categorySelect && categorySelect.value) {
                        category = categorySelect.value;
                        categoryMarathi = category === 'Secondary School' ? 'माध्यमिक विद्यालय' : 'प्राथमिक शाळा';
                    }
                }
                
                const resp = await fetch(`${API_BASE_URL}/committee-members`, {
                    method: 'POST',
                    headers: { 
                        Authorization: `Bearer ${currentToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        committeePath: currentCommitteePath,
                        srNo: document.getElementById('cmSrNo').value || undefined,
                        name: document.getElementById('cmName').value,
                        nameMarathi: document.getElementById('cmNameMarathi').value,
                        designation: document.getElementById('cmDesignation').value || undefined,
                        designationMarathi: document.getElementById('cmDesignationMarathi').value || undefined,
                        position: document.getElementById('cmPosition').value || undefined,
                        positionMarathi: document.getElementById('cmPositionMarathi').value || undefined,
                        address: document.getElementById('cmAddress').value || undefined,
                        addressMarathi: document.getElementById('cmAddressMarathi').value || undefined,
                        mobile: document.getElementById('cmMobile').value || undefined,
                        contact: document.getElementById('cmContact').value || undefined,
                        taluka: document.getElementById('cmTaluka').value || undefined,
                        talukaMarathi: document.getElementById('cmTalukaMarathi').value || undefined,
                        grampanchayat: document.getElementById('cmGrampanchayat').value || undefined,
                        grampanchayatMarathi: document.getElementById('cmGrampanchayatMarathi').value || undefined,
                        category: category,
                        categoryMarathi: categoryMarathi
                    })
                });
                const data = await resp.json();
                if (!resp.ok || !data.success) {
                    alert(data.message || 'सदस्य जतन करण्यात अडचण आली');
                    return;
                }
                alert('सदस्य यशस्वीरित्या जोडला गेला!');
                await loadCommitteeMembers();
                committeeMemberForm.reset();
            } catch (error) {
                console.error('Error adding committee member:', error);
                alert('सदस्य जोडताना त्रुटी आली');
            }
        });
    }
    
    // Load committee members button
    const loadCommitteeMembersBtn = document.getElementById('loadCommitteeMembers');
    if (loadCommitteeMembersBtn) {
        loadCommitteeMembersBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log('Load Committee Members button clicked');
            await loadCommitteeMembers();
        });
    }
    
    // Also load when committee selection changes (optional - for auto-load)
    const committeeSelect = document.getElementById('committeeSelect');
    const categorySelectContainer = document.getElementById('categorySelectContainer');
    const categorySelect = document.getElementById('categorySelect');
    
    if (committeeSelect) {
        committeeSelect.addEventListener('change', (e) => {
            console.log('Committee selected:', e.target.value);
            const selectedPath = e.target.value;
            
            // Show category dropdown only for Shaley Vyavasthapan Samiti
            if (selectedPath === 'shaleyvyavasthapansamiti') {
                if (categorySelectContainer) {
                    categorySelectContainer.classList.remove('hidden');
                }
            } else {
                if (categorySelectContainer) {
                    categorySelectContainer.classList.add('hidden');
                }
                if (categorySelect) {
                    categorySelect.value = ''; // Reset category selection
                }
            }
            
            // Optionally auto-load when selection changes
            // if (e.target.value) {
            //     loadCommitteeMembers();
            // }
        });
    }
    
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

// Bind add forms for gallery/events
function bindManagementForms() {
    const bannerForm = document.getElementById('bannerForm');
    if (bannerForm) {
        bannerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const editId = bannerForm.getAttribute('data-edit-id');
            const fd = new FormData();
            fd.append('title', document.getElementById('bannerTitle').value);
            fd.append('titleEn', document.getElementById('bannerTitleEn').value);
            fd.append('titleMr', document.getElementById('bannerTitleMr').value);
            fd.append('altText', document.getElementById('bannerAlt').value);
            fd.append('altTextEn', document.getElementById('bannerAltEn').value);
            fd.append('altTextMr', document.getElementById('bannerAltMr').value);
            fd.append('order', document.getElementById('bannerOrder').value || '0');
            fd.append('isActive', document.getElementById('bannerIsActive').value);
            
            const file = document.getElementById('bannerImage').files[0];
            if (editId) {
                // Update mode - image is optional
                if (file) {
                    fd.append('image', file);
                }
                fd.append('uploadTarget', 'banners');
                try {
                    const res = await fetch(`${API_BASE_URL}/banners/${editId}`, {
                        method: 'PUT',
                        headers: { Authorization: `Bearer ${currentToken}` },
                        body: fd
                    });
                    const data = await res.json();
                    if (!res.ok || !data.success) {
                        alert(data.message || 'बॅनर अपडेट करताना त्रुटी आली');
                        return;
                    }
                    alert('बॅनर यशस्वीरित्या अपडेट केला गेला!');
                    // Reset form to add mode
                    bannerForm.removeAttribute('data-edit-id');
                    const submitBtn = document.querySelector('#bannerForm button');
                    if (submitBtn) {
                        submitBtn.textContent = 'बॅनर जोडा';
                    }
                    await loadBanners();
                    bannerForm.reset();
                } catch (error) {
                    console.error('Error updating banner:', error);
                    alert('बॅनर अपडेट करताना त्रुटी आली');
                }
            } else {
                // Create mode - image is required
                if (!file) {
                    alert('कृपया प्रतिमा निवडा');
                    return;
                }
                fd.append('image', file);
                fd.append('uploadTarget', 'banners');
                try {
                    const res = await fetch(`${API_BASE_URL}/banners`, {
                        method: 'POST',
                        headers: { Authorization: `Bearer ${currentToken}` },
                        body: fd
                    });
                    const data = await res.json();
                    if (!res.ok || !data.success) {
                        alert(data.message || 'बॅनर जतन करण्यात अडचण आली');
                        return;
                    }
                    alert('बॅनर यशस्वीरित्या जोडला गेला!');
                    await loadBanners();
                    bannerForm.reset();
                } catch (error) {
                    console.error('Error adding banner:', error);
                    alert('बॅनर जोडताना त्रुटी आली');
                }
            }
        });
    }

    const galleryForm = document.getElementById('galleryForm');
    if (galleryForm) {
        galleryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fd = new FormData();
            fd.append('title', document.getElementById('galleryTitle').value);
            fd.append('altText', document.getElementById('galleryAlt').value);
            fd.append('category', document.getElementById('galleryCategory').value);
            fd.append('isVideo', document.getElementById('galleryIsVideo').value);
            const file = document.getElementById('galleryImage').files[0];
            if (!file) {
                alert('कृपया प्रतिमा किंवा व्हिडिओ निवडा');
                return;
            }
            fd.append('image', file);
            fd.append('uploadTarget', 'gallery');
            
            try {
                const res = await fetch(`${API_BASE_URL}/gallery`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${currentToken}` },
                    body: fd
                });
                const data = await res.json();
                if (!res.ok || !data.success) {
                    alert(data.message || 'प्रतिमा/व्हिडिओ जोडताना त्रुटी आली');
                    return;
                }
                alert('प्रतिमा/व्हिडिओ यशस्वीरित्या जोडले गेले!');
                await loadGallery();
                galleryForm.reset();
            } catch (error) {
                console.error('Error uploading gallery item:', error);
                alert('प्रतिमा/व्हिडिओ जोडताना त्रुटी आली');
            }
        });
    }

    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const editId = eventForm.getAttribute('data-edit-id');
            const fd = new FormData();
            fd.append('title', document.getElementById('eventTitle').value);
            fd.append('titleEn', document.getElementById('eventTitleEn').value);
            fd.append('titleMr', document.getElementById('eventTitleMr').value);
            fd.append('description', document.getElementById('eventDescription').value);
            fd.append('descriptionEn', document.getElementById('eventDescriptionEn').value);
            fd.append('descriptionMr', document.getElementById('eventDescriptionMr').value);
            fd.append('altText', document.getElementById('eventAlt').value);
            fd.append('altTextEn', document.getElementById('eventAltEn').value);
            fd.append('altTextMr', document.getElementById('eventAltMr').value);
            fd.append('status', document.getElementById('eventStatus').value || 'Completed');
            fd.append('date', document.getElementById('eventDate').value);
            
            const file = document.getElementById('eventImage').files[0];
            if (editId) {
                // Update mode - image is optional
                if (file) {
            fd.append('image', file);
                }
            fd.append('uploadTarget', 'events');
                try {
                    const resp = await fetch(`${API_BASE_URL}/events/${editId}`, {
                        method: 'PUT',
                        headers: { Authorization: `Bearer ${currentToken}` },
                        body: fd
                    });
                    const data = await resp.json();
                    if (!resp.ok || !data.success) {
                        alert(data.message || 'उपक्रम अपडेट करताना त्रुटी आली');
                        return;
                    }
                    alert('उपक्रम यशस्वीरित्या अपडेट केला गेला!');
                    // Reset form to add mode
                    eventForm.removeAttribute('data-edit-id');
                    const submitBtn = document.querySelector('#eventForm button');
                    if (submitBtn) {
                        submitBtn.textContent = 'उपक्रम जोडा';
                    }
                    await loadEvents();
                    eventForm.reset();
                } catch (error) {
                    console.error('Error updating event:', error);
                    alert('उपक्रम अपडेट करताना त्रुटी आली');
                }
            } else {
                // Create mode - image is required
                if (!file) {
                    alert('कृपया प्रतिमा निवडा');
                    return;
                }
                fd.append('image', file);
                fd.append('uploadTarget', 'events');
                try {
            const resp = await fetch(`${API_BASE_URL}/events`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${currentToken}` },
                body: fd
            });
                const data = await resp.json();
                if (!resp.ok || !data.success) {
                        alert(data.message || 'उपक्रम जतन करण्यात अडचण आली');
                    return;
                }
                    alert('उपक्रम यशस्वीरित्या जोडला गेला!');
            await loadEvents();
            eventForm.reset();
                } catch (error) {
                    console.error('Error adding event:', error);
                    alert('उपक्रम जोडताना त्रुटी आली');
                }
            }
        });
    }

    const memberForm = document.getElementById('memberForm');
    if (memberForm) {
        memberForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fd = new FormData();
            fd.append('memberName', document.getElementById('memberName').value);
            fd.append('memberNameMarathi', document.getElementById('memberNameMarathi').value);
            fd.append('memberDesignation', document.getElementById('memberDesignation').value);
            fd.append('memberDesignationMarathi', document.getElementById('memberDesignationMarathi').value);
            const order = document.getElementById('memberOrder').value;
            if (order) fd.append('order', order);
            const mobile = document.getElementById('memberMobile').value;
            if (mobile) fd.append('mobile', mobile);
            const file = document.getElementById('memberImage').files[0];
            if (!file) {
                alert('कृपया प्रतिमा निवडा');
                return;
            }
            fd.append('image', file);
            try {
                const resp = await fetch(`${API_BASE_URL}/members`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${currentToken}` },
                    body: fd
                });
                const data = await resp.json();
                if (!resp.ok || !data.success) {
                    alert(data.message || 'सदस्य जतन करण्यात अडचण आली');
                    return;
                }
                alert('सदस्य यशस्वीरित्या जोडला गेला!');
                await loadMembers();
                memberForm.reset();
            } catch (error) {
                console.error('Error adding member:', error);
                alert('सदस्य जोडताना त्रुटी आली');
            }
        });
    }

    const committeeForm = document.getElementById('committeeForm');
    if (committeeForm) {
        committeeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const resp = await fetch(`${API_BASE_URL}/committees`, {
                    method: 'POST',
                    headers: { 
                        Authorization: `Bearer ${currentToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: document.getElementById('committeeTitle').value,
                        titleMarathi: document.getElementById('committeeTitleMarathi').value,
                        description: document.getElementById('committeeDescription').value,
                        descriptionMarathi: document.getElementById('committeeDescriptionMarathi').value,
                        path: document.getElementById('committeePath').value || undefined,
                        order: document.getElementById('committeeOrder').value || undefined
                    })
                });
                const data = await resp.json();
                if (!resp.ok || !data.success) {
                    alert(data.message || 'समिती जतन करण्यात अडचण आली');
                    return;
                }
                alert('समिती यशस्वीरित्या जोडली गेली!');
                await loadCommittees();
                committeeForm.reset();
            } catch (error) {
                console.error('Error adding committee:', error);
                alert('समिती जोडताना त्रुटी आली');
            }
        });
    }
}

async function loadGallery() {
    try {
        const res = await fetch(`${API_BASE_URL}/gallery`);
        const data = await res.json();
        const list = document.getElementById('galleryList');
        if (!list) return;
        list.innerHTML = '';
        (data.data || []).forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow p-3 overflow-hidden';
            card.innerHTML = `
                <div class="relative">
                    ${item.isVideo ? `
                        <video src="${API_BASE_URL.replace('/api','')}${item.imageUrl}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px;" controls></video>
                    ` : `
                        <img src="${API_BASE_URL.replace('/api','')}${item.imageUrl}" alt="${item.altText || ''}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px;" />
                    `}
                </div>
                <div class="mt-2 flex items-center justify-between">
                    <div class="font-semibold text-gray-800 truncate text-sm" title="${item.title}">${item.title}</div>
                    <div class="flex gap-2">
                        <button data-edit-gallery="${item._id}" class="action-btn px-3 py-1 rounded-md text-white text-sm" style="background: linear-gradient(135deg,#3b82f6 0%, #2563eb 100%);">Edit</button>
                        <button data-del-gallery="${item._id}" class="action-btn px-3 py-1 rounded-md text-white text-sm" style="background: linear-gradient(135deg,#ef4444 0%, #b91c1c 100%);">Delete</button>
                    </div>
                </div>
            `;
            list.appendChild(card);
        });
        // Bind edit buttons
        list.querySelectorAll('[data-edit-gallery]').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = btn.getAttribute('data-edit-gallery');
                await openEditGalleryModal(id);
            });
        });
        // Bind delete buttons
        list.querySelectorAll('[data-del-gallery]').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (confirm('आपण खात्री आहे की आपण ही प्रतिमा हटवू इच्छिता?')) {
                    const id = btn.getAttribute('data-del-gallery');
                    await fetch(`${API_BASE_URL}/gallery/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${currentToken}` }});
                    loadGallery();
                }
            });
        });
    } catch (e) {
        console.error('Load gallery failed', e);
    }
}

// Open edit gallery modal
async function openEditGalleryModal(galleryId) {
    try {
        if (!galleryId) {
            alert('गॅलेरी आयटम ID आढळले नाही');
            return;
        }
        
        console.log('Loading gallery item:', galleryId);
        const res = await fetch(`${API_BASE_URL}/gallery/${galleryId}`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
            console.error('Error response:', res.status, errorData);
            alert(`त्रुटी: ${errorData.message || 'गॅलेरी आयटम माहिती लोड करताना त्रुटी आली'}`);
            return;
        }
        
        const data = await res.json();
        console.log('Gallery item data:', data);
        console.log('Gallery item data.data:', data.data);
        
        if (!data.success || !data.data) {
            console.error('Invalid response:', data);
            alert(data.message || 'गॅलेरी आयटम माहिती लोड करताना त्रुटी आली');
            return;
        }
        
        const item = data.data;
        console.log('Gallery item:', item);
        console.log('Item title:', item.title);
        console.log('Item _id:', item._id);
        
        // Check if form elements exist
        const editGalleryId = document.getElementById('editGalleryId');
        const editGalleryTitle = document.getElementById('editGalleryTitle');
        const editGalleryModal = document.getElementById('editGalleryModal');
        
        if (!editGalleryId || !editGalleryTitle || !editGalleryModal) {
            console.error('Form elements not found!');
            alert('गॅलेरी संपादन फॉर्म आढळले नाही');
            return;
        }
        
        // Populate form fields
        editGalleryId.value = item._id || '';
        editGalleryTitle.value = item.title || '';
        document.getElementById('editGalleryTitleMr').value = item.titleMr || '';
        document.getElementById('editGalleryDescription').value = item.description || '';
        document.getElementById('editGalleryDescriptionMr').value = item.descriptionMr || '';
        document.getElementById('editGalleryAltText').value = item.altText || '';
        document.getElementById('editGalleryAltTextMr').value = item.altTextMr || '';
        document.getElementById('editGalleryCategory').value = item.category || '';
        document.getElementById('editGalleryIsVideo').value = item.isVideo ? 'true' : 'false';
        
        // Clear image input
        document.getElementById('editGalleryImage').value = '';
        
        console.log('Form populated, showing modal...');
        
        // Show modal
        editGalleryModal.classList.remove('hidden');
        editGalleryModal.style.display = 'flex';
        console.log('Modal should be visible now');
    } catch (e) {
        console.error('Error loading gallery item for edit:', e);
        alert('गॅलेरी आयटम माहिती लोड करताना त्रुटी आली');
    }
}

// Close edit gallery modal
function closeEditGalleryModal() {
    const modal = document.getElementById('editGalleryModal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
    document.getElementById('editGalleryForm').reset();
}

// Save edit gallery
async function saveEditGallery() {
    try {
        const id = document.getElementById('editGalleryId').value;
        if (!id) {
            alert('गॅलेरी आयटम ID आढळले नाही');
            return;
        }
        
        const fd = new FormData();
        fd.append('title', document.getElementById('editGalleryTitle').value);
        fd.append('titleMr', document.getElementById('editGalleryTitleMr').value);
        fd.append('description', document.getElementById('editGalleryDescription').value);
        fd.append('descriptionMr', document.getElementById('editGalleryDescriptionMr').value);
        fd.append('altText', document.getElementById('editGalleryAltText').value);
        fd.append('altTextMr', document.getElementById('editGalleryAltTextMr').value);
        fd.append('category', document.getElementById('editGalleryCategory').value);
        fd.append('isVideo', document.getElementById('editGalleryIsVideo').value);
        
        const file = document.getElementById('editGalleryImage').files[0];
        if (file) {
            fd.append('image', file);
        }
        
        const res = await fetch(`${API_BASE_URL}/gallery/${id}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${currentToken}` },
            body: fd
        });
        
        const data = await res.json();
        
        if (!res.ok || !data.success) {
            alert(data.message || 'गॅलेरी आयटम अपडेट करताना त्रुटी आली');
            return;
        }
        
        alert('गॅलेरी आयटम यशस्वीरित्या अपडेट केले गेले!');
        closeEditGalleryModal();
        await loadGallery();
    } catch (e) {
        console.error('Error saving gallery item:', e);
        alert('गॅलेरी आयटम अपडेट करताना त्रुटी आली');
    }
}

async function loadBanners() {
    try {
        const res = await fetch(`${API_BASE_URL}/banners`);
        const data = await res.json();
        const list = document.getElementById('bannersList');
        if (!list) return;
        list.innerHTML = '';
        (data.data || []).forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow p-3 overflow-hidden';
            card.innerHTML = `
                <div class="relative">
                    <img src="${API_BASE_URL.replace('/api','')}${item.imageUrl}" alt="${item.altText || ''}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px;" />
                </div>
                <div class="mt-2 flex items-center justify-between">
                    <div class="font-semibold text-gray-800 truncate text-sm" title="${item.title}">${item.title}</div>
                    <div class="flex gap-2">
                        <button data-edit-banner="${item._id}" class="action-btn px-3 py-1 rounded-md text-white text-sm" style="background: linear-gradient(135deg,#3b82f6 0%, #2563eb 100%);">Edit</button>
                        <button data-del-banner="${item._id}" class="action-btn px-3 py-1 rounded-md text-white text-sm" style="background: linear-gradient(135deg,#ef4444 0%, #b91c1c 100%);">Delete</button>
                    </div>
                </div>
                <div class="text-xs text-gray-600 mt-1">Order: ${item.order || 0} • ${item.isActive ? 'Active' : 'Inactive'}</div>
            `;
            list.appendChild(card);
        });
        // Bind edit buttons
        list.querySelectorAll('[data-edit-banner]').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = btn.getAttribute('data-edit-banner');
                await openEditBannerModal(id);
            });
        });
        // Bind delete buttons
        list.querySelectorAll('[data-del-banner]').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (confirm('आपण खात्री आहे की आपण हा बॅनर हटवू इच्छिता?')) {
                    const id = btn.getAttribute('data-del-banner');
                    await fetch(`${API_BASE_URL}/banners/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${currentToken}` }});
                    loadBanners();
                }
            });
        });
    } catch (e) {
        console.error('Load banners failed', e);
    }
}

// Open edit banner modal
async function openEditBannerModal(bannerId) {
    try {
        if (!bannerId) {
            alert('बॅनर ID आढळले नाही');
            return;
        }
        
        console.log('Loading banner:', bannerId);
        const res = await fetch(`${API_BASE_URL}/banners/${bannerId}`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
            console.error('Error response:', res.status, errorData);
            alert(`त्रुटी: ${errorData.message || 'बॅनर माहिती लोड करताना त्रुटी आली'}`);
            return;
        }
        
        const data = await res.json();
        console.log('Banner data:', data);
        
        if (!data.success || !data.data) {
            console.error('Invalid response:', data);
            alert(data.message || 'बॅनर माहिती लोड करताना त्रुटी आली');
            return;
        }
        
        const item = data.data;
        console.log('Banner item:', item);
        
        // Populate form fields
        document.getElementById('bannerTitle').value = item.title || '';
        document.getElementById('bannerTitleEn').value = item.titleEn || '';
        document.getElementById('bannerTitleMr').value = item.titleMr || '';
        document.getElementById('bannerAlt').value = item.altText || '';
        document.getElementById('bannerAltEn').value = item.altTextEn || '';
        document.getElementById('bannerAltMr').value = item.altTextMr || '';
        document.getElementById('bannerOrder').value = item.order || 0;
        document.getElementById('bannerIsActive').value = item.isActive ? 'true' : 'false';
        
        // Clear image input
        document.getElementById('bannerImage').value = '';
        
        // Store banner ID for update
        document.getElementById('bannerForm').setAttribute('data-edit-id', bannerId);
        
        // Change form button text
        const submitBtn = document.querySelector('#bannerForm button');
        if (submitBtn) {
            submitBtn.textContent = 'बॅनर अपडेट करा';
        }
        
        // Scroll to form
        document.getElementById('bannerForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
        console.error('Error loading banner for edit:', e);
        alert('बॅनर माहिती लोड करताना त्रुटी आली');
    }
}

async function loadEvents() {
    try {
        const res = await fetch(`${API_BASE_URL}/events`);
        const data = await res.json();
        const list = document.getElementById('eventsList');
        if (!list) return;
        list.innerHTML = '';
        (data.data || []).forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow p-3 overflow-hidden';
            card.innerHTML = `
                <div class="relative">
                    <img src="${API_BASE_URL.replace('/api','')}${item.imageUrl}" alt="${item.altText || ''}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 8px;" />
                </div>
                <div class="mt-2 font-semibold text-gray-800 text-sm">${item.title}</div>
                <div class="text-sm text-gray-600">${item.status || ''} • ${item.date || ''}</div>
                <div class="mt-2 flex gap-2 justify-end">
                    <button data-edit-event="${item._id}" class="action-btn px-3 py-1 rounded-md text-white text-sm" style="background: linear-gradient(135deg,#3b82f6 0%, #2563eb 100%);">Edit</button>
                    <button data-del-event="${item._id}" class="action-btn px-3 py-1 rounded-md text-white text-sm" style="background: linear-gradient(135deg,#ef4444 0%, #b91c1c 100%);">Delete</button>
                </div>
            `;
            list.appendChild(card);
        });
        // Bind edit buttons
        list.querySelectorAll('[data-edit-event]').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = btn.getAttribute('data-edit-event');
                await openEditEventModal(id);
            });
        });
        // Bind delete buttons
        list.querySelectorAll('[data-del-event]').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (confirm('आपण खात्री आहे की आपण हा उपक्रम हटवू इच्छिता?')) {
                const id = btn.getAttribute('data-del-event');
                await fetch(`${API_BASE_URL}/events/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${currentToken}` }});
                loadEvents();
                }
            });
        });
    } catch (e) {
        console.error('Load events failed', e);
    }
}

// Open edit event modal
async function openEditEventModal(eventId) {
    try {
        if (!eventId) {
            alert('उपक्रम ID आढळले नाही');
            return;
        }
        
        console.log('Loading event:', eventId);
        const res = await fetch(`${API_BASE_URL}/events/${eventId}`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Unknown error' }));
            console.error('Error response:', res.status, errorData);
            alert(`त्रुटी: ${errorData.message || 'उपक्रम माहिती लोड करताना त्रुटी आली'}`);
            return;
        }
        
        const data = await res.json();
        console.log('Event data:', data);
        
        if (!data.success || !data.data) {
            console.error('Invalid response:', data);
            alert(data.message || 'उपक्रम माहिती लोड करताना त्रुटी आली');
            return;
        }
        
        const item = data.data;
        console.log('Event item:', item);
        
        // Populate form fields
        document.getElementById('eventTitle').value = item.title || '';
        document.getElementById('eventTitleEn').value = item.titleEn || '';
        document.getElementById('eventTitleMr').value = item.titleMr || '';
        document.getElementById('eventDescription').value = item.description || '';
        document.getElementById('eventDescriptionEn').value = item.descriptionEn || '';
        document.getElementById('eventDescriptionMr').value = item.descriptionMr || '';
        document.getElementById('eventAlt').value = item.altText || '';
        document.getElementById('eventAltEn').value = item.altTextEn || '';
        document.getElementById('eventAltMr').value = item.altTextMr || '';
        document.getElementById('eventStatus').value = item.status || 'Completed';
        document.getElementById('eventDate').value = item.date || '';
        
        // Clear image input
        document.getElementById('eventImage').value = '';
        
        // Store event ID for update
        document.getElementById('eventForm').setAttribute('data-edit-id', eventId);
        
        // Change form button text
        const submitBtn = document.querySelector('#eventForm button');
        if (submitBtn) {
            submitBtn.textContent = 'उपक्रम अपडेट करा';
        }
        
        // Scroll to form
        document.getElementById('eventForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (e) {
        console.error('Error loading event for edit:', e);
        alert('उपक्रम माहिती लोड करताना त्रुटी आली');
    }
}

async function loadMembers() {
    try {
        const res = await fetch(`${API_BASE_URL}/members/all`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        const data = await res.json();
        const list = document.getElementById('membersList');
        if (!list) return;
        list.innerHTML = '';
        (data.data || []).forEach(member => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow p-4 overflow-hidden';
            card.innerHTML = `
                <div class="relative mb-3">
                    <img src="${API_BASE_URL.replace('/api','')}${member.imageUrl}" alt="${member.memberNameMarathi || member.memberName}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;" />
                </div>
                <div class="mb-2">
                    <div class="font-semibold text-gray-800 text-sm mb-1">${member.memberNameMarathi || member.memberName}</div>
                    <div class="text-xs text-gray-600 mb-1">${member.memberName}</div>
                    <div class="text-sm font-medium text-green-600">${member.memberDesignationMarathi || member.memberDesignation}</div>
                    ${member.mobile ? `<div class="text-xs text-gray-500 mt-1">📱 ${member.mobile}</div>` : ''}
                    <div class="text-xs text-gray-500 mt-2">क्रमांक: ${member.order}</div>
                    <div class="mt-3 flex gap-2">
                        <button data-edit-member="${member._id}" class="action-btn px-3 py-1 rounded-md text-white text-xs" style="background: linear-gradient(135deg,#3b82f6 0%, #2563eb 100%);">Edit</button>
                        <button data-del-member="${member._id}" class="action-btn px-3 py-1 rounded-md text-white text-xs" style="background: linear-gradient(135deg,#ef4444 0%, #b91c1c 100%);">Delete</button>
                    </div>
                </div>
            `;
            list.appendChild(card);
        });
        // Bind delete buttons
        list.querySelectorAll('[data-del-member]').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (!confirm('तुम्हाला खात्री आहे की तुम्ही हा सदस्य हटवू इच्छिता?')) return;
                const id = btn.getAttribute('data-del-member');
                try {
                    const resp = await fetch(`${API_BASE_URL}/members/${id}`, { 
                        method: 'DELETE', 
                        headers: { Authorization: `Bearer ${currentToken }` }
                    });
                    const data = await resp.json();
                    if (data.success) {
                        alert('सदस्य यशस्वीरित्या हटवला गेला');
                        loadMembers();
                    } else {
                        alert('सदस्य हटवताना त्रुटी आली');
                    }
                } catch (e) {
                    console.error('Delete member failed', e);
                    alert('सदस्य हटवताना त्रुटी आली');
                }
            });
        });
        
        // Bind edit buttons
        list.querySelectorAll('[data-edit-member]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-edit-member');
                await openEditMemberModal(id);
            });
        });
    } catch (e) {
        console.error('Load members failed', e);
    }
}

// Open edit member modal
async function openEditMemberModal(memberId) {
    try {
        // Fetch member details
        const res = await fetch(`${API_BASE_URL}/members/${memberId}`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        const data = await res.json();
        
        if (!data.success || !data.data) {
            alert('सदस्य माहिती लोड करताना त्रुटी आली');
            return;
        }
        
        const member = data.data;
        
        // Populate form fields
        document.getElementById('editMemberId').value = member._id;
        document.getElementById('editMemberName').value = member.memberName || '';
        document.getElementById('editMemberNameMarathi').value = member.memberNameMarathi || '';
        document.getElementById('editMemberDesignation').value = member.memberDesignation || '';
        document.getElementById('editMemberDesignationMarathi').value = member.memberDesignationMarathi || '';
        document.getElementById('editMemberOrder').value = member.order || '';
        document.getElementById('editMemberMobile').value = member.mobile || '';
        document.getElementById('editMemberIsActive').value = member.isActive ? 'true' : 'false';
        
        // Clear image input
        document.getElementById('editMemberImage').value = '';
        
        // Show modal
        const modal = document.getElementById('editMemberModal');
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    } catch (e) {
        console.error('Error loading member for edit:', e);
        alert('सदस्य माहिती लोड करताना त्रुटी आली');
    }
}

// Close edit member modal
function closeEditMemberModal() {
    const modal = document.getElementById('editMemberModal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
    document.getElementById('editMemberForm').reset();
}

// Save edited member
async function saveEditMember() {
    try {
        const memberId = document.getElementById('editMemberId').value;
        if (!memberId) {
            alert('सदस्य ID आढळले नाही');
            return;
        }
        
        const fd = new FormData();
        fd.append('memberName', document.getElementById('editMemberName').value);
        fd.append('memberNameMarathi', document.getElementById('editMemberNameMarathi').value);
        fd.append('memberDesignation', document.getElementById('editMemberDesignation').value);
        fd.append('memberDesignationMarathi', document.getElementById('editMemberDesignationMarathi').value);
        
        const order = document.getElementById('editMemberOrder').value;
        if (order) fd.append('order', order);
        
        const mobile = document.getElementById('editMemberMobile').value;
        if (mobile) fd.append('mobile', mobile);
        
        const isActive = document.getElementById('editMemberIsActive').value === 'true';
        fd.append('isActive', isActive);
        
        // Only append image if a new one is selected
        const imageFile = document.getElementById('editMemberImage').files[0];
        if (imageFile) {
            fd.append('image', imageFile);
        }
        
        const resp = await fetch(`${API_BASE_URL}/members/${memberId}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${currentToken}` },
            body: fd
        });
        
        const data = await resp.json();
        if (!resp.ok || !data.success) {
            alert(data.message || 'सदस्य अपडेट करताना त्रुटी आली');
            return;
        }
        
        alert('सदस्य यशस्वीरित्या अपडेट केला गेला!');
        closeEditMemberModal();
        loadMembers();
    } catch (e) {
        console.error('Error updating member:', e);
        alert('सदस्य अपडेट करताना त्रुटी आली');
    }
}

// Load committees
async function loadCommittees() {
    try {
        const res = await fetch(`${API_BASE_URL}/committees/all`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        const data = await res.json();
        const list = document.getElementById('committeesList');
        if (!list) return;
        list.innerHTML = '';
        (data.data || []).forEach(committee => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow p-4 overflow-hidden';
            card.innerHTML = `
                <div class="mb-2">
                    <div class="font-semibold text-gray-800 text-sm mb-1">${committee.titleMarathi || committee.title}</div>
                    <div class="text-xs text-gray-600 mb-1">${committee.title}</div>
                    ${committee.descriptionMarathi || committee.description ? `<div class="text-xs text-gray-500 mt-2 mb-2">${(committee.descriptionMarathi || committee.description).substring(0, 100)}${(committee.descriptionMarathi || committee.description).length > 100 ? '...' : ''}</div>` : ''}
                    <div class="text-xs text-gray-500 mt-2">पथ: ${committee.path}</div>
                    <div class="text-xs text-gray-500">क्रमांक: ${committee.order}</div>
                    <div class="text-xs mt-2">
                        <span class="status-badge ${committee.isActive ? 'status-approved' : 'status-rejected'}">
                            ${committee.isActive ? 'सक्रिय' : 'निष्क्रिय'}
                        </span>
                    </div>
                    <div class="mt-3 flex gap-2">
                        <button data-edit-committee="${committee._id}" class="action-btn px-3 py-1 rounded-md text-white text-xs" style="background: linear-gradient(135deg,#3b82f6 0%, #2563eb 100%);">Edit</button>
                        <button data-del-committee="${committee._id}" class="action-btn px-3 py-1 rounded-md text-white text-xs" style="background: linear-gradient(135deg,#ef4444 0%, #b91c1c 100%);">Delete</button>
                    </div>
                </div>
            `;
            list.appendChild(card);
        });
        // Bind delete buttons
        list.querySelectorAll('[data-del-committee]').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (!confirm('तुम्हाला खात्री आहे की तुम्ही ही समिती हटवू इच्छिता?')) return;
                const id = btn.getAttribute('data-del-committee');
                try {
                    const resp = await fetch(`${API_BASE_URL}/committees/${id}`, { 
                        method: 'DELETE', 
                        headers: { Authorization: `Bearer ${currentToken }` }
                    });
                    const data = await resp.json();
                    if (data.success) {
                        alert('समिती यशस्वीरित्या हटवली गेली');
                        loadCommittees();
                    } else {
                        alert('समिती हटवताना त्रुटी आली');
                    }
                } catch (e) {
                    console.error('Delete committee failed', e);
                    alert('समिती हटवताना त्रुटी आली');
                }
            });
        });
        // Bind edit buttons
        list.querySelectorAll('[data-edit-committee]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-edit-committee');
                await openEditCommitteeModal(id);
            });
        });
    } catch (e) {
        console.error('Load committees failed', e);
    }
}

// Open edit committee modal
async function openEditCommitteeModal(committeeId) {
    try {
        const res = await fetch(`${API_BASE_URL}/committees/${committeeId}`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        const data = await res.json();
        
        if (!data.success || !data.data) {
            alert('समिती माहिती लोड करताना त्रुटी आली');
            return;
        }
        
        const committee = data.data;
        
        // Populate form fields
        document.getElementById('editCommitteeId').value = committee._id;
        document.getElementById('editCommitteeTitle').value = committee.title || '';
        document.getElementById('editCommitteeTitleMarathi').value = committee.titleMarathi || '';
        document.getElementById('editCommitteeDescription').value = committee.description || '';
        document.getElementById('editCommitteeDescriptionMarathi').value = committee.descriptionMarathi || '';
        document.getElementById('editCommitteePath').value = committee.path || '';
        document.getElementById('editCommitteeOrder').value = committee.order || '';
        document.getElementById('editCommitteeIsActive').value = committee.isActive ? 'true' : 'false';
        
        // Show modal
        const modal = document.getElementById('editCommitteeModal');
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    } catch (e) {
        console.error('Error loading committee for edit:', e);
        alert('समिती माहिती लोड करताना त्रुटी आली');
    }
}

// Close edit committee modal
function closeEditCommitteeModal() {
    const modal = document.getElementById('editCommitteeModal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
    document.getElementById('editCommitteeForm').reset();
}

// Save edited committee
async function saveEditCommittee() {
    try {
        const committeeId = document.getElementById('editCommitteeId').value;
        if (!committeeId) {
            alert('समिती ID आढळले नाही');
            return;
        }
        
        const resp = await fetch(`${API_BASE_URL}/committees/${committeeId}`, {
            method: 'PUT',
            headers: { 
                Authorization: `Bearer ${currentToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: document.getElementById('editCommitteeTitle').value,
                titleMarathi: document.getElementById('editCommitteeTitleMarathi').value,
                description: document.getElementById('editCommitteeDescription').value,
                descriptionMarathi: document.getElementById('editCommitteeDescriptionMarathi').value,
                path: document.getElementById('editCommitteePath').value || undefined,
                order: document.getElementById('editCommitteeOrder').value || undefined,
                isActive: document.getElementById('editCommitteeIsActive').value === 'true'
            })
        });
        
        const data = await resp.json();
        if (!resp.ok || !data.success) {
            alert(data.message || 'समिती अपडेट करताना त्रुटी आली');
            return;
        }
        
        alert('समिती यशस्वीरित्या अपडेट केली गेली!');
        closeEditCommitteeModal();
        loadCommittees();
    } catch (e) {
        console.error('Error updating committee:', e);
        alert('समिती अपडेट करताना त्रुटी आली');
    }
}

// Committee Members Management
// currentCommitteePath is already declared at the top

// Load committee members
async function loadCommitteeMembers() {
    const committeePath = document.getElementById('committeeSelect').value;
    if (!committeePath) {
        alert('कृपया समिती निवडा');
        return;
    }
    
    currentCommitteePath = committeePath;
    
    // Get selected category if Shaley Vyavasthapan Samiti is selected
    const categorySelect = document.getElementById('categorySelect');
    const selectedCategory = (committeePath === 'shaleyvyavasthapansamiti' && categorySelect) 
        ? categorySelect.value 
        : '';
    
    try {
        if (!currentToken) {
            alert('कृपया पुन्हा लॉगिन करा (Please login again)');
            console.error('No authentication token found');
            return;
        }
        
        const apiUrl = `${API_BASE_URL}/committee-members/committee/${committeePath}/all`;
        console.log('Making API call to:', apiUrl);
        console.log('Selected category:', selectedCategory || 'All');
        console.log('Using token:', currentToken ? 'Token exists' : 'No token');
        
        const res = await fetch(apiUrl, {
            headers: { 
                'Authorization': `Bearer ${currentToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response status:', res.status);
        
        let data;
        try {
            data = await res.json();
        } catch (parseError) {
            console.error('Failed to parse JSON response:', parseError);
            const text = await res.text();
            console.error('Response text:', text);
            alert('API Response Error: Invalid JSON');
            return;
        }
        
        const tbody = document.getElementById('committeeMembersTableBody');
        const form = document.getElementById('committeeMemberForm');
        
        if (!tbody) {
            console.error('Table body element not found!');
            return;
        }
        
        tbody.innerHTML = '';
        
        // Filter members by category if category is selected
        let members = data.data || [];
        if (selectedCategory && members.length > 0) {
            members = members.filter(member => 
                member.category === selectedCategory || 
                member.categoryMarathi === (selectedCategory === 'Secondary School' ? 'माध्यमिक विद्यालय' : 'प्राथमिक शाळा')
            );
            console.log(`Filtered to ${members.length} members for category: ${selectedCategory}`);
        }
        
        // Debug logging
        console.log('Committee Path:', committeePath);
        console.log('API URL:', apiUrl);
        console.log('Response Status:', res.status);
        console.log('API Response:', JSON.stringify(data, null, 2));
        
        if (!res.ok) {
            console.error('API Error:', res.status, data);
            const errorMsg = data.message || `HTTP ${res.status}: Failed to load members`;
            alert('API Error: ' + errorMsg);
            tbody.innerHTML = '<tr><td colspan="4" class="text-center py-8 text-red-500">त्रुटी: ' + errorMsg + '</td></tr>';
            if (form) form.classList.remove('hidden');
            return;
        }
        
        console.log('Data check:', {
            hasSuccess: !!data.success,
            hasData: !!data.data,
            isArray: Array.isArray(data.data),
            length: data.data?.length || 0
        });
        
        if (data.success && members && Array.isArray(members) && members.length > 0) {
            console.log(`Displaying ${members.length} members`);
            members.forEach((member, index) => {
                console.log(`Member ${index + 1}:`, member.nameMarathi || member.name);
                const row = document.createElement('tr');
                row.className = 'hover:bg-gray-50';
                row.innerHTML = `
                    <td class="border border-gray-200 px-4 py-3 text-center">${member.srNo}</td>
                    <td class="border border-gray-200 px-4 py-3">${member.nameMarathi || member.name}</td>
                    <td class="border border-gray-200 px-4 py-3">${member.designationMarathi || member.designation || '-'}</td>
                    <td class="border border-gray-200 px-4 py-3">
                        <button data-edit-cm="${member._id}" class="action-btn px-3 py-1 rounded-md text-white text-xs mr-2" style="background: linear-gradient(135deg,#3b82f6 0%, #2563eb 100%);">Edit</button>
                        <button data-del-cm="${member._id}" class="action-btn px-3 py-1 rounded-md text-white text-xs" style="background: linear-gradient(135deg,#ef4444 0%, #b91c1c 100%);">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            
            // Bind edit and delete buttons
            tbody.querySelectorAll('[data-edit-cm]').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const id = btn.getAttribute('data-edit-cm');
                    console.log('Opening edit modal for member:', id);
                    await openEditCommitteeMemberModal(id);
                });
            });
            
            tbody.querySelectorAll('[data-del-cm]').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if (!confirm('तुम्हाला खात्री आहे की तुम्ही हा सदस्य हटवू इच्छिता?')) return;
                    
                    const id = btn.getAttribute('data-del-cm');
                    console.log('Deleting member:', id);
                    
                    try {
                        const resp = await fetch(`${API_BASE_URL}/committee-members/${id}`, {
                            method: 'DELETE',
                            headers: { 
                                Authorization: `Bearer ${currentToken}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        
                        const result = await resp.json();
                        console.log('Delete response:', result);
                        
                        if (resp.ok && result.success) {
                            alert('सदस्य यशस्वीरित्या हटवला गेला');
                            loadCommitteeMembers();
                        } else {
                            alert('सदस्य हटवताना त्रुटी आली: ' + (result.message || 'Unknown error'));
                        }
                    } catch (e) {
                        console.error('Delete committee member failed', e);
                        alert('सदस्य हटवताना त्रुटी आली: ' + e.message);
                    }
                });
            });
            
            // Show form
            if (form) form.classList.remove('hidden');
        } else {
            console.warn('No members found or invalid response structure:', data);
            let message = 'कोणतेही सदस्य नाहीत';
            if (!data.success) {
                message = `त्रुटी: ${data.message || 'Unknown error'}`;
            } else if (!data.data || !Array.isArray(data.data)) {
                message = 'त्रुटी: Invalid response format';
            } else if (members.length === 0) {
                if (selectedCategory) {
                    message = `निवडलेल्या शाळा प्रकारासाठी कोणतेही सदस्य नाहीत (${selectedCategory === 'Secondary School' ? 'माध्यमिक विद्यालय' : 'प्राथमिक शाळा'})`;
                } else {
                    message = 'कोणतेही सदस्य नाहीत';
                }
            }
            tbody.innerHTML = `<tr><td colspan="4" class="text-center py-8 text-gray-500">${message}</td></tr>`;
            if (form) form.classList.remove('hidden');
        }
    } catch (e) {
        console.error('Load committee members failed', e);
        console.error('Error details:', e.message, e.stack);
        alert('समिती सदस्य लोड करताना त्रुटी आली: ' + e.message);
    }
}

// Open edit committee member modal
async function openEditCommitteeMemberModal(memberId) {
    try {
        const res = await fetch(`${API_BASE_URL}/committee-members/${memberId}`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        const data = await res.json();
        
        if (!data.success || !data.data) {
            alert('सदस्य माहिती लोड करताना त्रुटी आली');
            return;
        }
        
        const member = data.data;
        
        // Populate form fields
        document.getElementById('editCmId').value = member._id;
        document.getElementById('editCmSrNo').value = member.srNo || '';
        document.getElementById('editCmName').value = member.name || '';
        document.getElementById('editCmNameMarathi').value = member.nameMarathi || '';
        document.getElementById('editCmDesignation').value = member.designation || '';
        document.getElementById('editCmDesignationMarathi').value = member.designationMarathi || '';
        document.getElementById('editCmPosition').value = member.position || '';
        document.getElementById('editCmPositionMarathi').value = member.positionMarathi || '';
        document.getElementById('editCmAddress').value = member.address || '';
        document.getElementById('editCmAddressMarathi').value = member.addressMarathi || '';
        document.getElementById('editCmMobile').value = member.mobile || '';
        document.getElementById('editCmContact').value = member.contact || '';
        document.getElementById('editCmTaluka').value = member.taluka || '';
        document.getElementById('editCmTalukaMarathi').value = member.talukaMarathi || '';
        document.getElementById('editCmGrampanchayat').value = member.grampanchayat || '';
        document.getElementById('editCmGrampanchayatMarathi').value = member.grampanchayatMarathi || '';
        document.getElementById('editCmCategory').value = member.category || '';
        document.getElementById('editCmCategoryMarathi').value = member.categoryMarathi || '';
        
        // Show modal
        const modal = document.getElementById('editCommitteeMemberModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
    } catch (e) {
        console.error('Error loading committee member for edit:', e);
        alert('सदस्य माहिती लोड करताना त्रुटी आली');
    }
}

// Close edit committee member modal
function closeEditCommitteeMemberModal() {
    const modal = document.getElementById('editCommitteeMemberModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        const form = document.getElementById('editCommitteeMemberForm');
        if (form) form.reset();
    }
}

// Save edited committee member
async function saveEditCommitteeMember() {
    try {
        const memberId = document.getElementById('editCmId').value;
        if (!memberId) {
            alert('सदस्य ID आढळले नाही');
            return;
        }
        
        // Get current committee path
        const committeePath = currentCommitteePath || document.getElementById('committeeSelect').value;
        if (!committeePath) {
            alert('समिती निवडलेली नाही');
            return;
        }
        
        // Build update data object, only including fields that have values
        const updateData = {};
        const srNo = document.getElementById('editCmSrNo').value;
        if (srNo) updateData.srNo = parseInt(srNo);
        
        const name = document.getElementById('editCmName').value.trim();
        if (name) updateData.name = name;
        
        const nameMarathi = document.getElementById('editCmNameMarathi').value.trim();
        if (nameMarathi) updateData.nameMarathi = nameMarathi;
        
        const designation = document.getElementById('editCmDesignation').value.trim();
        if (designation) updateData.designation = designation;
        
        const designationMarathi = document.getElementById('editCmDesignationMarathi').value.trim();
        if (designationMarathi) updateData.designationMarathi = designationMarathi;
        
        const position = document.getElementById('editCmPosition').value.trim();
        if (position) updateData.position = position;
        
        const positionMarathi = document.getElementById('editCmPositionMarathi').value.trim();
        if (positionMarathi) updateData.positionMarathi = positionMarathi;
        
        const address = document.getElementById('editCmAddress').value.trim();
        if (address) updateData.address = address;
        
        const addressMarathi = document.getElementById('editCmAddressMarathi').value.trim();
        if (addressMarathi) updateData.addressMarathi = addressMarathi;
        
        const mobile = document.getElementById('editCmMobile').value.trim();
        if (mobile) updateData.mobile = mobile;
        
        const contact = document.getElementById('editCmContact').value.trim();
        if (contact) updateData.contact = contact;
        
        const taluka = document.getElementById('editCmTaluka').value.trim();
        if (taluka) updateData.taluka = taluka;
        
        const talukaMarathi = document.getElementById('editCmTalukaMarathi').value.trim();
        if (talukaMarathi) updateData.talukaMarathi = talukaMarathi;
        
        const grampanchayat = document.getElementById('editCmGrampanchayat').value.trim();
        if (grampanchayat) updateData.grampanchayat = grampanchayat;
        
        const grampanchayatMarathi = document.getElementById('editCmGrampanchayatMarathi').value.trim();
        if (grampanchayatMarathi) updateData.grampanchayatMarathi = grampanchayatMarathi;
        
        const category = document.getElementById('editCmCategory').value.trim();
        if (category) updateData.category = category;
        
        const categoryMarathi = document.getElementById('editCmCategoryMarathi').value.trim();
        if (categoryMarathi) updateData.categoryMarathi = categoryMarathi;
        
        console.log('Updating member:', memberId, 'with data:', updateData);
        
        const resp = await fetch(`${API_BASE_URL}/committee-members/${memberId}`, {
            method: 'PUT',
            headers: { 
                Authorization: `Bearer ${currentToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });
        
        const data = await resp.json();
        console.log('Update response:', data);
        
        if (!resp.ok || !data.success) {
            alert(data.message || 'सदस्य अपडेट करताना त्रुटी आली');
            return;
        }
        
        alert('सदस्य यशस्वीरित्या अपडेट केला गेला!');
        closeEditCommitteeMemberModal();
        loadCommitteeMembers();
    } catch (e) {
        console.error('Error updating committee member:', e);
        alert('सदस्य अपडेट करताना त्रुटी आली: ' + e.message);
    }
}

// Show login page
function showLoginPage() {
    const loginPage = document.getElementById('loginPage');
    const adminPanel = document.getElementById('adminPanel');
    
    if (loginPage) {
        loginPage.classList.remove('hidden');
        loginPage.style.display = 'flex';
    }
    if (adminPanel) {
        adminPanel.classList.add('hidden');
        adminPanel.style.display = 'none';
    }
    console.log('Login page shown');
}

// Show admin panel
function showAdminPanel() {
    const loginPage = document.getElementById('loginPage');
    const adminPanel = document.getElementById('adminPanel');
    
    if (loginPage) {
        loginPage.classList.add('hidden');
        loginPage.style.display = 'none';
    }
    if (adminPanel) {
        adminPanel.classList.remove('hidden');
        adminPanel.style.display = 'block';
    }
    console.log('Admin panel shown');
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    const overlay = document.getElementById('sidebarOverlay');
    
    // Toggle sidebar classes
    sidebar.classList.toggle('collapsed');
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('expanded');
    
    // Toggle overlay for mobile
    if (overlay) {
        overlay.classList.toggle('active');
    }
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
        'takrar-suchana': 'तक्रार सूचना',
        'banners': 'बॅनर व्यवस्थापन',
        'gallery': 'गॅलेरी व्यवस्थापन',
        'events': 'उपक्रम व्यवस्थापन',
        'members': 'मुख्य सदस्य व्यवस्थापन',
        'committees': 'समिती व्यवस्थापन',
        'committeeMembers': 'समितीचे सदस्य व्यवस्थापन'
    };
    pageTitle.textContent = titles[section] || section;
    
    // Close sidebar on mobile after navigation
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    // Check if we're on mobile and sidebar is open
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // On mobile, remove 'open' class to hide sidebar
        sidebar.classList.remove('open');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
    
    // Hide all content sections
    document.getElementById('dashboardContent').classList.add('hidden');
    document.getElementById('allSubmissionsContent').classList.add('hidden');
    document.getElementById('formSectionContent').classList.add('hidden');
    const bannersContent = document.getElementById('bannersContent');
    const galleryContent = document.getElementById('galleryContent');
    const eventsContent = document.getElementById('eventsContent');
    const membersContent = document.getElementById('membersContent');
    const committeesContent = document.getElementById('committeesContent');
    const committeeMembersContent = document.getElementById('committeeMembersContent');
    if (bannersContent) bannersContent.classList.add('hidden');
    if (galleryContent) galleryContent.classList.add('hidden');
    if (eventsContent) eventsContent.classList.add('hidden');
    if (membersContent) membersContent.classList.add('hidden');
    if (committeesContent) committeesContent.classList.add('hidden');
    if (committeeMembersContent) committeeMembersContent.classList.add('hidden');
    
    currentSection = section;
    
    // Show appropriate content
    if (section === 'dashboard') {
        document.getElementById('dashboardContent').classList.remove('hidden');
        loadRecentSubmissions();
    } else if (section === 'all-submissions') {
        document.getElementById('allSubmissionsContent').classList.remove('hidden');
        loadSubmissions();
    } else if (section === 'banners') {
        document.getElementById('bannersContent').classList.remove('hidden');
        loadBanners();
    } else if (section === 'gallery') {
        document.getElementById('galleryContent').classList.remove('hidden');
        loadGallery();
    } else if (section === 'events') {
        document.getElementById('eventsContent').classList.remove('hidden');
        loadEvents();
    } else if (section === 'members') {
        document.getElementById('membersContent').classList.remove('hidden');
        loadMembers();
    } else if (section === 'committees') {
        document.getElementById('committeesContent').classList.remove('hidden');
        loadCommittees();
    } else if (section === 'committeeMembers') {
        document.getElementById('committeeMembersContent').classList.remove('hidden');
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
            // Handle both response formats: data.data.token or data.token
            const token = data.data?.token || data.token || data.data;
            if (!token) {
                throw new Error('Token not received from server');
            }
            
            currentToken = token;
            localStorage.setItem('adminToken', currentToken);
            console.log('Token saved to localStorage');
            
            const userEmail = data.data?.user?.email || data.user?.email || email;
            if (document.getElementById('adminEmail')) {
                document.getElementById('adminEmail').textContent = userEmail;
            }
            
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