import React from "react";
import { user } from "../../../data/data";
import styles from "./UserInfo.module.css";

export const Userinfo: React.FC = () => {
  if (typeof window === "undefined") {
    return <></>;
  }
  return (
    <div className={styles.UserInfo}>
      <span>username: {window && window.localStorage.getItem("user")}</span>
      <span>role: {window && window.localStorage.getItem("userRole")}</span>
    </div>
  );
};
