import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context data
interface TripContextType {
  tripSearch: string;
  setTripSearch: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with a default value of null
const CreateTripContext = createContext<TripContextType | undefined>(undefined);

// Create a custom provider component
export const CreateTripProvider = ({ children }: { children: ReactNode }) => {
  const [tripSearch, setTripSearch] = useState<string>("");

  return (
    <CreateTripContext.Provider value={{ tripSearch, setTripSearch }}>
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
