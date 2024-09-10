import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Flex, Space, Table, } from "antd";



const WorkersTable = ({ workers }) => {

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
    },
    {
      title: "Фамиллия",
      dataIndex: "surname",
    },
    {
      title: "ID сотрудника",
      dataIndex: "id",
    },
    {
      title: "Пол",
      dataIndex: "gender",
    },
    {
      title: "Отдел",
      dataIndex: "departament",
    },
    {
      title: "Управление",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            {" "}
            <Link to={`./worker/${record.id}`}>Управление</Link>
          </Space>
        </>
      ),
    },
  ];

  const deleteWorker = (record) => {
    console.log(record);
  };

  return (
    <>
      <Flex gap="middle" vertical>
        <Table columns={columns} dataSource={workers} />
      </Flex>
    </>
  );
};
export default WorkersTable;
