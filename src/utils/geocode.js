const request=require('request')

const geocode = (address, callback) => {
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibGFiZWViMDIiLCJhIjoiY2t5YnhnbHd6MGRuYjJvcGljejc5Z2t0eCJ9.Po2dxGUm_ba17vJufJ1QkQ&limit=1'

    request({url,json:true}, (error , {body}) => {
        if(error)
        {
            callback('Unable to connect to weather service!')
        }
        else if(body.message || body.features.length === 0)
        {
            callback('Unable To find Location! Please try another search.')
        }
        else
        {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode