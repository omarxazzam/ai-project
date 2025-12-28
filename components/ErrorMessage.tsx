
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-red-900/20 border border-red-500/30 rounded-xl p-8 text-center shadow-lg">
      <i className="fas fa-exclamation-triangle text-5xl text-red-400 mb-4"></i>
      <h2 className="text-2xl font-bold text-red-300 mb-2">Oops! Something went wrong.</h2>
      <p className="text-red-300/80">{message}</p>
    </div>
  );
};

export default ErrorMessage;
