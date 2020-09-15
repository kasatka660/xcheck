import styles from "./PointsBadge.module.css";
import React from "react";

const PointsBadge: React.FC<{ score: number }> = ({ score }) => {
  return (
    <div className={styles.PointsBadge}>
      <span className={styles.Point}>
        {score < 0 ? "min point" : "max point"}
      </span>
      <span className={styles.PointsValue}>{score}</span>
    </div>
  );
};

export default PointsBadge;
