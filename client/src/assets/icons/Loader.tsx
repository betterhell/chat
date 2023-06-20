import React from 'react';
import {Triangle} from "react-loader-spinner";

interface LoaderProps {
    width?: string,
    height?: string,
    color?: string
}

const Loader: React.FC<LoaderProps> = ({width = "40", color = "#4fa94d", height = "40"}) => {
    return <Triangle
        height={height}
        width={width}
        color={color}
        ariaLabel="triangle-loading"
        visible={true}
    />
};

export default Loader;