import * as React from 'react';
import axios from "axios";
import useSwr from "swr";

export default function (){
    const fetcher = async (url) => {
        const resp = await axios.get(url);

        return resp.data;
    };

    const {
        data = [],
    }  = useSwr('/api/', fetcher);

    return (
        <div>
            counter : {data.length}
        </div>
    )
}
