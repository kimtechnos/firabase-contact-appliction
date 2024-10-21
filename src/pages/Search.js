import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";

const Search = () => {
  const [data, setData] = useState([]);

  // get query params from the URL
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get("name"); // Extract 'name' parameter from the URL
  console.log("search", search);

  useEffect(() => {
    if (search) {
      // Fetch data from Firebase based on the search query
      const fetchData = async () => {
        if (!search) return;
        try {
          const db = getDatabase();
          const contactsRef = ref(db, "contacts");
          const snapshot = await get(contactsRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            const filteredData = Object.values(data).filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase()),
            );
            setData(filteredData); // Update state with filtered data
          } else {
            console.log("No data available");
            setData([]); // If no data, set an empty array
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      // Call the fetchData function
      fetchData();
    }
  }, [search]); // re-run effect when 'search' changes

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <Link to="/">
          <button className="btn btn-edit">Go Back</button>
        </Link>
        {Object.keys(data).length === 0 ? (
          <h2>No Search Found With That Name: {query.get("name")}</h2>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>No.</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>Contact</th>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Search;
