import { parse } from 'csv-parse/sync';
import { 
  BeautySalon, 
  BeautySalonDetail, 
  Category, 
  City, 
  State, 
  Amenity, 
  Payment,
  BeautySalonCategory,
  CityBeautySalon,
  BeautySalonAmenity,
  BeautySalonPayment
} from '../types';

// Parse beauty salon data (main business listings)
export async function parseBeautySalonCSV(csvContent: string): Promise<BeautySalon[]> {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records.map((record: any) => ({
      id: parseInt(record.id),
      ts: record.ts,
      title: record.title || '',
      slug: record._yf_slug || '',
      website: record.website || '',
      telephone: record.telephone || '',
      address: record.address || '',
      postal_code: record.postal_code || '',
      latitude: record.latitude ? parseFloat(record.latitude) : 0,
      longitude: record.longitude ? parseFloat(record.longitude) : 0,
      email: record.email || '',
      opening_hours: record.opening_hours || '',
      description: record.description || '',
      brand: record.brand || '',
      service_product: record.service_product || '',
      reviews: record.reviews ? parseInt(record.reviews) : 0,
      average_star: record.average_star ? parseFloat(record.average_star) : 0
    }));
  } catch (error) {
    console.error('Error parsing beauty salon CSV:', error);
    throw error;
  }
}

// Parse beauty salon details
export async function parseBeautySalonDetailCSV(csvContent: string): Promise<BeautySalonDetail[]> {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records.map((record: any) => ({
      id: parseInt(record.id),
      ts: record.ts,
      key: record.key || '',
      value: record.value || '',
      beauty_salon_id: parseInt(record.beauty_salon_id)
    }));
  } catch (error) {
    console.error('Error parsing beauty salon detail CSV:', error);
    throw error;
  }
}

// Parse categories
export async function parseCategoryCSV(csvContent: string): Promise<Category[]> {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records.map((record: any) => ({
      id: parseInt(record.id),
      ts: record.ts,
      category: record.category || ''
    }));
  } catch (error) {
    console.error('Error parsing category CSV:', error);
    throw error;
  }
}

// Parse beauty salon to category mappings
export async function parseBeautySalonCategoryCSV(csvContent: string): Promise<BeautySalonCategory[]> {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records.map((record: any) => ({
      id: parseInt(record.id),
      beauty_salon_id: parseInt(record.beauty_salon_id),
      category_id: parseInt(record.category_id)
    }));
  } catch (error) {
    console.error('Error parsing beauty salon category mapping CSV:', error);
    throw error;
  }
}

// Parse city data
export async function parseCityCSV(csvContent: string): Promise<City[]> {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records.map((record: any) => ({
      id: parseInt(record.id),
      ts: record.ts,
      city: record.city || '',
      slug: record._yf_slug || '',
      total: parseInt(record._total) || 0,
      total_worked: parseInt(record._total_worked) || 0,
      state_id: parseInt(record.state_id)
    }));
  } catch (error) {
    console.error('Error parsing city CSV:', error);
    throw error;
  }
}

// Parse city to beauty salon mappings
export async function parseCityBeautySalonCSV(csvContent: string): Promise<CityBeautySalon[]> {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records.map((record: any) => ({
      id: parseInt(record.id),
      city_id: parseInt(record.city_id),
      beauty_salon_id: parseInt(record.beauty_salon_id)
    }));
  } catch (error) {
    console.error('Error parsing city beauty salon mapping CSV:', error);
    throw error;
  }
}

// Parse state data
export async function parseStateCSV(csvContent: string): Promise<State[]> {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records.map((record: any) => ({
      id: parseInt(record.id),
      ts: record.ts,
      state: record.state || ''
    }));
  } catch (error) {
    console.error('Error parsing state CSV:', error);
    throw error;
  }
}

// Parse amenity data
export async function parseAmenityCSV(csvContent: string): Promise<Amenity[]> {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records.map((record: any) => ({
      id: parseInt(record.id),
      ts: record.ts,
      amenity: record.amenity || ''
    }));
  } catch (error) {
    console.error('Error parsing amenity CSV:', error);
    throw error;
  }
}

// Parse beauty salon to amenity mappings
export async function parseBeautySalonAmenityCSV(csvContent: string): Promise<BeautySalonAmenity[]> {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records.map((record: any) => ({
      id: parseInt(record.id),
      amenity_id: parseInt(record.amenity_id),
      beauty_salon_id: parseInt(record.beauty_salon_id)
    }));
  } catch (error) {
    console.error('Error parsing beauty salon amenity mapping CSV:', error);
    throw error;
  }
}

