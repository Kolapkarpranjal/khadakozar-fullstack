import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

export default function TakrarSuchanaForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    whatsapp: '',
    name: '',
    address: '',
    type: '',
    photo: null,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = language === 'mr' ? 'इमेल आवश्यक आहे' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'mr' ? 'वैध इमेल पत्ता प्रविष्ट करा' : 'Please enter a valid email address';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = language === 'mr' ? 'व्हाट्सऍप क्रमांक आवश्यक आहे' : 'WhatsApp number is required';
    } else if (!/^\d{10}$/.test(formData.whatsapp.replace(/\D/g, ''))) {
      newErrors.whatsapp = language === 'mr' ? 'वैध 10 अंकी मोबाईल क्रमांक प्रविष्ट करा' : 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.name.trim()) {
      newErrors.name = language === 'mr' ? 'नाव आवश्यक आहे' : 'Name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = language === 'mr' ? 'पत्ता आवश्यक आहे' : 'Address is required';
    }

    if (!formData.type.trim()) {
      newErrors.type = language === 'mr' ? 'प्रकार निवडा' : 'Please select type';
    }

    if (!formData.message.trim()) {
      newErrors.message = language === 'mr' ? 'तुमचे म्हणणे सांगा' : 'Please describe your complaint/suggestion';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add form type
      submitData.append('formType', 'takrar-suchana');
      
      // Add basic information
      submitData.append('applicantName', formData.name);
      submitData.append('contactNumber', formData.whatsapp);
      submitData.append('email', formData.email);
      submitData.append('address', formData.address);
      
      // Add form-specific data
      submitData.append('type', formData.type);
      submitData.append('message', formData.message);
      
      // Add file if uploaded
      if (formData.photo) {
        submitData.append('documents', formData.photo);
      }
      
      // Submit to backend API
      const response = await fetch('http://localhost:5000/api/forms/submit', {
        method: 'POST',
        body: submitData
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(language === 'mr' 
          ? 'तुमची तक्रार/सूचना यशस्वीरित्या सबमिट केली गेली आहे. आपल्याला लवकरच संपर्क केला जाईल.'
          : 'Your complaint/suggestion has been submitted successfully. You will be contacted soon.'
        );
        
        // Reset form
        setFormData({
          email: '',
          whatsapp: '',
          name: '',
          address: '',
          type: '',
          photo: null,
          message: ''
        });
      } else {
        alert(language === 'mr' 
          ? `त्रुटी: ${result.message || 'तक्रार/सूचना सबमिट करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.'}`
          : `Error: ${result.message || 'Error submitting complaint/suggestion. Please try again.'}`
        );
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(language === 'mr' 
        ? 'तक्रार/सूचना सबमिट करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.'
        : 'Error submitting complaint/suggestion. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-yellow-400 px-4 sm:px-6 py-3">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 text-center">
                {language === 'mr' ? 'माझा गांव - खडक ozar' : 'My Village - Khadak Ozar'}
              </h1>
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 text-center mt-1">
                {language === 'mr' ? 'तक्रार/सूचना' : 'Complaint/Suggestion'}
              </h2>
            </div>
            
            <div className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'mr' ? 'इमेल' : 'Email'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'mr' ? 'आपला इमेल पत्ता प्रविष्ट करा' : 'Enter your email address'}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'mr' ? 'व्हाट्सऍप क्र.' : 'WhatsApp No.'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.whatsapp ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'mr' ? 'आपला मोबाईल क्रमांक प्रविष्ट करा' : 'Enter your mobile number'}
                    maxLength="10"
                  />
                  {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'mr' ? 'नांव' : 'Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'mr' ? 'आपले पूर्ण नाव प्रविष्ट करा' : 'Enter your full name'}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'mr' ? 'पत्ता' : 'Address'} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'mr' ? 'आपला पूर्ण पत्ता प्रविष्ट करा' : 'Enter your complete address'}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'mr' ? 'प्रकार' : 'Type'} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.type ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">{language === 'mr' ? 'प्रकार निवडा' : 'Select Type'}</option>
                    <option value="complaint">{language === 'mr' ? 'तक्रार' : 'Complaint'}</option>
                    <option value="suggestion">{language === 'mr' ? 'सूचना' : 'Suggestion'}</option>
                    <option value="other">{language === 'mr' ? 'इतर' : 'Other'}</option>
                  </select>
                  {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'mr' ? 'फोटो (असल्यास)' : 'Photo (if any)'}
                  </label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {language === 'mr' ? 'JPG, PNG फाइल स्वीकार्य आहेत' : 'JPG, PNG files are accepted'}
                  </p>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'mr' ? 'तुमचे म्हणणे थोडक्यात सांगा' : 'Describe your complaint/suggestion briefly'} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={language === 'mr' ? 'तुमची तक्रार किंवा सूचना तपशीलवार सांगा' : 'Please describe your complaint or suggestion in detail'}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
                  >
                    {isSubmitting 
                      ? (language === 'mr' ? 'सबमिट करत आहे...' : 'Submitting...') 
                      : (language === 'mr' ? 'तक्रार/सूचना सबमिट करा' : 'Submit Complaint/Suggestion')
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
