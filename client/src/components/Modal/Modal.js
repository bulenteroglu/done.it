import React, { useState, useContext } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import DatePicker from "react-datepicker";

import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorNotification from "../Error/ErrorNotification";

function Modal({ onClick }) {
  const [title, setTitle] = useState();
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [description, setDescription] = useState();
  const [catagory, setCatagory] = useState();
  const [error, setError] = useState();

  const [urgent, setUrgent] = useState(false);
  const [running, setRunning] = useState(false);
  const [ongoing, setOngoing] = useState(false);

  const { setUserData } = useContext(UserContext);

  const handleTaskSubmit = async (e) => {
    const options = {
      headers: {
        "X-auth-token": localStorage.getItem("auth-token"),
      },
    };

    try {
      const todos = {
        title,
        date,
        startTime,
        endTime,
        description,
        catagory,
        done: false,
      };
      await Axios.post("/todos/", todos, options);

      onClick();
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  const handleCatagory = (value) => {
    switch (value) {
      case "urgent":
        setUrgent(true);
        setRunning(false);
        setOngoing(false);
        setCatagory("urgent");
        break;
      case "running":
        setUrgent(false);
        setRunning(true);
        setOngoing(false);
        setCatagory("running");
        break;
      case "ongoing":
        setUrgent(false);
        setRunning(false);
        setOngoing(true);
        setCatagory("ongoing");
        break;
      default:
    }
  };

  return (
    <div
      style={{ backgroundColor: "rgba(0,0,0,.5)", zIndex: "100" }}
      className="p-2 fixed top-0 left-0 w-full h-full flex items-center shadow-lg "
    >
      <div className="container mx-auto lg:px-32 rounded-lg text-black">
        <div className="bg-gray-200 rounded">
          <div className="flex justify-end pr-4 pt-2">
            <button onClick={onClick} className="hover:text-gray-700 mt-2">
              <svg
                className="fill-current w-4"
                id="icon-cancel-circle"
                viewBox="0 0 32 32"
              >
                <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
                <path d="M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z"></path>
              </svg>
            </button>
          </div>
          <div className="modal-body p-8 pt-3">
            <div className="flex flex-col">
              <div className="w-full">
                <div className="mb-5 font-bold text-xl text-black">
                  Add Task
                </div>
                <div className="mb-5">
                  {error && (
                    <ErrorNotification
                      message={error}
                      clearError={() => setError(undefined)}
                    />
                  )}
                </div>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Your Task Name"
                  className="bg-gray-200 placeholder-gray-500 tracking-tighter focus:outline-none w-full border-l-2 pl-2 border-orange-600 mb-3"
                />
              </div>
              <div className="mt-1 flex flex-col">
                <div className="uppercase text-xs text-gray-700">date</div>
                <div className="flex w-full border-b border-gray-400 justify-between items-center pb-1">
                  <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="MMM d, YYY"
                    className="bg-gray-200 tracking-tighter text-gray-900 font-semibold focus:outline-none  w-full "
                  />
                  <svg className="w-5" id="icon-calendar" viewBox="0 0 24 24">
                    <path d="M7 2v1h-2c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v14c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h14c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-14c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-2v-1c0-0.552-0.448-1-1-1s-1 0.448-1 1v1h-6v-1c0-0.552-0.448-1-1-1s-1 0.448-1 1zM20 9h-16v-3c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h2v1c0 0.552 0.448 1 1 1s1-0.448 1-1v-1h6v1c0 0.552 0.448 1 1 1s1-0.448 1-1v-1h2c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707zM4 11h16v9c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-14c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707z"></path>
                  </svg>
                </div>
              </div>
              <div className="flex tracking-tight">
                <div className="mt-5 flex flex-col w-1/2 mr-3">
                  <div className="uppercase text-xs text-gray-700">
                    start time
                  </div>
                  <div className="flex w-full border-b border-gray-400 justify-between items-center pb-1">
                    <DatePicker
                      placeholderText="11:00 AM"
                      selected={startTime}
                      onChange={(date) => setStartTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className="bg-gray-200 tracking-tighter text-gray-900 font-semibold focus:outline-none  w-full "
                    />
                    <svg
                      className="w-8 fill-current"
                      id="icon-cheveron-down"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l0.707 0.707 5.657-5.657-1.414-1.414-4.243 4.242-4.243-4.242-1.414 1.414z"></path>
                    </svg>
                  </div>
                </div>
                <div className="mt-5 flex flex-col w-1/2 ml-3">
                  <div className="uppercase text-xs text-gray-700">
                    end time
                  </div>
                  <div className="flex w-full border-b border-gray-400 justify-between items-center pb-1">
                    <DatePicker
                      placeholderText="12:00 AM"
                      selected={endTime}
                      onChange={(date) => setEndTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={60}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className="bg-gray-200 tracking-tighter text-gray-900 font-semibold focus:outline-none  w-full "
                    />
                    <svg
                      className="w-8 fill-current"
                      id="icon-cheveron-down"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l0.707 0.707 5.657-5.657-1.414-1.414-4.243 4.242-4.243-4.242-1.414 1.414z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-col">
                <div className="uppercase text-xs text-gray-700">
                  description
                </div>

                <div className="flex w-full border-b border-gray-400 justify-between items-center ">
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="bg-gray-200 placeholder-gray-500  focus:outline-none w-full"
                  />
                </div>
              </div>
              <div className="mt-4 uppercase text-gray-600 text-sm tracking-tighter mb-1">
                Catagory
                <div className="flex mt-1 font-semibold">
                  <button
                    className="focus:outline-none uppercase text-xs relative  bg-red-300 bg-opacity-50 text-red-500  rounded py-1 px-2 flex items-center"
                    value="urgent"
                    onClick={(e) => handleCatagory(e.target.value)}
                  >
                    urgent
                    {urgent && (
                      <div
                        style={{ right: "-7px", top: "-7px", padding: "1px" }}
                        className="absolute fill-current bg-gray-200 rounded-full"
                      >
                        <svg
                          className="w-3"
                          id="icon-check-circle"
                          viewBox="0 0 24 28"
                        >
                          <path d="M20.062 11.469c0-0.266-0.094-0.531-0.281-0.719l-1.422-1.406c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-6.375 6.359-3.531-3.531c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-1.422 1.406c-0.187 0.187-0.281 0.453-0.281 0.719s0.094 0.516 0.281 0.703l5.656 5.656c0.187 0.187 0.453 0.297 0.703 0.297 0.266 0 0.531-0.109 0.719-0.297l8.484-8.484c0.187-0.187 0.281-0.438 0.281-0.703zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z"></path>
                        </svg>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={(e) => handleCatagory(e.target.value)}
                    value="running"
                    style={{ backgroundColor: "#2CC09C" }}
                    className="relative text-xs uppercase text-white rounded py-1 px-2 ml-2 flex items-center focus:outline-none"
                  >
                    running
                    {running && (
                      <div
                        style={{
                          right: "-7px",
                          top: "-7px",
                          padding: "1px",
                          color: "#2CC09C",
                        }}
                        className="absolute fill-current bg-gray-200 rounded-full"
                      >
                        <svg
                          className="w-3"
                          id="icon-check-circle"
                          viewBox="0 0 24 28"
                        >
                          <path d="M20.062 11.469c0-0.266-0.094-0.531-0.281-0.719l-1.422-1.406c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-6.375 6.359-3.531-3.531c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-1.422 1.406c-0.187 0.187-0.281 0.453-0.281 0.719s0.094 0.516 0.281 0.703l5.656 5.656c0.187 0.187 0.453 0.297 0.703 0.297 0.266 0 0.531-0.109 0.719-0.297l8.484-8.484c0.187-0.187 0.281-0.438 0.281-0.703zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z"></path>
                        </svg>
                      </div>
                    )}
                  </button>
                  <button
                    onClick={(e) => handleCatagory(e.target.value)}
                    value="ongoing"
                    className="relative text-xs uppercase bg-indigo-300 bg-opacity-50 text-indigo-500  rounded py-1 px-2 ml-2 flex items-center focus:outline-none"
                  >
                    ongoing
                    {ongoing && (
                      <div
                        style={{ right: "-7px", top: "-7px", padding: "1px" }}
                        className="absolute fill-current bg-gray-200 rounded-full"
                      >
                        <svg
                          className="w-3"
                          id="icon-check-circle"
                          viewBox="0 0 24 28"
                        >
                          <path d="M20.062 11.469c0-0.266-0.094-0.531-0.281-0.719l-1.422-1.406c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-6.375 6.359-3.531-3.531c-0.187-0.187-0.438-0.297-0.703-0.297s-0.516 0.109-0.703 0.297l-1.422 1.406c-0.187 0.187-0.281 0.453-0.281 0.719s0.094 0.516 0.281 0.703l5.656 5.656c0.187 0.187 0.453 0.297 0.703 0.297 0.266 0 0.531-0.109 0.719-0.297l8.484-8.484c0.187-0.187 0.281-0.438 0.281-0.703zM24 14c0 6.625-5.375 12-12 12s-12-5.375-12-12 5.375-12 12-12 12 5.375 12 12z"></path>
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleTaskSubmit}
                  className="bg-blue-500 text-white w-full rounded-lg py-3 text-sm focus:outline-none font-semibold"
                >
                  Create New Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
