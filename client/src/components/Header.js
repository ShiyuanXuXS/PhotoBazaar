import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { AuthContext } from "../Helpers/AuthContext";
// import { set } from "mongoose";

function HeaderComponent() {
  const { loginStatus, role, userId, setRole, setUserId, setLoginStatus } =
    useContext(AuthContext);
  const isAdmin = role.includes("admin");
  // const { setAuthStatus, authStatus } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const Navigate = useNavigate();
  const myRef = useRef(null);

  const navigateToHome = () => {
    Navigate("/");
  };

  const navigateToLogin = () => {
    Navigate("/login");
  };

  const navigateToRegister = () => {
    Navigate("/register");
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Your logout logic here
    localStorage.removeItem("accessToken");
    setLoginStatus(false);
    setRole("");
    setUserId("");
    // setAuthStatus({
    //   email: "",
    //   _id: 0,
    //   status: false,
    //   username: "",
    // });
    //fix me
    Navigate("/");
    // Navigate("/login");
  };

  return (
    // <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
    <header className="bg-white">
      <nav
        className="mx-auto flex w-full items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <button onClick={navigateToHome} className="-m-1.5 p-1.5">
            <span className="sr-only">Photobazarr</span>
            <img className="h-8 w-auto" src="./logo.svg" alt="photobazarr" />
          </button>
        </div>
        {/* shows up when user haven't login in or sign up */}
        {!loginStatus && (
          <>
            <div className="lg:flex lg:flex-1 lg:justify-end">
              <button
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={navigateToLogin}
              >
                Sign in <span aria-hidden="true"></span>
              </button>
              <button
                className="mx-3 text-sm bg-sky-500 font-semibold rounded-lg px-2 py-1.5 text-base leading-6 text-white hover:bg-sky-600"
                onClick={navigateToRegister}
              >
                Join Us
              </button>
            </div>
          </>
        )}
        {/* shows up when user have loged in */}
        {loginStatus && (
          <>
            <div className="lg:flex lg:flex-1 lg:justify-end mx-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </div>
            <div className="relative inline-block text-left">
              <img
                onClick={() => setIsOpen(!isOpen)}
                alt="tania andrew"
                className="border border-gray-900 p-0.5 w-6 h-6 object-cover rounded-full cursor-pointer"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />

              <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {(ref) => (
                  <div
                    ref={myRef}
                    className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="py-1" role="none">
                      <div className="flex mx-3 items-center">
                        <button
                          className="block flex items-center px-1 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                          onClick={() => {
                            Navigate(`/profile/${userId}`);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 mr-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975M23.963 18.725A9 9 0 0012 15.75a9 9 0 00-11.963 2.975M23.963 18.725A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {/* if you set link here, it will not work when you click the icon. */}
                          {/* <Link to={`/profile/${userId}`}> */}
                          My Profile
                          {/* </Link> */}
                        </button>
                      </div>
                      <div className="flex mx-3 items-center">
                        <button
                          className="block flex items-center px-1 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 mr-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44.002.12.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Edit Profile
                        </button>
                      </div>
                      <div className="mx-3 flex items-center">
                        <button
                          className="block flex items-center px-1 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 mr-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                          My Artwork
                        </button>
                      </div>
                      {isAdmin ? (
                        <>
                          <div className="mx-3 flex items-center">
                            <button
                              className="block flex items-center px-1 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 mr-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                                />
                              </svg>
                              AdminCenter
                            </button>
                          </div>
                        </>
                      ) : (
                        <> </>
                      )}
                    </div>
                    <div className="mx-3 flex items-center">
                      <div className="border-t border-gray-400 w-full"></div>
                    </div>
                    <div className="mx-3 flex items-center">
                      <button
                        onClick={handleLogout}
                        className="block flex items-center px-1 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </Transition>
            </div>
          </>
        )}
      </nav>
    </header>
    // </AuthContext.Provider>
  );
}

export default HeaderComponent;
