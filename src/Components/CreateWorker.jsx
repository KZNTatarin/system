import React, { useState, useEffect } from "react";
import { Button, InputNumber, Modal, Dropdown, Menu, Radio } from "antd";
import Input from "antd/es/input/Input";
import axios from "axios";

const createWorker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departaments, setDepartaments] = useState([]);

  //   Данные для добавления
  const [workerName, setWorkerName] = useState("");
  const [workerSurName, setWorkerSurName] = useState("");
  const [workerDepartament, setWorkerDepartament] = useState("");
  const [genderValue, setGenderValue] = useState("Мужской");
  const [workerMail, setWorkerMail] = useState("");
  const [workerPhoneNumber, setWorkerPhoneNumber] = useState("");

  const changeGender = (e) => {
    setGenderValue(e.target.value);
  };

  // МОДАЛКА ДЛЯ ДОБ. РАБОТНИКА
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    sendNewWorker();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // НАХОДИМ ВСЕ ДЕПАРТАМЕНТЫ
  useEffect(() => {
    axios
      .get(`http://localhost:3000/departaments`)
      .then(function (response) {
        setDepartaments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const menuItems = departaments.map((dept) => ({
    key: dept.id,
    label: dept.departamentName,
  }));

  const handleMenuClick = (e) => {
    const selectedDept = menuItems.find((item) => item.key === e.key);
    setWorkerDepartament(selectedDept.label);
  };

  // ДАННЫЕ ДЛЯ ОТПРАВКИ
  const dataToSend = {
    id: (Math.random() * 10000).toFixed(0),
    name: workerName,
    surname: workerSurName,
    departament: workerDepartament,
    gender: genderValue,
    phoneNumber: workerPhoneNumber,
    mail: workerMail,
  }

  // ОТПРАВКА ДАННЫХ
  const sendNewWorker = async () => {
    try {
      await axios.post("http://localhost:3000/workers", dataToSend);
      console.log(dataToSend);
      
      setIsModalOpen(false);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button style={{ margin: "20px 0" }} onClick={showModal}>
        Добавить сотрудника
      </Button>
      <Modal
        title="Новый сотрудник"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "50%", margin: "0 5px" }}>
            <p>Имя</p>
            <Input
              value={workerName}
              onChange={(e) => setWorkerName(e.target.value)}
            />
          </div>

          <div style={{ width: "50%", margin: "0 5px" }}>
            <p>Фамиллия</p>
            <Input
              value={workerSurName}
              onChange={(e) => setWorkerSurName(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "50%", margin: "0 5px" }}>
            <p>Отдел</p>
            <Dropdown
              style={{ width: "50%", margin: "0 5px" }}
              overlay={
                <Menu items={menuItems} selectable onClick={handleMenuClick} />
              }
              trigger={["click"]}
            >
              <Button onClick={(e) => e.preventDefault()}>
                {workerDepartament === undefined
                  ? "Выбрать отдел"
                  : workerDepartament}
              </Button>
            </Dropdown>
          </div>

          <div style={{ width: "50%", margin: "0 5px" }}>
            <p>Номер телефона</p>
            <Input
              value={workerPhoneNumber}
              onChange={(e) => setWorkerPhoneNumber(e.target.value)}
              oninput="this.value = this.value.replace(/[^0-9]/g, '');"
              type="tel"
              typeof="number"
            />
          </div>
        </div>
        <div>
          <p>Почта</p>
          <Input
            value={workerMail}
            onChange={(e) => setWorkerMail(e.target.value)}
          />
        </div>
        <Radio.Group onChange={changeGender} value={genderValue}>
          <Radio value={"Мужской"}>Мужской</Radio>
          <Radio value={"Женский"}>Женский</Radio>
        </Radio.Group>
      </Modal>
    </div>
  );
};

export default createWorker;
