import Navbar from "../../commons/components/Navbar";
import Navigasi from "../../commons/components/Navigasi";
import Layout from "../../commons/components/Layout";

import css from "../../commons/styles/Home.module.css";

function Transfer() {
  return (
    <Layout title="Transfer">
      <div>
        <Navbar />
        <Navigasi />
      </div>
    </Layout>
  );
}

export default Transfer;
