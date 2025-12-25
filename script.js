const pages = [
    { name: 'Dashboard', icon: 'bi-grid' },
    { name: 'Counselling', icon: 'bi-chat-quote', active: true },
    { name: 'Doctors', icon: 'bi-activity' },
    { name: 'Patients', icon: 'bi-people' },
    { name: 'Departments', icon: 'bi-hospital' },
    { name: 'Medicines', icon: 'bi-capsule' },
    { name: 'Invoices', icon: 'bi-receipt' },
    { name: 'Emails', icon: 'bi-envelope', badge: 6 }
];

const SidebarItem = (page) => `
    <a class="nav-link ${page.active ? 'active' : ''}" href="#" onclick="navigate('${page.name}'); return false;">
        <i class="bi ${page.icon}"></i> ${page.name}
        ${page.badge ? `<span class="badge bg-danger ms-auto rounded-pill">${page.badge}</span>` : ''}
    </a>
`;

function renderSidebar() {
    document.getElementById('sidebar-container').innerHTML = pages.map(page => SidebarItem(page)).join('');
}

function initSidebarToggle() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const closeBtn = document.getElementById('sidebar-close');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
    toggleBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
}

document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    initSidebarToggle();
});

function navigate(pageName) {
    pages.forEach(p => p.active = (p.name === pageName));
    renderSidebar();
    document.getElementById('page-title').innerText = pageName;

    const dashboardView = document.getElementById('dashboard-view');
    const genericView = document.getElementById('generic-view');
    const genericTitle = document.getElementById('generic-page-name');

    if (window.innerWidth < 992) {
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('sidebar-overlay').classList.remove('active');
    }

    dashboardView.classList.add('d-none');
    genericView.classList.remove('d-none');
    genericTitle.innerText = pageName;
}