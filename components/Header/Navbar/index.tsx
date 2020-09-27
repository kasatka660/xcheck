import React, { useEffect, useState } from "react";
import "./Navbar.module.css";
import { Layout, Menu } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Userinfo } from "../UserInfo";
import { useRouter } from "next/router";
import firebase from "firebase";

const { Header } = Layout;

export const Navbar: React.FC = () => {
  const [isStudent, setIsStudent] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsStudent(
      typeof localStorage !== "undefined" &&
        localStorage.getItem("userRole") === "student"
    );
  });

  return (
    <Header className="header" style={{ width: "100%" }}>
      <Menu
        defaultSelectedKeys={[]}
        mode="horizontal"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {isStudent && (
          <Menu.Item key="Reviews">
            <Link href="/reviews">
              <a>Reviews</a>
            </Link>
          </Menu.Item>
        )}
        {isStudent && (
          <Menu.Item key="ReviewRequests">
            <Link href="/review-request">
              <a>Review Requests</a>
            </Link>
          </Menu.Item>
        )}
        {typeof localStorage !== "undefined" &&
          localStorage.getItem("userRole") === "author" && (
            <Menu.Item key="Tasks">
              <Link href="/task-form">
                <a>Task</a>
              </Link>
            </Menu.Item>
          )}
        <Menu.Item key="SingOut" icon={<ExportOutlined />}>
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
        </Menu.Item>
        <Userinfo />
      </Menu>
    </Header>
  );
};
