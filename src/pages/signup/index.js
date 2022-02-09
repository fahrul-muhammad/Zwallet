import styles from "../../commons/styles/signup.module.css";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../commons/components/Layout";
import { Register } from "../../modules/auth";
import { withRouter } from "next/router";

import Image2 from "../../commons/images/png-phone2.png";
import Image1 from "../../commons/images/png-phone.png";

import { Component } from "react";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
    console.log(this.state);
  };

  signUp = () => {
    const body = this.state;
    Register(body)
      .then((res) => {
        console.log(res);
        this.props.router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        let input = document.getElementsByTagName("input");
        for (let i = 0; i < input.length; i++) {
          document.getElementsByTagName("input")[i].style.borderBottomColor = "#FF5B37";
        }
        document.getElementById("error").style.display = "block";
      });
  };

  render() {
    return (
      <Layout title="Sign Up">
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
            <p className={styles.errorMsg} id="error">
              Sign Up Error, Try again
            </p>
            <h2 className={styles.desc}>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h2>
            <p className={styles.text}>Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
            <form>
              <div className={`${styles["mb-3"]}`}>
                <input type="text" className={`form-control shadow-none  ${styles["forms"]}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={`Enter your firstname`} name="firstName" onChange={this.formChange} />
              </div>
              <div className={`${styles["mb-3"]}`}>
                <input type="text" className={`form-control shadow-none  ${styles["forms"]}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={`Enter your lastname`} name="lastName" onChange={this.formChange} />
              </div>
              <div className={`${styles["mb-3"]}`}>
                <input type="email" className={`form-control shadow-none  ${styles["forms"]}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={`Enter your email`} name="email" onChange={this.formChange} />
              </div>
              <div className={styles["mb-3"]}>
                <input type="password" className={`form-control shadow-none ${styles["forms"]}`} id="exampleInputPassword1" placeholder="Enter your password" name="password" onChange={this.formChange} />
                <div className={styles.link}>
                  <Link href="/login">Forgot your password?</Link>
                </div>
              </div>
            </form>
            <button className={`btn btn-secondary ${styles.button}`} onClick={this.signUp}>
              Sign Up
            </button>
            <div className={styles.signup}>
              <p>
                Don{"`"}t have an account? Let{"`"}s
              </p>
              <Link href="/signup"> sign Up</Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withRouter(index);
