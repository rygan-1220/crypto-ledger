# CryptoLedger - Blockchain Reimbursement System

A prototype blockchain-based reimbursement management system with multi-layer encryption and role-based access control. This system demonstrates a secure, transparent, and auditable approach to handling employee reimbursement requests across different organizational roles.

## 🎯 Project Overview

CryptoLedger is a web-based prototype that simulates a blockchain-powered reimbursement system with advanced security features. It implements a multi-layer encryption scheme and role-based access control to ensure data privacy while maintaining transparency and auditability.

**Note:** This is a frontend prototype demonstration with no backend functionality. All data is simulated using mock data.

## ✨ Key Features

### Security Architecture
- **Two-Layer AES-256 Encryption**
  - Layer 1: K_real (User-specific encryption key)
  - Layer 2: K_system (System-level encryption)
- **Digital Signatures**: RSA-SHA256 for data integrity
- **Pattern Layer**: Privacy-preserving analytics
- **Hash Chain**: Immutable audit trail
- **K_session**: Temporary cross-department access for finance managers

### Role-Based Access Control

#### 👤 Employee Portal
- Submit reimbursement requests with encrypted data
- Upload receipts (PDF, JPG, PNG)
- Track submission status (Pending/Approved/Rejected)
- View personal reimbursement history
- Dashboard with statistics and recent activity

#### 👔 Department Manager Portal
- Review and approve/reject team reimbursements
- View department budget utilization
- Manage team members
- Access to department-specific K_real keys
- Approval history and analytics

#### 💰 Finance Manager Portal
- Cross-department oversight and analytics
- Budget control and monitoring
- K_session manager for temporary access to encrypted data
- Comprehensive audit trail
- Financial reporting and analytics
- View all pending reimbursements across departments

## 🏗️ Project Structure

```
Prototype/
├── index.html              # Landing page with role selection
├── employee.html           # Employee dashboard
├── manager.html            # Department Manager dashboard
├── finance.html            # Finance Manager dashboard
├── js/
│   ├── mock-data.js        # Simulated data for all roles
│   ├── employee.js         # Employee portal logic
│   ├── manager.js          # Manager portal logic
│   └── finance.js          # Finance portal logic
└── REF/                    # Reference materials (gitignored)
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required

### Installation

1. Clone or download the repository
2. Navigate to the project directory
3. Open `index.html` in your web browser

```bash
# Simply open the file
open index.html
# or
start index.html
# or double-click index.html
```

### Usage

1. **Select Your Role**: Choose from Employee, Department Manager, or Finance Manager
2. **Explore Features**: Each role has different capabilities and views
3. **Test Workflows**: Submit reimbursements, approve requests, view analytics

## 🎨 Technology Stack

- **Frontend Framework**: Vue.js 2.7.14
- **UI Library**: Vuetify 2.7.1
- **Icons**: Material Design Icons
- **Styling**: Custom CSS with Vuetify theming
- **Data**: Mock data (no backend)

## 🔐 Security Concepts Demonstrated

### Encryption Layers
1. **K_real**: User-specific encryption key for sensitive data (vendor, description, receipts)
2. **K_system**: System-level encryption for additional security
3. **K_session**: Temporary keys for finance managers to access cross-department data

### Privacy Features
- Encrypted data fields are marked as `[Encrypted]` in the UI
- Finance managers can only view basic information without K_session
- All access requests are logged in the audit trail
- Digital signatures verify data integrity

### Access Control
- **Employee**: Can only view their own submissions
- **Department Manager**: Access to their department's K_real keys
- **Finance Manager**: Pattern layer access by default, K_session for detailed access

## 📊 Features by Role

### Employee Features
- ✅ Submit new reimbursement requests
- ✅ Upload receipt documents
- ✅ View submission history
- ✅ Track approval status
- ✅ Dashboard with statistics

### Department Manager Features
- ✅ Approve/reject team reimbursements
- ✅ View pending approvals with priority indicators
- ✅ Monitor department budget utilization
- ✅ Manage team members
- ✅ Access approval history
- ✅ Department analytics

### Finance Manager Features
- ✅ Cross-department analytics dashboard
- ✅ View all pending reimbursements
- ✅ Request K_session for detailed access
- ✅ Budget control and monitoring
- ✅ Comprehensive audit trail
- ✅ Generate financial reports
- ✅ Department budget analysis

## 🎯 User Workflows

### Reimbursement Submission Flow
1. Employee submits reimbursement with encrypted data
2. Department Manager reviews and approves/rejects
3. Finance Manager performs final review
4. Status updates are reflected in all relevant dashboards

### K_session Request Flow
1. Finance Manager requests K_session with reason and scope
2. System grants temporary access (1-4 hours)
3. Finance Manager can view encrypted details
4. All access is logged in audit trail
5. Session expires automatically

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with Vuetify components
- **Responsive Design**: Works on desktop and mobile devices
- **Color-Coded Status**: Visual indicators for pending/approved/rejected
- **Interactive Tables**: Expandable rows for detailed information
- **Real-time Updates**: Dynamic statistics and charts
- **Smooth Animations**: Enhanced user experience

## 📝 Mock Data

The prototype includes simulated data for:
- Multiple employees across different departments
- Sample reimbursement requests with various statuses
- Department budgets and spending
- Audit logs and access history
- Financial analytics data

## 🔧 Customization

### Modifying Mock Data
Edit `js/mock-data.js` to customize:
- User profiles
- Reimbursement records
- Department information
- Budget allocations

### Styling
- Main theme colors are defined in each HTML file's Vue instance
- Vuetify theme can be customized in the `vuetify` configuration
- Custom CSS classes are defined in `<style>` sections

## 🚧 Limitations

- **No Backend**: All data is simulated and resets on page reload
- **No Persistence**: Changes are not saved
- **No Authentication**: Role selection is open (for demonstration)
- **No Real Encryption**: Encryption is simulated in the UI
- **No File Upload**: Receipt upload is simulated

## 🎓 Educational Purpose

This prototype is designed for educational and demonstration purposes to showcase:
- Blockchain concepts in enterprise applications
- Multi-layer encryption architecture
- Role-based access control implementation
- Privacy-preserving data analytics
- Audit trail and compliance features

## 📄 License

This is a prototype project for educational purposes.

## 👥 Contributors

Developed as a Final Year Project (FYP) demonstration.

---

**Note**: This is a prototype demonstration with no backend functionality. All interactions are simulated using client-side JavaScript and mock data.
