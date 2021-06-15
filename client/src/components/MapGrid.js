import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { subdivisionCenterFromChiPsiCoords } from '../utils';
import {
    CHI_SUBDIVISIONS,
    PSI_HOP_TL_BL,
    PSI_SUBDIVISIONS,
    toPrint,
} from '../constants';
import { toLonLat } from 'ol/proj';
import FilterContext from './Context/FilterContext';

const idToChiPsiCoords = (id) => {
    const coords = id.split('-');
    return subdivisionCenterFromChiPsiCoords(coords[0], coords[1]);
};

let allowStaging = false;
const beginStaging = (ev) => {
    ev.preventDefault();

    console.log('Begin staging');
    ev.target.classList.add('selected');
    allowStaging = true;
};
// const stopStaging = (ev) => {
//     ev.preventDefault();
//     if (!allowStaging) {
//         return;
//     }
//     console.log('commit');
//     allowStaging = false;
//     const SubDs = document.getElementById('map-grid-wrapper').childNodes;
//     const toggledSubDs = [...SubDs]
//         .filter((node) => {
//             return node.classList.contains('selected');
//         })
//         .map((node) => {
//            const [longitude,latitude] = toLonLat(idToChiPsiCoords(node.id))
//             return [latitude,longitude];
//         });
//     setSelectedSubdivisions(toggledSubDs)
// };

const markHover = (ev) => {
    ev.preventDefault();
    if (!allowStaging) {
        return;
    }
    ev.target.classList.add('selected'); //TODO: right mouse button for erase
    // console.log(`❗ MapGrid.js:24 'ev' <${typeof ev}>`, ev);
    logElementCoords(ev);
};

const logElementCoords = (ev) => {
    ev.preventDefault();
    console.log(ev.target.id);
};

const MapGrid = ({ Props }) => {
    // const [subdivisionData, setSubdivisionData] = React.useState([]);
    // const []= React.useContext(FilterContext)
    const {selectedSubdivisions, setSelectedSubdivisions,
    subdivisionData, setSubdivisionData
     } = React.useContext(FilterContext)
    const wrapperRef = React.useRef(null);
    const rows = new Array(PSI_SUBDIVISIONS).fill(0);
    const columns = new Array(CHI_SUBDIVISIONS).fill(0);

    // React.useEffect(() => {
    //     const coordsToChiPsiDict = rows.reduce((accumx, x, xIndex) => {
    //         const newEntries = columns.reduce((accumy, y, yIndex) => {
    //             const coords = toLonLat(subdivisionCenterFromChiPsiCoords(
    //                 xIndex,
    //                 yIndex
    //             ));
    //             return {
    //                 ...accumy,
    //                 [`${coords[1].toString().replace(".","X")}~${coords[0].toString().replace(".","X")}`]: `${xIndex}-${yIndex}`,
    //             };
    //             // <div
    //             //     id={`${xIndex}-${yIndex}`}
    //             //     className="grid-slots"
    //             //     onMouseEnter={markHover}
    //             // />
    //         }, {});
    //         return { ...accumx, ...newEntries };
    //     }, {});
    //     const options = {
    //       method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //       mode: 'cors', // no-cors, *cors, same-origin
    //       headers: {
    //           'Content-Type': 'application/json',
    //           // 'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //       body: JSON.stringify(coordsToChiPsiDict), // body data type must match "Content-Type" header
    //   };
    //   fetch("/dict",options);
    // }, []);
    React.useEffect(() => {
        const fetcher = async () => {
            const res = await fetch('http://localhost:5678/subdivisions');
            const json = await res.json();
            const data = await JSON.parse(json).data;
            console.log(`❗ MapGrid.js:101 'data'`, data);
            setSubdivisionData(data.reduce((accum,x)=>{
              const addition= {[x._id]:x.listings}
              return {...accum,...addition}
            },{}))
            return;
        };
        fetcher();
    }, []);

    const stopStaging = (ev) => {
        ev.preventDefault();
        if (!allowStaging) {
            return;
        }
        console.log('commit');
        allowStaging = false;
        const SubDs = document.getElementById('map-grid-wrapper').childNodes;
        const toggledSubDs = [...SubDs]
            .filter((node) => {
                return node.classList.contains('selected');
            })
            .map((node) => {
                return node.id;
            });
        setSelectedSubdivisions(toggledSubDs);
    };
    // console.log(`❗ MapGrid.js:14 'myArr' <${typeof myArr}>`,myArr);
    return (
        <TestFlex>
            <Wrapper
                id="map-grid-wrapper"
                onMouseDown={beginStaging}
                onMouseUp={stopStaging}
                onMouseLeave={stopStaging}
            >
                {rows.map((x, xIndex) => {
                    return columns.map((y, yIndex) => {
                      
                        return (
                            <div
                                id={`${xIndex}-${yIndex}`}
                                className="grid-slots"
                                onMouseEnter={markHover}
                            >
                                {subdivisionData[`${xIndex}-${yIndex}`]?.length}
                            </div>
                        );
                    });
                })}
            </Wrapper>
            {/* <div>
                {selectedSubdivisions.map((x) => (
                    <p>
                        {x[0]},{x[1]}
                    </p>
                ))}
            </div>
            <div>
                {toPrint.map((x) => (
                    <p>
                        {x[0]},{x[1]}
                    </p>
                ))}
            </div> */}
        </TestFlex>
    );
};
const selectionAnimation = keyframes`
0% {
opacity:0;
   transform:scale(0);
 }
5% {
  opacity:0.25;
  transform:scale(0.95);
} 
50% {
  opacity:0.29;
};
100% {
  opacity:0.3;
  transform:scale(1)
};
`;
const Wrapper = styled.div`
    position: relative;
    width: 320px;
    height: 600px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 3;
    /* background-color:#d3a; */

    & .grid-slots {
        width: calc(100% / ${CHI_SUBDIVISIONS});
        height: calc(100% / ${PSI_SUBDIVISIONS});
        /* border: 1px orange dotted; */
        border-radius: 2px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        color:black;
        font-size:10px;
    }

    & .grid-slots:hover {
        border: 2px #f0f dotted;
    }

    & .selected {
        background-color: #f0f;
        animation: ${selectionAnimation} 0.4s;
        animation-fill-mode: forwards;
    }

    & .ol-map {
        position: relative;
    }
`;

const TestFlex = styled.div`
    display: flex;
    justify-content: row;
`;

// selectionAnimation = styled.keyframes`
// 0% {
//   opacity:0;
//   transform:scale(1);
// }
// `

export default MapGrid;
