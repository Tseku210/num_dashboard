import { useLayoutEffect, useRef } from "react";
import * as d3 from "d3";

export const useD3 = (renderFn, dependencies = []) => {
  const ref = useRef();
  useLayoutEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    renderFn(d3.select(ref.current));
    return () => {
      //d3.select(ref.current).remove();
    };
  }, dependencies);
  return ref;
};
