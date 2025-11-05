import React from "react";
import styles from "./Tooltip.module.css";

export default function Tooltip({ icon, text }) {
  return (
    <div className={styles.wrap}>
      {icon}
      <span className={styles.tip}>{text}</span>
    </div>
  );
}
