import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "antd";
import WorkersTable from "./WorkersTable";
import CreateWorker from "./CreateWorker";

const { Search } = Input;

const Workers = () => {
  const [workers, setWorkers] = useState([]); // Полный список работников
  const [filteredWorkers, setFilteredWorkers] = useState([]); // Отфильтрованный список для отображения

  useEffect(() => {
    axios
      .get("http://localhost:3000/workers")
      .then((response) => {
        setWorkers(response.data);
        setFilteredWorkers(response.data); // Изначально показываем всех работников
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); 

  const onSearch = (value) => {
    const valueLowerCase = value.toLowerCase().trim();
    const searchTerms = valueLowerCase.split(" ");

    if (valueLowerCase === "") {
      setFilteredWorkers(workers);
      return;
    }

    const foundWorkers = workers.filter((worker) => {
      const workerName = worker.name.toLowerCase();
      const workerSurname = worker.surname.toLowerCase();

      if (searchTerms.length === 2) {
        return (
          (workerName.includes(searchTerms[0]) && workerSurname.includes(searchTerms[1])) ||
          (workerName.includes(searchTerms[1]) && workerSurname.includes(searchTerms[0]))
        );
      } else if (searchTerms.length === 1) {
        return (
          workerName.includes(searchTerms[0]) || workerSurname.includes(searchTerms[0])
        );
      }

      return false;
    });

    setFilteredWorkers(foundWorkers);
  };

  const handleAddWorker = (newWorker) => {
    const updatedWorkers = [...workers, newWorker];
    setWorkers(updatedWorkers);
    setFilteredWorkers(updatedWorkers); 
  };

  return (
    <div>
      <Search
        placeholder="Введите имя и фамилию"
        onChange={(e) => onSearch(e.target.value)}
        style={{
          width: "100%",
        }}
      />
      <CreateWorker onAddWorker={handleAddWorker} />
      <WorkersTable workers={filteredWorkers} />
    </div>
  );
};

export default Workers;
