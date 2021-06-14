// import {
//     intermediatePoint,
//     hopBetweenTwoPoints,
//     applyHopToPoint,
// } from './utils';

const toLonLat = require('ol/proj').toLonLat;

const CHI_SUBDIVISIONS = 16;
const PSI_SUBDIVISIONS = 30;

const TL_PX = [-8190390.92229111, 5718720.025639196];
const TR_PX = [-8180022.1271212865, 5712037.323447103];
const BR_PX = [-8192564.639805884, 5692605.003275052];
const BL_PX = [-8202924.64513574, 5699272.861729206]; //sanity checked in wolfram alpha



// const TL_PX_ORIGINAL = [-8190390.92229111, 5718720.025639196];
// const TR_PX_ORIGINAL = [-8180022.1271212865, 5712037.323447103];
// const BR_PX_ORIGINAL = [-8192564.639805884, 5692605.003275052];
// const BL_PX_ORIGINAL = [-8202924.64513574, 5699272.861729206]; //sanity checked in wolfram alpha

// const [TL_PX, TR_PX, BR_PX, BL_PX] = [
//     TL_PX_ORIGINAL,
//     TR_PX_ORIGINAL,
//     BR_PX_ORIGINAL,
//     BL_PX_ORIGINAL,
// ].map((array) => [array[1], array[0]]);
const intermediatePoint = (A, B, coeff_A, sumOfCoeffs) => {
    return [0, 1].map((n) => {
        return (A[n] * coeff_A + B[n] * (sumOfCoeffs - coeff_A)) / sumOfCoeffs;
    });
};

const hopBetweenTwoPoints = (A, B, absoluteValue = true) => {
    const naiveOutput = [B[0] - A[0], B[1] - A[1]];
    const absOutput = naiveOutput.map((x) => Math.abs(x));
    return absoluteValue ? absOutput : naiveOutput;
};

const applyHopToPoint = (origin, hop) => {
    return [origin[0] + hop[0], origin[1] + hop[1]];
};

const TOP_EDGE_PX = hopBetweenTwoPoints(TR_PX, TL_PX);
const BOTTOM_EDGE_PX = hopBetweenTwoPoints(BR_PX, BL_PX);
const RIGHT_EDGE_PX = hopBetweenTwoPoints(TR_PX, BR_PX);
const LEFT_EDGE_PX = hopBetweenTwoPoints(TL_PX, BL_PX);


const POINT_AT_CHI_1_PSI_0 = intermediatePoint(
    TL_PX,
    TR_PX,
    CHI_SUBDIVISIONS-1,
    CHI_SUBDIVISIONS
); //mapchecked
const POINT_AT_CHI_0_PSI_1 = intermediatePoint(
    TL_PX,
    BL_PX,
    PSI_SUBDIVISIONS-1,
    PSI_SUBDIVISIONS
); //mapchecked

const CHI_HOP_TL_TR = hopBetweenTwoPoints(
    TL_PX,
    POINT_AT_CHI_1_PSI_0,
    false
); //mapchecked works to yield 1_1
// const CHI_HOP_BR_BL = hopBetweenTwoPoints(
//     BL_PX,
//     POINT_AT_CHI_0_PSI_1,
//     false
// );

const POINT_AT_CHI_1_PSI_1 = applyHopToPoint(
    POINT_AT_CHI_0_PSI_1,
    CHI_HOP_TL_TR
); //mapchecked

const PSI_HOP_TL_BL = hopBetweenTwoPoints(
    intermediatePoint(TL_PX, BL_PX, PSI_SUBDIVISIONS-1, PSI_SUBDIVISIONS),
    TL_PX
);
// const PSI_HOP_TR_BR = hopBetweenTwoPoints(
//     intermediatePoint(TR_PX, BR_PX, PSI_SUBDIVISIONS-1, PSI_SUBDIVISIONS),
//     TR_PX
// );
//
const SUBDIVISION_0_0_CENTER = intermediatePoint(
    TL_PX,
    POINT_AT_CHI_1_PSI_1,
    1,
    2
);

const CENTER_FROM_SUBDIVISION_CORNER_HOP = hopBetweenTwoPoints(
    TL_PX,
    SUBDIVISION_0_0_CENTER
);

const toPrint = [TL_PX, TR_PX, BL_PX, BR_PX, POINT_AT_CHI_0_PSI_1, POINT_AT_CHI_1_PSI_0,POINT_AT_CHI_1_PSI_1,SUBDIVISION_0_0_CENTER].map((x) => [toLonLat(x)[1], toLonLat(x)[0]])

//const
//const
//const
//const
//const
//const
//const
//const
//const
//const
//const
//const
//const
//const
//const
//const
//const
//const

module.exports = {intermediatePoint,hopBetweenTwoPoints,applyHopToPoint,TOP_EDGE_PX,BOTTOM_EDGE_PX,POINT_AT_CHI_1_PSI_0,POINT_AT_CHI_0_PSI_1,CHI_HOP_TL_TR,POINT_AT_CHI_1_PSI_1,PSI_HOP_TL_BL,SUBDIVISION_0_0_CENTER,CENTER_FROM_SUBDIVISION_CORNER_HOP}