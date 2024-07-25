// This function takes a string as input and returns a new string with the first character of each word capitalized
export const titalize = (str: string): string => {
  return str.replace(/\w\S*/g, function (str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
  });
};
  