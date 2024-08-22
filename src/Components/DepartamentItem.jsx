import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card, Modal, Input, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const DepartamentItem = ({ departament }) => {
  const [workersCount, setWorkersCount] = useState();
  const [updateNameInput, setUpdateNameInput] = useState(
    departament.departamentName
  );

  // МОДАЛКА ДЛЯ ОБНОВЛЕНИЯ НАЗВАНИЯ
  const [updateModal, setUpdateModal] = useState(false);

  const showUpdateModal = () => {
    setUpdateModal(true);
  };

  const cancleUpdateModal = () => {
    setUpdateModal(false);
  };

  const [ deleteModal, setDeleteModal] = useState(false);

  const showDeleteModal = () => {
    setDeleteModal(true);
  };

  const cancleDeleteModal = () => {
    setDeleteModal(false);
  };

  async function updateDepartamentName() {
    try {
      // Обновляем название отдела
      await axios.put(`http://localhost:3000/departaments/${departament.id}`, {
        id: departament.id,
        departamentName: updateNameInput,
      });

      // Получаем всех работников
      const workersResponse = await axios.get("http://localhost:3000/workers");
      const workers = workersResponse.data;

      // Фильтруем работников, которые относятся к текущему отделу
      const workersToUpdate = workers.filter(
        (worker) => worker.departament === departament.departamentName
      );

      // Обновляем каждого работника
      await Promise.all(
        workersToUpdate.map((worker) =>
          axios.put(`http://localhost:3000/workers/${worker.id}`, {
            ...worker,
            departament: updateNameInput,
          })
        )
      );

      setUpdateModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  // УДАЛЕНИЕ ДЕПАРТАМЕНТА
  async function deleteDeportament() {
    try {
      const workersResponse = await axios.get("http://localhost:3000/workers");
      const workers = workersResponse.data;

      const workersToUpdate = workers.filter(
        (worker) => worker.departament === departament.departamentName
      );

      await Promise.all(
        workersToUpdate.map((worker) =>
          axios.put(`http://localhost:3000/workers/${worker.id}`, {
            ...worker,
            departament: "-",
          })
        )
      );

      await axios.delete(
        `http://localhost:3000/departaments/${departament.id}`
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  // ПОИСК КОЛИЧЕСТВО СОТРУДНИКОВ В ДЕПАРТАМЕНТЕ
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/workers?departament=${departament.departamentName}`
      )
      .then(function (response) {
        setWorkersCount(response.data.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Card
        title={departament.departamentName}
        hoverable
        style={{ border: "solid 1px #001529" }}
      >
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            size="large"
            shape="circle"
            type="primary"
            icon={<EditOutlined />}
            onClick={showUpdateModal}
          ></Button>

          <Button
            size="large"
            danger
            shape="circle"
            type="primary"
            icon={<DeleteOutlined />}
            onClick={showDeleteModal}
          ></Button>
        </div>

        <p>Количество работников: {workersCount}</p>
      </Card>
      <Modal
        title="Изменить отдел"
        open={updateModal}
        onOk={updateDepartamentName}
        onCancel={cancleUpdateModal}
        footer={[
            <Button key="cancel" onClick={cancleUpdateModal}>
              Отмена
            </Button>,
             <Button type="primary"  key="update" onClick={updateDepartamentName}>
             Переименовать
           </Button>,
          ]}
      >
        <Input
          placeholder="Basic usage"
          value={updateNameInput}
          onChange={(e) => setUpdateNameInput(e.target.value)}
        />
      </Modal>
      <Modal
        title="Удалить"
        open={deleteModal}
        onOk={deleteDeportament}
        onCancel={cancleDeleteModal}
        footer={[
            <Button key="cancel" onClick={cancleDeleteModal}>
              Отмена
            </Button>,
             <Button type="primary" danger key="delete" onClick={deleteDeportament}>
             Удалить
           </Button>,
          ]}
      >
       <h2>Вы действительно хотите удалить должность?</h2>
      </Modal>
    </>
  );
};

export default DepartamentItem;
