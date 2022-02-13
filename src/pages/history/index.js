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
import Link from "next/link";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "WEEK",
      history: [],
      page: 1,
      isError: false,
    };
    this.onError = this.onError.bind(this);
  }

  onError() {
    this.setState({
      isError: true,
    });
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data, () => {
      console.log(this.state);
    });
    const { router } = this.props;
    let { query } = this.props.router;
    console.log("QUERY FORM CHANGE", query);
    query = {
      ...query,
      page: data.page,
      filter: data.filter,
    };
    router.push(`/history?page=${query.page}&filter=${query.filter}`);
  };

  getHistory = () => {
    const token = this.props.token;
    const { router } = this.props;
    const { page, filter } = router.query;
    console.log("ROUTER QUERY", router.query);
    router.query = {
      page: this.state.page,
      filter: this.state.filter,
    };
    getAllHistory(filter, page, token)
      .then((res) => {
        console.log("RESPONSE", filter);
        this.setState({ history: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  NextPage = () => {
    const page = this.state.page;
    const { router } = this.props;
    let { query } = router;
    this.setState({ page: page + 1 });
    console.log("NEXT", page);
    query.page = page;
    router.push(`/history?page=${page}&filter=${query.filter}`);
    this.getHistory();
  };

  PrevPage = () => {
    const page = this.state.page;
    const { router } = this.props;
    let { query } = router;
    if (page >= 1) {
      this.setState({ page: page - 1 }, () => {
        console.log("PREV", page);
      });
    } else {
      return;
    }
    router.push(`/history?page=${page}&filter=${query.filter}`);
    this.getHistory();
  };

  clickOption = () => {
    this.getHistory();
  };

  componentDidMount() {
    const { router } = this.props;
    this.getHistory();
  }
  render() {
    const formater = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
    const { router } = this.props;
    console.log("STATE", this.state);
    console.log("QUERY", router.query.page);
    return (
      <Layout title="history">
        <div className={css.wrapper}>
          <Navbar />
          <Navigasi />
          <div className={css.content}>
            <p className={css}>Transaction History</p>
            <select
              className="form-select"
              aria-label="Default select example"
              name="filter"
              onChange={(e) => {
                console.log("ONCHANGE SELECT", e.target.value);
                this.setState({ filter: e.target.value }, () => {
                  router.push(`/history?page=${this.state.page}&filter=${this.state.filter}`);
                });
              }}
              defaultValue="WEEK"
            >
              <option selected>-- Select Filter --</option>
              <option value="WEEK" onClick={this.clickOption}>
                Week
              </option>
              <option value="MONTH" onClick={this.clickOption}>
                Month
              </option>
              <option value="YEAR" onClick={this.clickOption}>
                Year
              </option>
            </select>
            {this.state.history.length > 0 ? (
              this.state.history.map((val) => {
                return (
                  <div
                    className={css.card}
                    key={val.id}
                    onClick={() => {
                      this.props.router.push(`/history/${val.id}`);
                    }}
                  >
                    <div className={css.image}>
                      <Image onError={this.onError} src={this.state.isError ? Default : process.env.NEXT_PUBLIC_IMAGE + val.image} alt="foto profile" width={60} height={60} />
                    </div>
                    <p className={css.name}>{val.fullName}</p>
                    <p className={css.type}>{val.type}</p>
                    <p className={val.type == "topup" || val.type == "accept" ? css.money : css.other}>{val.type == "topup" || val.type == "accept" ? `+ ${formater.format(val.amount)}` : `- ${formater.format(val.amount)}`}</p>
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
