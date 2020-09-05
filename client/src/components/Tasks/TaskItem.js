import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import DeleteModal from "../Modal/DeleteModal";
import Axios from "axios";

function TaskItem({ task, toggleTest }) {
  const [colour, setColour] = useState();
  const [modal, setModal] = useState(false);

  const [toggle, setToggle] = useState(toggleTest);

  useEffect(() => {
    switch (task.catagory) {
      case "urgent":
        setColour("#F26950");
        break;
      case "running":
        setColour("#2CC09C");
        break;
      case "ongoing":
        setColour("#5A55CA");
        break;
      default:
        break;
    }
  }, []);

  const deleteModal = () => {
    setModal(!modal);
  };

  const tempClick = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const options = {
      headers: {
        "X-auth-token": localStorage.getItem("auth-token"),
      },
    };

    const fetchAPI = async () => {
      const response = await Axios.put(
        `/todos/done/${task._id}`,
        { done: toggle },
        options
      );
    };
    fetchAPI();
  }, [toggle]);

  return (
    <div
      className={`mx-6 bg-white rounded-lg flex flex-col py-4 px-4 mt-3 mb-4  ${
        toggle && "opacity-25"
      }`}
    >
      <div
        style={{ color: `${colour}` }}
        className="uppercase text-sm  tracking-tighter font-semibold border-b-2 border-gray-200 pb-1"
      >
        {task.catagory}
      </div>
      <div
        style={{ borderColor: `${colour}` }}
        className="mt-3 border-l-2  flex"
      >
        <div className="font-semibold ml-2 flex flex-col">
          <div className="tracking-tight">
            <div className="font-extrabold ml-1 text-gray-800">
              {task.title}
            </div>
            <div className="font-light text-sm ml-1 text-gray-600">
              {task.description}
            </div>
          </div>
        </div>
        <div className="ml-auto  text-gray-400 flex items-center justify-center ">
          <div className="cursor-pointer">
            {!toggle ? (
              <svg
                onClick={tempClick}
                className="w-5 fill-current pb-1 mr-5"
                id="icon-checkmark"
                viewBox="0 0 24 24"
              >
                <path d="M0 11l2-2 5 5 11-11 2 2-13 13z"></path>
              </svg>
            ) : (
              <svg
                onClick={tempClick}
                className="w-5 fill-current pb-1 mr-5"
                id="icon-undo"
                viewBox="0 0 24 24"
              >
                <path d="M28.154 3.72c-4.957-4.956-13.604-4.96-18.558 0l-5.597 5.601v-5.32h-4v11.999h11.999v-4l-5.023 0.003 5.453-5.453c3.445-3.449 9.452-3.449 12.897 0.004 1.723 1.723 2.672 4.012 2.672 6.449 0 2.44-0.949 4.73-2.672 6.458l-3.016 3.015 2.828 2.827 3.016-3.008c2.477-2.485 3.844-5.783 3.844-9.291 0-3.507-1.367-6.804-3.844-9.283zM18.448 32l-2.828-2.832 2.83-2.827 2.828 2.832z"></path>
              </svg>
            )}
          </div>
          <div>
            <button onClick={deleteModal} className="focus:outline-none">
              <svg
                className="fill-current w-5 -mr-2"
                id="icon-more_vert"
                viewBox="0 0 24 24"
              >
                <path d="M12 15.984q0.797 0 1.406 0.609t0.609 1.406-0.609 1.406-1.406 0.609-1.406-0.609-0.609-1.406 0.609-1.406 1.406-0.609zM12 9.984q0.797 0 1.406 0.609t0.609 1.406-0.609 1.406-1.406 0.609-1.406-0.609-0.609-1.406 0.609-1.406 1.406-0.609zM12 8.016q-0.797 0-1.406-0.609t-0.609-1.406 0.609-1.406 1.406-0.609 1.406 0.609 0.609 1.406-0.609 1.406-1.406 0.609z"></path>
              </svg>
            </button>
            <div>
              {modal && <DeleteModal onClick={deleteModal} task={task} />}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5 text-gray-500">
        <div className="flex items-center">
          <svg className="fill-current w-4" id="icon-time" viewBox="0 0 20 20">
            <path d="M10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10v0c5.523 0 10 4.477 10 10s-4.477 10-10 10v0zM10 18c4.418 0 8-3.582 8-8s-3.582-8-8-8v0c-4.418 0-8 3.582-8 8s3.582 8 8 8v0zM9 10.41v-6.41h2v5.59l3.95 3.95-1.41 1.41-4.54-4.54z"></path>
          </svg>
          <span className="tracking-tighter text-gray-900 text-sm ml-2 font-semibold">
            <Moment format="h A">{task.startTime}</Moment> -{" "}
            <Moment format="h A">{task.endTime}</Moment>
          </span>
        </div>
        {/* <div className="flex items-center">
          <svg className="fill-current w-4" id="icon-time" viewBox="0 0 16 16">
            <path d="M9 9.555v-2.555c0-1.657-1.343-3-3-3s-3 1.343-3 3v2.555c-1.786 0.693-3 1.969-3 3.445 0 0.177 0 2 0 2 0 0.553 0.447 1 1 1h10c0.553 0 1-0.447 1-1 0 0 0-1.823 0-2 0-1.477-1.214-2.752-3-3.445zM5 7c0-0.553 0.447-1 1-1s1 0.447 1 1v3c0 0.553-0.447 1-1 1s-1-0.447-1-1v-3zM10 14h-8v-1c0-0.607 0.554-1.146 1.409-1.513 0.519 0.9 1.479 1.513 2.591 1.513s2.072-0.612 2.591-1.513c0.855 0.367 1.409 0.905 1.409 1.513v1zM13 5.555v-2.555c0-1.657-1.343-3-3-3s-3 1.343-3 3v0.142c0.79 0.204 1.479 0.642 2 1.238v-1.38c0-0.553 0.447-1 1-1s1 0.447 1 1v3c0 0.553-0.447 1-1 1v2c1.112 0 2.072-0.612 2.591-1.513 0.855 0.367 1.409 0.905 1.409 1.513v1h-3.649c1.007 0.519 1.78 1.203 2.221 2h2.429c0.553 0 1-0.447 1-1 0 0 0-1.823 0-2 0-1.477-1.214-2.752-3-3.445z"></path>
          </svg>
          <span className="tracking-tighter text-gray-900 text-sm ml-2 font-semibold">
            2 Persons
          </span>
        </div>
        <div className="flex items-center">
          <svg
            className="fill-current w-4"
            id="icon-share-2"
            viewBox="0 0 24 24"
          >
            <path d="M16.214 18.098c0.025-0.033 0.048-0.067 0.070-0.104 0.020-0.035 0.038-0.071 0.054-0.107 0.073-0.108 0.156-0.209 0.248-0.301 0.363-0.363 0.861-0.586 1.414-0.586s1.051 0.223 1.414 0.586 0.586 0.861 0.586 1.414-0.223 1.051-0.586 1.414-0.861 0.586-1.414 0.586-1.051-0.223-1.414-0.586-0.586-0.861-0.586-1.414c0-0.325 0.077-0.631 0.214-0.902zM16.301 6.056c-0.009-0.017-0.018-0.034-0.028-0.051s-0.020-0.034-0.031-0.050c-0.154-0.283-0.242-0.608-0.242-0.955 0-0.553 0.223-1.051 0.586-1.414s0.861-0.586 1.414-0.586 1.051 0.223 1.414 0.586 0.586 0.861 0.586 1.414-0.223 1.051-0.586 1.414-0.861 0.586-1.414 0.586-1.051-0.223-1.414-0.586c-0.108-0.108-0.204-0.228-0.285-0.358zM7.699 10.944c0.009 0.017 0.018 0.034 0.028 0.051s0.020 0.034 0.031 0.050c0.154 0.283 0.242 0.608 0.242 0.955s-0.088 0.672-0.243 0.956c-0.011 0.016-0.021 0.033-0.031 0.050s-0.019 0.033-0.027 0.050c-0.081 0.13-0.177 0.25-0.285 0.358-0.363 0.363-0.861 0.586-1.414 0.586s-1.051-0.223-1.414-0.586-0.586-0.861-0.586-1.414 0.223-1.051 0.586-1.414 0.861-0.586 1.414-0.586 1.051 0.223 1.414 0.586c0.108 0.108 0.204 0.228 0.285 0.358zM14.15 6.088l-5.308 3.097c-0.004-0.005-0.009-0.009-0.014-0.014-0.722-0.722-1.724-1.171-2.828-1.171s-2.106 0.449-2.828 1.172-1.172 1.724-1.172 2.828 0.449 2.106 1.172 2.828 1.724 1.172 2.828 1.172 2.106-0.449 2.828-1.172c0.005-0.005 0.009-0.009 0.014-0.014l5.309 3.094c-0.098 0.347-0.151 0.714-0.151 1.092 0 1.104 0.449 2.106 1.172 2.828s1.724 1.172 2.828 1.172 2.106-0.449 2.828-1.172 1.172-1.724 1.172-2.828-0.449-2.106-1.172-2.828-1.724-1.172-2.828-1.172-2.106 0.449-2.828 1.172c-0.003 0.003-0.007 0.007-0.010 0.010l-5.312-3.095c0.098-0.346 0.15-0.71 0.15-1.087s-0.052-0.742-0.15-1.088l5.308-3.098c0.004 0.005 0.009 0.009 0.014 0.014 0.722 0.723 1.724 1.172 2.828 1.172s2.106-0.449 2.828-1.172 1.172-1.724 1.172-2.828-0.449-2.106-1.172-2.828-1.724-1.172-2.828-1.172-2.106 0.449-2.828 1.172-1.172 1.724-1.172 2.828c0 0.377 0.052 0.742 0.15 1.088z"></path>
          </svg>
          <span className="tracking-tighter text-gray-900 text-sm ml-2 font-semibold">
            Share
          </span>
        </div> */}
      </div>
    </div>
  );
}

export default TaskItem;
