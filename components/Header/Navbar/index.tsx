import React from "react";
import "./Navbar.module.css";
import { Layout, Menu } from "antd";
//import { PageHeader, Button, Descriptions } from 'antd';
import { ExportOutlined } from "@ant-design/icons";

//import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { Header } = Layout;

export const Navbar: React.FC = () => {
  return (
    <Header className="header" style={{width:'100%'}}>
      <Menu defaultSelectedKeys={["Self-assesment"]} mode="horizontal"style={{display:'flex', justifyContent:'space-between'}}>
        <Menu.Item key="Self-assesment">
          <a href="#" target="_blank" rel="">
            Self-assesment
          </a>
        </Menu.Item>
        <Menu.Item key="Cross-Check">
          <a href="#" target="_blank" rel="">
            Cross-Check
          </a>
        </Menu.Item>
        <Menu.Item key="Checkout" icon={<ExportOutlined />}>
          <a href="#" target="_blank" rel=""></a>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
