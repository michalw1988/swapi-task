import React from 'react';
import { Link } from "react-router-dom";
import styles from './Menu.module.scss';

const Menu = () => {
  return (
    <ul className={styles.menu}>
      <li><Link to="/">Characters</Link></li>
      <li><Link to="/vehicles">Vehicles</Link></li>
      <li><Link to="/planets">Planets</Link></li>
    </ul>
  );
}

export default Menu;