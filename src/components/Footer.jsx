import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="structure">
        <img src="/assets/footer-logo.png" width={133} height={50} alt="the13thgeek" />
        {/* <img src="https://placehold.co/200x75" alt="" /> */}
        <p>Copyright&copy; 2025 theMainframe.<br />
        Powered by <a href="https://the13thgeek.com">the13thgeek.com</a>. </p>
        <p>v{import.meta.env.VITE_APP_VER}</p>
      </div>
    </footer>
  )
}

export default Footer