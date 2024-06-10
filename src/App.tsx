import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";
import axios from "axios";
import "./components/styles/App.css";

interface Customer {
  _id: string;
  name: string;
  address: string;
  destination: string;
  latitude: number;
  longitude: number;
  distance: number;
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const predefinedLocation = { lat: 6.5244, lng: 3.3792 }; // Lagos coordinates

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await axios.get("https:localhost:3000/api/customers");
      const data = res.data.map((customer: Customer) => ({
        ...customer,
        distance: calculateDistance(
          predefinedLocation.lat,
          predefinedLocation.lng,
          customer.latitude,
          customer.longitude
        ),
      }));
      setCustomers(data);
      setMarkers(
        data.map((customer: Customer) => ({
          lat: customer.latitude,
          lng: customer.longitude,
        }))
      );
    };
    fetchCustomers();
  }, []);

  const addCustomer = (customer: Customer) => {
    customer.distance = calculateDistance(
      predefinedLocation.lat,
      predefinedLocation.lng,
      customer.latitude,
      customer.longitude
    );
    setCustomers([...customers, customer]);
    setMarkers([
      ...markers,
      { lat: customer.latitude, lng: customer.longitude },
    ]);
  };

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  return (
    <div className="app-container">
      <CustomerForm addCustomer={addCustomer} />
      <Map onMapClick={() => {}} markers={markers} />
      <CustomerList customers={customers} />
    </div>
  );
};

export default App;
