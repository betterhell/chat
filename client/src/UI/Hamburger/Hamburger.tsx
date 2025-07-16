import React from 'react';
import styles from "./styles.module.scss";

interface HamburgerProps {
  onClick?: () => void;
  isActive?: boolean;
}

const Hamburger: React.FC<HamburgerProps> = ({ onClick, isActive }) => {
  return (
    <button
      className={styles.hamburger}
      type="button"
      onClick={onClick}
      aria-label="Открыть меню"
    >
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </button>
  );
};

export default Hamburger;