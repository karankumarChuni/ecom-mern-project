import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
<footer>
  <div className="footer1">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="footer-main">
            <div className="footer-box">
              <div className="footer-title mobile-title">
                <h5>about</h5>
              </div>
              <div className="footer-contant">
                <div className="footer-logo">
                  <NavLink href="/Home">
                    <img src={`${process.env.PUBLIC_URL}/images/Ecomus.svg`} className="maxwidthlogo" alt="logo" />
                  </NavLink>
                </div>
                {/* <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.</p> */}
                <ul className="paymant">
                  <li>
                    <a href="#"><img src={`${process.env.PUBLIC_URL}/images/checkout/1.png`} className="img-fluid" alt="pay" /></a>
                  </li>
                  <li>
                    <a href="#"><img src={`${process.env.PUBLIC_URL}/images/checkout/2.png`} className="img-fluid" alt="pay" /></a>
                  </li>
                  <li>
                    <a href="#"><img src={`${process.env.PUBLIC_URL}/images/checkout/3.png`} className="img-fluid" alt="pay" /></a>
                  </li>
                  <li>
                    <a href="#"><img src={`${process.env.PUBLIC_URL}/images/checkout/4.png`} className="img-fluid" alt="pay" /></a>
                  </li>
                  <li>
                    <a href="#"><img src={`${process.env.PUBLIC_URL}/images/checkout/1.png`} className="img-fluid" alt="pay" /></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-box">
              <div className="footer-title">
                <h5>INFORMATION</h5>
              </div>
              <div className="footer-contant">
                <ul>
                  <li><NavLink to="/about">About Us</NavLink></li>
                  <li><NavLink to="/contact">Contact Us</NavLink></li>
                  <li><NavLink to="/privacypolicy">Privacy Policy</NavLink></li>
                  <li><NavLink to="/termsconditions">Terms & Conditions</NavLink></li>
                  {/* <li>Follow &amp; exchanges</li> */}
                  {/* <li><a href="javascript:void(0)">terms &amp; conditions</a></li>
                        <li><a href="javascript:void(0)">returns &amp; exchanges</a></li>
                     <li><a href="javascript:void(0)">shipping &amp; delivery</a></li> */}
                </ul>
              </div>
            </div>
            <div className="footer-box">
              <div className="footer-title">
                <h5>contact us</h5>
              </div>
              <div className="footer-contant">
                <ul className="contact-list">
                  <li>
                    <i className="fa fa-map-marker" />J - 34/A, 3rd Floor,
                    Lajpat Nagar - II, <br />
                    New Delhi -<span>110024</span>
                  </li>
                  {/*<li><i class="fa fa-phone"></i>call us: <span>123-456-7898</span></li>*/}
                  <li>
                    <i className="fa fa-envelope-o" />email us:
                    support@oneup.com
                  </li>
                  {/*<li><i class="fa fa-fax"></i>fax <span>123456</span></li>*/}
                  {/* <li>
                    <div style={{display: 'flex', gap: 6, position: 'relative', alignItems: 'center'}}>
                      <span> Follow us: </span>
                      <div style={{display: 'flex', gap: 5}}>
                        <a href="https://www.facebook.com/oneuptrade/" style={{position: 'relative', background: '#4150b5', borderRadius: '50%', color: '"white"', padding: '7px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><i style={{position: 'relative', color: 'white'}} className="fa-brands fa-facebook-f" /></a>
                        <a href="https://www.linkedin.com/company/oneuptrade/" style={{position: 'relative', background: '#4150b5', borderRadius: '50%', color: '"white"', padding: '7px 6px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <i style={{position: 'relative', color: 'white'}} className="fa-brands fa-linkedin" /></a>
                        <a href="javascript:void(0)" style={{position: 'relative', background: '#4150b5', borderRadius: '50%', color: '"white"', padding: '7px 7px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><i style={{position: 'relative', color: 'white'}} className="fa-brands fa-youtube" />
                        </a><a href="https://www.instagram.com/oneuptrade/" style={{position: 'relative', background: '#4150b5', borderRadius: '50%', color: '"white"', padding: '7px 7px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><i style={{position: 'relative', color: 'white'}} className="fa-brands fa-instagram" /></a>
                      </div>
                    </div>
                  </li> */}

<li>
                    <div style={{ gap: 6, position: 'relative', alignItems: 'center'}}>
                      <span style={{color:'#000000',fontSize:'18px'}}> Follow us: </span>
                      <br />
                      <br />
                      <div style={{display: 'flex', gap: 10}}>
                        <a href="https://www.facebook.com/oneuptrade/" style={{position: 'relative', background: 'white',border:'2px #059fe2 solid ',   borderRadius: '50%', color: '"white"', padding: '7px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><i style={{position: 'relative', color: '#059fe2'}} className="fa-brands fa-facebook-f" /></a>
                        <a href="https://www.linkedin.com/company/oneuptrade/" style={{position: 'relative', background: 'white',border:'2px #059fe2 solid ',   borderRadius: '50%', color: '"white"', padding: '7px 8px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><i style={{position: 'relative', color: '#059fe2'}} className="fa-brands fa-linkedin" /></a>
                        <a href="javascript:void(0)" style={{position: 'relative', background: 'white',border:'2px #059fe2 solid ',borderRadius: '50%', color: '"#059fe2"', padding: '7px 7px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><i style={{position: 'relative', color: '#059fe2'}} className="fa-brands fa-youtube" />
                        </a><a href="https://www.instagram.com/oneuptrade/" style={{position: 'relative',background: 'white',border:'2px #059fe2 solid ', borderRadius: '50%', color: '"white"', padding: '7px 8px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><i style={{position: 'relative', color: '#059fe2'}} className="fa-brands fa-instagram" /></a>
                        {/* <a href="javascript:void(0)"  style="
                            position: relative;
                            background: #4150b5;
                            border-radius: 50%;
                            color:'white';
                            padding: 7px 7px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          "
                        ><i
                          style="
                            position: relative;
                            color: white;
                          "
                          class="fa fa-rss"
                        ></i
                      ></a> */}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-box">
              <div className="footer-title">
                <h5>Newsletter</h5>
              </div>
              <div className="footer-contant">
                <div className="newsletter-second bottomspace">
                  <div className="form-group">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="enter full name" />
                      <span className="input-group-text"><i className="fa-solid fa-user" /></span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="enter email address" />
                      <span className="input-group-text"><i className="fa-solid fa-envelope" /></span>
                    </div>
                  </div>
                  <div className="form-group mb-0">
                    <a href="javascript:void(0)" className="btn btn-solid btn-sm">Submit Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>


  )
}

export default Footer