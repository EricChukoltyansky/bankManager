import React, { useEffect, useState } from "react";

// import "./app.css";
import api from "../api/Api";

const App = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const usersData = await api.get("/users");
      setClients(usersData.data);
    };
    fetchData();
  }, []);

  const renderClients = clients.map((client) => {
    return (
      <div key={client._id} className="client">
        <span>{client.name}</span>
        <span>{client.mobile}</span>
        <span>{client.email}</span>
      </div>
    );
  });

  return (
    <>
      <h1>Bank Clients</h1>
      <div className="clients">{renderClients}</div>
    </>
  );
};

export default App;
