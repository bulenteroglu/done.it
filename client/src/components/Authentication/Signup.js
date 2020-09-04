import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../../context/UserContext";
import ErrorNotification from "../Error/ErrorNotification";

function Signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, username };
      await Axios.post("/users/register", newUser);
      const loginResponse = await Axios.post("/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/dashboard");
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-blue-600  justify-between text-white">
      <div className="m-6 font-semibold tracking-wide">
        <Link to="/">
          <svg
            className="fill-current w-4"
            id="icon-chevron-left"
            viewBox="0 0 21 28"
          >
            <path d="M18.297 4.703l-8.297 8.297 8.297 8.297c0.391 0.391 0.391 1.016 0 1.406l-2.594 2.594c-0.391 0.391-1.016 0.391-1.406 0l-11.594-11.594c-0.391-0.391-0.391-1.016 0-1.406l11.594-11.594c0.391-0.391 1.016-0.391 1.406 0l2.594 2.594c0.391 0.391 0.391 1.016 0 1.406z"></path>
          </svg>
        </Link>
        <div className="mt-32 text-3xl">Create</div>
        <div className="text-3xl">Account</div>
      </div>

      <div>
        <svg
          className="-mb-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fill-opacity="1"
            d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <div className="bg-white text-black flex flex-col">
          {error && (
            <div className="mx-6">
              <ErrorNotification
                message={error}
                clearError={() => setError(undefined)}
              />
            </div>
          )}
          <div className="mt-8 mx-6 border-b border-gray-600 ">
            <div className="flex w-full">
              <div>
                <svg className="w-6" id="icon-user" viewBox="0 0 32 32">
                  <path d="M31.11 28.336c-0.201-0.133-3.848-2.525-9.273-3.699 1.99-2.521 3.268-5.912 3.811-8.169 0.754-3.128 0.461-9.248-2.543-13.062-1.756-2.229-4.213-3.406-7.105-3.406s-5.349 1.178-7.104 3.406c-3.004 3.813-3.296 9.933-2.543 13.061 0.543 2.257 1.82 5.648 3.811 8.169-5.425 1.174-9.072 3.566-9.272 3.699-0.733 0.488-1.061 1.4-0.805 2.242 0.254 0.845 1.033 1.423 1.913 1.423h28c0.881 0 1.658-0.578 1.914-1.422 0.257-0.842-0.071-1.754-0.804-2.242zM20.267 23.398l-0.326 0.414c-2.385 2.74-5.495 2.74-7.879 0l-0.327-0.414c-2.785-3.529-4.167-8.197-3.572-12.65 0.545-4.279 2.997-8.748 7.837-8.748s7.293 4.47 7.838 8.749c0.593 4.455-0.784 9.118-3.571 12.649zM2 30c0.138-0.092 3.526-2.314 8.586-3.408l2.484-0.537c0.887 0.582 1.86 0.945 2.93 0.945 1.071 0 2.043-0.363 2.93-0.945l2.484 0.537c5.020 1.086 8.396 3.283 8.586 3.408h-28z"></path>
                </svg>
              </div>
              <div className="flex-auto">
                <input
                  className="appearance-none border-none rounded w-full mb-2 pl-3 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 mx-6 border-b border-gray-600">
            <div className="flex w-full">
              <div>
                <svg
                  className="w-6"
                  id="icon-mail-envelope-closed"
                  viewBox="0 0 32 32"
                >
                  <path d="M5.315 9.274l7.735 6.726-7.737 6.728c-0.194-0.184-0.313-0.445-0.313-0.735v-11.986c0-0.289 0.121-0.549 0.315-0.733zM27.687 9.272c0.194 0.184 0.313 0.445 0.313 0.735v11.986c0 0.289-0.121 0.549-0.315 0.733l-7.735-6.726 7.737-6.728zM19.202 16.651l7.298 6.349h-20l7.298-6.349 2.702 2.349 2.702-2.349zM6.004 8c-1.107 0-2.004 0.895-2.004 1.994v12.012c0 1.101 0.89 1.994 2.004 1.994h20.993c1.107 0 2.004-0.895 2.004-1.994v-12.012c0-1.101-0.89-1.994-2.004-1.994h-20.993zM16.5 17.7l-10-8.7h20l-10 8.7z"></path>
                </svg>
              </div>
              <div className="flex-auto">
                <input
                  className="appearance-none border-none rounded w-full mb-2 pl-3 leading-tight focus:outline-none"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mb-1 mt-8 mx-6 border-b border-gray-600">
            <div className="flex w-full">
              <div>
                <svg className="w-5" id="icon-key" viewBox="0 0 32 32">
                  <path d="M22.004 0c-5.523 0-10 4.478-10 10 0 1.285 0.269 2.501 0.713 3.629l-12.149 12.148c-0.351 0.352-0.568 0.686-0.568 1.223v3c0 1.070 0.929 2 2 2h3c0.536 0 0.875-0.215 1.226-0.564l1.435-1.436h2.343c1.104 0 2-0.896 2-2v-2h2c1.104 0 2-0.896 2-2v-2.344l2.369-2.371c1.129 0.445 2.344 0.715 3.631 0.715 5.521 0 10-4.478 10-10s-4.479-10-10-10zM22.004 18c-1.48 0-2.852-0.43-4.041-1.132l-0.344 0.343-3.030 3.031c-0.375 0.375-0.586 0.883-0.586 1.414v2.344h-2c-1.104 0-2 0.895-2 2v2h-2.342c-0.53 0-1.039 0.211-1.414 0.586l-1.418 1.418-2.826-0.004-0.003-2.85 11.665-11.644c0 0 0 0.001 0.001 0.002l1.469-1.469c-0.702-1.189-1.132-2.56-1.132-4.040 0-4.418 3.583-8 8-8s8 3.582 8 8-3.581 8.001-7.999 8.001zM27.82 8.239c-1.121-1.562-2.486-2.925-4.055-4.054-0.255-0.185-0.585-0.231-0.882-0.127-1.389 0.489-2.34 1.439-2.826 2.828-0.037 0.104-0.055 0.212-0.055 0.319 0 0.199 0.062 0.396 0.182 0.563 1.125 1.564 2.488 2.928 4.053 4.053 0.256 0.184 0.584 0.231 0.881 0.128 1.391-0.486 2.342-1.438 2.83-2.828 0.037-0.104 0.055-0.212 0.055-0.319-0.001-0.199-0.064-0.396-0.183-0.563zM24.82 11.010c-1.478-1.063-2.765-2.35-3.82-3.793 0.387-1.103 1.111-1.827 2.182-2.221 1.479 1.065 2.764 2.349 3.816 3.811-0.391 1.095-1.113 1.815-2.178 2.203z"></path>
                </svg>
              </div>
              <div className="flex-auto">
                <input
                  className="appearance-none border-none rounded w-full mb-2 pl-3 leading-tight focus:outline-none"
                  type={passwordShown ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div onClick={togglePasswordVisiblity} className="text-gray-600">
                {passwordShown ? (
                  <svg
                    className="w-4 fill-current"
                    id="icon-eye"
                    viewBox="0 0 32 32"
                  >
                    <path d="M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
                  </svg>
                ) : (
                  <svg
                    className="w-4 fill-current"
                    id="icon-eye-blocked"
                    viewBox="0 0 32 32"
                  >
                    <path d="M29.561 0.439c-0.586-0.586-1.535-0.586-2.121 0l-6.318 6.318c-1.623-0.492-3.342-0.757-5.122-0.757-6.979 0-13.028 4.064-16 10 1.285 2.566 3.145 4.782 5.407 6.472l-4.968 4.968c-0.586 0.586-0.586 1.535 0 2.121 0.293 0.293 0.677 0.439 1.061 0.439s0.768-0.146 1.061-0.439l27-27c0.586-0.586 0.586-1.536 0-2.121zM13 10c1.32 0 2.44 0.853 2.841 2.037l-3.804 3.804c-1.184-0.401-2.037-1.521-2.037-2.841 0-1.657 1.343-3 3-3zM3.441 16c1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 1.715 0.54 3.304 1.459 4.607l-1.904 1.904c-1.639-1.151-3.038-2.621-4.114-4.323z"></path>
                    <path d="M24 13.813c0-0.849-0.133-1.667-0.378-2.434l-10.056 10.056c0.768 0.245 1.586 0.378 2.435 0.378 4.418 0 8-3.582 8-8z"></path>
                    <path d="M25.938 9.062l-2.168 2.168c0.040 0.025 0.079 0.049 0.118 0.074 1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303-1.208 0-2.403-0.149-3.561-0.439l-2.403 2.403c1.866 0.671 3.873 1.036 5.964 1.036 6.978 0 13.027-4.064 16-10-1.407-2.81-3.504-5.2-6.062-6.938z"></path>
                  </svg>
                )}
              </div>
            </div>
          </div>

          <div className="mx-6 mt-5">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-400 text-white font-extrabold rounded-md py-2"
            >
              Sign up
            </button>
          </div>
          <div className="mx-6 flex mb-4 mt-4 items-center justify-center">
            <div className="w-full border-b border-gray-600"></div>
            <div className="mx-2 text-gray-600">or</div>
            <div className="w-full border-b border-gray-600"></div>
          </div>
          <div className="mx-6 mb-10">
            <Link to="/signin">
              <button className="w-full border border-gray-600 text-gray-600 font-extrabold rounded-md py-2">
                Log in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
