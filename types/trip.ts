import { Timestamp } from "firebase/firestore";

export interface TripPropsFirebase {
  destination: string;
  traveler: number;
  startDate: Timestamp;
  endDate: Timestamp;
  totalDays: number;
  budget: number;
}

interface DailyItinerary {
  title: string;
  schedule: Schedule[];
  flights: Flight[];
  hotels: Hotel[];
}

interface Schedule {
  activity: string;
  details: string;
  googleMapUrl: string;
  imageUrl: string | null;
  location: string;
  price: string;
  time: string;
}

interface Flight {
  airline: string;
  arrivalAirport: string;
  arrivalTime: string;
  bookingUrl: string;
  departureAirport: string;
  departureTime: string;
  flightNumber: string;
  price: string;
}

interface Hotel {
  name: string;
  address: string;
  description: string;
  geoCoordinates: [number, number];
  googleMapUrl: string;
  imageUrl: string;
  nearbyAttractions: NearbyAttraction[];
}

interface NearbyAttraction {
  name: string;
  description: string;
  geoCoordinates: [number, number];
  googleMapUrl: string;
  imageUrl: string;
  price: string;
  travelTime: string;
}

interface UserTripDetail {
  dailyItinerary: DailyItinerary[];
  userEmail: string;
}

export interface UserTripData {
  tripData: TripPropsFirebase;
  userEmail: string;
  tripDetails: UserTripDetail[];
}
