// Mock Data for CryptoLedger Reimbursement System Prototype
// This is STATIC data for demonstration purposes only - NO backend functionality

const mockData = {
    // Current logged in user (changes based on role selection)
    currentUser: null,

    // Users in the system
    users: [
        { id: 'EMP001', name: 'John Tan', email: 'john.tan@company.com', role: 'employee', dept_id: 'D01', dept_name: 'Engineering', status: 'active' },
        { id: 'EMP002', name: 'Sarah Lee', email: 'sarah.lee@company.com', role: 'employee', dept_id: 'D01', dept_name: 'Engineering', status: 'active' },
        { id: 'EMP003', name: 'Michael Wong', email: 'michael.wong@company.com', role: 'employee', dept_id: 'D02', dept_name: 'Marketing', status: 'active' },
        { id: 'MGR001', name: 'David Chen', email: 'david.chen@company.com', role: 'manager', dept_id: 'D01', dept_name: 'Engineering', status: 'active' },
        { id: 'MGR002', name: 'Lisa Ng', email: 'lisa.ng@company.com', role: 'manager', dept_id: 'D02', dept_name: 'Marketing', status: 'active' },
        { id: 'FIN001', name: 'Robert Lim', email: 'robert.lim@company.com', role: 'finance', dept_id: 'FIN', dept_name: 'Finance', status: 'active' },
        { id: 'ADM001', name: 'Admin User', email: 'admin@company.com', role: 'admin', dept_id: 'ADMIN', dept_name: 'Administration', status: 'active' }
    ],

    // Departments
    departments: [
        { id: 'D01', name: 'Engineering', budget: 50000, spent: 32450 },
        { id: 'D02', name: 'Marketing', budget: 35000, spent: 18900 },
        { id: 'D03', name: 'Sales', budget: 40000, spent: 25600 },
        { id: 'D04', name: 'HR', budget: 25000, spent: 12300 }
    ],

    // Projects
    projects: [
        { id: 'P001', name: 'Mobile App Development', dept_id: 'D01' },
        { id: 'P002', name: 'Cloud Migration', dept_id: 'D01' },
        { id: 'P003', name: 'Q1 Marketing Campaign', dept_id: 'D02' },
        { id: 'P004', name: 'Brand Refresh', dept_id: 'D02' },
        { id: 'P005', name: 'Sales Training Program', dept_id: 'D03' }
    ],

    // Categories
    categories: [
        'Office Supplies',
        'Travel & Accommodation',
        'Equipment & Hardware',
        'Software & Licenses',
        'Training & Development',
        'Marketing Materials',
        'Client Entertainment',
        'Utilities',
        'Other'
    ],

    // Reimbursement records
    reimbursements: [
        {
            id: 'RMB001',
            user_id: 'EMP001',
            user_name: 'John Tan',
            dept_id: 'D01',
            dept_name: 'Engineering',
            project_id: 'P001',
            project_name: 'Mobile App Development',
            amount: 1500,
            category: 'Software & Licenses',
            description: 'Adobe Creative Cloud subscription for UI design',
            vendor: 'Adobe Systems',
            date: '2026-02-01',
            status: 'pending',
            manager_status: 'pending',
            finance_status: 'pending',
            submitted_date: '2026-02-01T10:30:00',
            encrypted_layer1: 'k3jd92js8dks02k...', // Mock encrypted data
            encrypted_layer2: '9dkf03jd2k3j4k5...', // Mock encrypted data
            encryption_status: 'Layer 1 + Layer 2 Encrypted',
            signature_verified: true
        },
        {
            id: 'RMB002',
            user_id: 'EMP001',
            user_name: 'John Tan',
            dept_id: 'D01',
            dept_name: 'Engineering',
            project_id: 'P002',
            project_name: 'Cloud Migration',
            amount: 2300,
            category: 'Equipment & Hardware',
            description: 'External SSD for data backup',
            vendor: 'Samsung Electronics',
            date: '2026-01-28',
            status: 'approved',
            manager_status: 'approved',
            finance_status: 'approved',
            submitted_date: '2026-01-28T14:20:00',
            approved_date: '2026-01-29T09:15:00',
            encrypted_layer1: 'a8dk39jd9sk3j2k...',
            encrypted_layer2: 'p9dk38jd8sk2j1k...',
            encryption_status: 'Layer 1 + Layer 2 Encrypted',
            signature_verified: true
        },
        {
            id: 'RMB003',
            user_id: 'EMP002',
            user_name: 'Sarah Lee',
            dept_id: 'D01',
            dept_name: 'Engineering',
            project_id: 'P001',
            project_name: 'Mobile App Development',
            amount: 850,
            category: 'Office Supplies',
            description: 'Whiteboard markers and sticky notes for sprint planning',
            vendor: 'Office Depot',
            date: '2026-02-03',
            status: 'pending',
            manager_status: 'pending',
            finance_status: 'pending',
            submitted_date: '2026-02-03T11:45:00',
            encrypted_layer1: 'x7dk29jd7sk1j9k...',
            encrypted_layer2: 'q8dk37jd6sk0j8k...',
            encryption_status: 'Layer 1 + Layer 2 Encrypted',
            signature_verified: true
        },
        {
            id: 'RMB004',
            user_id: 'EMP003',
            user_name: 'Michael Wong',
            dept_id: 'D02',
            dept_name: 'Marketing',
            project_id: 'P003',
            project_name: 'Q1 Marketing Campaign',
            amount: 4500,
            category: 'Marketing Materials',
            description: 'Promotional banners and brochures printing',
            vendor: 'PrintHub Solutions',
            date: '2026-01-25',
            status: 'approved',
            manager_status: 'approved',
            finance_status: 'approved',
            submitted_date: '2026-01-25T16:00:00',
            approved_date: '2026-01-27T10:30:00',
            encrypted_layer1: 'b6dk18jd5sk9j7k...',
            encrypted_layer2: 'r7dk26jd4sk8j6k...',
            encryption_status: 'Layer 1 + Layer 2 Encrypted',
            signature_verified: true
        },
        {
            id: 'RMB005',
            user_id: 'EMP003',
            user_name: 'Michael Wong',
            dept_id: 'D02',
            dept_name: 'Marketing',
            project_id: 'P004',
            project_name: 'Brand Refresh',
            amount: 3200,
            category: 'Software & Licenses',
            description: 'Canva Pro annual subscription for design team',
            vendor: 'Canva Pty Ltd',
            date: '2026-02-05',
            status: 'pending',
            manager_status: 'pending',
            finance_status: 'pending',
            submitted_date: '2026-02-05T09:20:00',
            encrypted_layer1: 'c5dk07jd3sk7j5k...',
            encrypted_layer2: 's6dk15jd2sk6j4k...',
            encryption_status: 'Layer 1 + Layer 2 Encrypted',
            signature_verified: true
        },
        {
            id: 'RMB006',
            user_id: 'EMP001',
            user_name: 'John Tan',
            dept_id: 'D01',
            dept_name: 'Engineering',
            project_id: 'P001',
            project_name: 'Mobile App Development',
            amount: 680,
            category: 'Training & Development',
            description: 'Udemy course on Flutter development',
            vendor: 'Udemy Inc',
            date: '2026-01-20',
            status: 'rejected',
            manager_status: 'rejected',
            finance_status: 'n/a',
            submitted_date: '2026-01-20T13:10:00',
            rejected_date: '2026-01-22T11:00:00',
            rejection_reason: 'Similar course already purchased last month',
            encrypted_layer1: 'd4dk96jd1sk5j3k...',
            encrypted_layer2: 't5dk04jd0sk4j2k...',
            encryption_status: 'Layer 1 + Layer 2 Encrypted',
            signature_verified: true
        }
    ],

    // Audit logs
    auditLogs: [
        { id: 'AUD001', user_id: 'FIN001', user_name: 'Robert Lim', action: 'K_session Requested', scope: 'All Departments', timestamp: '2026-02-07T14:30:00', duration: '2 hours', reason: 'Monthly financial audit' },
        { id: 'AUD002', user_id: 'FIN001', user_name: 'Robert Lim', action: 'Viewed Reimbursement', record_id: 'RMB001', timestamp: '2026-02-07T14:35:00' },
        { id: 'AUD003', user_id: 'MGR001', user_name: 'David Chen', action: 'Approved Reimbursement', record_id: 'RMB002', timestamp: '2026-01-29T09:15:00' },
        { id: 'AUD004', user_id: 'MGR001', user_name: 'David Chen', action: 'Rejected Reimbursement', record_id: 'RMB006', timestamp: '2026-01-22T11:00:00' }
    ]
};

