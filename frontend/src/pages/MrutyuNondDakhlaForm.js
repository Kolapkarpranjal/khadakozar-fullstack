import { useLanguage } from "../hooks/useLanguage";
import { useState } from "react";

export default function MrutyuNondDakhlaForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    applicantName: '',
    mobileNumber: '',
    emailId: '',
    applicantAddress: '',
    deathDate: '',
    gender: '',
    deceasedName: '',
    deceasedAadharNumber: '',
    fatherOrHusbandName: '',
    motherName: '',
    deathPlace: '',
    permanentAddress: '',
    otherInformation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file uploads
      const submitData = new FormData();
      
      // Add form type
      submitData.append('formType', 'mrutyu-nond-dakhla');
      
      // Add basic information
      submitData.append('applicantName', formData.applicantName);
      submitData.append('contactNumber', formData.mobileNumber);
      submitData.append('email', formData.emailId);
      submitData.append('address', formData.applicantAddress);
      
      // Add form-specific data
      submitData.append('deathDate', formData.deathDate);
      submitData.append('gender', formData.gender);
      submitData.append('deceasedName', formData.deceasedName);
      submitData.append('deceasedAadharNumber', formData.deceasedAadharNumber);
      submitData.append('fatherOrHusbandName', formData.fatherOrHusbandName);
      submitData.append('motherName', formData.motherName);
      submitData.append('deathPlace', formData.deathPlace);
      submitData.append('permanentAddress', formData.permanentAddress);
      submitData.append('otherInformation', formData.otherInformation);

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
          deathDate: '',
          gender: '',
          deceasedName: '',
          deceasedAadharNumber: '',
          fatherOrHusbandName: '',
          motherName: '',
          deathPlace: '',
          permanentAddress: '',
          otherInformation: ''
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
              मृत्यू नोंद दाखला मागणी अर्ज
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

              {/* Death Date */}
              <div>
                <label htmlFor="deathDate" className="block text-sm font-medium text-gray-700 mb-2">
                  मृत्यु दिनांक :
                </label>
                <input
                  type="date"
                  id="deathDate"
                  name="deathDate"
                  value={formData.deathDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                </select>
              </div>

              {/* Deceased Name */}
              <div>
                <label htmlFor="deceasedName" className="block text-sm font-medium text-gray-700 mb-2">
                  मृताचे पूर्ण नाव :
                </label>
                <input
                  type="text"
                  id="deceasedName"
                  name="deceasedName"
                  value={formData.deceasedName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="मृत व्यक्तीचे पूर्ण नाव"
                />
              </div>

              {/* Deceased Aadhar Number */}
              <div>
                <label htmlFor="deceasedAadharNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  मृत व्यक्तीचे आधारकार्ड :
                </label>
                <input
                  type="text"
                  id="deceasedAadharNumber"
                  name="deceasedAadharNumber"
                  value={formData.deceasedAadharNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="आधारकार्ड नंबर"
                />
              </div>

              {/* Father or Husband Name */}
              <div>
                <label htmlFor="fatherOrHusbandName" className="block text-sm font-medium text-gray-700 mb-2">
                  मृताच्या पतीचे / वडिलांचे नाव :
                </label>
                <input
                  type="text"
                  id="fatherOrHusbandName"
                  name="fatherOrHusbandName"
                  value={formData.fatherOrHusbandName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="पतीचे/वडिलांचे नाव"
                />
              </div>

              {/* Mother Name */}
              <div>
                <label htmlFor="motherName" className="block text-sm font-medium text-gray-700 mb-2">
                  मृताच्या आईचे नाव :
                </label>
                <input
                  type="text"
                  id="motherName"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="आईचे नाव"
                />
              </div>

              {/* Death Place */}
              <div>
                <label htmlFor="deathPlace" className="block text-sm font-medium text-gray-700 mb-2">
                  मयत व्यक्तीचा मृत्यूचे ठिकाण :
                </label>
                <input
                  type="text"
                  id="deathPlace"
                  name="deathPlace"
                  value={formData.deathPlace}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="मृत्यूचे ठिकाण"
                />
              </div>

              {/* Permanent Address */}
              <div>
                <label htmlFor="permanentAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  मयत व्यक्तीचा कायमचा पत्ता आधार कार्ड नुसार :
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

              {/* Other Information */}
              <div>
                <label htmlFor="otherInformation" className="block text-sm font-medium text-gray-700 mb-2">
                  इतर माहिती :
                </label>
                <textarea
                  id="otherInformation"
                  name="otherInformation"
                  value={formData.otherInformation}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="इतर महत्वाची माहिती"
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


