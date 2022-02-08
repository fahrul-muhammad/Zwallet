import { Component } from "react";
import Layout from "../../commons/components/Layout";
import Navbar from "../../commons/components/Navbar";
import Navigasi from "../../commons/components/Navigasi";
import Footer from "../../commons/components/Footer";
import css from "../../commons/styles/history.module.css";
import Image from "next/image";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { getAllHistory } from "../../modules/transaction/index";
import Default from "../../commons/images/dummy-profile.png";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "WEEK",
      history: [],
      page: 1,
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data, () => {
      console.log(this.state);
    });
  };

  getHistory = () => {
    const token = this.props.token;
    const filter = this.state.filter;
    const page = this.state.page;
    console.log(filter);
    getAllHistory(filter, page, token)
      .then((res) => {
        console.log("RESPONSE", filter);
        console.log(res.data);
        this.setState({ history: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  NextPage = () => {
    const page = this.state.page;
    this.setState({ page: page + 1 }, () => {
      console.log(this.state.page);
      this.getHistory();
    });
  };

  PrevPage = () => {
    const page = this.state.page;
    if (this.state.page > 1) {
      this.setState({ page: page - 1 }, () => {
        console.log(this.state.page);
        this.getHistory();
      });
    } else {
      return;
    }
  };

  componentDidMount() {
    this.getHistory();
  }
  render() {
    return (
      <Layout title="history">
        <div className={css.wrapper}>
          <Navbar />
          <Navigasi />
          <div className={css.content}>
            <p className={css}>Transaction History</p>
            <select className="form-select" aria-label="Default select example" name="filter" onChange={this.formChange}>
              <option selected>-- Select Filter --</option>
              <option value="WEEK">Week</option>
              <option value="MONTH">Month</option>
              <option value="YEAR">Year</option>
            </select>
            {this.state.history.length > 0 ? (
              this.state.history.map((val) => {
                return (
                  <div className={css.card} key={val.id}>
                    <div className={css.image}>
                      <Image src={Default} alt="foto profile" width={60} height={60} />
                    </div>
                    <p className={css.name}>{val.fullName}</p>
                    <p className={css.type}>{val.type}</p>
                    <p className={val.type == "topup" ? css.money : css.other}>{val.type == "topup" || val.type == "accept" ? `+ Rp ${val.amount}` : `- Rp ${val.amount}`}</p>
                  </div>
                );
              })
            ) : (
              <p className={css.zeroHistory}> Lets Make A Transaction</p>
            )}
            {this.state.history.length > 0 ? (
              <div className={css["button-container"]}>
                <button className="btn btn-light" onClick={this.PrevPage}>
                  Prev
                </button>
                <button className="btn btn-light" onClick={this.NextPage}>
                  Next
                </button>
              </div>
            ) : null}
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

export default withRouter(connect(mapStateToProps)(index));
