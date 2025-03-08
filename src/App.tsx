import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
import StatePage from './pages/StatePage';
import BusinessPage from './pages/BusinessPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import AddListingPage from './pages/AddListingPage';
import ScrollToTop from './components/ScrollToTop';
import SitemapPage from './pages/SitemapPage';
import SitemapXML from './pages/SitemapXML';

// Import types
import { 
  BusinessListing, 
  CityPageData, 
  StatePageData, 
  BusinessPageData 
} from './types';

// Import pre-generated data (empty placeholders for development)
import pagesData from './data/pagesData.json';

function App() {
  const [data, setData] = useState({
    businessListings: pagesData.businessListings || [] as BusinessListing[],
    cityPages: pagesData.cityPages || [] as CityPageData[],
    statePages: pagesData.statePages || [] as StatePageData[],
    businessPages: pagesData.businessPages || [] as BusinessPageData[]
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In a production environment, the data would be loaded during build
    // This is just to simulate loading and ensure the component renders
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading site data...</p>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route 
            path="/" 
            element={<HomePage 
              businessListings={data.businessListings} 
              cityPages={data.cityPages} 
              statePages={data.statePages} 
            />} 
          />
          
          {/* Dynamic routes for cities */}
          {data.cityPages.map(cityPage => (
            <Route 
              key={`city-${cityPage.slug}`}
              path={`/city/${cityPage.slug}`} 
              element={<CityPage cityData={cityPage} />} 
            />
          ))}
          
          {/* Fallback for cities not in pre-generated data */}
          <Route path="/city/:cityState" element={<CityPage />} />
          
          {/* Dynamic routes for states */}
          {data.statePages.map(statePage => (
            <Route 
              key={`state-${statePage.slug}`}
              path={`/state/${statePage.slug}`} 
              element={<StatePage stateData={statePage} />} 
            />
          ))}
          
          {/* Fallback for states not in pre-generated data */}
          <Route path="/state/:state" element={<StatePage />} />
          
          {/* Dynamic routes for businesses */}
          {data.businessPages.map(businessPage => (
            <Route 
              key={`business-${businessPage.slug}`}
              path={`/business/${businessPage.slug}`} 
              element={<BusinessPage businessData={businessPage} />} 
            />
          ))}
          
          {/* Fallback for businesses not in pre-generated data */}
          <Route path="/business/:businessId" element={<BusinessPage />} />
          
          {/* Static routes */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/add-listing" element={<AddListingPage />} />
          <Route path="/sitemap" element={<SitemapPage 
            businesses={data.businessListings}
            cities={data.cityPages}
            states={data.statePages}
          />} />
          <Route path="/sitemap.xml" element={<SitemapXML 
            businesses={data.businessListings}
            cities={data.cityPages}
            states={data.statePages}
          />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;