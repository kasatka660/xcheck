import React from "react";
import "./Navbar.module.css";
import { Layout, Menu } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Userinfo } from "../UserInfo";

const { Header } = Layout;

export const Navbar: React.FC = () => {
  return (
    <Header className="header" style={{ width: "100%" }}>
      <Menu
        defaultSelectedKeys={["SelfAssessment"]}
        mode="horizontal"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Menu.Item key="SelfAssessment">
          <Link href="/self-assessment">
            <a>Self-Assessment</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="CrossCheck">
          <Link href="/cross-check">
            <a>Cross-Check</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="Reviews">
          <Link href="/">
            <a>Reviews</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="ReviewRequests">
          <Link href="/">
            <a>Review Requests</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="SingOut" icon={<ExportOutlined />}>
          <Link href="/">
            <a href="#" />
          </Link>
        </Menu.Item>
        <Userinfo />
      </Menu>
    </Header>
  );
};
