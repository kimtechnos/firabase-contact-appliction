import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./AddEdit.css";

import { toast } from "react-toastify";
import { getDatabase, ref, push } from "firebase/database";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, email, contact } = state;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide value in each input field");
    } else {
      const db = getDatabase(); // Initialize the Firebase database
      const contactsRef = ref(db, "contacts"); // Reference to "contacts" node
      push(contactsRef, { name, email, contact }) // Push data to the reference
        .then(() => {
          toast.success("Contact added successfully");
          setState({ name: "", email: "", contact: "" });
        })
        .catch((error) => {
          toast.error("Error submitting contacts: " + error.message);
        });
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your name..."
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email..."
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          name="contact"
          id="contact"
          placeholder="Your Contact No. ..."
          value={contact}
          onChange={handleInputChange}
        />
        <input type="submit" value="save" />
      </form>
    </div>
  );
};

export default AddEdit;
