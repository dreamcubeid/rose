import {
  FC,
  useState,
  useEffect,
  useRef
} from "react";
import { useI18n } from "@sirclo/nexus";
import {
  Search as IconSearch,
  X as IconX
} from 'react-feather';

export type SearchPropsType = {
  classes?: {
    searchContainer?: string
    searchInputContainer?: string
    searchInput?: string
    searchClear?: string
    searchButton?: string
    searchForm?: string
  };
  searchProduct: any
  visibleState: boolean
};

const Search: FC<SearchPropsType> = ({
  classes = {},
  searchProduct,
  visibleState
}) => {
  const i18n: any = useI18n();
  const [searchValue, setSearchValue] = useState<string>("");
  const inputRef = useRef(null)

  const {
    searchContainer = "search-searchContainer",
    searchInputContainer = "search-searchInputContainer",
    searchInput = "search-searchInput",
    searchClear = "search-searchClear",
    searchButton = "search-searchButton",
    searchForm = "search-searchForm"
  } = classes;

  useEffect(() => {
    if (visibleState) inputRef.current.focus()
  }, [visibleState])

  return (
    <>
      <div className={searchContainer}>
        <form
          className={searchForm}
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            searchProduct(searchValue);
          }}
        >
          <div className={searchInputContainer}>
            <input
              type="search"
              className={searchInput}
              placeholder={i18n.t("header.searchPlaceholder")}
              ref={inputRef}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue !== "" &&
              <div
                className={searchClear}
                onClick={() => setSearchValue("")}
              >
                <IconX />
              </div>
            }
          </div>
          <button
            type="submit"
            className={searchButton}
            disabled={!searchValue}
            onClick={() => searchProduct(searchValue)}
          >
            <IconSearch color="#FFF" />
          </button>
        </form>
      </div>
    </>
  )
}

export default Search;