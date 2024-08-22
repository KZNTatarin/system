import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Input, Space, Typography, message } from "antd";
const { Text } = Typography;
import { PlusOutlined } from "@ant-design/icons";

import DepartamentItem from "./DepartamentItem";

const Depatraments = () => {
  const [departaments, setDepartaments] = useState([]);
  const [newDepartament, setNewDepartament] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/departaments`)
      .then(function (response) {
        setDepartaments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [departaments]);

  const sendNewDepartament = async () => {
    try {
      await axios.post("http://localhost:3000/departaments", {
        id: Math.random,
        departamentName: newDepartament,
      });

      const response = await axios.get("http://localhost:3000/departaments");
      setDepartaments(response.data);
      setNewDepartament("");
    } catch (error) {
      console.log(error);
    }
  };

  // СООБЩЕНИЕ ПРИ ОШИБКЕ
  const [messageApi, contextHolder] = message.useMessage();

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Пожалуйста, введите название отдела который вы хотите добавить',
    });
  };

  return (
    <div>
         {contextHolder}
      <div style={{ marginBottom: "20px ", alignItems: "center" }}>
        <span>Добавить отдел: </span>
        <Input
          value={newDepartament}
          onChange={(e) => setNewDepartament(e.target.value)}
          placeholder="Название отдела"
          type="text"
          style={{ width: "50%", margin: "0 30px" }}
        />
        <Button
          icon={<PlusOutlined />}
          type="primary"
          shape="circle"
          onClick={() => {newDepartament.trim() === ""  ? error() : sendNewDepartament()}}
        ></Button>
      </div>

      {departaments.length === 0 ? (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Text style={{ textAlign: "center" }} type="secondary">
            Нет отделов
          </Text>
        </div>
      ) : (
        <Space wrap>
          {departaments?.map((departament) => (
            <DepartamentItem key={departament.id} departament={departament} />
          ))}
        </Space>
      )}
    </div>
  );
};

export default Depatraments;
