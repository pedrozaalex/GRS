// returns true if the object is empty
export const isEmpty = (obj: any): boolean => {
  return (
    obj && // null and undefined check
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};
