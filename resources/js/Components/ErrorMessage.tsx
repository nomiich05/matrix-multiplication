import React from "react";

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return message && <p className="text-red-500 error-message container">{message}</p>;
};

export default ErrorMessage;
