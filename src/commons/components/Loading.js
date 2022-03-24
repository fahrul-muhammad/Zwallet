import styles from "../styles/loading.module.css";

const Loading = () => {
  return (
    <div className={styles.body}>
      <p className={styles.txt}>Loading</p>
      <div id={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
