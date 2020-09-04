import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-blue-600  justify-between text-white">
      <div className="m-6 font-semibold tracking-wide">Done.it</div>
      <div className="m-6 flex flex-col">
        <div className="text-3xl">
          Make <span className="font-extrabold">110%</span> of you.
        </div>
        <div className="text-3xl">Everyday.</div>
        <div className="mt-8">
          <Link to="/signin">
            <button className="w-full bg-white text-blue-400 font-extrabold rounded-md py-2">
              Log in
            </button>
          </Link>
        </div>

        <div className="mt-4 mb-8">
          <Link to="/signup">
            <button className="w-full border text-white font-extrabold rounded-md py-2">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
