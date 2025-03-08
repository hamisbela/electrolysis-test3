import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Info, Mail, FileText, PlusCircle, Menu, X, Sigma as Sitemap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gradient-to-r from-teal-600 to-teal-800 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <MapPin size={24} className="mr-2" />
              ElectrolysisNearMe
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-teal-200 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-teal-200 transition-colors">About</Link>
              <Link to="/blog" className="hover:text-teal-200 transition-colors">Blog</Link>
              <Link to="/contact" className="hover:text-teal-200 transition-colors">Contact</Link>
              <Link to="/add-listing" className="hover:text-teal-200 transition-colors">Add Listing</Link>
            </nav>
          </div>
          
          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-2 space-y-3">
              <Link 
                to="/" 
                className="block py-2 hover:bg-teal-700 px-3 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block py-2 hover:bg-teal-700 px-3 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/blog" 
                className="block py-2 hover:bg-teal-700 px-3 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="block py-2 hover:bg-teal-700 px-3 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/add-listing" 
                className="block py-2 hover:bg-teal-700 px-3 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Add Listing
              </Link>
            </nav>
          )}
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-teal-300">ElectrolysisHairRemovalNearMe.com</h3>
              <p className="text-gray-300">Find the best electrolysis hair removal services near you.</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path></svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-teal-300">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/" className="hover:text-teal-300 transition-colors flex items-center"><MapPin size={16} className="mr-2" /> Find Providers</Link></li>
                <li><Link to="/about" className="hover:text-teal-300 transition-colors flex items-center"><Info size={16} className="mr-2" /> About</Link></li>
                <li><Link to="/contact" className="hover:text-teal-300 transition-colors flex items-center"><Mail size={16} className="mr-2" /> Contact</Link></li>
                <li><Link to="/blog" className="hover:text-teal-300 transition-colors flex items-center"><FileText size={16} className="mr-2" /> Blog</Link></li>
                <li><Link to="/add-listing" className="hover:text-teal-300 transition-colors flex items-center"><PlusCircle size={16} className="mr-2" /> Add Your Business</Link></li>
                <li><Link to="/sitemap" className="hover:text-teal-300 transition-colors flex items-center"><Sitemap size={16} className="mr-2" /> Sitemap</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-teal-300">Popular States</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/state/california" className="hover:text-teal-300 transition-colors">California</Link></li>
                <li><Link to="/state/texas" className="hover:text-teal-300 transition-colors">Texas</Link></li>
                <li><Link to="/state/new-york" className="hover:text-teal-300 transition-colors">New York</Link></li>
                <li><Link to="/state/florida" className="hover:text-teal-300 transition-colors">Florida</Link></li>
                <li><Link to="/state/illinois" className="hover:text-teal-300 transition-colors">Illinois</Link></li>
                <li><Link to="/state/pennsylvania" className="hover:text-teal-300 transition-colors">Pennsylvania</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-teal-300">Popular Cities</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/city/los-angeles-ca" className="hover:text-teal-300 transition-colors">Los Angeles, CA</Link></li>
                <li><Link to="/city/new-york-ny" className="hover:text-teal-300 transition-colors">New York, NY</Link></li>
                <li><Link to="/city/chicago-il" className="hover:text-teal-300 transition-colors">Chicago, IL</Link></li>
                <li><Link to="/city/houston-tx" className="hover:text-teal-300 transition-colors">Houston, TX</Link></li>
                <li><Link to="/city/phoenix-az" className="hover:text-teal-300 transition-colors">Phoenix, AZ</Link></li>
                <li><Link to="/city/philadelphia-pa" className="hover:text-teal-300 transition-colors">Philadelphia, PA</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} ElectrolysisHairRemovalNearMe.com. All rights reserved.
              <span className="mx-2">|</span>
              <Link to="/sitemap" className="hover:text-teal-300 transition-colors">HTML Sitemap</Link>
              <span className="mx-2">|</span>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors">XML Sitemap</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;