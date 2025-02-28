import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-indigo-100 to-purple-200 text-gray-700 py-6 mt-auto shadow-inner">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-2">
          <p className="tracking-wide font-poppins text-sm opacity-90 hover:opacity-100 transition-opacity">
            <span className="mr-2">✨</span>
            Frontend developed by
            <span className="group relative inline-block font-medium text-indigo-700 ml-1 cursor-pointer">
              Tanishak
              <span className="invisible group-hover:visible absolute -top-16 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-white bg-opacity-90 text-indigo-600 text-xs rounded-md shadow-md transition-all duration-200 whitespace-nowrap">
                <div className="flex flex-col items-center space-y-1">
                  <span>tanishak.shukla@teliolabs.com</span>
                  <span>+91 6386489635</span>
                </div>
              </span>
            </span>
            <span className="mx-2">|</span>
            Backend crafted by{" "}
            <span className="group relative inline-block font-medium text-purple-700 cursor-pointer">
              Srivishnu
              <span className="invisible group-hover:visible absolute -top-16 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-white bg-opacity-90 text-purple-600 text-xs rounded-md shadow-md transition-all duration-200 whitespace-nowrap">
                <div className="flex flex-col items-center space-y-1">
                  <span>srivishnu.b@teliolabs.com</span>
                  <span>+91 8300931312</span>
                </div>
              </span>
            </span>{" "}
            &{" "}
            <span className="group relative inline-block font-medium text-indigo-700 cursor-pointer">
              Tanishak
              <span className="invisible group-hover:visible absolute -top-16 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-white bg-opacity-90 text-indigo-600 text-xs rounded-md shadow-md transition-all duration-200 whitespace-nowrap">
                <div className="flex flex-col items-center space-y-1">
                  <span>tanishak.shukla@teliolabs.com</span>
                  <span>+91 6386489635</span>
                </div>
              </span>
            </span>
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
