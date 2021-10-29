// finds the overlap between two arrays
export function getArrayOverlap(arr1: any[], arr2: any[]) {
  return arr1.filter((item) => arr2.includes(item));
}
