import axiosInstance from "./api-client"


// Get user profile
export const fetchLoggedProfile = async(token: string) => {
    try{
        const {data, status} = await axiosInstance.get('/user-management/profile/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      }})
        if (status === 200) {
            return data
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
        return false
    }

}


export const fetchCampusesList = async(token: string) => {
    try{
        const {data, status} = await axiosInstance.get('/user-management/campuses/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      }})
        if (status === 200) {
            return data
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
        return false
    }


}

