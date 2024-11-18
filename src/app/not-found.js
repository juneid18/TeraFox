'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const PageNotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-400">The page you&lsquo;re looking for doesn&lsquo;t exist or has been moved.</p>
      <button
        onClick={() => router.push('/')} // Redirect to the homepage or another link
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default PageNotFound;
