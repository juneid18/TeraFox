'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ErrorPage = ({ error }) => {
  const router = useRouter();

  // Redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('https://terafox-movielist.blogspot.com/'); // Redirect to the website list page
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Something went wrong with this site</h1>
      <p style={styles.message}>
        We&apos;re sorry for the inconvenience. You are being redirected to our website list...
      </p>
      <p style={styles.subMessage}>Please wait while we redirect you.</p>
    </div>
  );
};

// Styling for the error page
const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: 'auto',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  subMessage: {
    fontSize: '1rem',
    fontStyle: 'italic',
    color: '#6c757d',
  },
};

export default ErrorPage;
