import React, { useState, useEffect } from "react";
import fireDb from "../firebase";
import { Link } from "react-router-dom";
import "./Home.css";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const db = getDatabase(); //get the database instance
    const contactsRef = ref(db, "contacts"); //ref the contacts in the firebase
    const unsubcribe = onValue(contactsRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData({});
      }
    });
    return () => unsubcribe();
  }, []);
  const onDelete = (id) => {
    if (
      window.confirm("Are you sure that you want to delete that contact ? ")
    ) {
      const db = getDatabase();
      const contactsRef = ref(db, `contacts/${id}`);
      remove(contactsRef)
        .then(() => {
          toast.success("Contact deleted successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
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
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
