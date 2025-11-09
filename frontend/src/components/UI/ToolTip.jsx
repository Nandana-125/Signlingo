import React from "react";
import styles from "./Tooltip.module.css";
import PropTypes from "prop-types";

export default function Tooltip({ icon, text }) {
  return (
    <div className={styles.wrap}>
      {icon}
      <span className={styles.tip}>{text}</span>
    </div>
  );
}
Tooltip.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};
