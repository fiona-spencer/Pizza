import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsInstagram, BsCartFill, BsEnvelopeAtFill } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-red-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-black"
            >
              <span className="px-40 py-3 bg-gradient-to-r from-white via-red-600 to-white square-lg text-white">
                hooray for pizza day
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fiona's Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  pizza website v.1
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/fiona-spencer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by=" pizza website v.1"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="#"
              icon={BsInstagram}
              style={{ color: "#000000" }}
            />
            <Footer.Icon
              href="https://www.doordash.com/store/hooray-for-pizza-day-toronto-27973800/?utm_campaign=gpa/"
              icon={BsCartFill}
              style={{ color: "#000000" }}
            />
            <Footer.Icon
              href="https://mail.google.com/mail/u/0/?fs=1&to=
                                fionagspencer@gmail.com&su=&body=&tf=cm"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsEnvelopeAtFill}
              style={{ color: "#000000" }}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}