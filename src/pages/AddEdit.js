import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";
import { getDatabase, ref, push, update, onValue } from "firebase/database";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const { name, email, contact } = state;
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL

  // Fetch all contacts data once
  useEffect(() => {
    const db = getDatabase();
    const contactsRef = ref(db, "contacts");

    // Fetch data for editing
    const unsubscribe = onValue(contactsRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData({});
      }
    });

    return () => unsubscribe();
  }, []);

  // Pre-fill the form if editing
  useEffect(() => {
    if (id && data[id]) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState }); // Reset the form for adding new contacts
    }
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide value in each input field");
    } else {
      const db = getDatabase();
      const contactsRef = ref(db, "contacts");

      if (id) {
        // Update contact
        const contactToUpdate = ref(db, `contacts/${id}`);
        update(contactToUpdate, { name, email, contact })
          .then(() => {
            toast.success("Contact updated successfully");
            navigate("/"); // Redirect after success
          })
          .catch((error) => {
            toast.error("Error updating contact: " + error.message);
          });
      } else {
        // Add new contact
        push(contactsRef, { name, email, contact })
          .then(() => {
            toast.success("Contact added successfully");
            setState({ name: "", email: "", contact: "" });
            navigate("/"); // Redirect after success
          })
          .catch((error) => {
            toast.error("Error adding contact: " + error.message);
          });
      }
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
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          name="contact"
          id="contact"
          placeholder="Your Contact No. ..."
          value={contact || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
