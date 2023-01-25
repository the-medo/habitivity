export const formatPoints = (p: number | undefined): string => {
  if (p !== undefined) {
    const fixed2points = p * 100 - Math.floor(p) * 100;

    let digitCount = fixed2points % 10 !== 0 ? 2 : 0;
    if (digitCount === 0) digitCount = fixed2points > 9 ? 1 : 0;

    if (p >= 100) return p.toFixed(Math.min(0, digitCount));
    else if (p >= 10) return p.toFixed(Math.min(1, digitCount));
    else return p.toFixed(Math.min(2, digitCount));
  }

  return '-';
};

/*

Expected results:

formatPoints(2.123) => 2.12
formatPoints(2.12) => 2.12
formatPoints(2.1) => 2.1
formatPoints(2) => 2

formatPoints(20.123) => 20.1
formatPoints(20.12) => 20.1
formatPoints(20.1) => 20.1
formatPoints(20) => 20

formatPoints(200.123) => 200
formatPoints(200.12) => 200
formatPoints(200.1) => 200
formatPoints(200) => 200


*/
