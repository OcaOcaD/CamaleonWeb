import Navbar from "./Navbar";
import Card from "./Card";

import Footer from "./Footer";

function Home() {
    return (
        <>
        <div className="camaleon">
            <Navbar />
            <div className="landing">
                <p className="landing-text">
                    Join the most popular decentralized camera network platform.
                </p>
                <div className="button-group-horizontal">
                    <button className="btn-camaleon-secondary">
                        {" "}
                        Click me{" "}
                    </button>
                </div>
                <div className="cards-wrapper">
                    <Card
                        quantity="8.9 million"
                        unit="Global cams"
                        color="#01A35C"
                        icon={<img className="card-icon" alt="hola"></img>}
                    />
                    <Card
                        quantity="8.9 million"
                        unit="Global cams"
                        color="#86B1C3"
                        icon={<img className="card-icon" alt="hola"></img>}
                    />
                    <Card
                        quantity="8.9 million"
                        unit="Global cams"
                        color="#C5AB4F"
                        icon={<img className="card-icon" alt="hola"></img>}
                    />
                </div>
            </div>
        </div>
        <Footer />
     
        </>
    );
    
}

export default Home;
