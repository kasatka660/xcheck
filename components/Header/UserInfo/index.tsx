import React, { useEffect, useState } from "react";
import { user } from "../../../data/data";
import styles from "./UserInfo.module.css";

export const Userinfo: React.FC = () => {
  const [user, setUser] = useState<string>(null);
  const [userRole, setUserRole] = useState<string>(null);

  useEffect(() => {
    setUser(window.localStorage.getItem("user"));
    setUserRole(window.localStorage.getItem("userRole"));
  });
  if (typeof window === "undefined") {
    return <></>;
  }
  return (
    <div className={styles.UserInfo}>
      <span>username: {user}</span>
      <span>role: {userRole}</span>
    </div>
  );
};
