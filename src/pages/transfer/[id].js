import { Component } from "react";
import Navbar from "../../commons/components/Navbar";
import Navigasi from "../../commons/components/Navigasi";
import Layout from "../../commons/components/Layout";
import Footer from "../../commons/components/Footer";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import Default from "../../commons/images/dummy-profile.png";
import Image from "next/image";
import { Transfer } from "../../modules/transaction";
import { Modal } from "react-bootstrap";
import PinInput from "react-pin-input";
import { getUserById, verifyPin, GetUser } from "../../modules/auth";
import { bindActionCreators } from "redux";

import css from "../../commons/styles/transferId.module.css";
import { ImageComponent } from "../../commons/components/image";
import Loading from "../../commons/components/Loading";
import { saveAction } from "../../redux/actions/auth";

class TransferId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiverId: this.props.router.query.id,
      amount: 0,
      notes: "",
      isShow: false,
      isInput: false,
      isSuccess: false,
      user: {},
      getUserDone: false,
      IdTransaction: [],
      pin: 0,
      showErr: false,
      isError: 0,
      format: "",
      inputAmount: { amountValue: "", realAmount: "" },
      loading: false,
    };
    this.onError = this.onError.bind(this);
  }

  onError(ids) {
    this.setState({
      isErr: ids,
    });
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data, () => {
      console.log(this.state);
    });
  };

  userTransfer = () => {
    const token = this.props.token;
    const body = this.state;
    Transfer(body, token)
      .then((res) => {
        console.log(res.data.data);
        const { id } = res.data.data;
        this.checkPin(id);
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  getUser = () => {
    this.setState({ loading: true });
    const token = this.props.token;
    const id = this.state.receiverId;
    getUserById(id, token)
      .then((res) => {
        this.setState({ user: res.data.data });
        this.setState({ getUserDone: true });
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  onInput = () => {
    this.setState({ isInput: !this.state.isInput });
  };

  modalTriger = () => {
    this.setState({ isShow: !this.state.isShow });
  };

  componentDidMount() {
    this.getUser();
  }

  checkPin = (transactionId) => {
    this.setState({ loading: true });
    const token = this.props.token;
    const pin = this.state.pin;
    verifyPin(pin, token)
      .then((res) => {
        console.log(res.data);
        const { id } = res.data.data;
        GetUser(this.props.token, this.props.users.id)
          .then((result) => {
            this.setState({ loading: false });
            const data = result.data.data;
            this.props.setUsers(data);
            if (id == this.props.users.id) {
              this.props.router.push(`/history/${transactionId}`);
            }
            return;
          })
          .catch((errs) => {
            console.log(errs);
            this.setState({ loading: false });
          });
        return;
      })
      .catch((err) => {
        console.log("ERROR", err);
        this.setState({ loading: false });
        this.setState({ showErr: true });
      });
  };

  numberToRupiah = (bilangan) => {
    console.log("input numtorup", bilangan);
    let separator = "";
    let number_string = bilangan;
    if (typeof bilangan === "number") {
      number_string = bilangan.toString();
    }
    let sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    return rupiah;
  };

  onFocusPrice = (e) => {
    e.target.type = "number";
    e.target.value = this.state.format;
  };

  priceHandler = (e) => {
    const priceFormat = this.numberToRupiah(e.target.value);
    this.setState({
      inputAmount: {
        amountValue: priceFormat,
        realAmount: e.target.value,
      },
    });
    e.target.type = "text";
    e.target.value = `Rp. ${priceFormat}`;
    console.log("type priceformat:", priceFormat);
  };

  render() {
    const { router } = this.props;
    const { user } = this.state;
    const formater = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });
    return (
      <>
        {this.state.loading ? (
          <Loading />
        ) : (
          <Layout title="Transfer">
            <div className={css.wrapper}>
              <Navbar />
              <Navigasi />
              <div className={css.content}>
                {this.state.isSuccess == false ? (
                  <>
                    <p>Transfer Money</p>
                    {this.state.getUserDone == true ? (
                      <div className={css.userCard}>
                        <div className={css.cardImage}>
                          <ImageComponent image={user.image} height={70} width={70} />
                        </div>
                        <p className={css.cardName}>{user.firstName + " " + user.lastName}</p>
                        <p className={css.cardPhone}>{user.noTelp !== null ? user.noTelp : "___"}</p>
                      </div>
                    ) : null}
                    {this.state.isInput ? (
                      <>
                        <div className={css["inputdone-card"]}>
                          <p>Amount</p>
                          <p>{formater.format(this.state.amount)}</p>
                        </div>
                        <div className={css["inputdone-card"]}>
                          <p>Balance left</p>
                          <p>{formater.format(this.props.users.balance - this.state.amount)}</p>
                        </div>
                        <div className={css["inputdone-card"]}>
                          <p>Date And Time</p>
                          <p>{}</p>
                        </div>
                        <div className={css["inputdone-card"]}>
                          <p>Notes</p>
                          <p>{this.state.notes}</p>
                        </div>{" "}
                      </>
                    ) : (
                      <>
                        <h6>
                          Type the amount you want to transfer and then <br /> press continue to the next steps.
                        </h6>
                        <input
                          className={`form-control ${css.inputAmount} shadow-none`}
                          type="number"
                          name="amount"
                          placeholder="Input Money"
                          onChange={(e) => {
                            this.setState({ amount: e.target.value });
                            this.setState({ format: formater.format(e.target.value) });
                          }}
                          onBlur={(e) => {
                            this.priceHandler(e);
                          }}
                          onFocus={(e) => {
                            this.onFocusPrice(e);
                          }}
                          autoComplete="off"
                          autoFocus
                        ></input>
                        <p className={css.userSaldo}>{this.state.amount !== 0 ? formater.format(this.props.users.balance - this.state.amount) : formater.format(this.props.users.balance)}</p>
                        <input className={`form-control ${css.inputText} shadow-none`} type="text" name="notes" placeholder="Add some Notes" aria-label="default input example" onChange={this.formChange}></input>
                      </>
                    )}
                    <button className="btn btn-light" onClick={!this.state.isInput ? this.onInput : this.modalTriger}>
                      Confirm
                    </button>
                    <button
                      className="btn btn-light"
                      hidden={!this.state.isInput}
                      onClick={() => {
                        this.modalTriger();
                      }}
                    >
                      Confirm
                    </button>
                    <button className="btn btn-light" hidden={!this.state.isInput} onClick={this.onInput}>
                      Go Back
                    </button>
                  </>
                ) : null}
              </div>
              <Footer />
            </div>
            {/* MODAL */}
            <Modal show={this.state.isShow}>
              <Modal.Header>
                <p className={css.enterPin}>Enter Pin To Transfer</p>
                <button type="button" className={`btn-close ${css.btnClose}`} data-bs-dismiss="modal" aria-label="Close" onClick={this.modalTriger}></button>
              </Modal.Header>
              <Modal.Body>
                <p className={css.bodyText}>
                  Enter your 6 digits PIN for confirmation to <br /> continue transferring money.{" "}
                </p>
                <PinInput
                  length={6}
                  onChange={(e) => {
                    console.log(e);
                    this.setState({ pin: e });
                  }}
                  secret
                  initialValue="number"
                  type="numeric"
                  inputMode="number"
                  regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                  autoSelect={true}
                />
                <p className={css.wrongPin} hidden={!this.state.showErr}>
                  {" "}
                  Wrong PIN
                </p>
              </Modal.Body>
              <Modal.Footer>
                <button className={`btn btn-light ${css["modal-btn"]}`} onClick={this.userTransfer}>
                  Continue
                </button>
              </Modal.Footer>
            </Modal>
          </Layout>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
    token: state.auth.token,
  };
};

const mapDispatchToPropps = (dispacth) => {
  return {
    setUsers: bindActionCreators(saveAction, dispacth),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToPropps)(TransferId));
