import {
    intermediatePoint,
    hopBetweenTwoPoints,
    applyHopToPoint,
} from './utils';

export const CHI_SUBDIVISIONS = 16;
export const PSI_SUBDIVISIONS = 30;

export const TL_PX = [-8190390.92229111, 5718720.025639196];
export const TR_PX = [-8180022.1271212865, 5712037.323447103];
export const BR_PX = [-8192564.639805884, 5692605.003275052];
export const BL_PX = [-8202924.64513574, 5699272.861729206]; //sanity checked in wolfram alpha

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

export const TOP_EDGE_PX = hopBetweenTwoPoints(TR_PX, TL_PX);
export const BOTTOM_EDGE_PX = hopBetweenTwoPoints(BR_PX, BL_PX);
export const RIGHT_EDGE_PX = hopBetweenTwoPoints(TR_PX, BR_PX);
export const LEFT_EDGE_PX = hopBetweenTwoPoints(TL_PX, BL_PX);

export const POINT_AT_CHI_1_PSI_0 = intermediatePoint(
    TL_PX,
    TR_PX,
    1,
    CHI_SUBDIVISIONS
);
export const POINT_AT_CHI_0_PSI_1 = intermediatePoint(
    TL_PX,
    BL_PX,
    1,
    PSI_SUBDIVISIONS
);

export const CHI_HOP_TR_TL = hopBetweenTwoPoints(
    TL_PX,
    POINT_AT_CHI_1_PSI_0,
    false
);
export const CHI_HOP_BR_BL = hopBetweenTwoPoints(
    BL_PX,
    POINT_AT_CHI_0_PSI_1,
    false
);

export const POINT_AT_CHI_1_PSI_1 = applyHopToPoint(
    POINT_AT_CHI_0_PSI_1,
    CHI_HOP_TR_TL
);

export const PSI_HOP_TL_BL = hopBetweenTwoPoints(
    intermediatePoint(TL_PX, BL_PX, 1, PSI_SUBDIVISIONS),
    TL_PX
);
export const PSI_HOP_TR_BR = hopBetweenTwoPoints(
    intermediatePoint(TR_PX, BR_PX, 1, PSI_SUBDIVISIONS),
    TR_PX
);
console.log(`❗ constants.js:53 'TL_PX' <${typeof TL_PX}>`, TL_PX);
console.log(
    `❗ constants.js:54 'POINT_AT_CHI_1_PSI_1' <${typeof POINT_AT_CHI_1_PSI_1}>`,
    POINT_AT_CHI_1_PSI_1
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
