import { axiosinstance } from "../axiosinstance/axiosinstance";
import { endpoints } from "../endpoints/endpoints";

export const fetchuser = async()=>{
    try {

        const {data} = await axiosinstance.get(endpoints.users);
        return data.data;
        
    } catch (error) {
        console.log(error);
    }
}