import assert from 'assert';

function numPairsDivisibleBy60_slow(time: number[]): number {
  let pairsDivisibleBy60 = 0;
  for (let i = 0; i < time.length; i++) {
    for (let j = i + 1; j < time.length; j++) {
      if ((time[i] + time[j]) % 60 === 0) {
        pairsDivisibleBy60++;
      }
    }
  }

  return pairsDivisibleBy60;
}

function numPairsDivisibleBy60_fast(time: number[]): number {
  const counts = new Map<number, number>();
  let count = 0;

  for (let duration of time) {
    let remainder = duration % 60;

    if (remainder === 0) {
      count += counts.get(0) ?? 0;
    } else {
      count += counts.get(60 - remainder) ?? 0;
    }

    counts.set(remainder, (counts.get(remainder) ?? 0) + 1);
  }

  return count;
}

assert.equal(numPairsDivisibleBy60_slow([30, 20, 150, 100, 40]), 3);
assert.equal(numPairsDivisibleBy60_slow([60, 60, 60]), 3);

assert.equal(numPairsDivisibleBy60_fast([30, 20, 150, 100, 40]), 3);
assert.equal(numPairsDivisibleBy60_fast([60, 60, 60]), 3);
