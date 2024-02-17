import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiOutlineInstagram,
  AiFillLinkedin,
  AiOutlineTwitter,
  AiFillYoutube,
} from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="pt-5">
        <Container>
          <Row className="footerDark">
            <Col md={4} className="text-center block-7">
              <h3 className="footer-heading mb-4 fw-bold footerDark">
                About Us
              </h3>
              <p className="text-muted footerDark">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
                quae reiciendis distinctio voluptates sed dolorum excepturi iure
                eaque, aut unde.
              </p>
            </Col>
            <Col md={4} className="text-center">
              <h3 className="footer-heading mb-4 fw-bold footerDark">
                Quick Links
              </h3>
              <ul className="list-unstyled text-secondary">
                <li>
                  <a href="www.google.com">Supplements</a>
                </li>
                <li>
                  <a href="#">Vitamins</a>
                </li>
                <li>
                  <a href="#">Diet &amp; Nutrition</a>
                </li>
              </ul>
            </Col>
            <Col md={4} className="text-center">
              <h3 className="footer-heading mb-4 fw-bold footerDark">
                Contact Info
              </h3>
              <ul className="list-unstyled footerDark">
                <li className="address">
                  203 Fake St. Mountain View, San Francisco, California, USA
                </li>
                <li className="phone">
                  <a href="tel://23923929210">+2 392 3929 210</a>
                </li>
                <li className="email">emailaddress@domain.com</li>
              </ul>
            </Col>
          </Row>
          <Row className="pt-5 text-center">
            <Col md={12}>
              <p></p>
              <Col
                md={12}
                className="text-center iconBgColor mb-2 footerDark h4"
              >
                <AiOutlineInstagram />
                &nbsp;
                <FaFacebook />
                &nbsp;
                <AiFillLinkedin />
                &nbsp;
                <AiOutlineTwitter />
                &nbsp;
                <AiFillYoutube />
              </Col>
              <Col
                md={12}
                className="text-center bghovertext text-secondary footerDark"
              >
                Copyright © 2022. All rights reserved | this is a sample text
              </Col>
              <p></p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
