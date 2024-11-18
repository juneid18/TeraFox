'use client';
import React from 'react';
import Header from '../components/Home/Header';

const DisclaimerPage = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-900 text-white min-h-screen p-6 flex flex-col items-center">
        <div className="bg-gray-800 text-gray-300 max-w-2xl p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-400">Disclaimer</h2>

          <p className="text-lg leading-relaxed">
            This is a promotional website only. All the downloadable content provided on this site (all materials) is 
            for testing and promotion purposes only. All files placed here are for introductory purposes.
          </p>

          <p className="text-lg leading-relaxed">
            We highly encourage users to <span className="text-yellow-300 font-semibold">buy the CDs or DVDs</span> of 
            the movies or music they enjoy. Please purchase original content directly from the author or developer!
          </p>

          <ul className="list-disc list-inside space-y-2">
            <li>If you do not agree to all the terms, please disconnect from this site immediately.</li>
          </ul>

          <p className="text-lg leading-relaxed">
            <strong className="text-green-400">TeraFox</strong> does not host or store any files on its server. All
            content is provided by non-affiliated third parties. <strong>TeraFox</strong> is not responsible for 
            content hosted on third-party websites and is not involved with these sites.
          </p>

          <p className="text-lg leading-relaxed">
            <strong>TeraFox</strong> merely links to or embeds content that was uploaded to popular online video
            hosting sites like Openload.co, Google Drive, Mega.co.nz, and Mp4Upload.com, Terabox.com. All users on these sites 
            sign a contract agreeing not to upload illegal content. By clicking on any video links while browsing 
            <strong> TeraFox</strong>, you are accessing content hosted on third-party sites, and 
            <strong> TeraFox</strong> is not responsible for any content on other sites.
          </p>

          <h3 className="text-2xl font-bold text-center text-red-500">
            If you want us to remove your content, please email us. We will remove it promptly.
          </h3>

          <div className="text-center">
            <p className="font-semibold">Contact Email:</p>
            <span className="text-lg text-green-400">juneidshaikh18@gmail.com</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default DisclaimerPage;
