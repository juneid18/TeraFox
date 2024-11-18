import React, { useState } from 'react';

const RequestMovie = () => {
  const [formData, setFormData] = useState({ movieName: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  // Validate form data
  const validateForm = () => {
    if (!formData.movieName.trim()) {
      setMessage('Please enter a movie name.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.WEB3_FROM_API_KEY, // Use NEXT_PUBLIC for client-side
          movieName: formData.movieName,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage(`Your request for "${formData.movieName}" has been submitted!`);
        setFormData({ movieName: '' }); // Reset form
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error('Failed to send request. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="request-movie-container p-6 bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">Request a Movie</h2>

      {/* Movie Request Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter movie name"
          value={formData.movieName}
          onChange={(e) => setFormData({ ...formData, movieName: e.target.value })}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>

      {/* Display status messages */}
      {message && (
        <div className={`mt-4 text-center text-white ${status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
          <p>{message}</p>
        </div>
      )}

      {/* Telegram Link */}
      <div className="mt-4 text-center">
        <p className="text-white">
          Alternatively, you can{' '}
          <a
            href="https://t.me/your_telegram_bot"
            className="text-blue-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            request a movie on Telegram
          </a>.
        </p>
      </div>
    </div>
  );
};

export default RequestMovie;
