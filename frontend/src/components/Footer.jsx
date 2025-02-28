import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-indigo-100 to-purple-200 text-gray-700 py-6 mt-auto shadow-inner">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <p className="tracking-wide font-poppins text-sm opacity-90 hover:opacity-100 transition-opacity">
            <span className="mr-2">✨</span>
            Frontend developed by
            <span className="font-medium text-indigo-700">Tanishak</span>
            <span className="mx-2">|</span>
            Backend crafted by{" "}
            <span className="font-medium text-purple-700">
              Srivishnu
            </span> &{" "}
            <span className="font-medium text-indigo-700">Tanishak</span>
            <span className="ml-2">✨</span>
          </p>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            <p>Made with passion</p>
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
