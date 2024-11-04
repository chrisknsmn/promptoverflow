import Logo from '@/public/LogoComponent';
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-footer text-footertext">
      <div className="max-w-screen-2xl mx-auto p-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-semibold mb-2">Social Media</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">Instagram</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Facebook</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Twitter</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Company</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Careers</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Legal</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t flex items-center overflow-hidden">
          <p className='flex-1'>&copy; {new Date().getFullYear()} Prompt Overflow.</p>
          <Link href="/" className="text-2xl flex items-center">
            <div className="text-white mr-2">
              <Logo />
            </div>
          </Link>
        </div>

      </div>
    </footer>
  );
}