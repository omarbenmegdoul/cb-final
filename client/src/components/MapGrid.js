import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CHI_SUBDIVISIONS, PSI_SUBDIVISIONS } from '../constants';
import { subdivisionCenterFromChiPsiCoords } from '../utils';
import FilterContext from './Context/FilterContext';
import SubdivisionContext from './Context/SubdivisionsContext';

const MapGrid = ({ showHeatMap }) => {
    const {
        allowedListings,
        setSelectedSubdivisions,
        subdivisionData,
        setSubdivisionData,
    } = React.useContext(SubdivisionContext);
    const { searchResults } = React.useContext(FilterContext);

    const rows = new Array(PSI_SUBDIVISIONS).fill(0);
    const columns = new Array(CHI_SUBDIVISIONS).fill(0);
    console.log(
        '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>MapGrid.js:22 "subdivisionData[0-0]"',
        subdivisionData['0-0']
    );
    const heatMapGrid = rows.map((x, xIndex) =>
        columns.map((y, yIndex) => {
            return searchResults?.filter((listing) =>
                subdivisionData[`${xIndex}-${yIndex}`].includes(listing.id)
            ).length;
        })
    );
    const hottest = Math.max(
        ...heatMapGrid.reduce((accum, current) => {
            return [...accum, ...current];
        }, [])
    );
    console.log(
        '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>MapGrid.js:35 "hottest"',
        hottest
    );
    // code to populate DB

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
            setSubdivisionData(
                data.reduce((accum, x) => {
                    const addition = { [x._id]: x.listings };
                    return { ...accum, ...addition };
                }, {})
            );
            return;
        };
        fetcher();
    }, []);

    const [paintingState, setPaintingState] = React.useState({
        allowStaging: false,
        mouseButton: null,
    });

    const handlePaintingClassChange = (element, paintMode) => {
        const callClassListMethod = paintMode
            ? () => {
                  element.classList.remove('selected');
              }
            : () => {
                  element.classList.add('selected');
              };
        callClassListMethod();
    };
    const beginStaging = (ev) => {
        ev.preventDefault();
        setPaintingState({ allowStaging: true, paintMode: ev.button });
        handlePaintingClassChange(ev.target, ev.button);
    };
    const markHover = (ev) => {
        ev.preventDefault();
        if (!paintingState.allowStaging) {
            return;
        }
        handlePaintingClassChange(ev.target, paintingState.paintMode);
        logElementCoords(ev);
    };
    const stopStaging = (ev) => {
        ev.preventDefault();
        if (!paintingState.allowStaging) {
            return;
        }

        setPaintingState({ allowStaging: false, paintMode: null });
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
    const logElementCoords = (ev) => {
        ev.preventDefault();
        // console.log for debug
        // console.log(ev.target.id);
    };
    const props = showHeatMap
        ? {}
        : {
              onMouseDown: beginStaging,
              onMouseUp: stopStaging,
              onMouseLeave: stopStaging,
          };
    return (
        <TestFlex>
            <Wrapper id="map-grid-wrapper" {...props}>
                {rows.map((x, xIndex) => {
                    return columns.map((y, yIndex) => {
                        xIndex === 8 &&
                            yIndex === 15 &&
                            console.log(
                                '❗ C:>Users>arobe>Documents>concordia-bootcamps>cb-final>client>src>components>MapGrid.js:140 "heatMapGrid[xIndex][yIndex]"',
                                heatMapGrid[xIndex][yIndex]
                            );
                        const heatMapBgColor =
                            heatMapGrid[xIndex][yIndex] &&
                            `rgba(255, 0,0, ${
                                Math.floor(
                                    (50 * heatMapGrid[xIndex][yIndex].length) /
                                        hottest
                                ) / 100
                            }`;
                        const props = !showHeatMap
                            ? {
                                  onMouseEnter: markHover,
                                  onContextmenu: (ev) => {
                                      ev.preventDefault();
                                      return false;
                                  },
                              }
                            : {
                                  bg: `rgba(255,0,0,${
                                      Math.floor(
                                          (100 *
                                              0.5 *
                                              heatMapGrid[xIndex][yIndex]) /
                                              hottest
                                      ) / 100
                                  })`,
                              };

                        return (
                            <GridSlot
                                id={`${xIndex}-${yIndex}`}
                                key={`${xIndex}-${yIndex}${
                                    showHeatMap ? '-heatmap' : ''
                                }`}
                                className="grid-slots"
                                {...props}
                            >
                                {heatMapGrid[xIndex][yIndex]}
                            </GridSlot>
                        );
                    });
                })}
            </Wrapper>
        </TestFlex>
    );
};
const GridSlot = styled.div`
    background-color: ${(props) => props.bg};
`;
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

    & .grid-slots {
        width: calc(100% / ${CHI_SUBDIVISIONS});
        height: calc(100% / ${PSI_SUBDIVISIONS});
        border-radius: 2px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: rgba(0, 0, 0, 0);
        font-size: 10px;
    }

    & .grid-slots:hover {
        border: 2px #f0f dotted;
        color: rgba(0, 0, 0, 1);
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

export default MapGrid;
