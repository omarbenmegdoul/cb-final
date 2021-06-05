import {
    TR_PX,
    CHI_HOP_TR_TL,
    PSI_HOP_TL_BL,
    CENTER_FROM_SUBDIVISION_CORNER_HOP,
} from './constants';

export const intermediatePoint = (A, B, coeff_A, sumOfCoeffs) => {
    return [0, 1].map((n) => {
        return (A[n] * coeff_A + B[n] * (sumOfCoeffs - coeff_A)) / sumOfCoeffs;
    });
};

export const hopBetweenTwoPoints = (A, B, absoluteValue = true) => {
    const naiveOutput = [B[0] - A[0], B[1] - A[1]];
    const absOutput = naiveOutput.map((x) => Math.abs(x));
    console.log(
        `❗ utils.js:10 'naiveOutput' <${typeof naiveOutput}>`,
        naiveOutput
    );
    console.log(`❗ utils.js:11 'absOutput' <${typeof absOutput}>`, absOutput);
    return absoluteValue ? absOutput : naiveOutput;
};

export const applyHopToPoint = (origin, hop) => {
    return [origin[0] + hop[0], origin[1] + hop[1]];
};

export const subdivisionCenterFromChiPsiCoords = (coord_chi, coord_psi) => {
    return [
        TR_PX[0] + coord_chi * CHI_HOP_TR_TL,
        TR_PX[1] + coord_psi * PSI_HOP_TL_BL
    ];
};
