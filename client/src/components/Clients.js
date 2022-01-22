import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/Api";

const Client = () => {
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
        <Link to={`/${client._id}`}>
          <button>Transactions</button>
        </Link>
      </div>
    );
  });

  return (
    <div>
      <h1>Bank Clients</h1>
      <div className="clients">{renderClients}</div>
    </div>
  );
};

export default Client;
