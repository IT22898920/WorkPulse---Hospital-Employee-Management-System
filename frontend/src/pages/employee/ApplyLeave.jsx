import React, { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, User, MapPin, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import leaveService from '../../services/leaveService';
import { useToast } from '../../contexts/ToastContext';

const ApplyLeave = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
    location: ''
  });
  const [leaveBalance, setLeaveBalance] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const leaveTypes = [
    { value: 'sick', label: 'Sick Leave', icon: '🏥', color: 'bg-red-500' },
    { value: 'annual', label: 'Annual Leave', icon: '🏖️', color: 'bg-blue-500' },
    { value: 'personal', label: 'Personal Leave', icon: '👤', color: 'bg-purple-500' },
    { value: 'emergency', label: 'Emergency Leave', icon: '🚨', color: 'bg-orange-500' },
    { value: 'maternity', label: 'Maternity Leave', icon: '👶', color: 'bg-pink-500' },
    { value: 'paternity', label: 'Paternity Leave', icon: '👨‍👶', color: 'bg-green-500' }
  ];

  useEffect(() => {
    fetchLeaveBalance();
  }, []);

  const fetchLeaveBalance = async () => {
    try {
      const response = await leaveService.getLeaveBalance();
      if (response.success) {
        setLeaveBalance(response.data);
      }
    } catch (error) {
      console.error('Error fetching leave balance:', error);
      showError('Failed to fetch leave balance');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateDaysRequested = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
      showError('Please fill in all required fields');
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      showError('End date cannot be before start date');
      return;
    }

    const daysRequested = calculateDaysRequested();
    const selectedType = leaveTypes.find(type => type.value === formData.type);
    const availableBalance = leaveBalance[formData.type] || 0;

    if (daysRequested > availableBalance) {
      const proceed = window.confirm(`You have insufficient leave balance. You have ${availableBalance} days available for ${selectedType?.label} but requesting ${daysRequested} days. Do you want to submit anyway for manager approval?`);
      if (!proceed) {
        return;
      }
    }

    setSubmitting(true);
    try {
      const submitData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        daysRequested
      };

      const response = await leaveService.applyLeave(submitData);

      if (response.success) {
        showSuccess('Leave application submitted successfully!');
        // Reset form
        setFormData({
          type: '',
          startDate: '',
          endDate: '',
          reason: '',
          emergencyContact: '',
          location: ''
        });
        // Navigate back to my leaves page after a short delay
        setTimeout(() => {
          navigate('/employee/leaves');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting leave application:', error);
      showError(error.message || 'Failed to submit leave application');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedType = leaveTypes.find(type => type.value === formData.type);
  const daysRequested = calculateDaysRequested();
  const availableBalance = formData.type ? (leaveBalance[formData.type] || 0) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/employee/leaves')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to My Leaves
          </button>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Apply for Leave</h1>
            <p className="text-gray-600">Submit your leave application with all required details</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leave Balance Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                Leave Balance
              </h3>
              <div className="space-y-3">
                {leaveTypes.map((type) => {
                  const balance = leaveBalance[type.value] || 0;
                  return (
                    <div key={type.value} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 ${type.color} rounded-full flex items-center justify-center text-white text-sm mr-3`}>
                          {type.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{type.label}</span>
                      </div>
                      <span className="text-lg font-bold text-gray-800">{balance}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Application Summary */}
            {formData.type && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">Application Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Leave Type:</span>
                    <span className="font-semibold">{selectedType?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Days Requested:</span>
                    <span className="font-semibold">{daysRequested}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Balance:</span>
                    <span className="font-semibold">{availableBalance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining After:</span>
                    <span className={`font-semibold ${availableBalance - daysRequested >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                      {availableBalance - daysRequested}
                    </span>
                  </div>
                </div>
                {daysRequested > availableBalance && (
                  <div className="mt-4 p-3 bg-red-500 bg-opacity-20 rounded-lg flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span className="text-sm">Insufficient balance!</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Leave Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Leave Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {leaveTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          formData.type === type.value
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`w-12 h-12 ${type.color} rounded-full flex items-center justify-center text-white text-xl mx-auto mb-2`}>
                            {type.icon}
                          </div>
                          <div className="text-sm font-medium text-gray-700">{type.label}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {leaveBalance[type.value] || 0} days
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        min={formData.startDate || new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Leave <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Please provide a detailed reason for your leave request..."
                      required
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact (Optional)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Emergency contact person and phone number"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location During Leave (Optional)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Where you will be during your leave"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/employee/leaves')}
                    className="flex-1 py-3 px-6 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${
                      submitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : (formData.type && daysRequested > availableBalance)
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        {(formData.type && daysRequested > availableBalance) ? (
                          <>
                            <AlertCircle className="h-5 w-5 mr-2" />
                            Submit (Insufficient Balance)
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-5 w-5 mr-2" />
                            Submit Application
                          </>
                        )}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;