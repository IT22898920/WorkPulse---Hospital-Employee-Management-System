# WorkPulse - Hospital Employee Management System

A comprehensive employee management system designed specifically for hospital environments, built with the MERN stack.

## 🆕 Recent Updates

### ✅ Latest Features (2024)
- **Enhanced Admin Dashboard**: Beautiful, data-driven dashboard with real-time statistics
- **Backend Integration**: Complete API integration for all dashboard components
- **Salary Management**: HR-focused salary processing and management system
- **Leave Policies**: Advanced leave policy CRUD operations with backend integration
- **Improved UI/UX**: Modern gradient designs and responsive layouts
- **Notification System**: Streamlined header without notification distractions
- **Statistics API**: Comprehensive stats endpoints for employees, leaves, and salaries

### 🔧 Technical Improvements
- **Dashboard Service**: Centralized data fetching for admin analytics
- **Error Handling**: Robust error handling with user-friendly messages
- **Loading States**: Smooth loading animations throughout the application
- **Data Validation**: Enhanced input validation and sanitization
- **Performance**: Optimized API calls and component rendering

## 🏥 Features

### Employee Features
- **Personal Dashboard**: Overview of attendance, leave balance, and upcoming schedules
- **Attendance Management**: QR code-based check-in/check-out system
- **Leave Management**: Apply for leave with document uploads, view balance, and track request status
- **Schedule Viewing**: Access work schedules and shift information
- **Salary Information**: View payslips and salary history
- **Profile Management**: Update personal information with profile picture upload
- **File Management**: Upload and manage profile pictures and supporting documents

### HR/Manager Features
- **Employee Management**: Add, update, and manage employee records
- **Attendance Reports**: View and analyze attendance data across departments
- **Leave Approval**: Review and approve/reject leave requests
- **Schedule Management**: Create and assign work schedules
- **Salary Processing**: Generate and manage salary records
- **Department Analytics**: Performance metrics and reports

### Admin Features
- **Beautiful Dashboard**: Real-time analytics with comprehensive statistics and charts
- **User Access Control**: Manage user roles and permissions across departments
- **Employee Management**: Complete CRUD operations for employee records
- **Leave Management**: Advanced leave policy management and approval workflows
- **Salary Management**: Process and track HR-prepared salary records
- **System Administration**: Configure system settings and parameters
- **Audit Logs**: Monitor system activities and user actions
- **Database Management**: Backup and maintenance operations
- **Reports Generation**: Comprehensive system and user reports

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **QRCode** - QR code generation
- **Nodemailer** - Email notifications

### Frontend
- **React 18** - Frontend library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **TanStack Query** - Data fetching and caching

## 📁 Project Structure

```
WorkPulse - Hospital Employee Management System/
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Attendance.js
│   │   ├── Leave.js
│   │   ├── Schedule.js
│   │   ├── Salary.js
│   │   └── LeaveBalance.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── leaveRoutes.js
│   │   ├── scheduleRoutes.js
│   │   ├── salaryRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── uploads/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── employee/
│   │   │   │   ├── EmployeePortal.jsx
│   │   │   │   ├── EmployeeDashboard.jsx
│   │   │   │   ├── MyAttendance.jsx
│   │   │   │   ├── MyLeave.jsx
│   │   │   │   ├── MySchedule.jsx
│   │   │   │   ├── MySalary.jsx
│   │   │   │   └── MyProfile.jsx
│   │   │   ├── hr/
│   │   │   │   └── HRPortal.jsx
│   │   │   ├── admin/
│   │   │   │   └── AdminPortal.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Login.jsx
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd "WorkPulse - Hospital Employee Management System"
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env file with your configuration
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. **Environment Configuration**

   **Backend (.env)**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/workpulse_hospital
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   FRONTEND_URL=http://localhost:5173
   MAX_FILE_SIZE=5242880
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Cloudinary Setup** (Required for file uploads)
   - Create a free account at [Cloudinary](https://cloudinary.com/)
   - Get your Cloud Name, API Key, and API Secret from the dashboard
   - Add these credentials to your backend `.env` file
   - Cloudinary will handle profile pictures, documents, and QR code storage

   **Frontend (.env)**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=WorkPulse Hospital Management System
   ```

