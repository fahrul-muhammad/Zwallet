import styles from "../../commons/styles/forgotPass.module.css";
import Image from "next/image";
import { withRouter } from "next/router";
import Layout from "../../commons/components/Layout";

import Image2 from "../../commons/images/png-phone2.png";
import Image1 from "../../commons/images/png-phone.png";

// UTILS
import { forgotPassword } from "../../modules/auth/index";

import React, { Component } from "react";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isInput: false,
      isSuccess: false,
    };
  }
  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
    if (data.email == "") {
      this.setState({ isInput: false });
    } else {
      this.setState({ isInput: true });
    }
  };

  forgotPasswords = () => {
    const body = {
      email: this.state.email,
      linkDirect: `http://localhost:3000/new_password`,
    };
    forgotPassword(body)
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          this.setState({ isSuccess: !this.state.isSuccess });
          console.log(this.state.isSuccess);
        }, 500);
        setTimeout(() => {
          this.setState({ isSuccess: !this.state.isSuccess });
          console.log(this.state.isSuccess);
        }, 3500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Layout title="Forgot Password">
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
            <p className={styles.text}>To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
            <form>
              <div className={styles["mb-3"]}>
                <input type="email" className={`form-control shadow-none ${styles["forms"]}`} id="exampleInputPassword1" placeholder="Enter your email" name="email" onChange={this.formChange} />
              </div>
            </form>
            <button disabled={!this.state.isInput} className={`btn btn-secondary ${styles.button}`} onClick={this.forgotPasswords}>
              Confirm
            </button>
          </div>
          <div className={styles.toast} hidden={!this.state.isSuccess}>
            <p className={styles.toastText}>Please check Your email</p>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withRouter(index);
