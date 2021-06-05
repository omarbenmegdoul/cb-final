import React, { useMemo } from 'react';
import styled from 'styled-components';



let allowStaging = false;
const beginStaging = (ev) => {
  ev.preventDefault();
    console.log("Begin staging");
    allowStaging = true;
}
const stopStaging = (ev) => {
  ev.preventDefault();
  if (!allowStaging) {return;}
  console.log("commit")
  allowStaging = false;
}

const markHover = (ev)=>{
  ev.preventDefault();
  if (!allowStaging) {return;}
  ev.target.classList.add("selected")
  console.log(`❗ MapGrid.js:24 'ev' <${typeof ev}>`,ev);
  logElementCoords(ev)
}

const logElementCoords = (ev) => {
  
    ev.preventDefault();
    console.log(ev.target.id);
};

const MapGrid = ({ Props }) => {
    // const divArray = useMemo(()=>
    //     (new Array(300)).map((x) => {
    //         return (<div className="grid-slots"></div>);
    //     }),
    //     []
    // );
    // console.log(`❗ MapGrid.js:11 'divArray' <${typeof divArray}>`,divArray);

    const rows = new Array(30).fill(0);
    const columns = new Array(16).fill(0);

    // console.log(`❗ MapGrid.js:14 'myArr' <${typeof myArr}>`,myArr);
    return (
        <Wrapper onMouseDown={beginStaging} onMouseUp={stopStaging} onMouseLeave={stopStaging}>
            {rows.map((x, xIndex) => {
                return columns.map((y, yIndex) => {
                    return (
                        <div
                            id={`${xIndex}-${yIndex}`}
                            className="grid-slots"
                            onMouseLeave={markHover} onMouseEnter={markHover}
                        />
                    );
                });
            })}
        </Wrapper>
    );
};
const Wrapper = styled.div`
    position: relative;
    width: 320px;
    height: 600px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* background-color:#d3a; */

    & .grid-slots {
        width: calc(100% / 16);
        height: calc(100% / 30);
        /* border: 1px orange dotted; */
    }

    & .grid-slots:hover {
      border:2px #f0f dotted;
      border-radius:2px;
    }

    & .selected {
      background-color:rgba(255,0,255,0.3);
      transition:all 0.2 ease-out;
    }

    & .ol-map {
      position:relative;
      z-index:-1;
    }

`;

// selectionAnimation = styled.keyframes`
// 0% {
//   opacity:0;
//   transform:scale(1);
// }
// `
export default MapGrid;
