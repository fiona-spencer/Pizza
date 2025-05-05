import { Button, Alert } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { app } from "../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginSuccess } from "../redux/slices/user/userSilce";

export default function OAuth({ userType }) {
  const [error, setError] = useState(null);
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    // Only check for userType in signup, not signin
    if (userType === "") {
      setError("Please choose a user type.");
      return;
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      // Send the user data and userType to the backend for further processing
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
          userType, // sending this to backend only during signup
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store user data in Redux state
        dispatch(loginSuccess(data));

        // Redirect based on user type
        if (userType === "restaurant") {
          navigate("/restaurant/dashboard");  // Redirect to the restaurant dashboard
        } else {
          navigate("/");  // Redirect to the home page for a customer
        }
      } else {
        setError(data.message || "Something went wrong during sign-in.");
      }
    } catch (error) {
      console.log("OAuth error:", error);
      setError("Something went wrong with Google sign-in.");
    }
  };

  return (
    <div className="mt-2 flex items-center justify-center mx-auto">
  {error && <Alert color="failure">{error}</Alert>}
  <Button
    type="button"
    className="bg-white border-2 font-bold border-red-400 text-red-500 px-6 rounded-lg 
              hover:bg-[#d64545f0] hover:text-white hover:scale-105 transition-all duration-300 ease-in-out"
    onClick={handleGoogleClick}
    color=""
  >
    <AiFillGoogleCircle className="w-6 h-6 mr-2" />
    Continue with Google
  </Button>
</div>

    
    
  );
}
