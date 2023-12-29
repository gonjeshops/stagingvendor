import { fetchStats } from "@/componentsB2b/Api2"
import { useEffect, useState } from "react"

export const fetchStatss = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchStats()
                console.log('fetchStats', res)
                if (res?.status === 200) {
                    console.log('fetchStats data ===', res?.data);
                    setData(res?.data)
                  }else {
                    console.log('fetchStatsApi Error res===', res);
                  }
            } catch (error) {
                console.log('fetchStats catch error', error)
            } 
        }
        fetchData()
    }, [])


  return {data} 
}
