import { useLanguage } from "../hooks/useLanguage";
import { useState } from "react";

export default function NamunaNo04KamForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    familyHeadName: '',
    contactNumber: '',
    email: '',
    jobCardNumber: '',
    workFromDate: '',
    numberOfWorkers: '',
    applicationCopy: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files.length > 1 ? files : files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file uploads
      const submitData = new FormData();
      
      // Add form type
      submitData.append('formType', 'namuna-no04-kam');
      
      // Add basic information
      submitData.append('applicantName', formData.familyHeadName);
      submitData.append('contactNumber', formData.contactNumber);
      submitData.append('email', formData.email);
      submitData.append('address', ''); // No address field in this form
      
      // Add form-specific data
      submitData.append('jobCardNumber', formData.jobCardNumber);
      submitData.append('workFromDate', formData.workFromDate);
      submitData.append('numberOfWorkers', formData.numberOfWorkers);
      
      // Add files
      if (formData.applicationCopy) {
        submitData.append('documents', formData.applicationCopy);
      }

      // Submit to backend
      const response = await fetch('https://khadakozar-fullstack-production.up.railway.app/api/forms/submit', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (result.success) {
        alert(language === 'mr' ? 'अर्ज यशस्वीरित्या सबमिट केला गेला!' : 'Application submitted successfully!');
        // Reset form
        setFormData({
          familyHeadName: '',
          contactNumber: '',
          email: '',
          jobCardNumber: '',
          workFromDate: '',
          numberOfWorkers: '',
          applicationCopy: null
        });
      } else {
        alert(language === 'mr' ? 'अर्ज सबमिट करताना त्रुटी आली: ' + result.message : 'Error submitting application: ' + result.message);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(language === 'mr' ? 'अर्ज सबमिट करताना त्रुटी आली!' : 'Error submitting application!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">
              माझा गांव - खडक ओझर
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-green-600">
              नमुना नं. ०४ काम मागणी अर्ज
            </h2>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Family Head Name */}
              <div>
                <label htmlFor="familyHeadName" className="block text-sm font-medium text-gray-700 mb-2">
                  जॉब कार्ड धारक कुटुंबाचे कुटुंब प्रमुखाचे नाव :
                </label>
                <input
                  type="text"
                  id="familyHeadName"
                  name="familyHeadName"
                  value={formData.familyHeadName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="कुटुंब प्रमुखाचे पूर्ण नाव"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  संपर्क क्रमांक :
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="मोबाइल क्रमांक"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  ईमेल :
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="ईमेल पत्ता"
                />
              </div>

              {/* Job Card Number */}
              <div>
                <label htmlFor="jobCardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  जॉब कार्ड नंबर :
                </label>
                <input
                  type="text"
                  id="jobCardNumber"
                  name="jobCardNumber"
                  value={formData.jobCardNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="जॉब कार्ड नंबर"
                />
              </div>

              {/* Work From Date */}
              <div>
                <label htmlFor="workFromDate" className="block text-sm font-medium text-gray-700 mb-2">
                  कधीपासून काम हवे आहे? :
                </label>
                <input
                  type="date"
                  id="workFromDate"
                  name="workFromDate"
                  value={formData.workFromDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Number of Workers */}
              <div>
                <label htmlFor="numberOfWorkers" className="block text-sm font-medium text-gray-700 mb-2">
                  किती मजुरांना काम हवे आहे? :
                </label>
                <input
                  type="number"
                  id="numberOfWorkers"
                  name="numberOfWorkers"
                  value={formData.numberOfWorkers}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="मजुरांची संख्या"
                />
              </div>

              {/* Application Copy */}
              <div>
                <label htmlFor="applicationCopy" className="block text-sm font-medium text-gray-700 mb-2">
                  काम मागणी अर्जाची प्रत जोडा :
                </label>
                <input
                  type="file"
                  id="applicationCopy"
                  name="applicationCopy"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG फाइल स्वीकार्य</p>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
                >
                  {isSubmitting ? (language === 'mr' ? 'सबमिट करत आहे...' : 'Submitting...') : 'अर्ज सबमिट करा'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


