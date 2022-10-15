import WhiteCamaleon from "../images/white_camaleon.png"
      
const GetStarted = () => {
    
    return (
        <div className="footer">
            <img className="footer-camaleon" src={WhiteCamaleon} alt="Footer logo" />
            <div className="content">   
                <h1>Get started in seconds</h1>
                <ol>
                    <li> Download our installer. </li>
                    <li> Register your cameras. </li>
                    <li> Access cameras all around the world. </li>
                </ol>
            </div>
        </div>
    );
};

export default GetStarted;
