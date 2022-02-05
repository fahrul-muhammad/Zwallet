import Navbar from "../../commons/components/Navbar";
import Navigasi from "../../commons/components/Navigasi";
import Footer from "../../commons/components/Footer";
import Layout from "../../commons/components/Layout";

import css from "../../commons/styles/Home.module.css";

function Home() {
  return (
    <Layout title="Home">
      <div className={css["wrapper"]}>
        <Navbar />
        <Navigasi />
        <Footer />
      </div>
    </Layout>
  );
}

export default Home;
