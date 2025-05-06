import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { SiUber, SiDoordash } from "react-icons/si";
import BgImage from '../../assets/hero-background.avif';
import Logo from '../../assets/logo.svg'

export default function FooterCom() {
  return (
    <footer
      className="relative bg-cover md:bg-auto bg-center border-t-8 border-red-500 py-2 sm:py-4 px-6 text-black"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div className="mt-2 sm:mt-0">
            <Link
              to="/"
              className="self-center flex justify-center items-center text-sm sm:text-lg font-bold text-red-500"
            >
              <img
                src={Logo}
                alt="hooray for pizza day"
                className="h-[17px] sm:h-[50px] w-auto"
              />
            </Link>
          </div>

          {/* Flex Container for Sections */}
          <div className="grid grid-cols-3 mt-2 sm:mt-0 gap-2">

            {/* Follow Us */}
            <div className="text-left">
              <h4 className="text-white bg-red-600 px-2 rounded-md text-sm sm:text-base font-bold uppercase">Follow Us</h4>
              <div className="space-y-1 mt-2 flex flex-col items-start pl-1">
                <a
                  href="https://github.com/fiona-spencer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm sm:text-base font-medium"
                >
                  Insta <BsInstagram className="ml-1" />
                </a>
              </div>
            </div>
            {/* About */}
            <div>
              <h4 className="text-white bg-red-600 pl-8 sm:pl-10 rounded-md text-sm sm:text-base font-bold uppercase">About</h4>
              <div className="space-y-1 mt-2 flex flex-col">
                <Link to="https://www.google.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-700 text-sm sm:text-base font-medium text-center">Contact Us</Link>
                <Link to="https://www.google.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-700 text-sm sm:text-base font-medium text-center">Careers</Link>
              </div>
            </div>

            {/* Online Order */}
            <div className="text-right">
              <h4 className="text-white bg-red-600 px-2 rounded-md text-sm sm:text-base font-bold uppercase">Online Order</h4>
              <div className="space-y-1 flex flex-col items-end">
                <Link to="#" className="text-red-500 hover:text-red-700 text-sm sm:text-base font-medium flex items-center">
                  <SiUber className="mr-1 h-8 w-8" /> Eats
                </Link>
                <Link to="#" className="text-red-500 hover:text-red-700 text-sm sm:text-base font-medium flex items-center">
                  Doordash <SiDoordash className="ml-1 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-red-500 sm:mt-4 mt-1"></div>

        <div className="w-full sm:flex sm:items-center sm:justify-between text-center sm:text-left sm:mt-4 mt-1">
          <p className="text-red-500 text-xs sm:text-sm font-bold">
            &copy; {new Date().getFullYear()} Hooray for Pizza Day v.1
          </p>
        </div>
      </div>
    </footer>
  );
}
