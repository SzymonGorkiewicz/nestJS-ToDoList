import Navbar from "@/app/_components/navbar"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

interface List {
    id: number;
    name: string;
    description: string;
}

export default function ListViewForm(){
    const searchParams = useSearchParams();

    const [listDetails, setListDetails] = useState<List | null>(null);
    
    useEffect(()=>{
        const listParam = searchParams.get("list")
        if (listParam) {
            const parsedList = JSON.parse(decodeURIComponent(listParam));
            setListDetails(parsedList);
        }
    }, [searchParams])

    return(
        <>
            <Navbar />
            <p>List Details</p>
            {listDetails ? (
                <div>
                    <h2>{listDetails.name}</h2>
                    <p>{listDetails.description}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}