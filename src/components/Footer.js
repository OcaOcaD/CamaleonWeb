import WhiteCamaleon from "../images/white_camaleon.png"
      
const Footer = () => {
    
    return (
        <div className="footer">
            <img className="footer-camaleon" src={WhiteCamaleon} alt="Footer logo" />
            <div className="content">   
                <h1>Get started in seconds</h1>
            </div>
        </div>
    );
};

export default Footer;
