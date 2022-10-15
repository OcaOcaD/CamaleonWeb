import React, { useRef, useEffect, useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import frontYard from "../images/front yard.jpg";
import "./../App.css";
import axios from "axios"
import { Link, useParams } from "react-router-dom";
import ReactHlsPlayer from 'react-hls-player';

import data from "../data.json";
function Camaleon() {
    const [userCams, setUserCams] = useState([]);
    const [user, setUser] = useState(false);
    const [cam, setCam] = useState(false);

    let { camId } = useParams();
    const [stream, setStream] = useState(false)

    useEffect(() => {
        console.log("USING EFFECT");
        /// Pedir el link
        axios({
            method: "get",
            url: "http://25.6.200.193:8080/cameras",
           
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
        for (const f of data.features) {
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
    useEffect(() => {
        console.log("USING EFFECT");
        console.log("PARAMS", camId);
        getUserIdByCam(camId)
        // filterByUser();
    }, []);
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
                                                        <Link to={`./${cam.properties.user_id}`}>
                                                            Take a look
                                                        </Link>
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
                                <Col lg={2}>TITULO</Col>
                                <Col lg={2}>(Uruapan 69, Mexican, Loki)</Col>
                            </Row>
                            <Row className="pt-5">
                            <ReactHlsPlayer
                                src={stream}
                                autoPlay={false}
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
