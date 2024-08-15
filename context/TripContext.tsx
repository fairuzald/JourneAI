import React, { createContext, useContext, useState, ReactNode } from "react";

interface TripProps {
  destination?: string;
  traveler?: number;
  startDate?: Date;
  endDate?: Date;
  totalDays?: number;
  budget?: number;
}

// Define the shape of your context data
interface TripContextType {
  trip: TripProps;
  setTrip: React.Dispatch<React.SetStateAction<TripProps>>;
}

// Create the context with a default value of null
const CreateTripContext = createContext<TripContextType | undefined>(undefined);

// Create a custom provider component
export const CreateTripProvider = ({ children }: { children: ReactNode }) => {
  const [trip, setTrip] = useState<TripProps>({});

  return (
    <CreateTripContext.Provider value={{ trip, setTrip }}>
      {children}
    </CreateTripContext.Provider>
  );
};

// Custom hook to use the TripContext
export const useTrip = (): TripContextType => {
  const context = useContext(CreateTripContext);
  if (!context) {
    throw new Error("useTrip must be used within a CreateTripProvider");
  }
  return context;
};
