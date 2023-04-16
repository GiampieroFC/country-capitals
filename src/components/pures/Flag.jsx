import Image from "react-bootstrap/Image";

function Flag({ flag }) {
    return (
        <>
            <Image height={200} src={flag} thumbnail />
        </>
    )
}

export default Flag