import api from "../config/api";


export const postWatermarkedImage = (form) => {
    return api.post('create-watermarked-image',form,{
        headers:{ "Content-Type": "multipart/form-data" }
    })
}

