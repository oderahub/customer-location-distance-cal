import React, { useState } from "react";
import Axios from "axios";
import "./styles/CustomerForm.css";

interface Customer {
  _id: string;
  name: string;
  address: string;
  destination: string;
  distance: number;
  latitude: number;
  longitude: number;
}

interface CustomerFormProps {
  addCustomer: (customer: Customer) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ addCustomer }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    destination: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await Axios.post(
        "http://localhost:3000/api/customers/",
        formData
      );
      addCustomer(res.data);
      setFormData({
        name: "",
        address: "",
        destination: "",
      });
    } catch (err) {
      console.error("Axios error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="customer-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={formData.destination}
        onChange={handleChange}
        required
      />

      <button type="submit">Add Customer</button>
    </form>
  );
};

export default CustomerForm;
