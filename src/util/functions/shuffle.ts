export function shuffle<T>(arr: Array<T>): Array<T> {
  const shuffleArr = new Array();
  while (arr.length) {
    const roll = Math.floor(Math.random() * arr.length);
    shuffleArr.push(arr.splice(roll, 1)[0]);
  }
  return shuffleArr;
}