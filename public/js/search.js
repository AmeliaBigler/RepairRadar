const search = () => {
    const location = document.querySelector("#location").value.trim()
    const myLocation = document.querySelector("#myLocation").checked
    const radius = document.querySelector("#radius").value

    const splitRadius = radius.split(" ")

    if (location || myLocation && radius) {
        if (myLocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const long = position.coords.longitude
                const lat = position.coords.latitude
                window.location.href = `/api/tickets?lat=${lat}&long=${long}&radius=${splitRadius[0]}`
            })
        } else {
            var urlLocation = location.replace(/,| /g, (match) => {
                if (match === ',') {
                    return '%2C';
                } else if (match === ' ') {
                    return '+';
                }
            })
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${urlLocation}&key=6826002497534cd499241452b38d6c7d`)
                .then((response) => response.json())
                .then((data) => console.log(data))
        }
    }
}


document.querySelector("#searchBtn").addEventListener("click", search)