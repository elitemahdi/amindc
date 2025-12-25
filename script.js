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

const dashboardData = {
    stats: [
        { label: "Total Counselling", value: 275, change: "+1.25%", trend: "up", icon: "bi-chat-dots", color: "primary" },
        { label: "Completed", value: 105, change: "+4.56%", trend: "up", icon: "bi-check-lg", color: "primary" },
        { label: "Pending", value: 153, change: "-0.78%", trend: "down", icon: "bi-clock", color: "primary" },
        { label: "Cancelled", value: 17, change: "+3.62%", trend: "up", icon: "bi-x-lg", color: "primary" }
    ],
    tableData: [
        {
            id: "MDF-001",
            date: "2028-09-20",
            time: "03:00 PM",
            name: "Olivia Martinez",
            age: 32,
            gender: "Female",
            doctor: "Dr. Gemma O'Connor",
            appointFor: "Couples Counselling",
            type: "Couples Counselling",
            status: "Completed",
            img: 20
        },
        {
            id: "MDF-002",
            date: "2028-09-20",
            time: "02:30 PM",
            name: "Samantha Brown",
            age: 28,
            gender: "Female",
            doctor: "Dr. Paul Carter",
            appointFor: "Cognitive Therapy",
            type: "Individual Counseling",
            status: "Ongoing",
            img: 9
        },
        {
            id: "MDF-003",
            date: "2028-09-21",
            time: "10:00 AM",
            name: "Robert Smith",
            age: 45,
            gender: "Male",
            doctor: "Dr. Laura Mitchell",
            appointFor: "Trauma Therapy",
            type: "Group Counseling",
            status: "Pending",
            img: 12
        }
    ],
    pendingAppointments: [
        {
            name: "Liam Thompson",
            doctor: "Dr. Laurent Blake",
            type: "Family Counseling",
            date: "2028-09-20",
            time: "01:45 PM",
            img: 8,
            actionRequired: true
        },
        {
            name: "Robert Smith",
            doctor: "Dr. Laura Mitchell",
            type: "Group Counseling",
            date: "2028-09-21",
            time: "10:30 AM",
            img: 12,
            actionRequired: false
        },
        {
            name: "Jessica Adams",
            doctor: "Dr. Mark Peterson",
            type: "Trauma Counseling",
            date: "2028-09-21",
            time: "12:00 PM",
            img: 5,
            actionRequired: false
        }
    ],
    cancelledAppointments: [
        {
            name: "Samantha Brown",
            type: "Cognitive Behavioral Therapy",
            doctor: "Dr. Paul Carter",
            date: "2028-09-20",
            time: "02:30 PM",
            img: 9,
            notifyRequired: true
        },
        {
            name: "Olivia Martinez",
            type: "Couples Counseling",
            doctor: "Dr. Gemma",
            date: "2028-09-20",
            time: "03:00 PM",
            img: 20,
            notifyRequired: false
        },
        {
            name: "Jacob Thompson",
            type: "Individual Counseling",
            doctor: "Dr. Paul Carter",
            date: "2028-09-19",
            time: "11:30 AM",
            img: 3,
            notifyRequired: false
        }
    ],
};

const StatCard = (stat) => `
    <div class="col-lg-3 col-md-6 mb-3">
        <div class="card p-3 h-100">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <small class="text-muted">${stat.label}</small>
                    <h3 class="fw-bold my-1">${stat.value}</h3>
                    <small class="text-${stat.trend === 'up' ? 'success' : 'danger'}">
                        <i class="bi bi-graph-${stat.trend}"></i> ${stat.change}
                    </small>
                </div>
                
                <div class="rounded-3 bg-${stat.color} text-white d-flex align-items-center justify-content-center shadow-sm" 
                     style="width: 32px; height: 32px;">
                    <i class="bi ${stat.icon} fs-6"></i>
                </div>

            </div>
        </div>
    </div>`;

const TableRow = (row) => `
    <tr>
        <td>
            <input class="form-check-input cursor-pointer" type="checkbox">
        </td>
        <td><span class="text-primary fw-medium">${row.id}</span></td>
        <td>
            <div class="d-flex flex-column">
                <span>${row.date}</span>
                <span class="text-muted small" style="font-size: 0.75rem;">${row.time}</span>
            </div>
        </td>
        <td>
            <div class="d-flex align-items-center gap-2">
                <img src="https://i.pravatar.cc/150?img=${row.img}" class="avatar-sm">
                <span class="fw-medium">${row.name}</span>
            </div>
        </td>
        <td class="text-muted">${row.age}</td>
        <td class="text-muted">${row.gender}</td>
        <td>
            <span class="d-block text-dark">${row.doctor}</span>
        </td>
        <td class="text-dark">${row.appointFor}</td>
        
        <td>
            <div class="d-flex align-items-center gap-2">
                <div class="rounded-circle bg-${row.status === 'Completed' ? 'success' : (row.status === 'Ongoing' ? 'primary' : 'danger')}" style="width: 6px; height: 6px;"></div>
                <span class="small">${row.type}</span>
            </div>
        </td>
        <td>
            <span class="status-badge ${row.status === 'Completed' ? 'st-completed' : (row.status === 'Ongoing' ? 'st-ongoing' : 'st-pending')}">
                ${row.status}
            </span>
        </td>
    </tr>`;


