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

function renderSidebar() {
    document.getElementById('sidebar-container').innerHTML = pages.map(page => SidebarItem(page)).join('');
}