### Running the Application

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on http://localhost:5000

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## 👥 User Roles & Permissions

### Employee
- View personal dashboard
- Mark attendance
- Apply for leave
- View schedule and salary information
- Update personal profile

### HR/Manager
- All employee permissions
- Manage employee records
- Review and approve leave requests
- Create and manage schedules
- Generate attendance and salary reports
- View department analytics

### Admin
- All HR/Manager permissions
- User role management
- System configuration
- Database administration
- Audit logs and system monitoring
- Global settings management

## 🔐 Authentication & Security

- **JWT-based authentication** with secure token storage
- **Role-based access control** for different user types
- **Password hashing** using bcryptjs
- **Input validation** and sanitization
- **Rate limiting** and request throttling
- **CORS configuration** for API security

## 📊 Database Schema

### User Model
- Personal information and contact details
- Employment details (department, designation, joining date)
- Authentication credentials and role
- Emergency contact information

### Attendance Model
- Daily check-in/check-out records
- Break time tracking
- Overtime calculation
- Location and method tracking

### Leave Model
- Leave applications with approval workflow
- Multiple leave types (sick, annual, casual, etc.)
- Document attachment support
- Approval history and comments

### Schedule Model
- Shift assignments and timing
- Recurring schedule patterns
- Location and department mapping
- Shift swap requests

### Salary Model
- Monthly salary calculations
- Earnings and deductions breakdown
- Payment history and status
- Payslip generation

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatepassword` - Update password

### Employee Management
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Attendance
- `POST /api/attendance/checkin` - Check in
- `POST /api/attendance/checkout` - Check out
- `GET /api/attendance/my` - Get my attendance
- `GET /api/attendance/report` - Get attendance report

### Leave Management
- `POST /api/leaves/apply` - Apply for leave
- `GET /api/leaves/my` - Get my leaves
- `GET /api/leaves/balance` - Get leave balance
- `PUT /api/leaves/:id/approve` - Approve leave
- `GET /api/leaves/stats` - Get leave statistics
- `GET /api/leaves/admin/policies` - Get leave policies
- `POST /api/leaves/admin/policies` - Create leave policy
- `PUT /api/leaves/admin/policies/:id` - Update leave policy
- `DELETE /api/leaves/admin/policies/:id` - Delete leave policy

### Salary Management
- `GET /api/salary` - Get all salary records
- `GET /api/salary/stats` - Get salary statistics
- `POST /api/salary` - Create salary record
- `PUT /api/salary/:id` - Update salary record
- `PUT /api/salary/:id/approve` - Approve salary
- `DELETE /api/salary/:id` - Delete salary record

### Admin Dashboard
- `GET /api/admin/stats` - Get system statistics
- `GET /api/admin/logs` - Get audit logs
- `GET /api/employees/stats` - Get employee statistics

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: System preference detection
- **Intuitive Navigation**: Role-based navigation menus
- **Real-time Updates**: Live data updates for critical information
- **Loading States**: Smooth loading animations and states
- **Error Handling**: User-friendly error messages and recovery

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📈 Performance Optimization

- **Database Indexing**: Optimized queries with proper indexes
- **Lazy Loading**: Component-based code splitting
- **Caching**: React Query for efficient data caching
- **Image Optimization**: Optimized file uploads and serving
- **Bundle Optimization**: Vite-based optimization

## 🔮 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Integration with biometric devices
- [ ] Multi-language support
- [ ] Advanced reporting with charts
- [ ] Email notifications system
- [ ] Two-factor authentication
- [ ] API rate limiting
- [ ] Automated backup system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions, please contact:
- Email: support@workpulse.lk
- Phone: +94 11 123 4567

## 🙏 Acknowledgments

- Hospital staff for requirements and feedback
- Open source community for the amazing tools and libraries
- Contributors who helped improve the system

---

**WorkPulse** - Empowering hospital workforce management through technology.