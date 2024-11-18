'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Home/Header';

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notices on component mount
  const fetchNotices = async () => {
    try {
      const response = await axios.post('/api/getnotice'); // Assuming this is your API endpoint
      if (response.data.success) {
        setNotices(response.data.data); // Assuming response data has the notices array
      } else {
        setError('Failed to fetch notices');
      }
    } catch (err) {
      setError('Error fetching notices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="bg-gray-800 min-h-screen font-sans">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-semibold text-white text-center mb-12">Notices</h1>

        {loading ? (
          <div className="flex justify-center items-center space-x-2 text-lg text-gray-600 animate-pulse">
            <span>Loading...</span>
            <div className="w-6 h-6 border-4 border-t-transparent border-gray-400 rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-lg text-red-500 text-center mb-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <div
                  key={notice._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all p-6"
                >
                  <div className="text-xl font-medium text-gray-800">{notice.content}</div>
                  <p className="text-sm text-gray-500 mt-2">{new Date(notice.createdAt).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-lg text-gray-500">No notices available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticesPage;
