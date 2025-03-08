import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV parsing functions
async function parseCSV(csvContent, options = {}) {
  return parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    ...options
  });
}

async function generateSiteData() {
  try {
    console.log('Generating site data from CSV files...');
    
    // Read all CSV files
    const dataDir = path.resolve(__dirname, '../data');
    
    // Load CSV files
    const beautySalonData = fs.readFileSync(path.join(dataDir, 'beauty_salon.csv'), 'utf-8');
    const beautySalonDetailData = fs.readFileSync(path.join(dataDir, 'beauty_salon_detail.csv'), 'utf-8');
    const categoryData = fs.readFileSync(path.join(dataDir, 'category.csv'), 'utf-8');
    const beautySalonCategoryData = fs.readFileSync(path.join(dataDir, 'beauty_salon_x_category.csv'), 'utf-8');
    const cityData = fs.readFileSync(path.join(dataDir, 'city.csv'), 'utf-8');
    const cityBeautySalonData = fs.readFileSync(path.join(dataDir, 'city_x_beauty_salon.csv'), 'utf-8');
    const stateData = fs.readFileSync(path.join(dataDir, 'state.csv'), 'utf-8');
    const amenityData = fs.readFileSync(path.join(dataDir, 'amenity.csv'), 'utf-8');
    const amenityBeautySalonData = fs.readFileSync(path.join(dataDir, 'amenity_x_beauty_salon.csv'), 'utf-8');
    const paymentData = fs.readFileSync(path.join(dataDir, 'payment.csv'), 'utf-8');
    const paymentBeautySalonData = fs.readFileSync(path.join(dataDir, 'payment_x_beauty_salon.csv'), 'utf-8');
    const imageData = fs.readFileSync(path.join(dataDir, 'image_2.csv'), 'utf-8');
    
    // Parse CSV data
    const beautySalons = await parseCSV(beautySalonData);
    const beautySalonDetails = await parseCSV(beautySalonDetailData);
    const categories = await parseCSV(categoryData);
    const beautySalonCategories = await parseCSV(beautySalonCategoryData);
    const cities = await parseCSV(cityData);
    const cityBeautySalons = await parseCSV(cityBeautySalonData);
    const states = await parseCSV(stateData);
    const amenities = await parseCSV(amenityData);
    const beautySalonAmenities = await parseCSV(amenityBeautySalonData);
    const payments = await parseCSV(paymentData);
    const beautySalonPayments = await parseCSV(paymentBeautySalonData);
    const images = await parseCSV(imageData);
    
    // Convert string IDs to numbers for proper mapping
    const beautySalonCategoriesParsed = beautySalonCategories.map(item => ({
      ...item,
      id: parseInt(item.id, 10),
      beauty_salon_id: parseInt(item.beauty_salon_id, 10),
      category_id: parseInt(item.category_id, 10)
    }));
    
    const cityBeautySalonsParsed = cityBeautySalons.map(item => ({
      ...item,
      id: parseInt(item.id, 10),
      city_id: parseInt(item.city_id, 10),
      beauty_salon_id: parseInt(item.beauty_salon_id, 10)
    }));
    
    const beautySalonAmenitiesParsed = beautySalonAmenities.map(item => ({
      ...item,
      id: parseInt(item.id, 10),
      amenity_id: parseInt(item.amenity_id, 10),
      beauty_salon_id: parseInt(item.beauty_salon_id, 10)
    }));
    
    const beautySalonPaymentsParsed = beautySalonPayments.map(item => ({
      ...item,
      id: parseInt(item.id, 10),
      payment_id: parseInt(item.payment_id, 10),
      beauty_salon_id: parseInt(item.beauty_salon_id, 10)
    }));
    
    // Parse images data
    const imagesParsed = images.map(item => ({
      id: parseInt(item.id, 10),
      beauty_salon_id: parseInt(item.beauty_salon_id, 10),
      url: item.path // Using the 'path' column for image URLs
    }));
    
    // Find the Electrolysis category ID
    const electrolysisCategory = categories.find(c => c.category.toLowerCase() === 'electrolysis');
    
    if (!electrolysisCategory) {
      throw new Error('Electrolysis category not found in categories data');
    }
    
    // Find beauty salon IDs that have the Electrolysis category
    const electrolysisBeautySalonIds = beautySalonCategoriesParsed
      .filter(mapping => parseInt(mapping.category_id) === parseInt(electrolysisCategory.id))
      .map(mapping => parseInt(mapping.beauty_salon_id));
    
    // Get the beauty salons that offer electrolysis
    const electrolysisProviders = beautySalons.filter(salon => 
      electrolysisBeautySalonIds.includes(parseInt(salon.id))
    );
    
    console.log(`Found ${electrolysisProviders.length} electrolysis providers out of ${beautySalons.length} total beauty salons`);
    
    // Generate business listings
    const businessListings = electrolysisProviders.map(salon => {
      // Parse salon properties to appropriate types
      const salonId = parseInt(salon.id);
      
      // Get details for this salon
      const details = beautySalonDetails
        .filter(detail => parseInt(detail.beauty_salon_id) === salonId)
        .reduce((acc, detail) => {
          acc[detail.key] = detail.value;
          return acc;
        }, {});
      
      // Get categories for this salon
      const categoryIds = beautySalonCategoriesParsed
        .filter(mapping => parseInt(mapping.beauty_salon_id) === salonId)
        .map(mapping => parseInt(mapping.category_id));
      
      const salonCategories = categories
        .filter(category => categoryIds.includes(parseInt(category.id)))
        .map(category => category.category);
      
      // Get city for this salon (use first city if multiple)
      const cityIds = cityBeautySalonsParsed
        .filter(mapping => parseInt(mapping.beauty_salon_id) === salonId)
        .map(mapping => parseInt(mapping.city_id));
      
      const salonCity = cities.find(city => cityIds.includes(parseInt(city.id)));
      
      // Get state for this salon
      const state = salonCity ? states.find(state => parseInt(state.id) === parseInt(salonCity.state_id)) : null;
      
      // Get amenities for this salon
      const amenityIds = beautySalonAmenitiesParsed
        .filter(mapping => parseInt(mapping.beauty_salon_id) === salonId)
        .map(mapping => parseInt(mapping.amenity_id));
      
      const salonAmenities = amenities
        .filter(amenity => amenityIds.includes(parseInt(amenity.id)))
        .map(amenity => amenity.amenity);
      
      // Get payment methods for this salon
      const paymentIds = beautySalonPaymentsParsed
        .filter(mapping => parseInt(mapping.beauty_salon_id) === salonId)
        .map(mapping => parseInt(mapping.payment_id));
      
      const salonPayments = payments
        .filter(payment => paymentIds.includes(parseInt(payment.id)))
        .map(payment => payment.payment);
      
      // Get images for this salon
      const salonImages = imagesParsed
        .filter(image => parseInt(image.beauty_salon_id) === salonId)
        .map(image => image.url);
      
      // Extract services from service_product field
      const servicesList = salon.service_product 
        ? salon.service_product.split(',').map(s => s.trim()).filter(Boolean) 
        : [];
      
      // Create a reasonable slug from the business name
      const slug = salon._yf_slug 
        ? salon._yf_slug.replace(/^\//, '').replace(/\?.*$/, '') 
        : `${salon.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${salon.id}`;
      
      // Create business listing
      return {
        id: salonId,
        name: salon.title,
        slug,
        address: salon.address || '',
        city: salonCity ? salonCity.city : '',
        state: state ? state.state : '',
        zipCode: salon.postal_code || '',
        phone: salon.telephone || '',
        email: salon.email || '',
        website: salon.website || '',
        description: salon.description || '',
        hours: salon.opening_hours || '',
        services: servicesList.length > 0 ? servicesList : ['Electrolysis', 'Permanent Hair Removal'],
        amenities: salonAmenities,
        paymentMethods: salonPayments,
        details,
        rating: parseFloat(salon.average_star || 0),
        reviews: parseInt(salon.reviews || 0),
        latitude: parseFloat(salon.latitude || 0),
        longitude: parseFloat(salon.longitude || 0),
        images: salonImages
      };
    });
    
    // Generate city pages
    const cityPages = [];
    
    for (const city of cities) {
      // Find state for this city
      const cityId = parseInt(city.id);
      const state = states.find(s => parseInt(s.id) === parseInt(city.state_id));
      if (!state) continue;
      
      // Find business listings in this city
      const beautySalonIds = cityBeautySalonsParsed
        .filter(mapping => parseInt(mapping.city_id) === cityId)
        .map(mapping => parseInt(mapping.beauty_salon_id));
      
      const cityBusinesses = businessListings.filter(business => 
        beautySalonIds.includes(business.id)
      );
      
      // Check if there are any businesses in this city
      if (cityBusinesses.length > 0) {
        // Create slug for URL
        const slug = city._yf_slug 
          ? city._yf_slug.replace(/^\//, '').replace(/\?.*$/, '') 
          : `${city.city.toLowerCase().replace(/\s+/g, '-')}-${state.state.substring(0, 2).toLowerCase()}`;
        
        cityPages.push({
          cityName: city.city,
          stateName: state.state,
          businesses: cityBusinesses,
          slug
        });
      }
    }
    
    // Generate state pages
    const statePages = [];
    
    for (const state of states) {
      const stateId = parseInt(state.id);
      // Find cities in this state
      const stateCities = cities.filter(city => parseInt(city.state_id) === stateId);
      
      // Create city listings
      const cityListings = [];
      
      for (const city of stateCities) {
        const cityId = parseInt(city.id);
        const beautySalonIds = cityBeautySalonsParsed
          .filter(mapping => parseInt(mapping.city_id) === cityId)
          .map(mapping => parseInt(mapping.beauty_salon_id));
        
        const cityBusinesses = businessListings.filter(business => 
          beautySalonIds.includes(business.id)
        );
        
        if (cityBusinesses.length > 0) {
          cityListings.push({
            id: cityId,
            name: city.city,
            slug: city._yf_slug 
              ? city._yf_slug.replace(/^\//, '').replace(/\?.*$/, '') 
              : `${city.city.toLowerCase().replace(/\s+/g, '-')}-${state.state.substring(0, 2).toLowerCase()}`,
            state: state.state,
            stateCode: state.state.substring(0, 2).toUpperCase(),
            businessCount: cityBusinesses.length
          });
        }
      }
      
      // Only include states with cities that have businesses
      if (cityListings.length > 0) {
        const totalBusinesses = cityListings.reduce((sum, city) => sum + city.businessCount, 0);
        
        statePages.push({
          stateName: state.state,
          cities: cityListings,
          businessCount: totalBusinesses,
          slug: state.state.toLowerCase().replace(/\s+/g, '-')
        });
      }
    }
    
    // Generate business pages
    const businessPages = businessListings.map(business => {
      // Find nearby businesses (simple implementation - businesses in same city)
      const nearbyBusinesses = businessListings.filter(other => 
        other.id !== business.id && other.city === business.city
      ).slice(0, 5); // Limit to 5 nearby businesses
      
      return {
        business,
        nearbyBusinesses,
        slug: business.slug
      };
    });
    
    // Prepare final data
    const pagesData = {
      businessListings,
      cityPages,
      statePages,
      businessPages
    };
    
    // Write data to a file that can be imported
    const outputDir = path.resolve(__dirname, '../src/data');
    
    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write generated data
    fs.writeFileSync(
      path.join(outputDir, 'pagesData.json'), 
      JSON.stringify(pagesData, null, 2)
    );
    
    // Write routes config
    fs.writeFileSync(
      path.join(outputDir, 'routesConfig.json'), 
      JSON.stringify({
        routes: [
          { path: '/', component: 'HomePage' },
          ...cityPages.map(city => ({
            path: `/city/${city.slug}`,
            component: 'CityPage',
            props: { cityData: city }
          })),
          ...statePages.map(state => ({
            path: `/state/${state.slug}`,
            component: 'StatePage',
            props: { stateData: state }
          })),
          ...businessPages.map(business => ({
            path: `/business/${business.slug}`,
            component: 'BusinessPage',
            props: { businessData: business }
          })),
          { path: '/about', component: 'AboutPage' },
          { path: '/contact', component: 'ContactPage' },
          { path: '/blog', component: 'BlogPage' },
          { path: '/add-listing', component: 'AddListingPage' }
        ]
      }, null, 2)
    );
    
    // Write summary data
    const summary = {
      totalBusinesses: businessListings.length,
      totalCities: cityPages.length,
      totalStates: statePages.length,
      generatedAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(outputDir, 'summary.json'), 
      JSON.stringify(summary, null, 2)
    );
    
    console.log(`
Site data generated successfully:
- ${summary.totalBusinesses} electrolysis providers
- ${summary.totalCities} cities with providers
- ${summary.totalStates} states with providers
All data files saved to ${outputDir}
    `);
  } catch (error) {
    console.error('Error generating site data:', error);
    process.exit(1);
  }
}

generateSiteData();