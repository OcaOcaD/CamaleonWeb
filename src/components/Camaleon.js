import React, { useRef, useEffect, useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import frontYard from "../images/front yard.jpg";
import "./../App.css";
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import ReactHlsPlayer from 'react-hls-player';

// import data from "../data.json";

function Camaleon() {
    const [userCams, setUserCams] = useState([]);
    const [user, setUser] = useState(false);
    const [cam, setCam] = useState(false);

    let { camId } = useParams();
    const [stream, setStream] = useState(false)
    
    const [address, setAddress] = useState(false)
    useEffect(()=>{
        if( cam && cam != false ){

            const cam_lon = cam.geometry.coordinates[0]
            const cam_lat = cam.geometry.coordinates[1]
            console.log("LaT:", cam_lat)
            console.log("Long:", cam_lon)
            axios({
                method: "get",
                url: `https://api.geoapify.com/v1/geocode/reverse?lat=${cam_lat}&lon=${cam_lon}&apiKey=ccc1a9ed9248407dbd15f003db303765`, 
            })
                .then(response => {
                    console.log("ADDRESS RESULLT: ",response)
                    const aux_address = response.data.features[0].properties.address_line1 + ", " + response.data.features[0].properties.address_line2
                    console.log("THe final address:", aux_address)
                    setAddress(aux_address)
                })
                
                .catch(error => console.log('error', error));
        }
    },[cam])

    // // Getting the json data START
    const [data, setData] = useState(false)

    useEffect(() => {
        console.log("GETTING JSON DATA");
        /// Pedir el link
        const url = window.location.protocol + "//" + window.location.hostname+":8080/location-all"
        
        axios({
            method: "get",
            url:  url,
        })
            .then(function (response) {
                console.log("this onw is for the champion", response);
                setData( response.data )
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        console.log("HOLA THIS IS THE DATA TA:", data)
        // console.log("HOLO THIS IS THE dota TA:", dota)
        
    },[data])
    // Getting the json data END


    useEffect(() => {
        console.log("USING EFFECT");
        /// Pedir el link
        const url = window.location.protocol + "//" + window.location.hostname+":8080/cameras"
        console.log("URL:", url)
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



    const filterByUser = () => {

        let features = [];
        // features = geoObject.features;
        console.log("THE USER to filter with: ", user);
        console.log("Object: ", data);
        console.log("Object 2: ", data.features);
        
        if(user && user.user_id){
            for (const f of data.features) {
            // console.log(
            //     "A camera f",
            //     typeof f.properties.user_id,
            //     f.properties.user_id,
            //     "and params id is:",
            //     userId,
            //     typeof userId
            // );
                if (f.properties.user_id === user.user_id) {
                    console.log("same");
                    features.push(f);
                }
            }
        }
        setUserCams(features);
        // setUser(features[0].properties.user);
    };
    const getUserIdByCam = (camId) => {
        if( data && data != false ){
            for (const f of data.features) {
                console.log("The f properties:", f.properties)
                if (f.properties.id === camId) {
                    // console.log("sí")
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
        console.log("USING EFFECT");
        console.log("PARAMS", camId);
        getUserIdByCam(camId)
        // filterByUser();
    }, [data]);
    useEffect(() => {
        console.log("User changed");
        filterByUser()
    }, [user]);
    useEffect(() => {
        console.log("cams:", userCams);
    }, [userCams]);
    useEffect(() => {
        console.log("STREAM IS", stream);
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
                            {/* <Col lg={1}> foto </Col> */}
                            <Row className="justify-content-md-center pt-5">
                                {/* <Col className='justify-content-md-center' lg={8}>
									asd
								</Col> */}
                                <Col
                                    className="justify-content-md-center"
                                    lg={12}
                                >
                                    <Row className="">
                                        <table className="table ">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Title</th>
                                                    <th>Option</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {userCams.map((cam, index) => (
                                                <tr key={"cam-available-"+index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {cam.properties.title}
                                                    </td>
                                                    <td>
                                                        {" "}
                                                        <a href={`http://${cam.properties.host}:3000/camaleon/${cam.properties.id}`}>
                                                            Take a look
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}

                                            </tbody>
                                        </table>
                                    </Row>

                                    {/* <Row
                                        md={10}
                                        className="pt-3 d-flex flex-row"
                                    >
                                        <Col>
                                            <Button className="rounded-0 text-dark bg-success border-success ">
                                                Nearby Cameras
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button className="rounded-0 text-success border-success bg-dark">
                                                Coverage Map
                                            </Button>
                                        </Col>
                                    </Row> */}
                                </Col>
                            </Row>
                            <Row className="justify-content-md-start pt-5">
                                {
                                (cam && cam != false)?
                                <>
                                <Col lg={2}>{cam.properties.title } </Col>
                                <Col lg={2}> {address} </Col>
                                </>
                                :
                                <p>Cargando...</p>
                                }
                            </Row>
                            <Row className="pt-5">
                            <ReactHlsPlayer
                                src={stream}
                                autoPlay={true}
                                controls={true}
                                width="100%"
                                height="auto"
                            />
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
