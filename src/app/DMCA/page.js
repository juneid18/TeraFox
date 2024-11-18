"use client";
import React from "react";
import Header from "../components/Home/Header";

const DMCAPage = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-900 text-white min-h-screen p-6 flex flex-col items-center">
        <div className="bg-gray-800 text-gray-300 max-w-2xl p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-400">
            DMCA
          </h2>

          <p className="text-lg leading-relaxed">
            Digital Millennium Copyright Act (DMCA) is a United States copyright
            law that allows specific files to be removed by their owners if they
            are being used without proper permission. In order to file a
            complaint, connect with us and we will respond you in 24 hours.
          </p>
          <div className="text-center">
            <p className="font-semibold">Contact Email:</p>
            <span className="text-lg text-green-400">juneidshaikh18@gmail.com</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default DMCAPage;
