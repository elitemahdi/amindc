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
        { label: "Total Counselling", value: 275, change: "+1.25%", trend: "up", icon: "bi-file-text", color: "primary" },
        { label: "Completed Counselling", value: 105, change: "+4.56%", trend: "up", icon: "bi-check-circle", color: "primary" },
        { label: "Pending Counselling", value: 153, change: "-0.78%", trend: "down", icon: "bi-hourglass-split", color: "primary" },
        { label: "Cancelled Counselling", value: 17, change: "+3.62%", trend: "up", icon: "bi-file-x", color: "primary" }
    ],
    allAppointments: [
        { date: "2025-09-17", name: "Amanda Richards", doctor: "Dr. Paul Carter", time: "09:00 AM", status: "Completed", img: 1 },
        { date: "2025-09-17", name: "Javier Davidson", doctor: "Dr. Bella Stevens", time: "11:30 AM", status: "Completed", img: 3 },
        { date: "2025-09-17", name: "Liam Thompson", doctor: "Dr. Laurent Blake", time: "01:45 PM", status: "Pending", img: 8 },
        { date: "2025-09-17", name: "Olivia Martinez", doctor: "Dr. Gemma O'Connor", time: "03:00 PM", status: "Cancelled", img: 20 },
        { date: "2025-09-18", name: "Robert Smith", doctor: "Dr. Laura Mitchell", time: "10:00 AM", status: "Pending", img: 12 },
        { date: "2025-09-19", name: "Jessica Adams", doctor: "Dr. Mark Peterson", time: "02:00 PM", status: "Ongoing", img: 5 }
    ],
    pendingAppointments: [
        { name: "Liam Thompson", doctor: "Dr. Laurent Blake", type: "Family Counseling", date: "2028-09-20", time: "01:45 PM", img: 8, actionRequired: true },
        { name: "Robert Smith", doctor: "Dr. Laura Mitchell", type: "Group Counseling", date: "2028-09-21", time: "10:30 AM", img: 12, actionRequired: false },
        { name: "Jessica Adams", doctor: "Dr. Mark Peterson", type: "Trauma Counseling", date: "2028-09-21", time: "12:00 PM", img: 5, actionRequired: false }
    ],
    cancelledAppointments: [
        { name: "Samantha Brown", type: "Cognitive Behavioral Therapy", doctor: "Dr. Paul Carter", date: "2028-09-20", time: "02:30 PM", img: 9, notifyRequired: true },
        { name: "Olivia Martinez", type: "Couples Counseling", doctor: "Dr. Gemma", date: "2028-09-20", time: "03:00 PM", img: 20, notifyRequired: false },
        { name: "Jacob Thompson", type: "Individual Counseling", doctor: "Dr. Paul Carter", date: "2028-09-19", time: "11:30 AM", img: 3, notifyRequired: false }
    ],
    tableData: [
        { id: "MDF-001", date: "2028-09-20", time: "03:00 PM", name: "Olivia Martinez", age: 32, gender: "Female", doctor: "Dr. Gemma O'Connor", appointFor: "Couples Counselling", type: "Couples Counselling", status: "Completed", img: 20 },
        { id: "MDF-002", date: "2028-09-20", time: "02:30 PM", name: "Samantha Brown", age: 28, gender: "Female", doctor: "Dr. Paul Carter", appointFor: "Cognitive Therapy", type: "Individual Counseling", status: "Ongoing", img: 9 },
        { id: "MDF-003", date: "2028-09-21", time: "10:00 AM", name: "Robert Smith", age: 45, gender: "Male", doctor: "Dr. Laura Mitchell", appointFor: "Trauma Therapy", type: "Group Counseling", status: "Pending", img: 12 }
    ]
};


const SidebarItem = (page) => `
    <a class="nav-link ${page.active ? 'active' : ''}" href="#" onclick="navigate('${page.name}'); return false;">
        <i class="bi ${page.icon}"></i> ${page.name}
        ${page.badge ? `<span class="badge bg-danger ms-auto rounded-pill">${page.badge}</span>` : ''}
    </a>
`;

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
                <div class="rounded-3 bg-${stat.color} text-white d-flex align-items-center justify-content-center shadow-sm" style="width: 32px; height: 32px;">
                    <i class="bi ${stat.icon} fs-6"></i>
                </div>
            </div>
        </div>
    </div>`;

const ListItem = (item) => {
    let statusColor = 'text-muted';
    if (item.status === 'Completed') statusColor = 'text-primary';
    if (item.status === 'Pending') statusColor = 'text-danger';
    if (item.status === 'Ongoing') statusColor = 'text-info';

    return `
    <div class="list-group-item px-0 d-flex align-items-center gap-3 border-0 mb-3">
        <img src="https://i.pravatar.cc/150?img=${item.img}" class="avatar-sm">
        <div class="flex-grow-1">
            <h6 class="fw-bold m-0" style="font-size: 0.9rem;">${item.name}</h6>
            <small class="text-muted" style="font-size: 0.75rem;">${item.doctor}</small>
        </div>
        <div class="text-end">
            <div class="fw-bold small mb-1">${item.time}</div>
            <small class="${statusColor} fw-medium" style="font-size: 0.75rem;">${item.status}</small>
        </div>
    </div>`;
};

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

const TableRow = (row) => `
    <tr>
        <td><input class="form-check-input cursor-pointer" type="checkbox"></td>
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
        <td><span class="d-block text-dark">${row.doctor}</span></td>
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


