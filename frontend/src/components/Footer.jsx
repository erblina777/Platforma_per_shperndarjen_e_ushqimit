export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <img className="logo" src="/library/logo.png" alt="MealHub Logo" />
          <p>Your favorite meals, delivered fast.</p>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <p>support@mealhub.com</p>
          <p>049 567 890</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MealHub. All rights reserved.</p>
      </div>
    </footer>
  );
}