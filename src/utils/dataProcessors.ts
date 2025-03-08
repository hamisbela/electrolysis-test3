import fs from 'fs';
import path from 'path';
import {
  BeautySalon,
  BeautySalonDetail,
  Category,
  City,
  State,
  Amenity,
  Payment,
  BusinessListing,
  CityListing,
  StateListing,
  CityPageData,
  StatePageData,
  BusinessPageData
} from '../types';

import {
  parseBeautySalonCSV,
  parseBeautySalonDetailCSV,
  parseCategoryCSV,
  parseBeautySalonCategoryCSV,
  parseCityCSV,
  parseCityBeautySalonCSV,
  parseStateCSV,
  parseAmenityCSV,
  parseBeautySalonAmenityCSV,
  parsePaymentCSV,
  parseBeautySalonPaymentCSV
} from '../services/csvService';

// Load data from CSV files
export async function loadAllData(dataDir: string) {
  try {
    // Read CSV files
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

    // Parse CSV data
    const beautySalons = await parseBeautySalonCSV(beautySalonData);
    const beautySalonDetails = await parseBeautySalonDetailCSV(beautySalonDetailData);
    const categories = await parseCategoryCSV(categoryData);
    const beautySalonCategories = await parseBeautySalonCategoryCSV(beautySalonCategoryData);
    const cities = await parseCityCSV(cityData);
    const cityBeautySalons = await parseCityBeautySalonCSV(cityBeautySalonData);
    const states = await parseStateCSV(stateData);
    const amenities = await parseAmenityCSV(amenityData);
    const beautySalonAmenities = await parseBeautySalonAmenityCSV(amenityBeautySalonData);
    const payments = await parsePaymentCSV(paymentData);
    const beautySalonPayments = await parseBeautySalonPaymentCSV(paymentBeautySalonData);

    return {
      beautySalons,
      beautySalonDetails,
      categories,
      beautySalonCategories,
      cities,
      cityBeautySalons,
      states,
      amenities,
      beautySalonAmenities,
      payments,
      beautySalonPayments
    };
  } catch (error) {
    console.error('Error loading CSV data:', error);
    throw error;
  }
}

// Get electrolysis providers
export function getElectrolysisProviders(
  beautySalons: BeautySalon[],
  categories: Category[],
  beautySalonCategories: any[]
): BeautySalon[] {
  // Find the Electrolysis category ID
  const electrolysisCategory = categories.find(c => c.category.toLowerCase() === 'electrolysis');
  
  if (!electrolysisCategory) {
    return [];
  }

  // Find beauty salon IDs that have the Electrolysis category
  const electrolysisBeautySalonIds = beautySalonCategories
    .filter(mapping => mapping.category_id === electrolysisCategory.id)
    .map(mapping => mapping.beauty_salon_id);

  // Get the beauty salons that offer electrolysis
  const electrolysisProviders = beautySalons.filter(salon => 
    electrolysisBeautySalonIds.includes(salon.id)
  );

  return electrolysisProviders;
}

