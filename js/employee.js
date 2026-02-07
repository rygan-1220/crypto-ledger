// Employee Page Vue App
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
        currentUser: mockData.users[0], // John Tan - Employee
        search: '',
        historySearch: '',
        dateMenu: false,
        form: {
            vendor: '',
            amount: '',
            description: '',
            project: '',
            category: '',
            date: new Date().toISOString().substr(0, 10)
        },
        projects: mockData.projects.filter(p => p.dept_id === 'D01'),
        categories: mockData.categories,
        snackbar: { show: false, text: '', color: 'success', icon: 'mdi-check-circle' },
        pendingHeaders: [
            { text: 'ID', value: 'id', width: '100px' },
            { text: 'Description', value: 'description' },
            { text: 'Amount', value: 'amount', width: '120px' },
            { text: 'Category', value: 'category', width: '180px' },
            { text: 'Date', value: 'date', width: '120px' },
            { text: 'Status', value: 'status', width: '120px' },
            { text: 'Encrypted', value: 'encryption', sortable: false, width: '100px' }
        ],
        historyHeaders: [
            { text: 'ID', value: 'id', width: '100px' },
            { text: 'Description', value: 'description' },
            { text: 'Amount', value: 'amount', width: '120px' },
            { text: 'Category', value: 'category', width: '150px' },
            { text: 'Date', value: 'date', width: '120px' },
            { text: 'Status', value: 'status', width: '120px' },
            { text: 'Actions', value: 'actions', sortable: false, align: 'end', width: '100px' }
        ]
    },
    computed: {
        pageTitle() {
            const titles = ['Dashboard Overview', 'Submit Reimbursement', 'Pending Requests', 'Reimbursement History'];
            return titles[this.selectedItem] || 'Dashboard';
        },
        stats() {
            return mockHelpers.getEmployeeStats(this.currentUser.id);
        },
        allReimbursements() {
            return mockHelpers.getUserReimbursements(this.currentUser.id);
        },
        pendingReimbursements() {
            return this.allReimbursements.filter(r => r.status === 'pending');
        },
        recentActivity() {
            return this.allReimbursements.slice(0, 5);
        }
    },
    methods: {
        submitReimbursement() {
            // Validate form
            if (!this.form.vendor || !this.form.amount || !this.form.description ||
                !this.form.project || !this.form.category) {
                this.showSnackbar('Please fill all required fields', 'warning', 'mdi-alert');
                return;
            }

            // Simulate encryption and submission
            this.showSnackbar('Encrypting with Layer 1 (K_real)...', 'info', 'mdi-lock');

            setTimeout(() => {
                this.showSnackbar('Adding Pattern Layer...', 'info', 'mdi-database');
            }, 1000);

            setTimeout(() => {
                this.showSnackbar('Encrypting with Layer 2 (K_system)...', 'info', 'mdi-lock-plus');
            }, 2000);

            setTimeout(() => {
                this.showSnackbar('Signing with your private key...', 'info', 'mdi-draw-pen');
            }, 3000);

            setTimeout(() => {
                this.showSnackbar('Reimbursement submitted successfully!', 'success', 'mdi-check-circle');
                this.resetForm();
                this.selectedItem = 0; // Go back to dashboard
            }, 4000);
        },
        resetForm() {
            this.form = {
                vendor: '',
                amount: '',
                description: '',
                project: '',
                category: '',
                date: new Date().toISOString().substr(0, 10)
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
