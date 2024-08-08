import { useEffect, useState } from "react";

const useDebounce = string => {
  const [debounceString, setDebounceString] = useState(string);
  useEffect(() => {
    const timeSet = setTimeout(() => {
      setDebounceString(string);
    }, 350);

    return () => {
      clearTimeout(timeSet);
    };
  }, [string]);

  return debounceString;
};
export default useDebounce;
