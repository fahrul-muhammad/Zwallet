import Navbar from "../../commons/components/Navbar";
import Navigasi from "../../commons/components/Navigasi";
import Footer from "../../commons/components/Footer";
import Layout from "../../commons/components/Layout";
import { connect } from "react-redux";
import { TopUp } from "../../modules/transaction";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import { GetChart, GetHistory } from "../../modules/transaction";

import Default from "../../commons/images/dummy-profile.png";

import css from "../../commons/styles/Home.module.css";

import { Component } from "react";
import { withRouter } from "next/router";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalIncome: 0,
      totalExpense: 0,
      history: [],
      isHide: true,
      isSuccess: true,
      isError: true,
      amount: 0,
      redirectUrl: "",
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
    console.log(this.state);
  };

  userTopUp = () => {
    const body = this.state;
    const token = this.props.token;
    TopUp(body, token)
      .then((res) => {
        console.log(res.data.data.redirectUrl);
        this.setState({ redirectUrl: res.data.data.redirectUrl });
        this.setState({ isSuccess: false });
        this.setState({ isError: true });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isSuccess: true });
        this.setState({ isError: false });
      });
  };

  getChartData = () => {
    const id = this.props.users.id;
    const token = this.props.token;
    GetChart(id, token)
      .then((res) => {
        console.log(res.data.data);
        const { totalIncome, totalExpense } = res.data.data;
        this.setState({ totalIncome: totalIncome });
        this.setState({ totalExpense: totalExpense });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  GetHistoryUser = () => {
    const token = this.props.token;
    GetHistory(token)
      .then((res) => {
        console.log(res.data.data);
        this.setState({ history: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getChartData();
    this.GetHistoryUser();
  }

  render() {
    const { router } = this.props;
    const formater = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
    return (
      <Layout title="Home">
        <div className={css["wrapper"]}>
          <Navbar />
          <Navigasi />
          <div className={css.content}>
            <div className={css.balance}>
              <p>Balance</p>
              <h1>{formater.format(this.props.users.balance)}</h1>
              <p>{this.props.users.noTelp ? this.props.users.noTelp : "_____"}</p>
              <button
                className={`btn btn-light  ${css["top-up"]}`}
                onClick={() => {
                  this.setState({ isHide: !this.state.isHide });
                }}
              >
                <i className="bi bi-plus-lg"></i>
                Top Up
              </button>
              <button
                className={`btn btn-light ${css["transfer"]}`}
                onClick={() => {
                  router.push("/transfer");
                }}
              >
                <i className="bi bi-arrow-up"></i>
                Transfer
              </button>
            </div>
            <div className={css.chart}>
              <div className={css.income}>
                <i className="bi bi-arrow-up"></i>
                <p>Income</p>
                <h1>{formater.format(this.state.totalIncome)}</h1>
              </div>
              <div className={css.expense}>
                <i className="bi bi-arrow-down"></i>
                <p>Expense</p>
                <h1>{formater.format(this.state.totalExpense)}</h1>
              </div>
              <div className={css.grafik}></div>
            </div>
            <div className={css.history}>
              <p>Transaction History</p>
              {this.state.history.length > 0 ? (
                <p className={css.HistoryLink}>
                  <Link href="/history?page=1&filter=WEEK"> See All </Link>
                </p>
              ) : null}
              <div className={css["history-container"]}>
                {this.state.history.length > 0 ? (
                  this.state.history.map((val) => {
                    return (
                      <div className={css["history-card"]} key={val.id}>
                        <div className={css.cardImg}>
                          <Image src={Default} alt="foto orang" width={56} height={56} />
                        </div>
                        <p className={css.CardName}>{val.fullName}</p>
                        <p className={css.CardStatus}>{val.type}</p>
                        <p className={val.type == "topup" || val.type == "accept" ? css.money : css.other}>{val.type == "topup" || val.type == "accept" ? `+ ${formater.format(val.amount)}` : `- ${formater.format(val.amount)}`}</p>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <p>0 History</p>
                    <h3>Lets Top up</h3>
                  </>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <Modal show={!this.state.isHide} centered className={`  ${css.modalContainer}`}>
          <Modal.Header>
            <h5>Top Up</h5>
            <button
              type="button"
              className={`btn-close ${css.btnClose}`}
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                this.setState({ isHide: !this.state.isHide });
              }}
            ></button>
            <br />
          </Modal.Header>
          <Modal.Body>
            <p className={css.textModal}>
              Enter the amount of money, and click <br /> submit
            </p>
            <input className={`form-control shadow-none ${css["modal-input"]}`} type="number" placeholder="" name="amount" aria-label="default input example" onChange={this.formChange} />
            <p className={css.successTopUp} hidden={this.state.isSuccess}>
              <Link href={this.state.redirectUrl} passHref>
                <a target="_blank"> Top Up success,Please Pay Top up</a>
              </Link>
            </p>
            <p className={css.errorTopup} hidden={this.state.isError}>
              Top Up failed,try again
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button className={`btn btn-secondary ${css.submitbtn}`} onClick={this.userTopUp}>
              Submit
            </button>
          </Modal.Footer>
        </Modal>
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

export default withRouter(connect(mapStateToProps)(index));
