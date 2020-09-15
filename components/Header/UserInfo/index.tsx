import React from "react";
import { user } from "../../../data/data";
import styles from "./UserInfo.module.css";

export const Userinfo: React.FC = () => {
  return (
    <div className={styles.UserInfo}>
      <span>username: {user.githubId}</span>
      <span>role: {user.roles[1]}</span>
    </div>
  );
};
