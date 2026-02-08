// Finance Manager Page Vue App
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
        currentUser: mockData.users[4], // Sarah Wong - Finance Manager
        search: '',
        auditSearch: '',
        filterDept: 'All',
        sessionActive: false,
        sessionRequest: {
            reason: '',
            scope: 'All Departments',
            duration: '2 hours'
        },
        activeSession: null,
        sessionTimer: null,
        sessionEndTime: null,
        rejectDialog: false,
        selectedReimbursement: null,
        rejectReason: '',
        snackbar: { show: false, text: '', color: 'success', icon: 'mdi-check-circle' },
        pendingHeaders: [
            { text: 'ID', value: 'id', width: '100px' },
            { text: 'Department', value: 'dept_name', width: '150px' },
            { text: 'Employee', value: 'user_name' },
            { text: 'Amount', value: 'amount', width: '120px' },
            { text: 'Category', value: 'category', width: '150px' },
            { text: 'Date', value: 'date', width: '120px' },
            { text: 'Mgr Status', value: 'manager_status', width: '120px' },
            { text: 'Actions', value: 'actions', sortable: false, width: '250px' },
            { text: '', value: 'data-table-expand' }
        ],
        auditHeaders: [
            { text: 'ID', value: 'id', width: '100px' },
            { text: 'Timestamp', value: 'timestamp' },
            { text: 'User', value: 'user' },
            { text: 'Action', value: 'action', width: '200px' },
            { text: 'Details', value: 'details' }
        ],
        reportTemplates: [
            {
                title: 'Monthly Summary',
                description: 'Complete monthly reimbursement summary by department',
                icon: 'mdi-file-document',
                color: 'primary'
            },
            {
                title: 'Department Budget',
                description: 'Budget utilization and spending analysis',
                icon: 'mdi-chart-pie',
                color: 'success'
            },
            {
                title: 'Category Analysis',
                description: 'Expense breakdown by category',
                icon: 'mdi-tag-multiple',
                color: 'info'
            },
            {
                title: 'User Activity',
                description: 'Employee submission patterns',
                icon: 'mdi-account-group',
                color: 'purple'
            },
            {
                title: 'Audit Report',
                description: 'Compliance and access audit trail',
                icon: 'mdi-shield-check',
                color: 'orange'
            }
        ]
    },
    computed: {
        pageTitle() {
            const titles = ['Dashboard Overview', 'All Pending Reviews', 'K_session Manager', 'Budget Control', 'Audit Trail', 'Financial Reports'];
            return titles[this.selectedItem] || 'Dashboard';
        },
        stats() {
            const allReimb = mockData.reimbursements;
            return {
                totalCompany: allReimb.reduce((sum, r) => sum + r.amount, 0),
                pending: allReimb.filter(r => r.status === 'pending').length,
                approved: allReimb.filter(r => r.status === 'approved').length,
                departments: mockData.departments.length
            };
        },
        allPending() {
            return mockData.reimbursements.filter(r => r.status === 'pending' || r.manager_status === 'approved');
        },
        allPendingCount() {
            return this.allPending.length;
        },
        filteredPending() {
            if (this.filterDept === 'All') {
                return this.allPending;
            }
            return this.allPending.filter(r => r.dept_name === this.filterDept);
        },
        deptNames() {
            return mockData.departments.map(d => d.name);
        },
        departmentBreakdown() {
            const colors = ['primary', 'success', 'orange', 'purple'];
            return mockData.departments.map((dept, index) => {
                const deptReimb = mockData.reimbursements.filter(r => r.dept_id === dept.id);
                return {
                    name: dept.name,
                    amount: deptReimb.reduce((sum, r) => sum + r.amount, 0),
                    color: colors[index % colors.length]
                };
            });
        },
        maxDeptAmount() {
            return Math.max(...this.departmentBreakdown.map(d => d.amount));
        },
        departmentBudgetAnalysis() {
            return mockData.departments.map(dept => {
                const deptReimb = mockData.reimbursements.filter(r => r.dept_id === dept.id);
                const spent = deptReimb.reduce((sum, r) => sum + r.amount, 0);
                return {
                    name: dept.name,
                    spent: spent,
                    budget: dept.budget
                };
            });
        },
        topCategories() {
            const categoryTotals = {};
            const colors = ['primary', 'success', 'orange', 'purple', 'info'];

            mockData.reimbursements.forEach(r => {
                if (!categoryTotals[r.category]) {
                    categoryTotals[r.category] = 0;
                }
                categoryTotals[r.category] += r.amount;
            });

            return Object.entries(categoryTotals)
                .map(([name, amount], index) => ({ name, amount, color: colors[index % colors.length] }))
                .sort((a, b) => b.amount - a.amount)
                .slice(0, 5);
        },
        auditLogs() {
            return mockData.auditLogs;
        },
        sessionTimeRemaining() {
            if (!this.sessionActive || !this.sessionEndTime) return '00:00:00';

            const now = new Date();
            const diff = this.sessionEndTime - now;

            if (diff <= 0) {
                this.endSession();
                return '00:00:00';
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    },
    methods: {
        requestSession() {
            if (!this.sessionRequest.reason) {
                this.showSnackbar('Please provide a reason for access', 'warning', 'mdi-alert');
                return;
            }

            this.showSnackbar('Requesting K_session from department managers...', 'info', 'mdi-key');

            setTimeout(() => {
                this.showSnackbar('Verifying authorization...', 'info', 'mdi-shield-check');
            }, 1000);

            setTimeout(() => {
                this.showSnackbar('Distributing K_real keys...', 'info', 'mdi-key-variant');
            }, 2000);

            setTimeout(() => {
                const durationHours = parseInt(this.sessionRequest.duration);
                this.sessionActive = true;
                this.activeSession = {
                    reason: this.sessionRequest.reason,
                    scope: this.sessionRequest.scope,
                    duration: this.sessionRequest.duration,
                    startTime: new Date().toLocaleString()
                };
                this.sessionEndTime = new Date(Date.now() + durationHours * 60 * 60 * 1000);

                // Start timer to update remaining time
                this.sessionTimer = setInterval(() => {
                    this.$forceUpdate(); // Force update to refresh computed property
                }, 1000);

                this.showSnackbar('K_session activated! Full decryption access granted.', 'success', 'mdi-check-circle');

                // Reset form
                this.sessionRequest = {
                    reason: '',
                    scope: 'All Departments',
                    duration: '2 hours'
                };
            }, 3000);
        },
        endSession() {
            if (this.sessionTimer) {
                clearInterval(this.sessionTimer);
                this.sessionTimer = null;
            }
            this.sessionActive = false;
            this.activeSession = null;
            this.sessionEndTime = null;
            this.showSnackbar('K_session ended. Access reverted to Pattern Layer only.', 'info', 'mdi-lock');
        },
        requestSessionForItem(item) {
            this.selectedItem = 2; // Go to K_session Manager page
            this.sessionRequest.reason = `Access sensitive data for reimbursement #${item.id}`;
            this.sessionRequest.scope = item.dept_name;
            this.showSnackbar(`Navigate to K_session Manager to request access for #${item.id}`, 'info', 'mdi-information');
        },
        approveReimbursement(item) {
            this.showSnackbar('Decrypting Layer 2 with K_system...', 'info', 'mdi-lock-open');

            setTimeout(() => {
                this.showSnackbar('Decrypting Layer 1 with K_real...', 'info', 'mdi-key');
            }, 1000);

            setTimeout(() => {
                this.showSnackbar('Verifying digital signature...', 'info', 'mdi-shield-check');
            }, 2000);

            setTimeout(() => {
                // Update status in mock data
                const reimb = mockData.reimbursements.find(r => r.id === item.id);
                if (reimb) {
                    reimb.status = 'approved';
                    reimb.finance_status = 'approved';
                }
                this.showSnackbar(`Reimbursement #${item.id} approved successfully!`, 'success', 'mdi-check-circle');
            }, 3000);
        },
        openRejectDialog(item) {
            this.selectedReimbursement = item;
            this.rejectReason = '';
            this.rejectDialog = true;
        },
        closeRejectDialog() {
            this.rejectDialog = false;
            this.selectedReimbursement = null;
            this.rejectReason = '';
        },
        confirmReject() {
            if (!this.rejectReason) {
                this.showSnackbar('Please provide a rejection reason', 'warning', 'mdi-alert');
                return;
            }

            const item = this.selectedReimbursement;

            // Update status in mock data
            const reimb = mockData.reimbursements.find(r => r.id === item.id);
            if (reimb) {
                reimb.status = 'rejected';
                reimb.finance_status = 'rejected';
                reimb.rejection_reason = this.rejectReason;
            }

            this.showSnackbar(`Reimbursement #${item.id} rejected`, 'error', 'mdi-close-circle');
            this.closeRejectDialog();
        },
        getDeptColor(deptName) {
            const colors = {
                'Engineering': 'primary',
                'Marketing': 'success',
                'Sales': 'orange',
                'HR': 'purple'
            };
            return colors[deptName] || 'grey';
        },
        getActionColor(action) {
            const colors = {
                'K_session_request': 'info',
                'K_session_granted': 'success',
                'K_session_ended': 'grey',
                'decrypt_layer1': 'warning',
                'decrypt_layer2': 'primary',
                'view_pattern': 'info'
            };
            return colors[action] || 'grey';
        },
        showSnackbar(text, color, icon) {
            this.snackbar.text = text;
            this.snackbar.color = color;
            this.snackbar.icon = icon;
            this.snackbar.show = true;
        }
    },
    beforeDestroy() {
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
        }
    }
});
