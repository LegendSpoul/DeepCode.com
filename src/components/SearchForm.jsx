import React from "react";
import Link from "next/link";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <span>
        <input
          defaultValue={query}
          type="text"
          name="query"
          id="search"
          className="search-input"
          placeholder="Search Posts"
        />
      </span>
      <div className="flex gap-2">
        {query && <SearchFormReset />}

        <button type="submit" className="search-btn text-white">
          <Search />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
