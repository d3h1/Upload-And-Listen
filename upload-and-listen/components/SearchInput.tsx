"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useDebounce from "@/hooks/useDebounce";
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    // Once typing the input, it takes that and queriesit to the end of the URL after 500s
    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url)
  }, [debouncedValue, router]);

  return <div>
    <Input 
      placeholder="Serach for Songs Here!"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>;
};

export default SearchInput;