// Convert raw data to business listings
export function generateBusinessListings(
  beautySalons: BeautySalon[],
  beautySalonDetails: BeautySalonDetail[],
  categories: Category[],
  beautySalonCategories: any[],
  cities: City[],
  cityBeautySalons: any[],
  states: State[],
  amenities: Amenity[],
  beautySalonAmenities: any[],
  payments: Payment[],
  beautySalonPayments: any[]
): BusinessListing[] {
  return beautySalons.map(salon => {
    // Get details for this salon
    const details = beautySalonDetails
      .filter(detail => detail.beauty_salon_id === salon.id)
      .reduce((acc, detail) => {
        acc[detail.key] = detail.value;
        return acc;
      }, {} as Record<string, string>);
    
    // Get categories for this salon
    const categoryIds = beautySalonCategories
      .filter(mapping => mapping.beauty_salon_id === salon.id)
      .map(mapping => mapping.category_id);
    
    const salonCategories = categories
      .filter(category => categoryIds.includes(category.id))
      .map(category => category.category);
    
    // Get city for this salon (use first city if multiple)
    const cityIds = cityBeautySalons
      .filter(mapping => mapping.beauty_salon_id === salon.id)
      .map(mapping => mapping.city_id);
    
    const salonCity = cities.find(city => cityIds.includes(city.id));
    
    // Get state for this salon
    const state = salonCity ? states.find(state => state.id === salonCity.state_id) : null;
    
    // Get amenities for this salon
    const amenityIds = beautySalonAmenities
      .filter(mapping => mapping.beauty_salon_id === salon.id)
      .map(mapping => mapping.amenity_id);
    
    const salonAmenities = amenities
      .filter(amenity => amenityIds.includes(amenity.id))
      .map(amenity => amenity.amenity);
    
    // Get payment methods for this salon
    const paymentIds = beautySalonPayments
      .filter(mapping => mapping.beauty_salon_id === salon.id)
      .map(mapping => mapping.payment_id);
    
    const salonPayments = payments
      .filter(payment => paymentIds.includes(payment.id))
      .map(payment => payment.payment);
    
    // Extract services from service_product field
    const servicesList = salon.service_product ? salon.service_product.split(',').map(s => s.trim()).filter(Boolean) : [];
    
    // Create business listing
    return {
      id: salon.id,
      name: salon.title,
      slug: salon.slug ? salon.slug.replace(/^\//, '').replace(/\?.*$/, '') : 
        `${salon.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${salon.id}`,
      address: salon.address,
      city: salonCity ? salonCity.city : '',
      state: state ? state.state : '',
      zipCode: salon.postal_code,
      phone: salon.telephone,
      email: salon.email,
      website: salon.website,
      description: salon.description,
      hours: salon.opening_hours,
      services: servicesList.length > 0 ? servicesList : ['Electrolysis', 'Permanent Hair Removal'],
      amenities: salonAmenities,
      paymentMethods: salonPayments,
      details,
      rating: salon.average_star || 0,
      reviews: salon.reviews || 0,
      latitude: salon.latitude,
      longitude: salon.longitude
    };
  });
}

// Generate city page data
export function generateCityPages(
  businessListings: BusinessListing[],
  cities: City[],
  states: State[],
  cityBeautySalons: any[]
): CityPageData[] {
  const cityPages: CityPageData[] = [];
  
  for (const city of cities) {
    // Find state for this city
    const state = states.find(s => s.id === city.state_id);
    if (!state) continue;
    
    // Find business listings in this city
    const beautySalonIds = cityBeautySalons
      .filter(mapping => mapping.city_id === city.id)
      .map(mapping => mapping.beauty_salon_id);
    
    const cityBusinesses = businessListings.filter(business => 
      beautySalonIds.includes(business.id)
    );
    
    // Check if there are any businesses in this city
    if (cityBusinesses.length > 0) {
      // Create slug for URL
      const slug = city.slug ? 
        city.slug.replace(/^\//, '').replace(/\?.*$/, '') : 
        `${city.city.toLowerCase().replace(/\s+/g, '-')}-${state.state.substring(0, 2).toLowerCase()}`;
      
      cityPages.push({
        cityName: city.city,
        stateName: state.state,
        businesses: cityBusinesses,
        slug
      });
    }
  }
  
  return cityPages;
}

// Generate state page data
export function generateStatePages(
  businessListings: BusinessListing[],
  cities: City[],
  states: State[],
  cityBeautySalons: any[]
): StatePageData[] {
  const statePages: StatePageData[] = [];
  
  for (const state of states) {
    // Find cities in this state
    const stateCities = cities.filter(city => city.state_id === state.id);
    
    // Create city listings
    const cityListings: CityListing[] = stateCities.map(city => {
      const beautySalonIds = cityBeautySalons
        .filter(mapping => mapping.city_id === city.id)
        .map(mapping => mapping.beauty_salon_id);
      
      const cityBusinesses = businessListings.filter(business => 
        beautySalonIds.includes(business.id)
      );
      
      return {
        id: city.id,
        name: city.city,
        slug: city.slug ? 
          city.slug.replace(/^\//, '').replace(/\?.*$/, '') : 
          `${city.city.toLowerCase().replace(/\s+/g, '-')}-${state.state.substring(0, 2).toLowerCase()}`,
        state: state.state,
        stateCode: state.state.substring(0, 2).toUpperCase(),
        businessCount: cityBusinesses.length
      };
    }).filter(cityListing => cityListing.businessCount > 0);
    
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
  
  return statePages;
}

// Generate business page data
export function generateBusinessPages(
  businessListings: BusinessListing[]
): BusinessPageData[] {
  return businessListings.map(business => {
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
}

// Generate all pages data for static site generation
export async function generateAllPagesData(dataDir: string) {
  try {
    // Load all data
    const data = await loadAllData(dataDir);
    
    // Get electrolysis providers
    const electrolysisProviders = getElectrolysisProviders(
      data.beautySalons,
      data.categories,
      data.beautySalonCategories
    );
    
    // Generate business listings
    const businessListings = generateBusinessListings(
      electrolysisProviders, // Only use electrolysis providers
      data.beautySalonDetails,
      data.categories,
      data.beautySalonCategories,
      data.cities,
      data.cityBeautySalons,
      data.states,
      data.amenities,
      data.beautySalonAmenities,
      data.payments,
      data.beautySalonPayments
    );
    
    // Generate city pages
    const cityPages = generateCityPages(
      businessListings,
      data.cities,
      data.states,
      data.cityBeautySalons
    );
    
    // Generate state pages
    const statePages = generateStatePages(
      businessListings,
      data.cities,
      data.states,
      data.cityBeautySalons
    );
    
    // Generate business pages
    const businessPages = generateBusinessPages(businessListings);
    
    return {
      businessListings,
      cityPages,
      statePages,
      businessPages
    };
  } catch (error) {
    console.error('Error generating pages data:', error);
    throw error;
  }
}

// Export routes information for static site generation
export function generateRoutesConfig(
  cityPages: CityPageData[],
  statePages: StatePageData[],
  businessPages: BusinessPageData[]
) {
  return {
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
  };
}