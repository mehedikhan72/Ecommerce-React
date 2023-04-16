// Get the available sizes from the db and let the user choose one

import React, { useState, useEffect } from "react";
import axios from "../axios/AxiosSetup";
import Select from "react-dropdown-select";

export default function Size(props) {
    const productId = props.productId;
    const [sizes, setSizes] = useState([]);

    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const getSizes = async () => {
            try {
                const response = await axios.get(`get_available_sizes/${productId}/`);
                setSizes(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        getSizes();

    }, [productId]);

    return (
        // TODO: BUG, when page entirely reloads, a size is selected and 
        // the menu is selected again, the entire DOM shifts a bit to the left.
        // Need to fix this.
        <div className="w-[300px]">
            <p className="ml-10 my-5 lg:ml-20 small-headings text-left">Size: {selectedSize ? selectedSize[0].size : "None"}</p>
            <Select className="mx-10 my-5 lg:mx-20 " options={sizes} labelField="size" valueField="size" onChange={(value) => setSelectedSize(value)} />
        </div>
    )
}
