export function shuffle<T>(arr: Array<T>): Array<T> {
  for (let i = 0; i < arr.length; i++) {
    const ranIdx = Math.floor(Math.random() * (arr.length - i)) + i;
    const prev = arr[i];
    arr[i] = arr[ranIdx];
    arr[ranIdx] = prev;
  }
  return arr;
}