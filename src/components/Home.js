import Navbar from "./Navbar";
import Card from "./Card";

import Footer from "./Footer";
import CamIcon from "../images/icons/cam-icon.svg"
import NetIcon from "../images/icons/teamwork.svg"
import UsersIcon from "../images/icons/users-icon.svg"
import Github from "../images/icons/github.svg"
function Home() {
    return (
        <>
        <div className="camaleon">
            <Navbar />
            <div className="landing">
                <p className="landing-text">
                    Join the most popular decentralized camera network platform.
                </p>
                <p>See our github repos to get started</p>
                <div className="button-group-horizontal">
                    <button className="btn-camaleon-primary">
                        {" "}
                        Camaleon Server <img width="30" height="30" src={Github} alt="" />{" "}
                    </button>
                    <button className="btn-camaleon-secondary">
                        {" "}
                        Explore cameras <img width="30" height="30" src={Github} alt="" />{" "} 
                    </button>
                </div>
                <div className="cards-wrapper">
                    <Card
                        quantity="8.9 million"
                        unit="Global cams"
                        color="#01A35C"
                        icon={<img src={CamIcon} className="card-icon" alt="x"></img>}
                    />
                    <Card
                        quantity=".0000042 million"
                        unit="Average users"
                        color="#86B1C3"
                        icon={<img src={UsersIcon} className="card-icon" alt="x"></img>}
                    />
                    <Card
                        quantity="3"
                        unit="Collaborators"
                        color="#C5AB4F"
                        icon={<img src={NetIcon} className="card-icon" alt="x"></img>}
                    />
                </div>
            </div>
        </div>
        <Footer />
     
        </>
    );
    
}

export default Home;
