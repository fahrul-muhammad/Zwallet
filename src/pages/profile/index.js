import Navbar from "../../commons/components/Navbar";
import Navigasi from "../../commons/components/Navigasi";
import Footer from "../../commons/components/Footer";
import Layout from "../../commons/components/Layout";

import css from "../../commons/styles/profile.module.css";

export default function index() {
  return (
    <Layout title="Profile">
      <div className={css["wrapper"]}>
        <Navbar />
        <Navigasi />
        <Footer />
      </div>
    </Layout>
  );
}