let calendarState = {
    currentDate: new Date(2025, 8, 17),
    selectedDate: "2025-09-17"
};

function formatDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getWeekDays(refDate) {
    const startOfWeek = new Date(refDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);

    const days = [];
    for (let i = 0; i < 7; i++) {
        const loopDate = new Date(startOfWeek);
        loopDate.setDate(startOfWeek.getDate() + i);
        days.push(loopDate);
    }
    return days;
}

function renderCalendar() {
    const strip = document.getElementById('calendar-strip');
    if (!strip) return;

    const daysToShow = getWeekDays(calendarState.currentDate);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let html = `
        <button class="calendar-nav-btn" onclick="changeWeek(-7)">
            <i class="bi bi-chevron-left"></i>
        </button>
        <div class="d-flex justify-content-around flex-grow-1">
    `;

    html += daysToShow.map(date => {
        const dateKey = formatDateKey(date);
        const isActive = dateKey === calendarState.selectedDate;
        const dayNum = date.getDate();
        const dayName = dayNames[date.getDay()];

        return `
            <div class="calendar-day ${isActive ? 'active' : ''}" onclick="selectDate('${dateKey}')">
                <small class="${isActive ? 'text-white-50' : 'text-muted'}" style="font-size: 0.7rem;">${dayName}</small>
                <div class="fw-bold fs-6">${dayNum}</div>
            </div>
        `;
    }).join('');

    html += `
        </div>
        <button class="calendar-nav-btn" onclick="changeWeek(7)">
            <i class="bi bi-chevron-right"></i>
        </button>
    `;

    strip.innerHTML = html;
    renderAppointmentList();
}

function renderAppointmentList(appointments) {
    const listContainer = document.getElementById('todays-list');
    if (!listContainer) return;

    if (!appointments || appointments.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center py-4 text-muted">
                <i class="bi bi-calendar-x fs-1 opacity-25"></i>
                <p class="mt-2 small">No appointments for this date.</p>
            </div>
        `;
        return;
    }
    listContainer.innerHTML = appointments.map(ListItem).join('');
}

function changeWeek(daysToAdd) {
    calendarState.currentDate.setDate(calendarState.currentDate.getDate() + daysToAdd);
    renderCalendar();
}

function selectDate(dateString) {
    calendarState.selectedDate = dateString;
    renderCalendar();
    fetchAppointments(dateString);
}

function fetchAppointments(date) {
    const listContainer = document.getElementById('todays-list');

    listContainer.innerHTML = `
        <div class="text-center py-4">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-2 text-muted small">Loading schedule...</p>
        </div>
    `;

    fetch(`get_calendar_data_ajax.php?date=${date}`)
        .then(response => response.json())
        .then(data => {
            renderAppointmentList(data);
        })
        .catch(error => {
            console.error('Error:', error);
            listContainer.innerHTML = `
                <div class="text-center py-4 text-danger">
                    <p class="small">Failed to load data.</p>
                </div>`;
        });
}


function renderDashboardContent() {
    document.getElementById('stats-container').innerHTML = dashboardData.stats.map(StatCard).join('');
    renderCalendar();
    fetchAppointments(calendarState.selectedDate);
    const pendingContainer = document.getElementById('pending-list');
    if (pendingContainer) pendingContainer.innerHTML = dashboardData.pendingAppointments.map(PendingCard).join('');
    const cancelledContainer = document.getElementById('cancelled-list');
    if (cancelledContainer) cancelledContainer.innerHTML = dashboardData.cancelledAppointments.map(CancelledCard).join('');
    const tableBody = document.getElementById('table-body');
    if (tableBody) tableBody.innerHTML = dashboardData.tableData.map(TableRow).join('');
}
function renderSidebar() {
    document.getElementById('sidebar-container').innerHTML = pages.map(page => SidebarItem(page)).join('');
}

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