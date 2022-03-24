import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

// import half from "../commons/images/half-phone.png";
// import half from "../commons/images/half-phone.png";
import half from "../commons/images/half-phone.png";
import sponsor from "../commons/images/sponsor.png";
import tilipun from "../commons/images/tilipun.png";
import Lock from "../commons/images/lock.png";
import Download from "../commons/images/download.png";
import sectionHalf1 from "../commons/images/section-half1.png";
import sectionHalf2 from "../commons/images/section-half2.png";
import Default from "../commons/images/dummy-profile.png";
import Layout from "../commons/components/Layout";
import Loading from "../commons/components/Loading";

import style from "../commons/styles/landing.module.css";

export default function Landing() {
  const router = useRouter();
  return (
    <Layout title="Welcome To Zwallet">
      <div className={style.main}>
        <div className={style.jumbotron}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#6379f4"
              opacity="5"
              d="M0,128L48,138.7C96,149,192,171,288,197.3C384,224,480,256,576,234.7C672,213,768,139,864,144C960,149,1056,235,1152,261.3C1248,288,1344,256,1392,240L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
          <h1 className={style.title}>Zwallet</h1>
          <button
            onClick={() => {
              router.push("/login");
            }}
            className={`btn btn-light ${style["btn-login"]} `}
          >
            Login
          </button>
          <button
            onClick={() => {
              router.push("/signup");
            }}
            className={`btn btn-light ${style["btn-signup"]} `}
          >
            Sign Up
          </button>
          <div className={style.image}>
            <Image src={sectionHalf2} alt="mobile aplication" />
          </div>
          <p className={style.app}>
            Awesome App <br /> For Saving Time.
          </p>
          <p className={style.alibi}>We bring you a mobile app for banking problems that oftenly wasting much of your times.</p>
          <button className={`btn btn-light ${style.try} `}>Try it Free</button>
        </div>
        <div className={style.sponsor}>
          <div className={style["sponsor-image"]}>
            <Image src={sponsor} alt="sponsor" />
          </div>
        </div>
        <div className={style.about}>
          <div className={style.title}>
            <p className={style.blue}>About</p>
            <p className={style.aplication}> the Application.</p>
          </div>
          <div className={style.desc}>
            <p>
              We have some great features from the application and it’s totally free <br /> to use by all users around the world.
            </p>
          </div>
          <div className={style["card-container"]}>
            <div className={style.card}>
              <div className={style["card-image"]}>
                <Image src={tilipun} alt="tilipun" />
              </div>
              <p className={style["card-title"]}>24/7 Support</p>
              <p className={style["card-desc"]}>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</p>
            </div>
            <div className={style.card}>
              <div className={style["card-image"]}>
                <Image src={Lock} alt="tilipun" />
              </div>
              <p className={style["card-title"]}>Data Privacy</p>
              <p className={style["card-desc"]}>We make sure your data is safe in our database and we will encrypt any data you submitted to us.</p>
            </div>
            <div className={style.card}>
              <div className={style["card-image"]}>
                <Image src={Download} alt="tilipun" />
              </div>
              <p className={style["card-title"]}>Easy Download</p>
              <p className={style["card-desc"]}>Zwallet is 100% totally free to use it’s now available on Google Play Store and App Store.</p>
            </div>
          </div>
        </div>
        <div className={style["introduce"]}>
          <div className={style["image-wrapper"]}>
            <div className={style.image1}>
              <Image src={sectionHalf1} alt="phone1" width="500" height={500} />
            </div>
            <div className={style.image2}>
              <Image src={sectionHalf2} alt="phone2" />
            </div>
          </div>
          <div className={style["right"]}>
            <div className={style.title}>
              <p>
                All The <span className={style.blue}>Great</span>
                <br />
                Zwallet Features
              </p>
            </div>
            <div className={style["card-wrapper"]}>
              <div className={style["card-list"]}>
                <p className={style.number}>1.</p>
                <p className={style.title}>Small Free</p>
                <br />
                <p className={style.text}>We only charge 5% of every success transaction done in Zwallet app.</p>
              </div>
              <div className={style["card-list"]}>
                <p className={style.number}>2.</p>
                <p className={style.title}>Data Secured</p>
                <br />
                <p className={style.text}>All your data is secured properly in our system and it’s encrypted.</p>
              </div>
              <div className={style["card-list"]}>
                <p className={style.number}>3.</p>
                <p className={style.title}>User Frindly</p>
                <br />
                <p className={style.text}>Zwallet come up with modern and sleek design and not complicated.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={style.testimonial}>
          <p className={style.head}>
            What Users Are <span className={style.blue}> Saying.</span>{" "}
          </p>
          <p className={style.desc}>
            We have some great features from the application and it’s totally free <br /> to use by all users around the world.
          </p>

          <div className={style["testimonial-card"]}>
            <div className={style.cardImg}>
              <Image src={Default} alt="users testimonial" />
            </div>
            <p className={style.cardName}>Fahrul Muhammad</p>
            <p className={style.cardJobs}>Front-end Developer</p>
            <p className={style.cardText}>
              “This is the most outstanding app that I’ve ever try in my live, this app is such an amazing masterpiece and it’s suitable for you who is bussy with their bussiness and must transfer money to another person aut there. Just try
              this app and see the power!”
            </p>
          </div>
        </div>
        <footer className={style.footerWrapper}>
          <p className={style.footerLogo}>Zwallet</p>
          <p className={style.footerDesc}>
            Simplify financial needs and saving <br /> much time in banking needs with <br /> one single app.
          </p>
          <hr className={style.line} />
          <p className={style["copyright"]}>2020 Zwallet. All right reserved.</p>
          <p className={style["email"]}> contact@zwallet.com </p>
          <p className={style["phone"]}>+62 5637 8882 9901</p>
        </footer>
      </div>
    </Layout>
  );
}
