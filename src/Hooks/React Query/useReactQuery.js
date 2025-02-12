import { useQuery } from "@tanstack/react-query"
import { fetchuser } from "../../API/functions/fetchuser"


export const useFetchProductQuery = ()=>{
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchuser,
    })
}