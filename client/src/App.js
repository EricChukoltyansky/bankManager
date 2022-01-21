// import { useState } from 'react';
import { useEffect, useState } from "react";
import Api from "./api/Api";

function App() {
  const [client, setClient] = useState("");

  // console.log(process.env.NODE_ENV);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await Api.get("users");
      setClient(userData);
    };
    fetchData();
  });

  const renderClients = client.map((client) => {
    return (
      <div key={client._id}>
        <span>{client.name}</span>
        <span>{client.mobile}</span>
        <span>{client.password}</span>
        <span>{client.email}</span>
      </div>
    );
  });
  return (
    <>
      <h1>Bank Clients</h1>
      <div>{renderClients}</div>
    </>
  );
}

export default App;
