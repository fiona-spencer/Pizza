import { Button, Alert } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { app } from "../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

export default function OAuth({ handleOAuthSuccess }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      setLoading(true);
      const resultsFromGoogle = await signInWithPopup(auth, provider);

      // Call the parent component's function to pass the email
      handleOAuthSuccess(resultsFromGoogle.user.email); // Pass email to parent component

      setError(null); // Clear any previous errors
    } catch (error) {
      console.log("OAuth error:", error);
      setError("Something went wrong with Google sign-in.");
    } finally {
      setLoading(false);
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
        disabled={loading}
      >
        {loading ? (
          <span>Loading...</span>
        ) : (
          <>
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Continue with Google
          </>
        )}
      </Button>
    </div>
  );
}
