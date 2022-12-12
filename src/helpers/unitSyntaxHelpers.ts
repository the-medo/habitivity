export type UnitSyntax = {
    zero: string; //units   seconds
    one: string;  //unit    second
    twoAndMore: string;  //units   seconds
}

export const generateBasicCountables = (unit: string): UnitSyntax => {
    return {
        zero: unit + 's',
        one: unit,
        twoAndMore: unit + 's',
    }
}

export const pointCountable: UnitSyntax = generateBasicCountables('point');

export const countableString = (count: number | string, unitSyntax: UnitSyntax) => {
    if (typeof count === 'string') {
        count = parseInt(count);
    }
    if (count === 0) {
        return unitSyntax.zero;
    }
    if (count === 1 || count === -1) {
        return unitSyntax.one;
    }
    return unitSyntax.twoAndMore;
}

