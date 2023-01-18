export const varToString = (varObj: any) => Object.keys(varObj)[0];
export const isNull = (variable: any) => {
  let name = varToString(variable);
  if (!variable[name]) {
    //console.log(name, "is null");
    return true;
  } else if (variable[name].length <= 0) {
    //console.log(name, "[] is empty");
    return true;
  } else {
    //console.log(name, ": ", variable[name]);
    return false;
  }
};
