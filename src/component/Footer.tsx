import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Fresh Mart</h2>
          <p className="text-sm">
            Your one-stop shop for fresh fruits & vegetables delivered fast.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-green-600">Shop</Link></li>
            <li><Link href="/cart" className="hover:text-green-600">Cart</Link></li>
            <li><Link href="/contact" className="hover:text-green-600">Contact</Link></li>
            <li><Link href="/about" className="hover:text-green-600">About Us</Link></li>
            <li><Link href="/login" className="hover:text-green-600">Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm">Email: support@freshmart.com</p>
          <p className="text-sm">Phone: +92 301 7376974</p>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="https://facebook.com" target="_blank" aria-label="Facebook" className="hover:text-blue-600">
              <FaFacebookF size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter" className="hover:text-sky-500">
              <FaTwitter size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn" className="hover:text-blue-700">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t pt-4 text-center text-xs text-gray-500">
        <p>
          © {new Date().getFullYear()} Fresh Mart. Developed with
          <span className="text-red-500 mx-1">❤️</span> by
          <span className="font-semibold text-green-700 ml-1">Abdul Jabbar</span>.
        </p>
        <p className="mt-1">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
