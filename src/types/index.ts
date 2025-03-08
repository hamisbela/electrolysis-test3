// Basic types for data model
export interface BeautySalon {
  id: number;
  ts: string;
  title: string;
  slug: string;
  website: string;
  telephone: string;
  address: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  email: string;
  opening_hours: string;
  description: string;
  brand: string;
  service_product: string;
  reviews: number;
  average_star: number;
}

export interface BeautySalonDetail {
  id: number;
  ts: string;
  key: string;
  value: string;
  beauty_salon_id: number;
}

export interface Category {
  id: number;
  ts: string;
  category: string;
}

export interface BeautySalonCategory {
  id: number;
  beauty_salon_id: number;
  category_id: number;
}

export interface City {
  id: number;
  ts: string;
  city: string;
  slug: string;
  total: number;
  total_worked: number;
  state_id: number;
}

export interface CityBeautySalon {
  id: number;
  city_id: number;
  beauty_salon_id: number;
}

export interface State {
  id: number;
  ts: string;
  state: string;
}

export interface Amenity {
  id: number;
  ts: string;
  amenity: string;
}

export interface BeautySalonAmenity {
  id: number;
  amenity_id: number;
  beauty_salon_id: number;
}

export interface Payment {
  id: number;
  ts: string;
  payment: string;
}

export interface BeautySalonPayment {
  id: number;
  payment_id: number;
  beauty_salon_id: number;
}

export interface BusinessImage {
  id: number;
  ts: string;
  url: string;
  beauty_salon_id: number;
}

// Composite types for display
export interface BusinessListing {
  id: number;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  hours: string;
  services: string[];
  amenities: string[];
  paymentMethods: string[];
  details: Record<string, string>;
  rating: number;
  reviews: number;
  latitude: number;
  longitude: number;
  images: string[];
}

export interface CityListing {
  id: number;
  name: string;
  slug: string;
  state: string;
  stateCode: string;
  businessCount: number;
}

export interface StateListing {
  id: number;
  name: string;
  slug: string;
  businessCount: number;
  cities: CityListing[];
}

// Page data types
export interface CityPageData {
  cityName: string;
  stateName: string;
  businesses: BusinessListing[];
  slug: string;
}

export interface StatePageData {
  stateName: string;
  cities: CityListing[];
  businessCount: number;
  slug: string;
}

export interface BusinessPageData {
  business: BusinessListing;
  nearbyBusinesses: BusinessListing[];
  slug: string;
}