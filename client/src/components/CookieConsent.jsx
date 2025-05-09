import { useSelector, useDispatch } from "react-redux";
import { acceptCookies, declineCookies, logout } from "../redux/slices/user/userSilce";
import { TbPizzaOff, TbPizza } from "react-icons/tb";

const CookieConsent = () => {
  const dispatch = useDispatch();
  const { acceptedCookies } = useSelector((state) => state.user);

  // ✅ Only hide the modal if cookies were accepted
  if (acceptedCookies) return null;

  const handleAccept = () => {
    dispatch(acceptCookies());
    document.body.style.overflow = "auto";
    document.body.style.position = "";
    document.body.style.transform = "";
    document.body.style.transformOrigin = "";
  };

  const handleDecline = () => {
    document.body.style.position = "fixed";
    document.body.style.transform = "scaleX(1.3)";
    document.body.style.transformOrigin = "left";
    dispatch(logout());
    dispatch(declineCookies()); // Only marks declined, so prompt shows again on reload
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white text-black px-6 py-4 rounded-xl shadow-xl flex items-center gap-4 max-w-xs w-full sm:w-auto">
      <div className="flex-1">
        <p className="text-xs sm:text-sm leading-snug">
          We use cookies to improve your experience. By accepting, you agree to our
          <a href="/privacy-policy" className="underline text-blue-600"> Privacy Policy</a>.
        </p>
      </div>
      <div className="flex flex-col gap-3 items-center">
        {/* Accept button */}
        <div className="flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md">
          <button onClick={handleAccept} className="text-xs sm:text-sm transition duration-300">
            Accept
          </button>
          <TbPizza className="ml-2" />
        </div>

        {/* Decline button */}
        <div className="flex bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md">
          <button onClick={handleDecline} className="text-xs sm:text-sm transition duration-300">
            Decline
          </button>
          <TbPizzaOff className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
