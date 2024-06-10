import React from "react";
import "./styles/CustomerList.css";

interface Customer {
  _id: string;
  name: string;
  address: string;
  destination: string;
  latitude: number;
  longitude: number;
  distance: number;
}

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList: React.FC<CustomerListProps> = ({ customers }) => {
  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            <strong>{customer.name}</strong>
            <br />
            {customer.address}
            <br />
            {customer.destination}
            <br />
            <em>Distance: {customer.distance.toFixed(2)} km</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
