import React from "react";
import { ArrowLeft } from "lucide-react"; // You can use any icon library or custom icon

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-blue-500 mb-4">
          <ArrowLeft size={48} />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-4">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          <ArrowLeft size={20} className="mr-2" />
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;