// Helper functions
const mockHelpers = {
    // Get reimbursements for a specific user
    getUserReimbursements(userId) {
        return mockData.reimbursements.filter(r => r.user_id === userId);
    },

    // Get pending reimbursements for a department
    getDepartmentPending(deptId) {
        return mockData.reimbursements.filter(r => r.dept_id === deptId && r.status === 'pending');
    },

    // Get all pending reimbursements (for finance)
    getAllPending() {
        return mockData.reimbursements.filter(r => r.status === 'pending');
    },

    // Get statistics for employee
    getEmployeeStats(userId) {
        const userReimb = this.getUserReimbursements(userId);
        return {
            total: userReimb.reduce((sum, r) => sum + r.amount, 0),
            pending: userReimb.filter(r => r.status === 'pending').length,
            approved: userReimb.filter(r => r.status === 'approved').length,
            rejected: userReimb.filter(r => r.status === 'rejected').length
        };
    },

    // Get statistics for department manager
    getDepartmentStats(deptId) {
        const deptReimb = mockData.reimbursements.filter(r => r.dept_id === deptId);
        return {
            total: deptReimb.reduce((sum, r) => sum + r.amount, 0),
            pending: deptReimb.filter(r => r.status === 'pending').length,
            approved: deptReimb.filter(r => r.status === 'approved').length,
            teamMembers: mockData.users.filter(u => u.dept_id === deptId && u.role === 'employee').length,
            avgProcessingTime: '1.5 days' // Mock value
        };
    },

    // Get statistics for finance
    getFinanceStats() {
        return {
            totalCompany: mockData.reimbursements.reduce((sum, r) => sum + r.amount, 0),
            pending: mockData.reimbursements.filter(r => r.status === 'pending').length,
            approved: mockData.reimbursements.filter(r => r.status === 'approved').length,
            departments: mockData.departments.length,
            budgetCompliance: '87%' // Mock value
        };
    },

    // Get category breakdown
    getCategoryBreakdown() {
        const breakdown = {};
        mockData.reimbursements.forEach(r => {
            if (!breakdown[r.category]) {
                breakdown[r.category] = 0;
            }
            breakdown[r.category] += r.amount;
        });
        return breakdown;
    },

    // Get department breakdown
    getDepartmentBreakdown() {
        const breakdown = {};
        mockData.reimbursements.forEach(r => {
            if (!breakdown[r.dept_name]) {
                breakdown[r.dept_name] = 0;
            }
            breakdown[r.dept_name] += r.amount;
        });
        return breakdown;
    }
};
