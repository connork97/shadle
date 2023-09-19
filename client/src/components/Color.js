import styles from './Color.module.css';

import React, { useRef, useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import KUTE, { fromTo } from 'kute.js'
const Color = ({ colorOfTheDay, rgbColorOfTheDay }) => {

    const colorDivRef = useRef(null)

    useEffect(() => {
        if (colorDivRef.current) {
        //   const backgroundColor = window.getComputedStyle(colorDivRef.current).backgroundColor;
        //   console.log('Background color:', backgroundColor);
            // console.log("Color of the Day: ", colorOfTheDay)
        }
    }, [colorOfTheDay]);

    const colorOfTheDayStyle ={
        backgroundColor: `rgb(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]})`
    }
    // const blob1Path = "M156.4 -148.4C204.4 -108.4 246.2 -54.2 250.6 4.4C254.9 62.9 221.9 125.9 173.9 159.4C125.9 192.9 62.9 196.9 -3.9 200.8C-70.7 204.7 -141.4 208.4 -166.4 174.9C-191.4 141.4 -170.7 70.7 -160.5 10.3C-150.2 -50.2 -150.4 -100.4 -125.4 -140.4C-100.4 -180.4 -50.2 -210.2 2 -212.2C54.2 -214.2 108.4 -188.4 156.4 -148.4";
    // const blob2Path = "M143.3 -175.8C167.9 -150.1 157.8 -88.1 164.8 -31.6C171.8 25 195.9 76 182.3 110.7C168.8 145.4 117.6 163.9 71.6 168.2C25.7 172.6 -15 162.9 -56.9 150.2C-98.7 137.6 -141.6 122.1 -158.9 91.8C-176.2 61.6 -167.8 16.7 -169.2 -39.3C-170.6 -95.4 -181.7 -162.6 -155.1 -187.9C-128.6 -213.2 -64.3 -196.6 -2.5 -193.7C59.4 -190.7 118.7 -201.5 143.3 -175.8";
    // const tween = KUTE.fromTo(
    //     '#blob2',
    //     {path: blob2Path},
    //     {path: blob1Path},
    //     {repeat: 999, duration: 3000, yoyo: true}
    // )
    
    // tween.start()
    // const [showBlob2, setShowBlob2] = useState(false);

    return (
        <div ref={colorDivRef} style={colorOfTheDayStyle} className={styles.mainColorDiv}>
            {/* <svg 
                xmlns="http://www.w3.org/2000/svg"
                id="visual"
                viewBox="0 0 900 600"
                width="900"
                height="600"
                version="1.1"
            >
                <g
                    transform="translate(413.644488698942 304.5191967903834)"
                    style={{visibility: "hidden"}}
                >
                    <path
                        id="blob1"
                        d="M156.4 -148.4C204.4 -108.4 246.2 -54.2 250.6 4.4C254.9 62.9 221.9 125.9 173.9 159.4C125.9 192.9 62.9 196.9 -3.9 200.8C-70.7 204.7 -141.4 208.4 -166.4 174.9C-191.4 141.4 -170.7 70.7 -160.5 10.3C-150.2 -50.2 -150.4 -100.4 -125.4 -140.4C-100.4 -180.4 -50.2 -210.2 2 -212.2C54.2 -214.2 108.4 -188.4 156.4 -148.4"
                        fill={colorOfTheDayStyle.backgroundColor}>
                    </path>
                </g>
                <g 
                    transform="translate(443.1461811914528 316.22386659491775)"
                >
                    <path 
                        id="blob2"
                        d="M143.3 -175.8C167.9 -150.1 157.8 -88.1 164.8 -31.6C171.8 25 195.9 76 182.3 110.7C168.8 145.4 117.6 163.9 71.6 168.2C25.7 172.6 -15 162.9 -56.9 150.2C-98.7 137.6 -141.6 122.1 -158.9 91.8C-176.2 61.6 -167.8 16.7 -169.2 -39.3C-170.6 -95.4 -181.7 -162.6 -155.1 -187.9C-128.6 -213.2 -64.3 -196.6 -2.5 -193.7C59.4 -190.7 118.7 -201.5 143.3 -175.8"
                        fill={colorOfTheDayStyle.backgroundColor}>
                    </path>
                </g>
            </svg> */}
        </div>
    )
};

export default Color;