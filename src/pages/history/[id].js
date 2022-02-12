import { Component } from "react";
import { withRouter } from "next/router";
import css from "../../commons/styles/Historyid.module.css";
import { connect } from "react-redux";
import { GetHistoryById, exportTransaction } from "../../modules/transaction/index";

// COMPONENTS
import Layout from "../../commons/components/Layout";
import Navbar from "../../commons/components/Navbar";
import Aside from "../../commons/components/Navigasi";
import Footer from "../../commons/components/Footer";

// IMAGE
import Image from "next/image";
import Success from "../../commons/images/success.png";
import Failed from "../../commons/images/failed.png";
import Default from "../../commons/images/dummy-profile.png";

class HistoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.router.query.id,
      transaction: {},
    };
  }

  getHistoryDetail = () => {
    const id = this.state.id;
    const token = this.props.token;
    GetHistoryById(id, token)
      .then((res) => {
        console.log(res.data);
        this.setState({ transaction: res.data.data[0] });
        console.log(this.state.transaction);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export = () => {
    const id = this.state.id;
    const token = this.props.token;
    exportTransaction(id, token)
      .then((res) => {
        console.log(res.data.data);
        const { url } = res.data.data;
        console.log(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getHistoryDetail();
  }

  render() {
    const formater = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
    console.log(this.state);
    return (
      <Layout title="History Detial">
        <div className={css.wrapper}>
          <Navbar />
          <Aside />
          <div className={css.content}>
            <div className={css.Image}>
              <Image src={this.state.transaction.status == "success" ? Success : Failed} alt="status image" />
            </div>
            <p className={css.Status}>{this.state.transaction.status == "success" ? "Transaction Success" : "Transaction Failed"}</p>
            <div className={css.cardContainer}>
              <div className={css.Card}>
                <p>Amount</p>
                <p>{formater.format(this.state.transaction.amount)}</p>
              </div>
              <div className={css.Card}>
                <p>Balance left</p>
                <p>{formater.format(this.props.users.balance)}</p>
              </div>
              <div className={css.Card}>
                <p>Date & time </p>
                <p>{this.state.transaction.createdAt}</p>
              </div>
              <div className={css.Card}>
                <p>Notes</p>
                <p>{this.state.transaction.notes}</p>
              </div>
              <p className={css.Transfer}>{this.state.transaction.type == "accept" ? "Transfer From" : "Transfer To"}</p>
              <div className={css.userCard}>
                <div className={css.userImage}>
                  <Image src={Default} alt="user Image" />
                </div>
                <p className={css.name}>{this.state.transaction.firstName + " " + this.state.transaction.lastName}</p>
                <p className={css.phone}>___</p>
              </div>
            </div>
            <button className={`btn btn-light ${css.btnExport}`} onClick={this.export}>
              Export
            </button>
            <button
              className={`btn btn-light ${css.btnHome}`}
              onClick={() => {
                this.props.router.push("/home");
              }}
            >
              Back to home
            </button>
          </div>
          <Footer />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
    token: state.auth.token,
  };
};

export default withRouter(connect(mapStateToProps)(HistoryDetail));
