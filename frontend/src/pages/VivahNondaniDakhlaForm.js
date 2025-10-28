import { useLanguage } from "../hooks/useLanguage";
import { useState } from "react";

export default function VivahNondaniDakhlaForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    applicantName: '',
    mobileNumber: '',
    emailId: '',
    applicantAddress: '',
    husbandName: '',
    wifeName: '',
    marriageDate: '',
    marriageRegistrationYear: '',
    aadharCard: null,
    husbandPhoto: null,
    wifePhoto: null
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
      submitData.append('formType', 'vivah-nondani-dakhla');
      
      // Add basic information
      submitData.append('applicantName', formData.applicantName);
      submitData.append('contactNumber', formData.mobileNumber);
      submitData.append('email', formData.emailId);
      submitData.append('address', formData.applicantAddress);
      
      // Add form-specific data
      submitData.append('husbandName', formData.husbandName);
      submitData.append('wifeName', formData.wifeName);
      submitData.append('marriageDate', formData.marriageDate);
      submitData.append('marriageRegistrationYear', formData.marriageRegistrationYear);
      
      // Add files
      if (formData.aadharCard) {
        submitData.append('documents', formData.aadharCard);
      }
      if (formData.husbandPhoto) {
        submitData.append('documents', formData.husbandPhoto);
      }
      if (formData.wifePhoto) {
        submitData.append('documents', formData.wifePhoto);
      }

      // Submit to backend
      const response = await fetch('http://localhost:5000/api/forms/submit', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (result.success) {
        alert(language === 'mr' ? 'अर्ज यशस्वीरित्या सबमिट केला गेला!' : 'Application submitted successfully!');
        // Reset form
        setFormData({
          applicantName: '',
          mobileNumber: '',
          emailId: '',
          applicantAddress: '',
          husbandName: '',
          wifeName: '',
          marriageDate: '',
          marriageRegistrationYear: '',
          aadharCard: null,
          husbandPhoto: null,
          wifePhoto: null
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
              विवाह नोंदणी दाखल्यासाठी अर्ज
            </h2>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Applicant Name */}
              <div>
                <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700 mb-2">
                  अर्जदाराचे नाव :
                </label>
                <input
                  type="text"
                  id="applicantName"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="अर्जदाराचे पूर्ण नाव"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  अर्जदाराचा मोबाईल नं :
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="मोबाइल क्रमांक"
                />
              </div>

              {/* Email ID */}
              <div>
                <label htmlFor="emailId" className="block text-sm font-medium text-gray-700 mb-2">
                  अर्जदाराचा इमेल आयडी :
                </label>
                <input
                  type="email"
                  id="emailId"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="ईमेल पत्ता"
                />
              </div>

              {/* Applicant Address */}
              <div>
                <label htmlFor="applicantAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  अर्जदाराचा पत्ता :
                </label>
                <textarea
                  id="applicantAddress"
                  name="applicantAddress"
                  value={formData.applicantAddress}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="पूर्ण पत्ता"
                />
              </div>

              {/* Husband Name */}
              <div>
                <label htmlFor="husbandName" className="block text-sm font-medium text-gray-700 mb-2">
                  पतीचे पूर्ण नाव :
                </label>
                <input
                  type="text"
                  id="husbandName"
                  name="husbandName"
                  value={formData.husbandName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="पतीचे पूर्ण नाव"
                />
              </div>

              {/* Wife Name */}
              <div>
                <label htmlFor="wifeName" className="block text-sm font-medium text-gray-700 mb-2">
                  पत्नीचे पूर्ण नाव (माहेर कडील) :
                </label>
                <input
                  type="text"
                  id="wifeName"
                  name="wifeName"
                  value={formData.wifeName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="पत्नीचे पूर्ण नाव (माहेर कडील)"
                />
              </div>

              {/* Marriage Date */}
              <div>
                <label htmlFor="marriageDate" className="block text-sm font-medium text-gray-700 mb-2">
                  विवाह दिनांक :
                </label>
                <input
                  type="date"
                  id="marriageDate"
                  name="marriageDate"
                  value={formData.marriageDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Marriage Registration Year */}
              <div>
                <label htmlFor="marriageRegistrationYear" className="block text-sm font-medium text-gray-700 mb-2">
                  ग्रामपंचायतला विवाह नोंद केलेले वर्ष :
                </label>
                <input
                  type="number"
                  id="marriageRegistrationYear"
                  name="marriageRegistrationYear"
                  value={formData.marriageRegistrationYear}
                  onChange={handleInputChange}
                  required
                  min="1900"
                  max="2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="वर्ष (उदा. 2020)"
                />
              </div>

              {/* Aadhar Card */}
              <div>
                <label htmlFor="aadharCard" className="block text-sm font-medium text-gray-700 mb-2">
                  पती / पत्नी चे आधार कार्ड :
                </label>
                <input
                  type="file"
                  id="aadharCard"
                  name="aadharCard"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG फाइल स्वीकार्य</p>
              </div>

              {/* Husband Photo */}
              <div>
                <label htmlFor="husbandPhoto" className="block text-sm font-medium text-gray-700 mb-2">
                  पतीचा पासपोर्ट फोटो :
                </label>
                <input
                  type="file"
                  id="husbandPhoto"
                  name="husbandPhoto"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">JPG, PNG फाइल स्वीकार्य</p>
              </div>

              {/* Wife Photo */}
              <div>
                <label htmlFor="wifePhoto" className="block text-sm font-medium text-gray-700 mb-2">
                  पत्नीचा पासपोर्ट फोटो :
                </label>
                <input
                  type="file"
                  id="wifePhoto"
                  name="wifePhoto"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">JPG, PNG फाइल स्वीकार्य</p>
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


