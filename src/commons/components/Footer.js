import css from "../styles/Footer.module.css";

function Footer() {
  return (
    <div className={css.main}>
      <p className={css.copyright}>2020 Zwallet. All right reserved.</p>
      <p className={css.contact}>contact@zwallet.com</p>
      <p className={css.phone}>+62 5637 8882 9901</p>
    </div>
  );
}

export default Footer;
