import styles from './Color.module.css';

import React, { useRef, useEffect } from 'react';

const Color = ({ colorOfTheDay }) => {

    const colorDivRef = useRef(null)

    useEffect(() => {
        if (colorDivRef.current) {
        //   const backgroundColor = window.getComputedStyle(colorDivRef.current).backgroundColor;
        //   console.log('Background color:', backgroundColor);
            console.log("Color of the Day: ", colorOfTheDay)
        }
    }, [colorOfTheDay]);

    const colorOfTheDayStyle ={
        backgroundColor: `rgb(${colorOfTheDay[0]}, ${colorOfTheDay[1]}, ${colorOfTheDay[2]})`
    }

    return (
        <div ref={colorDivRef} style={colorOfTheDayStyle} className={styles.mainColorDiv}></div>
    )
};

export default Color;