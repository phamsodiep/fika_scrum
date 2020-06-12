import { useState } from 'react';


export function useStateForInput(obj, setters, key, val) {
  let states = useState(val);
  setters[key] = states[1];
  obj[key] = states[0];
};

export function inputOnChange(setters, e) {
  let setter = setters[e.target.name];
  if (typeof setter === "function") {
    if (e.target.type === "checkbox") {
      setter(e.target.checked);
    }
    else {
      setter(e.target.value);
    }
  }
};

