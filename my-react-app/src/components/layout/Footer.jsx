// src/components/layout/Footer.jsx
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <button className="footer-link">Home</button>
        <button className="footer-link">Browse</button>
        <button className="footer-link">About Us</button>
        <button className="footer-link">FAQ</button>
        <button className="footer-link">Contact</button>
      </div>
      <div className="footer-credits">
        <div className="footer-icon">
          <svg>
            <use href="#icon-library"></use>
          </svg>
        </div>
        <div className="footer-text">
          <div className="footer-text-row">
            <p>© Liber.</p>
            <p>2026</p>
          </div>
          <p>All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
