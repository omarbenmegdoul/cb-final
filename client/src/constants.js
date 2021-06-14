// import {
//     intermediatePoint,
//     hopBetweenTwoPoints,
//     applyHopToPoint,
// } from './utils';

import { toLonLat } from 'ol/proj';
// import { LineString } from 'ol/geom';
import GeographicLib from 'geographiclib'

export const CHI_SUBDIVISIONS = 16;
export const PSI_SUBDIVISIONS = 30;

export const TL_PX = [-8190390.92229111, 5718720.025639196];
export const TR_PX = [-8180022.1271212865, 5712037.323447103];
export const BR_PX = [-8192564.639805884, 5692605.003275052];
export const BL_PX = [-8202924.64513574, 5699272.861729206]; //sanity checked in wolfram alpha

// const distance = (lonlat1, lonlat2)=> {
//   var R = 6371.0710; // Radius of the Earth in miles
//   var rlat1 = lonlat1[1] * (Math.PI/180); // Convert degrees to radians
//   var rlat2 = lonlat2[1]* (Math.PI/180); // Convert degrees to radians
//   var difflat = rlat2-rlat1; // Radian difference (latitudes)
//   var difflon = (lonlat2[0]-lonlat1[0]) * (Math.PI/180); // Radian difference (longitudes)

//   var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
//   return d;
// }
// const geod = GeographicLib.Geodesic.WGS84
// const testCenter = [45.491751958924084, -73.68812583206137]
// new Array(45).fill(0).forEach((x,index)=>{
//   const calc = geod.Direct(...testCenter,8*index,250)
//   console.log(calc.lat2,calc.lon2)
// })
// console.log(testCenter[0],testCenter[1]);
// const distance2 = (lonlat1, lonlat2)=>{
// return GeographicLib.Geodesic.WGS84.Inverse(
//   lonlat1[1],lonlat1[0],lonlat2[1],lonlat2[0]
// ).s12
// }
const [A,B,C,D] = [TL_PX, TR_PX, BR_PX,BL_PX].map(x=>toLonLat(x));
console.log(`❗ constants.js:30 '[A,B,C,D]'`,[A,B,C,D]);
// console.log(`❗ constants.js:19 '[A,B]'`,[A,B]);
// const line1 = new LineString([A,B]);
// const line2 = new LineString([C,D]);
// const line3 = new LineString([A,C]);
// const line4 = new LineString([B,D]);
// // line.applyTransform(4326,3857)
// const lengths = [line1,line2,line3,line4].forEach(x=>console.log(`❗ constants.js:25 'x.getLength()'`,x.getLength()))


// export const TL_PX_ORIGINAL = [-8190390.92229111, 5718720.025639196];
// export const TR_PX_ORIGINAL = [-8180022.1271212865, 5712037.323447103];
// export const BR_PX_ORIGINAL = [-8192564.639805884, 5692605.003275052];
// export const BL_PX_ORIGINAL = [-8202924.64513574, 5699272.861729206]; //sanity checked in wolfram alpha

// export const [TL_PX, TR_PX, BR_PX, BL_PX] = [
//     TL_PX_ORIGINAL,
//     TR_PX_ORIGINAL,
//     BR_PX_ORIGINAL,
//     BL_PX_ORIGINAL,
// ].map((array) => [array[1], array[0]]);

export const intermediatePoint = (A, B, coeff_A, sumOfCoeffs) => {
    return [0, 1].map((n) => {
        return (A[n] * coeff_A + B[n] * (sumOfCoeffs - coeff_A)) / sumOfCoeffs;
    });
};

export const hopBetweenTwoPoints = (A, B, absoluteValue = true) => {
    const naiveOutput = [B[0] - A[0], B[1] - A[1]];
    const absOutput = naiveOutput.map((x) => Math.abs(x));
    return absoluteValue ? absOutput : naiveOutput;
};

export const applyHopToPoint = (origin, hop) => {
    return [origin[0] + hop[0], origin[1] + hop[1]];
};