// Parse payment method data
export async function parsePaymentCSV(csvContent: string): Promise<Payment[]> {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records.map((record: any) => ({
      id: parseInt(record.id),
      ts: record.ts,
      payment: record.payment || ''
    }));
  } catch (error) {
    console.error('Error parsing payment CSV:', error);
    throw error;
  }
}

// Parse beauty salon to payment method mappings
export async function parseBeautySalonPaymentCSV(csvContent: string): Promise<BeautySalonPayment[]> {
  try {
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    return records.map((record: any) => ({
      id: parseInt(record.id),
      payment_id: parseInt(record.payment_id),
      beauty_salon_id: parseInt(record.beauty_salon_id)
    }));
  } catch (error) {
    console.error('Error parsing beauty salon payment mapping CSV:', error);
    throw error;
  }
}

// Function to read a file's content
export async function readFile(filePath: string): Promise<string> {
  try {
    // This would be replaced with actual file reading logic during build time
    // For now, we're simulating it
    return "Mock file content";
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

// Process all CSVs and build relationships
export async function processAllCSVs(): Promise<{
  beautySalons: BeautySalon[];
  categories: Category[];
  cities: City[];
  states: State[];
  amenities: Amenity[];
  payments: Payment[];
  electrolysisProviders: BeautySalon[];
}> {
  try {
    // In a real implementation, we would read files from the filesystem
    // For now, we'll use mock implementations that would be replaced during build time
    
    // Step 1: Parse all CSV files
    const beautySalons = await parseBeautySalonCSV("beauty_salon.csv");
    const beautySalonDetails = await parseBeautySalonDetailCSV("beauty_salon_detail.csv");
    const categories = await parseCategoryCSV("category.csv");
    const beautySalonCategories = await parseBeautySalonCategoryCSV("beauty_salon_x_category.csv");
    const cities = await parseCityCSV("city.csv");
    const cityBeautySalons = await parseCityBeautySalonCSV("city_x_beauty_salon.csv");
    const states = await parseStateCSV("state.csv");
    const amenities = await parseAmenityCSV("amenity.csv");
    const beautySalonAmenities = await parseBeautySalonAmenityCSV("amenity_x_beauty_salon.csv");
    const payments = await parsePaymentCSV("payment.csv");
    const beautySalonPayments = await parseBeautySalonPaymentCSV("payment_x_beauty_salon.csv");
    
    // Step 2: Find electrolysis providers
    // Find the category ID for "Electrolysis"
    const electrolysisCategory = categories.find(category => 
      category.category.toLowerCase() === "electrolysis"
    );
    
    let electrolysisProviders: BeautySalon[] = [];
    
    if (electrolysisCategory) {
      // Get all beauty salon IDs that have the electrolysis category
      const electrolysisBeautySalonIds = beautySalonCategories
        .filter(mapping => mapping.category_id === electrolysisCategory.id)
        .map(mapping => mapping.beauty_salon_id);
      
      // Get the beauty salons that offer electrolysis
      electrolysisProviders = beautySalons.filter(salon => 
        electrolysisBeautySalonIds.includes(salon.id)
      );
    }
    
    // Step 3: Enrich the data with relationships
    // Here we would add details, categories, cities, amenities, and payment methods
    // to each beauty salon object
    
    return {
      beautySalons,
      categories,
      cities,
      states,
      amenities,
      payments,
      electrolysisProviders
    };
  } catch (error) {
    console.error('Error processing CSVs:', error);
    throw error;
  }
}

// Generate city pages data
export function generateCityPagesData(
  cities: City[],
  states: State[],
  beautySalons: BeautySalon[],
  cityBeautySalons: CityBeautySalon[]
): { slug: string; city: City; state: State; providers: BeautySalon[] }[] {
  const cityPages = [];
  
  for (const city of cities) {
    // Find the state for this city
    const state = states.find(s => s.id === city.state_id);
    if (!state) continue;
    
    // Find beauty salons in this city
    const salonIds = cityBeautySalons
      .filter(mapping => mapping.city_id === city.id)
      .map(mapping => mapping.beauty_salon_id);
    
    const providers = beautySalons.filter(salon => salonIds.includes(salon.id));
    
    // Only include cities that have at least one provider
    if (providers.length > 0) {
      // Create a nice slug for the URL
      const slug = city.slug || `${city.city.toLowerCase().replace(/\s+/g, '-')}-${state.state.toLowerCase().substring(0, 2)}`;
      
      cityPages.push({
        slug,
        city,
        state,
        providers
      });
    }
  }
  
  return cityPages;
}

// Generate state pages data
export function generateStatePagesData(
  states: State[],
  cities: City[],
  beautySalons: BeautySalon[],
  cityBeautySalons: CityBeautySalon[]
): { slug: string; state: State; cities: { city: City; providerCount: number }[] }[] {
  const statePages = [];
  
  for (const state of states) {
    // Find cities in this state
    const stateCities = cities.filter(city => city.state_id === state.id);
    
    // Get provider counts for each city
    const citiesWithProviders = stateCities.map(city => {
      const salonIds = cityBeautySalons
        .filter(mapping => mapping.city_id === city.id)
        .map(mapping => mapping.beauty_salon_id);
      
      const providers = beautySalons.filter(salon => salonIds.includes(salon.id));
      
      return {
        city,
        providerCount: providers.length
      };
    }).filter(item => item.providerCount > 0);
    
    // Only include states that have at least one city with providers
    if (citiesWithProviders.length > 0) {
      // Create a nice slug for the URL
      const slug = state.state.toLowerCase().replace(/\s+/g, '-');
      
      statePages.push({
        slug,
        state,
        cities: citiesWithProviders
      });
    }
  }
  
  return statePages;
}

// Generate business pages data
export function generateBusinessPagesData(
  beautySalons: BeautySalon[],
  beautySalonDetails: BeautySalonDetail[],
  categories: Category[],
  beautySalonCategories: BeautySalonCategory[],
  cities: City[],
  cityBeautySalons: CityBeautySalon[],
  states: State[],
  amenities: Amenity[],
  beautySalonAmenities: BeautySalonAmenity[],
  payments: Payment[],
  beautySalonPayments: BeautySalonPayment[]
): { slug: string; provider: BeautySalon; details: any }[] {
  const businessPages = [];
  
  for (const salon of beautySalons) {
    // Find all details for this salon
    const details = beautySalonDetails.filter(detail => detail.beauty_salon_id === salon.id);
    
    // Find categories for this salon
    const categoryIds = beautySalonCategories
      .filter(mapping => mapping.beauty_salon_id === salon.id)
      .map(mapping => mapping.category_id);
    
    const salonCategories = categories.filter(category => categoryIds.includes(category.id));
    
    // Find cities for this salon
    const cityIds = cityBeautySalons
      .filter(mapping => mapping.beauty_salon_id === salon.id)
      .map(mapping => mapping.city_id);
    
    const salonCities = cities.filter(city => cityIds.includes(city.id));
    
    // Find states
    const salonStates = states.filter(state => 
      salonCities.some(city => city.state_id === state.id)
    );
    
    // Find amenities for this salon
    const amenityIds = beautySalonAmenities
      .filter(mapping => mapping.beauty_salon_id === salon.id)
      .map(mapping => mapping.amenity_id);
    
    const salonAmenities = amenities.filter(amenity => amenityIds.includes(amenity.id));
    
    // Find payment methods for this salon
    const paymentIds = beautySalonPayments
      .filter(mapping => mapping.beauty_salon_id === salon.id)
      .map(mapping => mapping.payment_id);
    
    const salonPayments = payments.filter(payment => paymentIds.includes(payment.id));
    
    // Create a nice slug for the URL
    const slug = salon.slug ? salon.slug.replace(/^\//, '') : 
      `${salon.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${salon.id}`;
    
    // Build rich details object
    const richDetails = {
      details: details.reduce((acc, detail) => {
        acc[detail.key] = detail.value;
        return acc;
      }, {} as any),
      categories: salonCategories,
      cities: salonCities,
      states: salonStates,
      amenities: salonAmenities,
      payments: salonPayments
    };
    
    businessPages.push({
      slug,
      provider: salon,
      details: richDetails
    });
  }
  
  return businessPages;
}

// Main export for build-time page generation
export async function generateDirectoryPages(): Promise<{
  cityPages: any[];
  statePages: any[];
  businessPages: any[];
}> {
  // This function would be called during the build process
  // to generate all the static pages for the directory
  
  try {
    const {
      beautySalons,
      categories,
      cities,
      states,
      amenities,
      payments,
      electrolysisProviders
    } = await processAllCSVs();
    
    // Here we'd generate the actual pages
    // For now, we'll return placeholder arrays
    
    return {
      cityPages: [],
      statePages: [],
      businessPages: []
    };
  } catch (error) {
    console.error('Error generating directory pages:', error);
    throw error;
  }
}