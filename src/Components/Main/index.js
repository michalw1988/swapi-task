import styles from './Main.module.scss';
import { Routes, Route } from "react-router-dom";
import Characters from '../Characters';
import Vehicles from '../Vehicles';
import Character from '../Character';
import Menu from '../Menu';
import Planets from '../Planets';

function Main() {
  return (
    <div className={styles.main}>
      <Menu />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/characters/:id" element={ <Character />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/planets" element={<Planets />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;