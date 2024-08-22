import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  InfoCircleOutlined,
  ClusterOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";

import Main from "./Main";
import Workers from "./Workers";
import Depatraments from "./Departaments";
import WorkerItem from "./WorkerItem/WorkerItem";

const { Header, Sider, Content } = Layout;

const Layouts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate()

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/main"]}
          onClick={({ key }) => {
            navigate(key)
          }}
          items={[
            {
              key: "/",
              icon: <InfoCircleOutlined />,
              label: "Главное",
            },
            {
              key: "/positions",
              icon: <ClusterOutlined />,
              label: "Должности",
            },
            {
              key: "/workers",
              icon: <UserOutlined />,
              label: "Работники",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/positions" element={<Depatraments />}></Route>
            <Route path="/workers" element={<Workers />}></Route>
            <Route path="/workers/worker/:slug" element={<WorkerItem />}></Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
