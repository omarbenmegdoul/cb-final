import React, { useMemo } from 'react';
import styled from 'styled-components';
import { subdivisionCenterFromChiPsiCoords } from '../utils';
import {
    CHI_SUBDIVISIONS,
    PSI_HOP_TL_BL,
    PSI_SUBDIVISIONS,
    toPrint
} from '../constants';
import { toLonLat } from 'ol/proj';

const idToChiPsiCoords = (id) => {
  const coords = id.split('-')
    return subdivisionCenterFromChiPsiCoords(coords[0],coords[1]);
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
    ev.target.classList.add('selected');
    console.log(`❗ MapGrid.js:24 'ev' <${typeof ev}>`, ev);
    logElementCoords(ev);
};

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
    const [selectedSubdivisions, setSelectedSubdivisions] = React.useState([]);
    const wrapperRef = React.useRef(null);
    const rows = new Array(PSI_SUBDIVISIONS).fill(0);
    const columns = new Array(CHI_SUBDIVISIONS).fill(0);
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
             const [longitude,latitude] = toLonLat(idToChiPsiCoords(node.id))
              return [latitude,longitude];
          });
      setSelectedSubdivisions(toggledSubDs)
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
                          />
                      );
                  });
              })}
          </Wrapper>
          <div>
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
          
        </div>
        </TestFlex>

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
        border: 2px #f0f dotted;
        border-radius: 2px;
    }

    & .selected {
        background-color: rgba(255, 0, 255, 0.3);
        transition: all 0.2 ease-out;
    }

    & .ol-map {
        position: relative;
        z-index: -1;
    }
`;

const TestFlex = styled.div`
display:flex;justify-content:row,`


// selectionAnimation = styled.keyframes`
// 0% {
//   opacity:0;
//   transform:scale(1);
// }
// `
export default MapGrid;
