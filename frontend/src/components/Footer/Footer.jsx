import React from 'react';
import footer_logo from '../../assets/logo_big.png';
import instagram_icon from '../../assets/instagram_icon.png';
import pintester_icon from '../../assets/pintester_icon.png';
import whatsapp_icon from '../../assets/whatsapp_icon.png';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__logo">
                <img src={footer_logo} alt="" />
                <p>BuyOrCry</p>
            </div>
            <div className="footer__social">
                <div>
                    <img src={instagram_icon} alt="" />
                </div>
                <div>
                    <img src={pintester_icon} alt="" />
                </div>
                <div>
                    <img src={whatsapp_icon} alt="" />
                </div>
            </div>
            <div className="footer__copyright">
                <hr />
                <p>Copyright @ 2025 - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer;