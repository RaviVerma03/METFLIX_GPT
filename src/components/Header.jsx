import React, { useEffect } from "react";
import Logo from "../assets/logo.png";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { SupportedLanguages, USER_AVATAR } from "../utils/Constant";
import { toggleGPTSearch } from "../utils/GPTSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.GPT.showGPTSearch)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleGPTSearch = () => {
    dispatch(toggleGPTSearch());
  };

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  }
  function handleLanguageChange(e) {
      dispatch(changeLanguage(e.target.value))    
  }
  return (
    <div className="absolute top-0 left-0 w-full z-50 flex flex-col md:flex-row justify-between items-center md:px-12 px-2 py-2 bg-gradient-to-b from-black">
      <img src={Logo} alt="Metflix logo" className="w-32 md:w-40 object-contain" />
      {user && (
        <div className="flex md:justify-end justify-center items-center gap-1 md:gap-4 w-full md:w-auto -mt-4 md:m-0">
          {showGPTSearch && <select className="px-3 py-2 mx-2 bg-gray-900 text-white text-sm rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200" onChange={handleLanguageChange}>
          {SupportedLanguages.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>}
          {/* <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white">
    ▼
  </div> */}

          <button
            className="py-2 bg-purple-700 text-white px-4 mx-4 text-sm md:text-base rounded-md hover:bg-purple-800"
            onClick={handleGPTSearch}
          >
            {showGPTSearch ? 'Home' : 'GPT Search'}
          </button>
          <img
            className="w-8 h-8 md:w-10 md:h-10"
            src={user.photoURL ? user.photoURL : USER_AVATAR}
            alt="user icon"
          />
          <button
            onClick={handleSignOut}
            className="text-white text-sm md:text-base font-semibold hover:underline"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
