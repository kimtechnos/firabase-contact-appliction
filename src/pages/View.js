import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { useParams, Link } from "react-router-dom";
import "./View.css";

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const db = getDatabase();
    const contactsRef = ref(db, `contacts/${id}`);
    get(contactsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      })
      .catch((error) => {
        console.error("error fetching data:", error);
      });
  }, [id]);
  console.log("user", user);

  return (
    <div style={{ marginTop: "15PX" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name:</strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Email:</strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Contact:</strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
