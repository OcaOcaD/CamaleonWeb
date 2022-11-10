import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios"

const Found = () => {
    
    const [records, setRecords] = useState(false);
    const [addresses, setAddresses] = useState(false);
    useEffect(()=>{

        let array_addresses = []
        if( records && records != false ){
            for (const r of records) {
                
                axios({
                    method: "get",
                    url: `https://api.geoapify.com/v1/geocode/reverse?lat=${r[2]}&lon=${r[1]}&apiKey=ccc1a9ed9248407dbd15f003db303765`, 
                })
                    .then(response => {
                        console.log("ADDRESS RESULLT: ",response)
                        const aux_address = response.data.features[0].properties.address_line1 + ", " + response.data.features[0].properties.address_line2
                        console.log("The final address:", aux_address)
                        array_addresses.push(aux_address)
                        console.log("ARRRRRRAY", array_addresses)
                        setAddresses(array_addresses)
                    })
                    .catch(error => console.log('error', error));
    
            }
            //
            

        }

            
    },[records])

    useEffect(()=>{
        console.log("ADDRESSES CHANGED", addresses)
    },[addresses])

    useEffect(()=>{
        const url = window.location.protocol + "//" + window.location.hostname+":8080/found-faces"
        axios({
            method: "get",
            url:  url,
        })
            .then(function (response) {
                console.log("this one is for the champion", response);
                setRecords(response.data.records)
                
            })
            .catch(function (error) {
                console.log(error);
            });
    },[])



    return (
        <div className=''>
            <Navbar />
            <br />
            <br />
            <h1>Found faces</h1>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <td>
                                Found at IP
                            </td> 
                            <td>
                                Latitute
                            </td> 
                            <td>
                                Longitude
                            </td> 
                            <td>
                                Address
                            </td> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (records && records != false )?
                            <>
                            {(records.map((r,index)=>(
                                <tr>
                                    <td>
                                        {records[index][0]}
                                    </td>
                                    <td>
                                        {records[index][2]}
                                    </td>
                                    <td>
                                        {records[index][1]}
                                    </td>
                                    <td>
                                        { addresses[index]  }
                                    </td>
                                </tr>

                            )))}
                            </>:
                            <p>No records</p>
                        }
                    </tbody>
                </table>
            
            </div>
        </div>
    );
};

export default Found;

