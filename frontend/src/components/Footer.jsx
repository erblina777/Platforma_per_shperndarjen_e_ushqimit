export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <img className="logo" src="/library/logo.png" alt="MealHub Logo" />
          <p>Your favorite meals, delivered fast.</p>
        </div>

        <div>
          <h4>Pages</h4>
          <ul>
            <li><a href="#">Shopping Cart</a></li>
            <li><a href="/menu-items">Menu</a></li>
            <li><a href="#">Restaurants</a></li>
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