import React from "react"

function setBackgroundColor(color) {
    React.useEffect(() => {
        document.body.style.backgroundColor = color;
    }, []);
}

export default setBackgroundColor;