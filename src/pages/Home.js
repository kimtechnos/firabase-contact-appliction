import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  // Fetch data from Firebase on component mount
  useEffect(() => {
    const db = getDatabase(); // get the database instance
    const contactsRef = ref(db, "contacts"); // reference the "contacts" in the database

    // Listen to changes in the "contacts" reference
    const unsubscribe = onValue(contactsRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData({});
      }
    });

    // Cleanup the subscription when component unmounts
    return () => unsubscribe();
  }, []);

  // Function to delete a contact from Firebase
  const onDelete = (id) => {
    if (window.confirm("Are you sure that you want to delete this contact?")) {
      const db = getDatabase();
      const contactRef = ref(db, `contacts/${id}`);
      remove(contactRef)
        .then(() => {
          toast.success("Contact deleted successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  // Function to handle sorting based on selected value
  const handleChange = (e) => {
    const sortBy = e.target.value; // Get the selected value from the dropdown
    let sortedArray = Object.keys(data).map((key) => data[key]);

    // Sort the array based on the selected field (name, email, or contact)
    sortedArray.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

    setSortedData(sortedArray); // Update sortedData with the sorted array
    setSort(true); // Set the sort state to true
  };

  // Function to reset the sort state
  const handleReset = () => {
    setSort(false);
    setSortedData([]);
    document.querySelector(".dropdown").value = "please select"; // Reset dropdown value
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>

        {/* Render table body based on sort state */}
        {!sort && (
          <tbody>
            {Object.keys(data).map((id, index) => (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}

        {/* Render sorted data */}
        {sort && (
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      <label>Sort by</label>
      <select className="dropdown" name="colValue" onChange={handleChange}>
        <option>please select </option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="contact">Contact</option>
      </select>
      <button className="btn btn-reset" onClick={handleReset}>
        Reset
      </button>
      <br />
    </div>
  );
};

export default Home;
