import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-blue-600  justify-between text-white">
      <div className="m-6 font-semibold tracking-wide">Done.it</div>
      <div className="m-6 flex flex-col  lg:items-center">
        <div className="text-3xl lg:text-6xl">
          Make <span className="font-extrabold">110%</span> of you.
        </div>
        <div className="text-3xl">Everyday.</div>
        <div className="mt-8">
          <Link to="/signin">
            <button className="w-full bg-white text-blue-400 font-extrabold rounded-md py-2 lg:w-64 border ">
              Log in
            </button>
          </Link>
        </div>

        <div className="mt-4 mb-8 lg:mb-64">
          <Link to="/signup">
            <button className="w-full border text-white font-extrabold rounded-md py-2 lg:w-64 transition ease-out duration-1000 hover:bg-blue-800 hover:text-blue-400 ">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
