import { toLonLat } from 'ol/proj';
import GeographicLib from 'geographiclib';

export const CHI_SUBDIVISIONS = 16;
export const PSI_SUBDIVISIONS = 30;

export const TL_PX = [-8190390.92229111, 5718720.025639196];
export const TR_PX = [-8180022.1271212865, 5712037.323447103];
export const BR_PX = [-8192564.639805884, 5692605.003275052];
export const BL_PX = [-8202924.64513574, 5699272.861729206]; //sanity checked in wolfram alpha

const distance2 = (lonlat1, lonlat2) => {
    return GeographicLib.Geodesic.WGS84.Inverse(
        lonlat1[1],
        lonlat1[0],
        lonlat2[1],
        lonlat2[0]
    ).s12;
};
const [A, B, C, D] = [TL_PX, TR_PX, BR_PX, BL_PX].map((x) => toLonLat(x));
console.log(`❗ constants.js:30 '[A,B,C,D]'`, [A, B, C, D]);

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
    CHI_SUBDIVISIONS - 1,
    CHI_SUBDIVISIONS
); //mapchecked
export const POINT_AT_CHI_0_PSI_1 = intermediatePoint(
    TL_PX,
    BL_PX,
    PSI_SUBDIVISIONS - 1,
    PSI_SUBDIVISIONS
); //mapchecked

export const CHI_HOP_TL_TR = hopBetweenTwoPoints(
    TL_PX,
    POINT_AT_CHI_1_PSI_0,
    false
); //mapchecked works to yield 1_1

export const POINT_AT_CHI_1_PSI_1 = applyHopToPoint(
    POINT_AT_CHI_0_PSI_1,
    CHI_HOP_TL_TR
); //mapchecked

export const PSI_HOP_TL_BL = hopBetweenTwoPoints(
    intermediatePoint(TL_PX, BL_PX, PSI_SUBDIVISIONS - 1, PSI_SUBDIVISIONS),
    TL_PX
);

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

export const toPrint = [
    TL_PX,
    TR_PX,
    BL_PX,
    BR_PX,
    POINT_AT_CHI_0_PSI_1,
    POINT_AT_CHI_1_PSI_0,
    POINT_AT_CHI_1_PSI_1,
    SUBDIVISION_0_0_CENTER,
].map((x) => [toLonLat(x)[1], toLonLat(x)[0]]);
