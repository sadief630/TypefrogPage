import React from "react";
import './Footer.css';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div
                        style={{
                            background: '#00b140',
                            height: '4px',
                        }}
                    />
                    <div
                        style={{
                            height: '20px',
                        }}
                    />
                    <div className="row">
                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="/about">About Us</a></li>
                                {/* <li><a href="/">Usage Rights</a></li>
                                <li><a href="/">Privacy Policy</a></li> */}
                                <li><a href="/contact">Feedback</a></li>
                                <li><a href="https://github.com/The-Trainers/TypeFrog">Our GitHub</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Support</h4>
                            <ul>
                                <li><a href="/faq">FAQ</a></li>
                                {/* <li><a href="/">How To Use</a></li> */}
                                <li><a href="/bugreport">Submit a Bug</a></li>
                                <li><a href="/contact">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Online Shop</h4>
                            <ul>
                                <li><a href="/merch">Merchandise</a></li>
                                <li><a href="https://www.homedepot.com/s/frog?NCNI-5">Non-Affiliated Products</a></li>
                                <li><a href="https://www.backwaterreptiles.com/tree-frogs-for-sale.html">Mascot Shop</a></li>
                                {/* <li><a href="/shop">FrogShop</a></li> */}
                                {/* <li><a href="/">Shop Policy</a></li> */}
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Founders</h4>
                            <ul>
                                <li><a href="https://github.com/Supercoop03">Ethan C.</a></li>
                                <li><a href="https://github.com/bdoyle125">Bryce D.</a></li>
                                <li><a href="https://github.com/C-Feldt">Calvin F.</a></li>
                                <li><a href="https://github.com/sadief630">Sadie F.</a></li>
                                <li><a href="https://github.com/ALeonard2024">Andrew L.</a></li>
                                <li><a href="https://github.com/jmatherne65">James M.</a></li>
                            </ul>
                        </div>
                        {/* <div class="footer-col">
                            <h4>Follow Us</h4>
                            <div class="social-links">
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fab fa-github"></i></a>
                            </div>
                        </div> */}
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
