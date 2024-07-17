import React from "react";
import { Loader } from "lucide-react"; // Assuming you have a library for loader icons

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center p-8 rounded-lg bg-white shadow-lg">
        <Loader className="text-blue-500 animate-spin" size="64" />
        <p className="text-gray-800 mt-4 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
