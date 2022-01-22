import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/Api";

const Transactions = () => {
  const [userData, setUserData] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      console.log(api);
      const data = await api.get(`user/${params.id}`);
      console.log(data);
      setUserData(data);
    };
    fetchData();
  }, [params.id]);

  return <div>hello</div>;
};

export default Transactions;
