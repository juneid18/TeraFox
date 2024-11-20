'use client'
import React, { useEffect, useState } from 'react';
import { X, Bolt } from 'lucide-react';
import axios from 'axios';

const NoticeBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [Notices, setNotices] = useState(null);

  // Always call the useEffect hook at the top level
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const result = await axios.post('/api/getnotice');
        if (result.data.success && result.data.data.length > 0) {
          setNotices(result.data.data[0]);  // Store only the 'data' array
        } else {
          throw new Error(result.data.message || 'Failed to fetch Notices');
        }
      } catch (error) {
        console.log('Error occurred while fetching notices:', error);
      }
    };
    
    fetchNotice();
  }, []);

  // Do not return anything if the notice bar should not be visible
    if (!isVisible || !Notices) return null;

  return (
    <div className="absolute w-full flex justify-end items-center p-20">
      <div
        key={Notices._id}  // Use '_id' as the unique identifier
        className=" flex p-4 border-t-4 rounded-2xl border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600"
        role="alert"
      >
        <Bolt className="flex-shrink-0 w-4 h-4 dark:text-gray-300" />
        
        <div className="ms-3 text-sm font-medium text-gray-800 dark:text-gray-300">
          {Notices.content}  {/* Render the 'content' of the notice */}
        </div>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="ms-auto -mx-1.5 -my-1.5 bg-gray-50 text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          aria-label="Close"
        >
          <span className="sr-only">Dismiss</span>
          <X className="w-3 h-3" />
        </button>
      </div>
  </div>
  );
};

export default NoticeBar;
