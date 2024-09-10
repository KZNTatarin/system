import { useEffect, useState } from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import { Button, Typography, Modal, Input, Dropdown, Menu } from "antd";
const { Text } = Typography;

import { ArrowLeftOutlined } from "@ant-design/icons";

import "./workerItem.css";
import avatar from "../../img/avatar.png";
import Card from "antd/es/card/Card";

const WorkerItem = () => {
  const [worker, setWorker] = useState(null);
  const { slug } = useParams();
  const [newNumber, setNewNumber] = useState();
  const [newMail, setNewMail] = useState();
  const [newDepartament, setNewDepartament] = useState(worker?.departament);
  const [departaments, setDepartaments] = useState([]);
  const navigate = useNavigate();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [modalType, setModalType] = useState("update");

  // ПОЛУЧЕНИЕ СОТРУДНИКА ПО ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/workers/${slug}`)
      .then(function (response) {
        setWorker(response.data);
        setNewNumber(worker?.phoneNumber);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [slug]);

  // ПОЛУЧЕНИЕ ВСЕХ ДЕПАРТАМЕНТОВ
  useEffect(() => {
    axios
      .get(`http://localhost:3000/departaments`)
      .then(function (response) {
        setDepartaments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [slug]);

  // МОДАЛКА РЕДАКТОР РАБОТНИКА 
  const showUpdateModal = () => {
    setModalType("update");
    setIsUpdateModalOpen(true);
  };
  const handleUpdateOk = () => {
    workerNewData();
    setIsUpdateModalOpen(false);
    navigate(0);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
  };

  //МОДАЛКА УДАЛЕНИЯ
  const showDeleteModal = () => {
    setModalType("delete");
    setIsDeleteModalOpen(true);
  };
  const handleDeleteOk = () => {
    axios
      .delete(`http://localhost:3000/workers/${worker?.id}`)
      .then(() => {
        setIsDeleteModalOpen(false);
        navigate(-1); 
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (worker) {
      setNewNumber(worker.phoneNumber);
      setNewMail(worker.mail);
    }
  }, [worker]);

  const menuItems = departaments.map((dept) => ({
    key: dept.id,
    label: dept.departamentName,
  }));

  const handleMenuClick = (e) => {
    const selectedDept = menuItems.find((item) => item.key === e.key);
    setNewDepartament(selectedDept.label);
    console.log(newDepartament);
  };

  // ДАННЫЕ ДЛЯ ОТПРАВКИ
  const workerNewData = () => {
    axios.put(`http://localhost:3000/workers/${slug}`, {
      id: worker.id,
      name: worker.name,
      surname: worker.surname,
      departament: newDepartament,
      age: worker.age,
      gender: worker.gender,
      phoneNumber: newNumber,
      mail: newMail,
    });
  };

  return (
    <div>
      <div className="worker__item-header">
        <Button style={{ marginRight: "30px" }} onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </Button>
        <h1 style={{ display: "inline" }}>
          {worker?.name} {worker?.surname}
        </h1>
      </div>
      <div className="worker__item-top">
        <div>
          <img src={avatar} className="worker-avatar" />
        </div>

        <Card
          title="Персональные данные"
          extra={
            <>
              <Button
                style={{ marginRight: "20px" }}
                onClick={showUpdateModal}
              >
                Редактировать
              </Button>
              <Button danger type="primary" onClick={showDeleteModal}>
                Удалить
              </Button>
            </>
          }
          style={{ width: "50%" }}
        >
          <p>
            <Text strong>Отдел: </Text> {worker?.departament} <br />
          </p>
          <p>
            <Text strong>Номер телефона: </Text> {worker?.phoneNumber}
          </p>
          <p>
            <Text strong>Почта: </Text> {worker?.mail}
          </p>
          <p>
            <Text strong>ID сотрудника: </Text> {worker?.id}
          </p>
          <p>
            <Text strong>Пол: </Text> {worker?.gender}
          </p>
        </Card>
      </div>
      <div className="worker__itme-bot"></div>

      {/* UPDATE MODAL */}
      <Modal
        title="Изменить данные"
        open={isUpdateModalOpen}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
      >
        <>
          <p>
            Отдел: <br />
            <Dropdown
              overlay={
                <Menu items={menuItems} selectable onClick={handleMenuClick} />
              }
              trigger={["click"]}
            >
              <Button onClick={(e) => e.preventDefault()}>
                {newDepartament === undefined
                  ? worker?.departament
                  : newDepartament}
              </Button>
            </Dropdown>
          </p>

          <p>
            Номер телефона:
            <Input
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </p>

          <p>
            Почта:
            <Input
              value={newMail}
              onChange={(e) => setNewMail(e.target.value)}
            />
          </p>
        </>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        title="Удалить сотрудника"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>Вы уверены, что хотите удалить этого сотрудника?</p>
      </Modal>
    </div>
  );
};

export default WorkerItem;
