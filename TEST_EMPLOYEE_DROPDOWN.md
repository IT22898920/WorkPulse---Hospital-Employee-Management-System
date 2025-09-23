# 🔧 Employee Dropdown Test Instructions

## ✅ **Steps to Test Employee Dropdown:**

### **1. Open Frontend**
- Go to: http://localhost:5173

### **2. Login as Admin**
- Email: `admin@hospital.lk`
- Password: `admin123`

### **3. Navigate to Shift Management**
- Click "Schedules" in the sidebar
- URL should be: http://localhost:5173/admin/schedules

### **4. Open Create Shift Modal**
- Click the "➕ Create Shift" button (gradient blue-purple button)

### **5. Check Browser Console**
- Press `F12` or right-click and select "Inspect"
- Go to "Console" tab
- Look for these messages:
  - `🔄 Fetching employees from API...`
  - `✅ Employee API Response:`
  - `👥 Employee data:`
  - `📋 Filtered employees:`

### **6. Check Employee Dropdown**
- The dropdown should show employees like:
  - `Kamal Perera (EMP001) - Emergency`
  - `Saman Silva (EMP002) - ICU`
  - `Nimali Fernando (EMP003) - Pediatrics`
  - `Rohan Jayawardena (EMP004) - Surgery`
  - `Malani Wickramasinghe (EMP005) - Cardiology`

### **7. Expected Behavior**
- ✅ Dropdown shows real employees from database
- ✅ Shows employee name, ID, and department
- ✅ Shows count: "X employee(s) available"
- ✅ No "Loading employees..." or error messages

## 🚨 **If Not Working:**

### **Check Console Errors:**
1. Network errors (401, 403, 500)
2. CORS errors
3. API connection issues

### **Check API Manually:**
```bash
curl -X GET http://localhost:5000/api/employees \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### **Common Issues:**
- Authentication token expired
- Backend not running
- CORS configuration
- Employee service import issues

## 📝 **Debugging Added:**

I've added console logs to help debug:
- Employee API calls
- Response data
- Filtered employee list
- Dropdown selection events

Check the browser console for these messages when you open the Create Shift modal!