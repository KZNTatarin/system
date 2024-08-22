import React, { useState, useEffect } from "react";
import axios from "axios";

import { Input } from "antd";
const { Search } = Input;

import WorkersTable from "./WorkersTable";
import CreateWorker from "./createWorker";


const Workers = () => {
  const [workers, setWorkers] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:3000/workers")
      .then(function (response) {
        setWorkers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [workers]);

  // const onSearch = (value, _e, info) => {
  //       axios
  //       .get(`http://localhost:3000/workers?name=${value}?surname=${value}`)
  //       .then(function (response) {
  //           setWorkers(response.data);
  //         })
  //   }

  return (
    <div>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          width: "100%",
        }}
      />
      <CreateWorker/>
      <WorkersTable workers={workers}/>
      
    </div>
  );
};

export default Workers;
