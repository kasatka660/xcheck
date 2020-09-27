import React from "react";
import "./Navbar.module.css";
import { Layout, Menu } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Userinfo } from "../UserInfo";
import { useRouter } from "next/router";
import firebase from "firebase";

const { Header } = Layout;

export const Navbar: React.FC = () => {
  const router = useRouter();
  return (
    <Header className="header" style={{ width: "100%" }}>
      <Menu
        defaultSelectedKeys={[]}
        mode="horizontal"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Menu.Item key="SelfEsteem">
          <Link href="/self-esteem">
            <a>Self-Esteem</a>
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
          <Link href="/review-request">
            <a>Review Requests</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="TaskForm">
          <Link href="/task-form">
            <a>Task Form</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="SingOut" icon={<ExportOutlined />}>
          <Link href="/">
            <a
              href="#"
              onClick={() => {
                window.localStorage.removeItem("user");
                window.localStorage.removeItem("userRole");
                firebase
                  .auth()
                  .signOut()
                  .then(() => router.push("/auth"));
              }}
            />
          </Link>
        </Menu.Item>
        <Userinfo />
      </Menu>
    </Header>
  );
};
