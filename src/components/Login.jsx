import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Background_IMG, USER_AVATAR } from "../utils/Constant";

export const Login = () => {
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState({});

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage({});
    name.current && (name.current.value = "");
    email.current.value = "";
    password.current.value = "";
  };

  const clearFormFields = () => {
    if (name.current) name.current.value = "";
    email.current.value = "";
    password.current.value = "";
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const emailVal = email.current.value;
    const passwordVal = password.current.value;
    const nameVal = name.current ? name.current.value : "";
    const errors = validateData(emailVal, passwordVal, nameVal);
    setErrorMessage(errors);
    // Only return if there are actual errors
    if (Object.keys(errors).length > 0) return;

    //Sign In/Up Logic
    if (!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(auth, emailVal, passwordVal)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameVal,
            photoURL: USER_AVATAR
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              clearFormFields();
            })
            .catch((error) => {
              // An error occurred
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage((prev) => ({
                ...prev,
                auth: `${errorCode}: ${errorMessage}`,
              }));
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage((prev) => ({
            ...prev,
            auth: `${errorCode}: ${errorMessage}`,
          }));
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(auth, emailVal, passwordVal)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          clearFormFields();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage((prev) => ({
            ...prev,
            auth: `${errorCode}: ${errorMessage}`,
          }));
        });
    }
  };
  return (
    <div className=" h-screen w-full">
      <Header />
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 -z-0">
        <img
          src={Background_IMG}
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay at Top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-transparent" />
      </div>
      <div className="flex justify-center items-center h-full">
        <form
          className="relative bg-black/75 text-white px-10 pt-12 pb-16 rounded-md max-w-md w-full "
          key={location.key}
        >
          <h1 className="text-3xl font-bold mb-6">
            Sign {isSignInForm ? "In" : "Up"}
          </h1>

          {!isSignInForm ? (
            <>
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="w-full bg-zinc-800 p-3 mb-4 rounded text-sm outline-none focus:ring-2 focus:ring-red-600"
              />
              {errorMessage.name && (
                <p className="text-red-500 text-sm mb-2">{errorMessage.name}</p>
              )}
            </>
          ) : (
            ""
          )}

          {/* Email Input */}
          <input
            ref={email}
            type="text"
            placeholder="Email"
            className="w-full bg-zinc-800 p-3 mb-4 rounded text-sm outline-none focus:ring-2 focus:ring-red-600"
            autoComplete="off"
            //onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessage.email && (
            <p className="text-red-500 text-sm mb-2">{errorMessage.email}</p>
          )}

          {/* Password Input */}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-800 p-3 mb-4 rounded text-sm outline-none focus:ring-2 focus:ring-red-600"
            autoComplete="new-password"
            //onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage.password && (
            <p className="text-red-500 text-sm mb-2">{errorMessage.password}</p>
          )}

          {/* Sign In Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-red-700 hover:bg-red-600 py-3 mt-4 rounded font-semibold text-white mb-4 cursor-pointer"
          >
            Sign {isSignInForm ? "In" : "Up"}
          </button>
          {errorMessage.auth && (
            <p className="text-red-500 text-sm mt-3">{errorMessage.auth}</p>
          )}

     

          {/* New to Metflix & Sign Up */}
          <div className="flex justify-center items-center w-full mt-4 text-sm text-gray-300">
            <p
              onClick={toggleSignInForm}
              className="text-white font-medium hover:underline cursor-pointer"
            >
              {isSignInForm
                ? "New to Metflix? Sign Up Now."
                : "Already registered? Sign In Now"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
