import { useLanguage } from "../hooks/useLanguage";
import { useState } from "react";

export default function NamunaNo08Form() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    applicantName: '',
    contactNumber: '',
    email: '',
    address: '',
    propertyNumber: '',
    taxPaid: '',
    taxReceipt: null
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
      submitData.append('formType', 'namuna-no08');
      
      // Add basic information
      submitData.append('applicantName', formData.applicantName);
      submitData.append('contactNumber', formData.contactNumber);
      submitData.append('email', formData.email);
      submitData.append('address', formData.address);
      
      // Add form-specific data
      submitData.append('propertyNumber', formData.propertyNumber);
      submitData.append('taxPaid', formData.taxPaid);
      
      // Add files
      if (formData.taxReceipt) {
        submitData.append('documents', formData.taxReceipt);
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
          contactNumber: '',
          propertyNumber: '',
          taxPaid: '',
          taxReceipt: null
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
              नमुना नं ०८ मागणी अर्ज
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

              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  अर्जदाराचा संपर्क क्रमांक :
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
                  placeholder="ईमेल आयडी"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  पत्ता :
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="पूर्ण पत्ता"
                />
              </div>

              {/* Property Number */}
              <div>
                <label htmlFor="propertyNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  ज्या मिळकतीचा नमुना नं. ८ हवा आहे त्या मिळकतीचा क्रमांक? :
                </label>
                <input
                  type="text"
                  id="propertyNumber"
                  name="propertyNumber"
                  value={formData.propertyNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="मिळकतीचा क्रमांक"
                />
              </div>

              {/* Tax Paid Status */}
              <div>
                <label htmlFor="taxPaid" className="block text-sm font-medium text-gray-700 mb-2">
                  सदर मिळकतीचा कर भरणा केला आहे किंवा नाही? :
                </label>
                <select
                  id="taxPaid"
                  name="taxPaid"
                  value={formData.taxPaid}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">निवडा</option>
                  <option value="होय">होय</option>
                  <option value="नाही">नाही</option>
                </select>
              </div>

              {/* Tax Receipt */}
              <div>
                <label htmlFor="taxReceipt" className="block text-sm font-medium text-gray-700 mb-2">
                  कर भरणा केलेबाबतची पावती :
                </label>
                <input
                  type="file"
                  id="taxReceipt"
                  name="taxReceipt"
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