export const TOP_EDGE_PX = hopBetweenTwoPoints(TR_PX, TL_PX);
export const BOTTOM_EDGE_PX = hopBetweenTwoPoints(BR_PX, BL_PX);
export const RIGHT_EDGE_PX = hopBetweenTwoPoints(TR_PX, BR_PX);
export const LEFT_EDGE_PX = hopBetweenTwoPoints(TL_PX, BL_PX);

export const POINT_AT_CHI_1_PSI_0 = intermediatePoint(
    TL_PX,
    TR_PX,
    CHI_SUBDIVISIONS-1,
    CHI_SUBDIVISIONS
); //mapchecked
export const POINT_AT_CHI_0_PSI_1 = intermediatePoint(
    TL_PX,
    BL_PX,
    PSI_SUBDIVISIONS-1,
    PSI_SUBDIVISIONS
); //mapchecked

export const CHI_HOP_TL_TR = hopBetweenTwoPoints(
    TL_PX,
    POINT_AT_CHI_1_PSI_0,
    false
); //mapchecked works to yield 1_1
// export const CHI_HOP_BR_BL = hopBetweenTwoPoints(
//     BL_PX,
//     POINT_AT_CHI_0_PSI_1,
//     false
// );

export const POINT_AT_CHI_1_PSI_1 = applyHopToPoint(
    POINT_AT_CHI_0_PSI_1,
    CHI_HOP_TL_TR
); //mapchecked

export const PSI_HOP_TL_BL = hopBetweenTwoPoints(
    intermediatePoint(TL_PX, BL_PX, PSI_SUBDIVISIONS-1, PSI_SUBDIVISIONS),
    TL_PX
);
// export const PSI_HOP_TR_BR = hopBetweenTwoPoints(
//     intermediatePoint(TR_PX, BR_PX, PSI_SUBDIVISIONS-1, PSI_SUBDIVISIONS),
//     TR_PX
// );

export const SUBDIVISION_0_0_CENTER = intermediatePoint(
    TL_PX,
    POINT_AT_CHI_1_PSI_1,
    1,
    2
);

export const CENTER_FROM_SUBDIVISION_CORNER_HOP = hopBetweenTwoPoints(
    TL_PX,
    SUBDIVISION_0_0_CENTER
);


export const toPrint = [TL_PX, TR_PX, BL_PX, BR_PX, POINT_AT_CHI_0_PSI_1, POINT_AT_CHI_1_PSI_0,POINT_AT_CHI_1_PSI_1,SUBDIVISION_0_0_CENTER].map((x) => [toLonLat(x)[1], toLonLat(x)[0]])


// console.log(`❗ constants.js:30 'distance(A,B)'`,distance(A,B));
// console.log(`❗ constants.js:30 'distance(C,D)'`,distance(C,D));
// console.log(`❗ constants.js:30 'distance(A,C)'`,distance(A,C));
// console.log(`❗ constants.js:30 'distance(B,D)'`,distance(B,D));
// console.log(`❗ constants.js:131 'distance(A,POINT_AT_CHI_1_PSI_0)'`,distance(A,toLonLat(POINT_AT_CHI_1_PSI_0)),distance(A,B)/16);
// console.log(`❗ constants.js:131 'distance(A,POINT_AT_CHI_0_PSI_1)'`,distance(A,toLonLat(POINT_AT_CHI_0_PSI_1)),distance(A,C)/30);

// console.log(`❗ constants.js:30 'distance2(A,B)'`,distance2(A,B));
// console.log(`❗ constants.js:30 'distance2(C,D)'`,distance2(C,D));
// console.log(`❗ constants.js:30 'distance2(A,C)'`,distance2(A,C));
// console.log(`❗ constants.js:30 'distance2(B,D)'`,distance2(B,D));
// console.log(`❗ constants.js:131 'distance2(A,POINT_AT_CHI_1_PSI_0)'`,distance2(A,toLonLat(POINT_AT_CHI_1_PSI_0)),distance2(A,B)/16);
// console.log(`❗ constants.js:131 'distance2(A,POINT_AT_CHI_0_PSI_1)'`,distance2(A,toLonLat(POINT_AT_CHI_0_PSI_1)),distance2(A,C)/30);



//export const
//export const
//export const
//export const
//export const
//export const
//export const
//export const
//export const
//export const
//export const
//export const
//export const
//export const
//export const
//export const
//export const
//export const
