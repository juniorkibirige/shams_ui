async function geoLocker() {
    var dat = ''
    function success(position) {
        const latitude = 0.3064550
        const longitude = 32.5166794
        const destlatitude = position.coords.latitude
        const destlongitude = position.coords.longitude
        $.ajax({
            url: '/api/distancematrix',
            data: {
                origins: latitude.toString().concat(','.concat(longitude.toString())),
                destinations: destlatitude.toString().concat(','.concat(destlongitude.toString())),
                key: 'PhV9W2v53R2g5Qn4EA1UMa4ipWP9k'
            },
            dataType: 'json',
            success: (e, tS, erro) => {
                let data = e
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const row = data[key];
                        for (const k in row) {
                            if (row.hasOwnProperty(k)) {
                                const element = row[k];
                                if (typeof element == 'object') {
                                    toast('Distance is: '.concat(element.elements[0]['distance'].text), true, 10000)
                                }
                            }
                        }
                    }
                }
                dat = JSON.stringify(data)
                setCookie('location_data', JSON.stringify(data), 0.125)
            },
            error: (xhr, tS, error) => {
                toast('Please try again!', true, 5000)
                dat = ''
            }
        })
    }

    function error() {
        var d = {
            "destination_addresses": [
                "Kyengera, Uganda"
            ],
            "origin_addresses": [
                "Kyengera, Uganda"
            ],
            "rows": [
                {
                    "elements": [
                        {
                            "distance": {
                                "text": "650 m",
                                "value": 0.650
                            },
                            "duration": {
                                "text": "1 min",
                                "value": 60
                            },
                            "status": "OK"
                        }
                    ]
                }
            ],
            "status": "OK"
        }
        toast('Failed to retrieve your location Please Try Again!', true, 3000)
        dat = JSON.stringify(d)
        setCookie('location_data', JSON.stringify(d), 0.125)
    }

    if (!navigator.geolocation) {
        toast('Location based services are not available in your browser!', true, 10000)
    } else {
        navigator.geolocation.getCurrentPosition(success, error)
        return dat
    }
}