import React, {useState} from "react";
import api from "../api/Api";

const User = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const clickHandle = async () => {
    try {
      await api.post("/user", {
        name: name,
        mobile: mobile,
        email: email,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Create Account</h1>
      <div>
        <label htmlFor="name">Name: </label>
        <input onChange={(e) => setName(e.target.value)} type="text" />
      </div>
      <div>
        <label htmlFor="mobile">Mobile: </label>
        <input onChange={(e) => setMobile(e.target.value)} type="text" />
      </div>
      <div>
        <label htmlFor="name">Email: </label>
        <input onChange={(e) => setEmail(e.target.value)} type="text" />
      </div>
      <button onClick={clickHandle}></button>
    </>
  );
};

export default User;
