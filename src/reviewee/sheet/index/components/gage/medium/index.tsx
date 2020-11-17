import { ArcGauge } from "@progress/kendo-react-gauges";
import React from "react"

type Props = {
    value: number
}

export const MediumGage = (props: Props)=>{
    const arcColors = [
        {
            to: 25,
            color: '#0058e9'
        }, {
            from: 25,
            to: 50,
            color: '#f31700'
        }, {
            from: 50,
            to: 75,
            color: '#ffc000'
        }, {
            to: 75,
            color: '#00ffff'
        }, {
            to: 100,
            color: '#7fff00'
        }
    ];
    
    return <ArcGauge
        {...{
            value: props.value,
            colors: arcColors
        }} style={{
            width: '150px',
            height: '150px',
            display: 'inline-block'
        }} 
    />
}