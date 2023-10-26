import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import CamTable from "./CamTable";
import { Col, Container, Row } from "react-bootstrap";
import "./../App.css";
import axios from "axios"
import { useParams } from "react-router-dom";
import VideoJS from "./VideoJS";

// import data from "../data.json";

function Camaleon() {
    const [userCams, setUserCams] = useState([]);
    const [user, setUser] = useState(false);
    const [cam, setCam] = useState(false);

    let { camId } = useParams();
    const [stream, setStream] = useState(false)
    
    const [address, setAddress] = useState(false)

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        muted: true,
        fluid: true,
        sources: [{
          src: stream,
          type: 'application/x-mpegURL'
        }]
      };
      

    useEffect(()=>{
        if( cam && cam !== false ){

            const cam_lon = cam.geometry.coordinates[0]
            const cam_lat = cam.geometry.coordinates[1]
            axios({
                method: "get",
                url: `https://api.geoapify.com/v1/geocode/reverse?lat=${cam_lat}&lon=${cam_lon}&apiKey=ccc1a9ed9248407dbd15f003db303765`, 
            })
                .then(response => {
                    const aux_address = response.data.features[0].properties.address_line1 + ", " + response.data.features[0].properties.address_line2
                    setAddress(aux_address)
                })
                
                .catch(error => console.log('error', error));
        }
    },[cam])

    // // Getting the json data START
    const [data, setData] = useState(false)

    useEffect(() => {
        const url = window.location.protocol + "//" + window.location.hostname+":8080/location-all"
        
        axios({
            method: "get",
            url:  url,
        })
            .then(function (response) {
                setData( response.data )
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        console.log("Data:", data)
    },[data])
    // Getting the json data END


    useEffect(() => {
        const url = window.location.protocol + "//" + window.location.hostname+":8080/cameras"
        console.log("URL built:", url)
        axios({
            method: "get",
            url: url,
           
        })
            .then(function (response) {
                console.log(response);
                setStream( response.data.cameras[0] )
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const playerRef = React.useRef(null);

    // We can handle player events here, like ready, waiting and dispose
    const handlePlayerReady = (player) => {
        playerRef.current = player;
        player.on('dispose', () => {
          console.log('player will dispose');
        });

      };

    const filterByUser = () => {

        let features = [];
        
        if(user && user.user_id){
            for (const f of data.features) {
                if (f.properties.user_id === user.user_id) {
                    features.push(f);
                }
            }
        }
        setUserCams(features);
    };
    const getUserIdByCam = (camId) => {
        if( data && data !== false ){
            for (const f of data.features) {
                console.log("The f properties:", f.properties)
                if (f.properties.id === camId) {
                    setCam(f)
                    setUser({
                        "user_id": f.properties.user_id,
                        "user_name": f.properties.user
                    })
                }else{
                    console.log("NO")
                }
            }
        }
    }
    useEffect(() => {
        getUserIdByCam(camId)
    }, [data]);
    useEffect(() => {
        filterByUser()
    }, [user]);
    useEffect(() => {
        console.log("cams:", userCams);
    }, [userCams]);
    useEffect(() => {
        console.log("stream:", stream);
    }, [stream]);
    return (
        <>
            <div className="camaleon">
                <Navbar />
                <Container fluid>
                    <Row className="p-5">
                        <Col className="text-dark">
                            <label className="cam-header">
                                {user.user_name}{" "}
                                <span className="text-success">
                                    {" "}
                                    {userCams.length} Avaliable Camera(s)
                                </span>
                            </label>
                            <Row className="justify-content-md-center pt-5">
                                <Col
                                    className="justify-content-md-center"
                                    lg={12}
                                >
                                    <Row className="">
                                        {
                                            (userCams && userCams !== false)
                                            ?<CamTable userCams={userCams}></CamTable>
                                            :<p>Cargando...</p>
                                        }
                                        
                                    </Row>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-start pt-5">
                                {
                                (cam && cam !== false)?
                                <>
                                <Col lg={2}>{cam.properties.title } </Col>
                                <Col lg={2}> {address} </Col>
                                </>
                                :
                                <p>Cargando...</p>
                                }
                            </Row>
                            <Row className="pt-5">
                                <Col>
                                {
                                        (stream && stream !== false)
                                        ?<VideoJS options={videoJsOptions} onReady={handlePlayerReady}></VideoJS>   
                                        :<p>Cargando stream...</p>
                                }      
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Camaleon;
