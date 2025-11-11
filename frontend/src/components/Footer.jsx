import React from "react";

const Footer = () => {
  return (
    <>
        <hr />
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10 dark:bg-slate-900 dark:text-white">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="w-80">
            <label>Enter your email address</label>
            <div className="join">
              <input
             
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item outline-none"
              />
              <button  className="bg-pink-500 text-white hover:bg-pink-600 ml-5 p-3 rounded">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
    </>
  );
};

export default Footer;
