const search = () => {
    const location = document.querySelector("#location").value.trim()
    const myLocation = document.querySelector("#myLocation").checked
    const radius = document.querySelector("#radius").value
    
    const splitRadius = radius.split(" ")
    console.log(splitRadius)

    if (location || myLocation && radius) {
        if (myLocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const long = position.coords.longitude
                const lat = position.coords.latitude
                fetch(`/api/tickets?lat=${lat}&long=${long}&radius=${splitRadius[0]}`)
            })
        }
    }
}

document.querySelector("#searchBtn").addEventListener("click", search)