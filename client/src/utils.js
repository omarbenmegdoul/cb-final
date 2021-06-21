import {
    CHI_HOP_TL_TR,
    PSI_HOP_TL_BL,
    SUBDIVISION_0_0_CENTER,
} from './constants';

export const subdivisionCenterFromChiPsiCoords = (coord_chi, coord_psi) => {
    return [
        SUBDIVISION_0_0_CENTER[0] +
            coord_psi * CHI_HOP_TL_TR[0] -
            coord_chi * PSI_HOP_TL_BL[0],
        SUBDIVISION_0_0_CENTER[1] +
            coord_psi * CHI_HOP_TL_TR[1] -
            coord_chi * PSI_HOP_TL_BL[1],
    ];
};

export const deJSONizeValue = (x) => {
    const quoteWrapped = x[0] === '\u0022' && x[x.length - 1] === '"';
    return quoteWrapped ? x.slice(1, x.length - 1) : x;
};

export const arrayFromYYYYMMDDint = (date, options) => {
    const safeOptions = options || {};
    const mmdd = date % 10000;
    const yyyy = (date - mmdd) / 10000;
    const dd = mmdd % 100;
    const mm = (mmdd - dd) / 100;

    return safeOptions.padStart
        ? [yyyy, mm, dd].map((n) => n.toString().padStart(2, '0'))
        : [yyyy, mm, dd];
};

export const intFromDateInputStr = (date)=>{

}
