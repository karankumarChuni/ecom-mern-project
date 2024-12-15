import Footer from "../../components/Footer";
import "../../css/login.css";
import { useRef } from "react";
import Loginsection from "./Loginsection";
import Registersection from "./Registersection";
import Header from "../../components/Header/Header";
const Login = () => {
  const ctl = useRef(null);
  const vtl = useRef(null);
  return (
    <>
      <Header />
      <section
        className="login-page bg-body marginfromtop"
        style={{ width: "100%" }}
      >
        <div
          className="container"
          style={{
            background: "white",
            marginTop: "50px",
            paddingBottom: "76px",
          }}
        >
          <div className="row align-items-center g-5 pt-5">
            <div className="col-lg-6 offset-md-3">
              <div className="container newpadding hidepadding">
                <div className="card p-1 " style={{ border: "none" }}>
                  <img
                    src="./images/login-logo.png"
                    className="login-tabs-img"
                    alt
                  />
                  <nav>
                    <div
                      className="nav nav-tabs "
                      style={{ justifyContent: "center" }}
                      id="nav-tab"
                      role="tablist"
                    >
                      <button
                        className="nav-link active"
                        id="nav-home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-home"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                        ref={ctl}
                      >
                        Login
                      </button>
                      <button
                        className="nav-link"
                        id="nav-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-profile"
                        type="button"
                        role="tab"
                        ref={vtl}
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        Register
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content p-2 " id="nav-tabContent">
                    <div
                      className="tab-pane fade active show"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <Loginsection />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <Registersection />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
export default Login;
