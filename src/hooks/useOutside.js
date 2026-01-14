import { useEffect, useRef } from "react";

export function useOutsideClick(onClick, capture = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleOutsideClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          onClick();
        }
      }
      document.addEventListener("click", handleOutsideClick, capture);
      return () =>
        document.removeEventListener("click", handleOutsideClick, capture);
    },
    [onClick, capture]
  );
  return ref;
}
