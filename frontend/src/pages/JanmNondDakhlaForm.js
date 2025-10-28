import { useLanguage } from "../hooks/useLanguage";
import { useState } from "react";

export default function JanmNondDakhlaForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    applicantName: '',
    mobileNumber: '',
    emailId: '',
    applicantAddress: '',
    birthDate: '',
    birthPlace: '',
    gender: '',
    childName: '',
    fatherName: '',
    fatherAadharNumber: '',
    fatherAadharCopy: null,
    motherName: '',
    motherAadharNumber: '',
    motherAadharCopy: null,
    permanentAddress: '',
    addressAtBirth: ''
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
      submitData.append('formType', 'janm-nond-dakhla');
      
      // Add basic information
      submitData.append('applicantName', formData.applicantName);
      submitData.append('contactNumber', formData.mobileNumber);
      submitData.append('email', formData.emailId);
      submitData.append('address', formData.applicantAddress);
      
      // Add form-specific data
      submitData.append('birthDate', formData.birthDate);
      submitData.append('birthPlace', formData.birthPlace);
      submitData.append('gender', formData.gender);
      submitData.append('childName', formData.childName);
      submitData.append('fatherName', formData.fatherName);
      submitData.append('fatherAadharNumber', formData.fatherAadharNumber);
      submitData.append('motherName', formData.motherName);
      submitData.append('motherAadharNumber', formData.motherAadharNumber);
      submitData.append('permanentAddress', formData.permanentAddress);
      submitData.append('addressAtBirth', formData.addressAtBirth);
      
      // Add files
      if (formData.fatherAadharCopy) {
        submitData.append('documents', formData.fatherAadharCopy);
      }
      if (formData.motherAadharCopy) {
        submitData.append('documents', formData.motherAadharCopy);
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
          applicantName: '',
          mobileNumber: '',
          emailId: '',
          applicantAddress: '',
          birthDate: '',
          birthPlace: '',
          gender: '',
          childName: '',
          fatherName: '',
          fatherAadharNumber: '',
          fatherAadharCopy: null,
          motherName: '',
          motherAadharNumber: '',
          motherAadharCopy: null,
          permanentAddress: '',
          addressAtBirth: ''
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
              जन्म नोंद दाखला मागणी अर्ज
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

              {/* Birth Date */}
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                  बाळाची जन्म तारीख :
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Birth Place */}
              <div>
                <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700 mb-2">
                  जन्माचे ठिकाण :
                </label>
                <input
                  type="text"
                  id="birthPlace"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="जन्माचे ठिकाण"
                />
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  लिंग :
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">निवडा</option>
                  <option value="पुरुष">पुरुष</option>
                  <option value="स्त्री">स्त्री</option>
                  <option value="इतर">इतर</option>
                </select>
              </div>

              {/* Child Name */}
              <div>
                <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-2">
                  बाळाचे नाव :
                </label>
                <input
                  type="text"
                  id="childName"
                  name="childName"
                  value={formData.childName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="बाळाचे पूर्ण नाव"
                />
              </div>

              {/* Father Name */}
              <div>
                <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-2">
                  बाळाच्या वडिलांचे नाव :
                </label>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="वडिलांचे पूर्ण नाव"
                />
              </div>

              {/* Father Aadhar Number */}
              <div>
                <label htmlFor="fatherAadharNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  वडिलांचा आधारकार्ड नंबर :
                </label>
                <input
                  type="text"
                  id="fatherAadharNumber"
                  name="fatherAadharNumber"
                  value={formData.fatherAadharNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="आधारकार्ड नंबर"
                />
              </div>

              {/* Father Aadhar Copy */}
              <div>
                <label htmlFor="fatherAadharCopy" className="block text-sm font-medium text-gray-700 mb-2">
                  वडिलांचा आधारकार्ड छायांकित प्रत :
                </label>
                <input
                  type="file"
                  id="fatherAadharCopy"
                  name="fatherAadharCopy"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG फाइल स्वीकार्य</p>
              </div>

              {/* Mother Name */}
              <div>
                <label htmlFor="motherName" className="block text-sm font-medium text-gray-700 mb-2">
                  बाळाच्या आईचे नाव :
                </label>
                <input
                  type="text"
                  id="motherName"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="आईचे पूर्ण नाव"
                />
              </div>

              {/* Mother Aadhar Number */}
              <div>
                <label htmlFor="motherAadharNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  आईचा आधारकार्ड नंबर :
                </label>
                <input
                  type="text"
                  id="motherAadharNumber"
                  name="motherAadharNumber"
                  value={formData.motherAadharNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="आधारकार्ड नंबर"
                />
              </div>

              {/* Mother Aadhar Copy */}
              <div>
                <label htmlFor="motherAadharCopy" className="block text-sm font-medium text-gray-700 mb-2">
                  आईचा आधारकार्ड छायांकित प्रत :
                </label>
                <input
                  type="file"
                  id="motherAadharCopy"
                  name="motherAadharCopy"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG फाइल स्वीकार्य</p>
              </div>

              {/* Permanent Address */}
              <div>
                <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  आई वडिलांचा कायमचा पत्ता :
                </label>
                <textarea
                  id="permanentAddress"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="कायमचा पत्ता"
                />
              </div>

              {/* Address at Birth */}
              <div>
                <label htmlFor="addressAtBirth" className="block text-sm font-medium text-gray-700 mb-2">
                  आई वडिलांचा बाळाच्या जन्माच्या वेळीच पत्ता :
                </label>
                <textarea
                  id="addressAtBirth"
                  name="addressAtBirth"
                  value={formData.addressAtBirth}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="जन्माच्या वेळीचा पत्ता"
                />
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


