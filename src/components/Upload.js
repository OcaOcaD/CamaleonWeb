import React, { useRef, useState } from "react";
import Navbar from "./Navbar";

const Upload = ({ icon, unit, quantity, color }) => {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = () => {
		const formData = new FormData();

		formData.append('file', selectedFile);
        console.log("Sending... ->", selectedFile)
        console.log("formData... ->", formData)
        const url = window.location.protocol + "//" + window.location.hostname+":8080/upload"
		fetch(
			url,
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => {
                console.log("IMAGE RESPONSE:", response)
            })
			
			.catch((error) => {
				console.error('Error:', error);
			});
	};

    return (
        <div className=''>
            <Navbar />
            <br />
            <br />
            <div className="container">
                <input type="file" name="file" onChange={changeHandler} />
                {isSelected ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{" "}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p>Select a photo to look for the person</p>
                )}
                <div>
                    <button onClick={handleSubmission}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default Upload;
