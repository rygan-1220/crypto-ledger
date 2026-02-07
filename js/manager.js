// Department Manager Page Vue App
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
        currentUser: mockData.users[3], // David Chen - Manager
        department: mockData.departments[0], // Engineering
        search: '',
        historySearch: '',
        teamSearch: '',
        historyStatusFilter: 'All',
        addMemberDialog: false,
        rejectDialog: false,
        rejectReason: '',
        selectedReimbursement: null,
        snackbar: { show: false, text: '', color: 'success', icon: 'mdi-check-circle' },
        approvalHeaders: [
            { text: 'ID', value: 'id', width: '100px' },
            { text: 'Employee', value: 'user_name' },
            { text: 'Description', value: 'description' },
            { text: 'Amount', value: 'amount', width: '120px' },
            { text: 'Category', value: 'category', width: '150px' },
            { text: 'Days Pending', value: 'days_pending', width: '150px' },
            { text: 'Actions', value: 'actions', sortable: false, width: '250px' },
            { text: '', value: 'data-table-expand' }
        ],
        historyHeaders: [
            { text: 'ID', value: 'id', width: '100px' },
            { text: 'Employee', value: 'user_name' },
            { text: 'Description', value: 'description' },
            { text: 'Amount', value: 'amount', width: '120px' },
            { text: 'Category', value: 'category', width: '150px' },
            { text: 'Date', value: 'date', width: '120px' },
            { text: 'Status', value: 'status', width: '120px' },
            { text: '', value: 'data-table-expand' }
        ]
    },
    computed: {
        pageTitle() {
            const titles = ['Dashboard Overview', 'Pending Approvals', 'Manage Team', 'Approval History'];
            return titles[this.selectedItem] || 'Dashboard';
        },
        stats() {
            return mockHelpers.getDepartmentStats(this.currentUser.dept_id);
        },
        pendingApprovals() {
            return mockHelpers.getDepartmentPending(this.currentUser.dept_id);
        },
        pendingCount() {
            return this.pendingApprovals.length;
        },
        allDeptReimbursements() {
            return mockData.reimbursements.filter(r => r.dept_id === this.currentUser.dept_id);
        },
        recentActivity() {
            return this.allDeptReimbursements.slice(0, 5);
        },
        teamMembers() {
            return mockData.users.filter(u => u.dept_id === this.currentUser.dept_id && u.role === 'employee');
        },
        budgetPercent() {
            return Math.round((this.department.spent / this.department.budget) * 100);
        },
        historyStatusOptions() {
            return ['All', 'Pending', 'Approved', 'Rejected'];
        },
        filteredHistoryReimbursements() {
            if (this.historyStatusFilter === 'All') {
                return this.allDeptReimbursements;
            }
            return this.allDeptReimbursements.filter(r => r.status === this.historyStatusFilter.toLowerCase());
        }
    },
    methods: {
        getDaysPending(submittedDate) {
            const submitted = new Date(submittedDate);
            const now = new Date();
            const diffTime = Math.abs(now - submitted);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        },
        approveRequest(item) {
            this.showSnackbar(`Decrypting Layer 2 with K_system...`, 'info', 'mdi-lock-open');

            setTimeout(() => {
                this.showSnackbar(`Decrypting Layer 1 with K_real...`, 'info', 'mdi-lock-open-variant');
            }, 1000);

            setTimeout(() => {
                this.showSnackbar(`Verifying digital signature...`, 'info', 'mdi-check-decagram');
            }, 2000);

            setTimeout(() => {
                this.showSnackbar(`Reimbursement #${item.id} approved successfully!`, 'success', 'mdi-check-circle');
            }, 3000);
        },
        openRejectDialog(item) {
            this.selectedReimbursement = item;
            this.rejectDialog = true;
        },
        confirmReject() {
            if (!this.rejectReason) {
                this.showSnackbar('Please provide a rejection reason', 'warning', 'mdi-alert');
                return;
            }
            this.showSnackbar(`Reimbursement #${this.selectedReimbursement.id} rejected`, 'error', 'mdi-close-circle');
            this.rejectDialog = false;
            this.rejectReason = '';
            this.selectedReimbursement = null;
        },
        getMemberStats(userId) {
            const memberReimb = mockData.reimbursements.filter(r => r.user_id === userId);
            return {
                count: memberReimb.length,
                total: memberReimb.reduce((sum, r) => sum + r.amount, 0)
            };
        },
        showSnackbar(text, color, icon) {
            this.snackbar.text = text;
            this.snackbar.color = color;
            this.snackbar.icon = icon;
            this.snackbar.show = true;
        }
    }
});
