import React, { useEffect } from 'react';
import { BusinessListing, CityPageData, StatePageData } from '../types';

interface SitemapXMLProps {
  businesses: BusinessListing[];
  cities: CityPageData[];
  states: StatePageData[];
}

const SitemapXML: React.FC<SitemapXMLProps> = ({ 
  businesses = [], 
  cities = [], 
  states = [] 
}) => {
  useEffect(() => {
    // Generate XML sitemap content
    const domain = window.location.origin;
    const today = new Date().toISOString();
    
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domain}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domain}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domain}/add-listing</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domain}/sitemap</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    
    // Add state pages
    states.forEach(state => {
      xmlContent += `
  <url>
    <loc>${domain}/state/${state.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
    
    // Add city pages
    cities.forEach(city => {
      xmlContent += `
  <url>
    <loc>${domain}/city/${city.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });
    
    // Add business pages
    businesses.forEach(business => {
      xmlContent += `
  <url>
    <loc>${domain}/business/${business.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });
    
    xmlContent += `
</urlset>`;
    
    // Create a blob and download link
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    // Create link and download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sitemap.xml');
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
  }, [businesses, cities, states]);
  
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">XML Sitemap Generator</h1>
      <p className="mb-4">Your sitemap.xml file has been generated and should download automatically.</p>
      <p>If the download didn't start, you can also 
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}
          className="text-teal-600 font-medium hover:underline ml-1"
        >
          click here
        </a> to generate it again.
      </p>
    </div>
  );
};

export default SitemapXML;