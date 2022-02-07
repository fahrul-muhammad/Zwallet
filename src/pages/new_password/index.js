import styles from "../../commons/styles/newPass.module.css";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../commons/components/Layout";

import Image2 from "../../commons/images/png-phone2.png";
import Image1 from "../../commons/images/png-phone.png";

function ResetPassword() {
  return (
    <Layout title="new Password">
      <div className={styles.main}>
        <div className={styles.left}>
          <p className={styles.title}>Zwallet</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" width="100%" className={styles.waves}>
            <path
              fill="#5a6fe9"
              fillOpacity="1"
              d="M0,224L34.3,202.7C68.6,181,137,139,206,106.7C274.3,75,343,53,411,48C480,43,549,53,617,80C685.7,107,754,149,823,186.7C891.4,224,960,256,1029,229.3C1097.1,203,1166,117,1234,101.3C1302.9,85,1371,139,1406,165.3L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            ></path>
          </svg>
          <div className={styles["image-container"]}>
            <div className={styles.phone2}>
              <Image alt="phone2" src={Image2} />
            </div>
            <div className={styles.phone1}>
              <Image alt="phone1" src={Image1} />
            </div>
          </div>
          <div className={styles.wrapper}>
            <p className={styles.discover}>App that Covering Banking Needs.</p>
            <p className={styles.description}>
              Zwallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in Zwallet everyday with worldwide users coverage.
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <h2 className={styles.desc}>Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</h2>
          <p className={styles.text}>Now you can create a new password for your Zwallet account. Type your password twice so we can confirm your new passsword.</p>
          <form>
            <div className={styles["mb-3"]}>
              <input type="password" className={`form-control shadow-none ${styles["forms"]}`} placeholder="Create new Password"></input>
              <i className="bi bi-lock"></i>
            </div>
            <div className={styles["mb-3"]}>
              <input type="password" className={`form-control shadow-none ${styles["forms"]}`} placeholder="Confirm Your Password" />
              <i className="bi bi-lock"></i>
            </div>
          </form>
          <button className={`btn btn-secondary ${styles.button}`}>Reset Password</button>
        </div>
      </div>
    </Layout>
  );
}

export default ResetPassword;
