import React from "react";

function ErrorNotification(props) {
  return (
    <div className="flex bg-red-200 rounded-lg p-2 items-center">
      <div className="text-red-500">
        <svg
          onClick={props.clearError}
          className="fill-current w-4"
          id="icon-cancel-circle"
          viewBox="0 0 32 32"
        >
          <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
          <path d="M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z"></path>
        </svg>
      </div>
      <div className="ml-3 text-sm">
        <span>{props.message}</span>
      </div>
    </div>
  );
}

export default ErrorNotification;
