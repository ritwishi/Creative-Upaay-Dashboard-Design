import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
          <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-16 h-16 text-blue-500" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or doesn't exist.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go to Dashboard</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full bg-white text-gray-700 py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team or check our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              documentation
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;