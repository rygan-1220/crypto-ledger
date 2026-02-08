// Admin Page Vue App
new Vue({
    el: '#app',
    vuetify: new Vuetify({
        theme: {
            themes: {
                light: {
                    primary: '#667eea',
                    secondary: '#764ba2',
                    accent: '#82B1FF',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                },
            },
        },
    }),
    data: {
        selectedItem: 0,
        currentUser: mockData.users.find(u => u.role === 'admin'),
        userSearch: '',
        historySearch: '',
        users: mockData.users,
        departments: mockData.departments,

        // Headers
        userHeaders: [
            { text: 'ID', value: 'id', width: '100px' },
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Department', value: 'dept_name', width: '150px' },
            { text: 'Role', value: 'role', width: '120px' },
            { text: 'Status', value: 'status', width: '100px' },
            { text: '', value: 'data-table-expand' }
        ],
        deptHeaders: [
            { text: 'ID', value: 'id', width: '100px' },
            { text: 'Department', value: 'name' },
            { text: 'Budget', value: 'budget', width: '150px' },
            { text: 'Spent', value: 'spent', width: '150px' },
            { text: 'Utilization', value: 'utilization', width: '120px' },
            { text: '', value: 'data-table-expand' }
        ],
        historyHeaders: [
            { text: 'ID', value: 'id', width: '100px' },
            { text: 'Employee', value: 'emp_name', width: '150px' },
            { text: 'Department', value: 'dept_name', width: '150px' },
            { text: 'Category', value: 'category', width: '120px' },
            { text: 'Amount', value: 'amount', width: '120px' },
            { text: 'Status', value: 'status', width: '120px' },
            { text: 'Date', value: 'date', width: '120px' },
            { text: '', value: 'data-table-expand' }
        ],

        // Dialogs
        addUserDialog: false,
        addDeptDialog: false,

        // Forms
        newUser: {
            name: '',
            email: '',
            role: '',
            dept_id: ''
        },
        newDept: {
            name: '',
            budget: 0
        },

        // K_session
        sessionActive: false,
        sessionTimeRemaining: '15:00',
        sessionRequest: {
            scope: '',
            duration: '',
            reason: ''
        },
        sessionScopes: ['All Departments', 'Specific Department', 'Single Record'],
        sessionDurations: ['15 minutes', '30 minutes', '1 hour'],

        // Options
        roleOptions: ['employee', 'manager', 'finance', 'admin'],

        // Reports
        availableReports: [
            {
                title: 'Department Summary',
                description: 'Comprehensive overview of all departments',
                icon: 'mdi-office-building',
                color: 'primary'
            },
            {
                title: 'Budget Analysis',
                description: 'Budget utilization and spending patterns',
                icon: 'mdi-chart-pie',
                color: 'success'
            },
            {
                title: 'User Activity',
                description: 'User submission and approval statistics',
                icon: 'mdi-account-group',
                color: 'orange'
            },
            {
                title: 'Audit Report',
                description: 'Compliance and access audit trail',
                icon: 'mdi-shield-check',
                color: 'purple'
            }
        ],

        snackbar: { show: false, text: '', color: 'success', icon: 'mdi-check-circle' }
    },
    computed: {
        pageTitle() {
            const titles = ['System Overview', 'User Management', 'Department Management', 'K_session Manager', 'History', 'Reports'];
            return titles[this.selectedItem] || 'Dashboard';
        },
        stats() {
            return {
                totalUsers: this.users.length,
                activeUsers: this.users.filter(u => u.status === 'active').length,
                departments: this.departments.length,
                totalBudget: this.departments.reduce((sum, d) => sum + d.budget, 0)
            };
        },
        usersByRole() {
            const roles = [
                { name: 'Employees', role: 'employee', color: 'primary' },
                { name: 'Managers', role: 'manager', color: 'orange' },
                { name: 'Finance', role: 'finance', color: 'success' },
                { name: 'Admins', role: 'admin', color: 'error' }
            ];
            return roles.map(r => ({
                name: r.name,
                count: this.users.filter(u => u.role === r.role).length,
                color: r.color
            }));
        },
        totalUsers() {
            return this.users.length;
        },
        deptOptions() {
            return this.departments;
        },
        allReimbursements() {
            return mockData.reimbursements.map(r => {
                const user = this.users.find(u => u.id === r.emp_id);
                return {
                    ...r,
                    emp_name: user ? user.name : 'Unknown'
                };
            });
        },
        pendingCount() {
            return this.allReimbursements.filter(r => r.status === 'pending').length;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.renderSpendingChart();
        });
    },
    watch: {
        selectedItem(newVal) {
            if (newVal === 0) {
                this.$nextTick(() => {
                    this.renderSpendingChart();
                });
            }
        }
    },
    methods: {
        getRoleColor(role) {
            const colors = {
                employee: 'primary',
                manager: 'orange',
                finance: 'success',
                admin: 'error'
            };
            return colors[role] || 'grey';
        },
        getStatusColor(status) {
            const colors = {
                pending: 'orange',
                approved: 'success',
                rejected: 'error'
            };
            return colors[status] || 'grey';
        },
        getUtilizationColor(dept) {
            const utilization = (dept.spent / dept.budget);
            if (utilization > 0.8) return 'error';
            if (utilization > 0.6) return 'warning';
            return 'success';
        },
        getUserCountByDept(deptId) {
            return this.users.filter(u => u.dept_id === deptId).length;
        },
        getUserName(userId) {
            const user = this.users.find(u => u.id === userId);
            return user ? user.name : 'Unknown';
        },
        formatDate(dateStr) {
            return mockHelpers.formatDate(dateStr);
        },
        getChartColor(index) {
            const colors = ['#667eea', '#f97316', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
            return colors[index % colors.length];
        },
        renderSpendingChart() {
            const canvas = document.getElementById('spendingChart');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 100;

            const total = this.departments.reduce((sum, d) => sum + d.spent, 0);
            if (total === 0) return;

            let currentAngle = -Math.PI / 2;

            this.departments.forEach((dept, index) => {
                const sliceAngle = (dept.spent / total) * 2 * Math.PI;

                ctx.fillStyle = this.getChartColor(index);
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
                ctx.closePath();
                ctx.fill();

                // Add border
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();

                currentAngle += sliceAngle;
            });
        },
        getDeptColor(deptId) {
            const colors = ['primary', 'orange', 'success', 'purple', 'info', 'pink'];
            const index = this.departments.findIndex(d => d.id === deptId);
            return colors[index % colors.length];
        },

        // User Management
        openAddUserDialog() {
            this.newUser = { name: '', email: '', role: '', dept_id: '' };
            this.addUserDialog = true;
        },
        addUser() {
            if (!this.newUser.name || !this.newUser.email || !this.newUser.role || !this.newUser.dept_id) {
                this.showSnackbar('Please fill all required fields', 'error', 'mdi-alert-circle');
                return;
            }

            const dept = this.departments.find(d => d.id === this.newUser.dept_id);
            const newId = this.newUser.role.substring(0, 3).toUpperCase() + String(this.users.filter(u => u.role === this.newUser.role).length + 1).padStart(3, '0');

            this.users.push({
                id: newId,
                name: this.newUser.name,
                email: this.newUser.email,
                role: this.newUser.role,
                dept_id: this.newUser.dept_id,
                dept_name: dept.name,
                status: 'active'
            });

            this.addUserDialog = false;
            this.showSnackbar('User added successfully', 'success', 'mdi-check-circle');
        },
        editUser(user) {
            this.showSnackbar('Edit user functionality - Demo only', 'info', 'mdi-information');
        },
        toggleUserStatus(user) {
            user.status = user.status === 'active' ? 'inactive' : 'active';
            this.showSnackbar(`User ${user.status === 'active' ? 'activated' : 'deactivated'}`, 'success', 'mdi-check-circle');
        },

        // Department Management
        openAddDeptDialog() {
            this.newDept = { name: '', budget: 0 };
            this.addDeptDialog = true;
        },
        addDepartment() {
            if (!this.newDept.name || !this.newDept.budget) {
                this.showSnackbar('Please fill all required fields', 'error', 'mdi-alert-circle');
                return;
            }

            const newId = 'D' + String(this.departments.length + 1).padStart(2, '0');

            this.departments.push({
                id: newId,
                name: this.newDept.name,
                budget: this.newDept.budget,
                spent: 0
            });

            this.addDeptDialog = false;
            this.showSnackbar('Department added successfully', 'success', 'mdi-check-circle');
        },

        // K_session Management
        requestSession() {
            if (!this.sessionRequest.scope || !this.sessionRequest.duration || !this.sessionRequest.reason) {
                this.showSnackbar('Please fill all required fields', 'error', 'mdi-alert-circle');
                return;
            }

            this.sessionActive = true;
            this.showSnackbar('K_session activated successfully', 'success', 'mdi-check-circle');

            // Simulate countdown
            let minutes = parseInt(this.sessionRequest.duration);
            let seconds = minutes * 60;
            const countdown = setInterval(() => {
                seconds--;
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                this.sessionTimeRemaining = `${mins}:${secs.toString().padStart(2, '0')}`;

                if (seconds <= 0) {
                    clearInterval(countdown);
                    this.endSession();
                }
            }, 1000);
        },
        endSession() {
            this.sessionActive = false;
            this.sessionRequest = { scope: '', duration: '', reason: '' };
            this.showSnackbar('K_session ended', 'info', 'mdi-information');
        },

        // Reports
        generateReport(report) {
            this.showSnackbar(`Generating ${report.title}... (Demo only)`, 'info', 'mdi-information');
        },

        // Utility
        showSnackbar(text, color, icon) {
            this.snackbar = { show: true, text, color, icon };
        }
    }
});
