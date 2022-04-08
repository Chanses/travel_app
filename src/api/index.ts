import axios from "axios"

export const getPlacesData = async (type: string, sw: any, ne: any) => {
    try{
        const {data: places} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
         bl_latitude: sw.lat,
         tr_latitude: ne.lat,
         bl_longitude: sw.lng,
         tr_longitude: ne.lng,
       },
       headers: {
         'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
         'X-RapidAPI-Key': '37df9f891fmshd52cb97324c15b6p102306jsn4a88c1a6868a'
       }
     })
        return places;
    }
    catch(error){
        console.log(error)

    }
}