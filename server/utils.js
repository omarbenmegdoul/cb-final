const TR_PX = require('./constants').TR_PX;
const CHI_HOP_TL_TR = require('./constants').CHI_HOP_TL_TR;
const PSI_HOP_TL_BL = require('./constants').PSI_HOP_TL_BL;
const CENTER_FROM_SUBDIVISION_CORNER_HOP =
    require('./constants').CENTER_FROM_SUBDIVISION_CORNER_HOP;
const SUBDIVISION_0_0_CENTER = require('./constants').SUBDIVISION_0_0_CENTER;
// const PSI_HOP_TR_BR = require('./constants').PSI_HOP_TR_BR;
const toLonLat = require('ol/proj').toLonLat;

// const intermediatePoint = (A, B, coeff_A, sumOfCoeffs) => {
//     return [0, 1].map((n) => {
//         return (A[n] * coeff_A + B[n] * (sumOfCoeffs - coeff_A)) / sumOfCoeffs;
//     });
// };

// const hopBetweenTwoPoints = (A, B, absoluteValue = true) => {
//     const naiveOutput = [B[0] - A[0], B[1] - A[1]];
//     const absOutput = naiveOutput.map((x) => Math.abs(x));
//     console.log(
//         `❗ utils.js:10 'naiveOutput' <${typeof naiveOutput}>`,
//         naiveOutput
//     );
//     console.log(`❗ utils.js:11 'absOutput' <${typeof absOutput}>`, absOutput);
//     return absoluteValue ? absOutput : naiveOutput;
// };

// const applyHopToPoint = (origin, hop) => {
//     return [origin[0] + hop[0], origin[1] + hop[1]];
// };

//

const subdivisionCenterFromChiPsiCoords = (coord_chi, coord_psi) => {
    return [
        SUBDIVISION_0_0_CENTER[0] +
            coord_psi * CHI_HOP_TL_TR[0] -
            coord_chi * PSI_HOP_TL_BL[0],
        SUBDIVISION_0_0_CENTER[1] +
            coord_psi * CHI_HOP_TL_TR[1] -
            coord_chi * PSI_HOP_TL_BL[1],
    ];
};

const deJSONizeValue = (x) => {
    const quoteWrapped = x[0] === '\u0022' && x[x.length - 1] === '"';
    return quoteWrapped ? x.slice(1, x.length - 1) : x;
};

const arrayFromYYYYMMDDint = (date, options) => {
    const safeOptions = options || {};
    const mmdd = date % 10000;
    const yyyy = (date - mmdd) / 10000;
    const dd = mmdd % 100;
    const mm = (mmdd - dd) / 100;

    return safeOptions.padStart
        ? [yyyy, mm, dd].map((n) => n.toString().padStart(2, '0'))
        : [yyyy, mm, dd];
};

const intFromDateInputStr = (date) => {};


module.exports = {
    subdivisionCenterFromChiPsiCoords,
    deJSONizeValue,
    arrayFromYYYYMMDDint,
    intFromDateInputStr,
};

