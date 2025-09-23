# Backend Integration Guide

This document explains how the frontend is connected to the backend API.

## 🚀 **Current Setup**

### **Backend Server**
- **URL**: `http://localhost:5000`
- **API Base**: `http://localhost:5000/api`
- **Status**: ✅ Running on port 5000
- **Database**: MongoDB connected

### **Frontend Configuration**
- **Environment**: `.env` file configured
- **API URL**: `VITE_API_URL=http://localhost:5000/api`
- **Axios Integration**: Global axios configuration with interceptors

## 📋 **Available API Endpoints**

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout

### **Employees**
- `GET /api/employees` - Get all employees (with filters)
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/stats` - Get employee statistics
- `GET /api/employees/generate-id` - Generate new employee ID

### **Health Check**
- `GET /api/health` - Backend health status

## 🔧 **Frontend Services**

### **API Service** (`src/services/api.js`)
- Axios instance with base URL configuration
- Request interceptor for authentication tokens
- Response interceptor for error handling
- Automatic token management

### **Employee Service** (`src/services/employeeService.js`)
- `getAllEmployees(params)` - Fetch employees with filtering
- `getEmployeeById(id)` - Fetch single employee
- `createEmployee(data)` - Create new employee
- `updateEmployee(id, data)` - Update employee
- `deleteEmployee(id)` - Delete employee
- `getEmployeeStats()` - Get statistics
- `generateEmployeeId()` - Generate new ID

### **Auth Service** (`src/services/authService.js`)
- `login(credentials)` - User authentication
- `logout()` - Clear session
- `getProfile()` - Get user profile
- `isAuthenticated()` - Check auth status

## 🎯 **Integration Features**

### **✅ Employee Management**
- HR Add Employee page connected to backend
- Real employee ID generation from server
- Form validation and error handling
- Success/error feedback

### **✅ Authentication**
- Token-based authentication
- Automatic token storage and retrieval
- Protected routes based on user roles

### **✅ Error Handling**
- Network error detection
- API error message display
- Automatic token refresh/logout

### **✅ Real-time Status**
- API connection status indicator
- Backend health monitoring
- Connection retry functionality

## 🏃‍♂️ **How to Run**

### **1. Start Backend**
```bash
cd backend
npm install
npm run dev
```
Backend will run on `http://localhost:5000`

### **2. Start Frontend**
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:5173`

### **3. Test Connection**
- Visit `http://localhost:5173/hr/employees/add`
- Look for green "Backend connected successfully" status
- Try adding a new employee to test full integration

## 🔒 **Authentication Flow**

1. User logs in via `/login`
2. Backend returns JWT token
3. Token stored in localStorage
4. Token automatically added to all API requests
5. Backend validates token for protected routes
6. User roles determine access permissions

## 📊 **Data Flow Example: Adding Employee**

1. **Frontend**: User fills form in `/hr/employees/add`
2. **Validation**: Client-side validation checks
3. **API Call**: `employeeService.createEmployee(data)`
4. **Backend**: Validates data and creates user in MongoDB
5. **Response**: Returns success with employee data
6. **Frontend**: Shows success message and redirects
7. **Update**: Employee list refreshes with new data

## ⚠️ **Important Notes**

- **Authentication Required**: Most endpoints require login
- **Role-based Access**: HR/Admin roles needed for employee management
- **CORS Configured**: Backend allows frontend origin
- **Error Handling**: All API calls have try-catch blocks
- **Loading States**: UI shows loading indicators during API calls

## 🔧 **Environment Variables**

### **Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=WorkPulse Hospital Management System
```

### **Backend (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/workpulse_hospital
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
```

## 🧪 **Testing API Connection**

You can test the API directly:

```bash
# Health check
curl http://localhost:5000/api/health

# Get employees (requires auth token)
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/employees
```

The frontend includes an API status component that automatically tests the connection and shows the result in the UI.