const PendingCard = (item) => {
    if (item.actionRequired) {
        return `
        <div class="card p-3 mb-3 bg-white border border-primary border-1 shadow-sm">
            <div class="d-flex align-items-center gap-3 mb-3">
                <img src="https://i.pravatar.cc/150?img=${item.img}" class="avatar">
                <div>
                    <h6 class="fw-bold m-0" style="font-size: 0.9rem;">${item.name}</h6>
                    <div class="small text-muted" style="font-size: 0.75rem;">${item.doctor}</div>
                    <small class="text-primary" style="font-size: 0.7rem;">${item.type}</small>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
                 <small class="text-muted fw-bold" style="font-size: 0.75rem;">${item.date}</small>
                 <small class="text-muted fw-bold" style="font-size: 0.75rem;">${item.time}</small>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-light-custom w-50 rounded-pill fw-bold py-2" style="font-size: 0.75rem;">Reject</button>
                <button class="btn btn-sm btn-primary-custom w-50 rounded-pill fw-bold py-2" style="font-size: 0.75rem;">Accept</button>
            </div>
        </div>`;
    } else {
        return `
        <div class="card p-3 mb-3 bg-smooth-gray">
            <div class="d-flex align-items-center gap-3 mb-2">
                <img src="https://i.pravatar.cc/150?img=${item.img}" class="avatar">
                <div>
                    <h6 class="fw-bold m-0" style="font-size: 0.9rem;">${item.name}</h6>
                    <small class="text-muted" style="font-size: 0.75rem;">${item.type}</small>
                </div>
            </div>
            <div class="d-flex justify-content-between mt-2">
                <div class="small text-muted" style="font-size: 0.7rem;">${item.doctor}</div>
                <div class="text-end">
                    <div class="small text-muted" style="font-size: 0.7rem;">${item.date}</div>
                    <div class="small text-muted" style="font-size: 0.7rem;">${item.time}</div>
                </div>
            </div>
        </div>`;
    }
};

const CancelledCard = (item) => {
    if (item.notifyRequired) {
        return `
        <div class="card p-3 mb-3 border-0 shadow-sm" style="background-color: rgba(140, 119, 236, 0.2);">
            <div class="d-flex align-items-start gap-3 mb-2">
                <img src="https://i.pravatar.cc/150?img=${item.img}" class="avatar">
                <div>
                    <h6 class="fw-bold m-0 text-dark" style="font-size: 0.9rem;">${item.name}</h6>
                    <div class="small text-muted" style="font-size: 0.7rem;">${item.date}, ${item.time}</div>
                    <div class="small text-dark mt-1" style="font-size: 0.75rem;">${item.type}</div>
                    <div class="small text-muted" style="font-size: 0.7rem;">${item.doctor}</div>
                </div>
            </div>
            <button class="btn btn-primary-custom w-100 btn-sm rounded-pill mt-2 shadow-sm fw-bold py-2" style="font-size: 0.75rem;">Notify Doctor</button>
        </div>`;
    } else {
        return `
        <div class="card p-3 mb-3 bg-smooth-gray">
            <div class="d-flex align-items-start gap-3">
                <img src="https://i.pravatar.cc/150?img=${item.img}" class="avatar">
                <div>
                    <h6 class="fw-bold m-0" style="font-size: 0.9rem;">${item.name}</h6>
                    <div class="small text-muted" style="font-size: 0.7rem;">${item.date}, ${item.time}</div>
                    <div class="small text-muted mt-1" style="font-size: 0.75rem;">${item.type}</div>
                </div>
            </div>
        </div>`;
    }
};

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
    renderDashboardContent();
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
    if (pageName === 'Counselling') {
        dashboardView.classList.remove('d-none');
        genericView.classList.add('d-none');
    } else {
        dashboardView.classList.add('d-none');
        genericView.classList.remove('d-none');
        genericTitle.innerText = pageName;
    }
}

function renderDashboardContent() {
    document.getElementById('stats-container').innerHTML = dashboardData.stats.map(StatCard).join('');
    const tableBody = document.getElementById('table-body');
    if (tableBody) {
        tableBody.innerHTML = dashboardData.tableData.map(TableRow).join('');
    }
    const pendingContainer = document.getElementById('pending-list');
    if (pendingContainer) {
        pendingContainer.innerHTML = dashboardData.pendingAppointments.map(PendingCard).join('');
    }
    const cancelledContainer = document.getElementById('cancelled-list');
    if (cancelledContainer) {
        cancelledContainer.innerHTML = dashboardData.cancelledAppointments.map(CancelledCard).join('');
    }
}