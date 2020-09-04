import React, { useState } from "react";
import Axios from "axios";

function DeleteModal({ onClick, task }) {
  const [error, setError] = useState();

  const handleDelete = async (e) => {
    try {
      const options = {
        headers: {
          "X-auth-token": localStorage.getItem("auth-token"),
        },
      };
      await Axios.delete(`/todos/${task._id}`, options);

      onClick();
      window.location.reload(false);
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0,0,0,.5)" }}
      className="absolute top-0 left-0 w-full h-full flex items-center shadow-lg text-black"
    >
      <div className="container mx-auto  rounded-lg ">
        <div className="bg-white shadow-lg rounded-lg mx-5">
          <div className="modal-body px-3 py-2 flex flex-col items-center justify-center">
            <div className="font-bold mt-3">Want to Delete</div>
            <div className=" text-center text-sm text-gray-700 mt-3">
              Are you sure you want to delete this todo? You will{" "}
              <span style={{ color: "#FF4342" }}>not be able to recover</span>{" "}
              them.
            </div>
            <div className="flex flex-col items-center justify-center mt-3">
              <button
                onClick={handleDelete}
                style={{ backgroundColor: "#FF4342" }}
                className="text-white rounded-md py-2 px-4 text-sm flex items-center focus:outline-none"
              >
                Delete
              </button>
              <button
                onClick={onClick}
                className="my-3 text-gray-500 text-sm focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
