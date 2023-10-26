export const CamTable = (props) => {
    return (
        <table className="table ">
        <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Option</th>
            </tr>
        </thead>
        <tbody>
            {props.userCams.map((cam, index) => (
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
    )
}
export default CamTable