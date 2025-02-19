import ContainedButtons from "../../components/Button";
import Header from "../../components/Header";
import styles from "./style.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.nameOfStartUp}>Wake On</h1>
          <h3 className={styles.desc}>
            {`An alert driver means a safe road. Don't let sleep take over with the Alert system!`}
          </h3>
          <div className={styles.buttonPosition}>
            <ContainedButtons
              name_of_button={"About page"}
              direction={"about"}
            />
          </div>
        </div>
        <div className={styles.imgContainer}>
          <img src="/assets/img/logo.png" alt="img" />
        </div>
      </div>
    </div>
  );
};

export default Home;
