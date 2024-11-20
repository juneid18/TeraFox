'use client';

import React from 'react';
import Link from 'next/link';

const ErrorPage = ({ error }) => {

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Something went wrong with this site</h1>
      <p style={styles.message}>
        We&apos;re sorry for the inconvenience. You are being redirected to our website list...
      </p>
      <Link href={'https://terafox-movielist.blogspot.com/'} type="button" className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Click Here to redirect ...</Link>
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
