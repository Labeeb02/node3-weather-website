const request = require('request')

// const url='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.96972,-1.8519?key=MPE9MEAXH9RPR5ZX48VYDZNRP&unitGroup=metric'//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/38.96972,-77.38519?key=MPE9MEAXH9RPR5ZX48VYDZNRP&unitGroup=metric

// request( {url: url,json: true}, (error,response) => {
    
//     if(error){
//         console.log('Unable to connect to weather service!')
//     }else if(typeof response.body === 'string') {
//         console.log('Unable To find Location!')
//     }
//     else{
//         console.log(response.body.days[0].description+' It is currently '+response.body.currentConditions.temp+ ' degrees out. There is a '+ (response.body.currentConditions.precipprob+0) + '% chance of rain ')
//     }
// })

 const forecast = ( latitude, longitude, callback) => {
    const url='https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+latitude+','+longitude+'?key=MPE9MEAXH9RPR5ZX48VYDZNRP&unitGroup=metric'

    request( {url,json:true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!')
        }else if(typeof body === 'string') {
            callback('Unable To find Location!')
        }
        else{
            callback(undefined,body.days[0].description+' It is currently '+body.currentConditions.temp+ ' degrees out and it feels like '+body.currentConditions.feelslike+'. The sunset timing was '+body.currentConditions.sunset+' with the sunrise timing as '+body.currentConditions.sunrise+'. There is a '+ (body.currentConditions.precipprob+0) + '% chance of rain ')
        }
    } )
 }

 module.exports=forecast