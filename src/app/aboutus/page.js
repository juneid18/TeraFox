'use client';
import React from 'react';
import Header from '../components/Home/Header';

const AboutusPage = () => { 
  const websiteName = process.env.WEBSITE_NAME;

  return (
    <>
      <Header />
      <main className="bg-gray-900 text-white min-h-screen p-6 flex flex-col items-center">
        <div className="bg-gray-800 text-gray-300 max-w-2xl p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-400">About Us</h2>

          <p className="text-lg leading-relaxed">
            <span className='text-blue-400'>{websiteName}</span> is the Best Website/Platform for Bollywood and Hollywood HD Movies.
          </p>

          <p className="text-lg leading-relaxed">
            We provide direct download links without any irritating ads or pop-ups, ensuring a seamless experience. On <span className='text-blue-400'>{websiteName}</span>, you can find various file-sharing site links for each movie in multiple quality formats like Bluray, HDRip, BRRip, WeB-DL, and more.
          </p>

          <p><span className='text-blue-400'>{websiteName}</span> - Download and Watch Movies Online for Free</p>

          <p>Download dual/multi-audio high-quality movies and TV/web series directly without any popup ads. We offer a wide range of content, including English movies, Hollywood dual audio movies, Bollywood movies, TV/web series, TV shows, anime, and many more.</p>

          <p>Disclaimer: All my posts are freely available on the Internet and posted by somebody else. I&apos;m not violating any COPYRIGHTED LAW. If anything is against the law, please notify me.</p>

          <p>If you think we shared your content or product without your permission, you can make a claim using our DMCA contact form page. We never host any file on our server; all content points to third-party websites.</p>

          <p><span className='text-red-600'>Note:</span> {websiteName} is a completely independent entity.</p>
        </div>
      </main>
    </>
  );
};

export default AboutusPage;
