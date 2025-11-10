import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { API_URL } from "../utils/config";

export default function KrishiVikasSamitiPage() {
  const { t, language } = useLanguage();
  const [committeeMembers, setCommitteeMembers] = useState([]);

  // Fetch committee members from API
  useEffect(() => {
    let isMounted = true;

    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_URL.COMMITTEE_MEMBERS}/committee/krishivikassamiti`);
        if (isMounted && response.ok) {
          const result = await response.json();
          if (result.success && result.data && result.data.length > 0) {
            // Transform API data to match component format
            const dynamicMembers = result.data.map(member => ({
              srNo: member.srNo,
              name: language === 'mr' ? (member.nameMarathi || member.name) : (member.name || member.nameMarathi),
              position: language === 'mr' ? (member.positionMarathi || member.position) : (member.position || member.positionMarathi),
              designation: language === 'mr' ? (member.designationMarathi || member.designation) : (member.designation || member.designationMarathi),
              mobile: member.mobile || member.contact || ''
            }));
            
            // Use only dynamic members from API
            setCommitteeMembers(dynamicMembers);
            return;
          }
        }
        // If API fails or returns no data, show empty array
        if (isMounted) {
          setCommitteeMembers([]);
        }
      } catch (error) {
        console.warn('Failed to fetch committee members from API:', error);
        // Fail silently - show empty array instead of static data
        if (isMounted) {
          setCommitteeMembers([]);
        }
      }
    };

    fetchMembers();
    return () => { isMounted = false; };
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('samiti.krishiVikasSamiti.pageTitle')}</h1>
          <p className="text-lg text-green-600 font-medium mb-2">{t('samiti.krishiVikasSamiti.subtitle')}</p>
          <p className="text-lg text-gray-600">{t('samiti.krishiVikasSamiti.description')}</p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-6xl space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">🌾</span>
                </div>
                {t('samiti.krishiVikasSamiti.members')} - सन २०२५-२६
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'अ. नं.' : 'Sr. No.'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'सदस्यांचे नावे' : 'Member Names'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'प्रवर्ग' : 'Category'}</th>
                      <th className="border border-gray-200 px-4 py-3 text-left font-semibold">{language === 'mr' ? 'पदनाम' : 'Designation'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {committeeMembers.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                          {language === 'mr' ? 'कोणतेही सदस्य उपलब्ध नाहीत' : 'No members available'}
                        </td>
                      </tr>
                    ) : (
                      committeeMembers.map((member, index) => (
                        <tr key={member._id || member.srNo || index} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-yellow-50 transition-all duration-200">
                        <td className="border border-gray-200 px-4 py-3 text-gray-800 font-medium text-center">
                            {member.srNo || index + 1}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-800 font-medium">
                          {member.name}
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">
                          <span className="bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            {member.position}
                          </span>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-gray-700">
                          <span className="bg-gradient-to-r from-blue-100 to-green-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {member.designation}
                          </span>
                        </td>
                      </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}