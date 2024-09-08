// import List from "./List";
import { useState, useEffect } from "react";
import AddressList from "./AddressList";
import "./AddressList.css";

const NOMINATIM_BASE_URL =
  "https://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=xml&polygon_geojson=1&addressdetails=1";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

const SearchAddress = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listPlace, setListPlace] = useState([]);
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);

    return debouncedValue;
  }
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchInfo = () => {
    const params = {
      q: searchTerm,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };

    const queryString = new URLSearchParams(params).toString();

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}&${queryString}`, requestOptions)
      .then((res) => res.text())
      .then((res) => {
        setListPlace(JSON.parse(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (debouncedSearchTerm !== "") {
      fetchInfo();
    } else {
      setListPlace([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="SearchBox">
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={(e) => {
            if (searchTerm !== "") {
              if (e.code === "Enter") {
                fetchInfo();
              }
            }
          }}
          required
        />
      </div>
      {listPlace && (
        <div className="searchAddressListBox">
          <AddressList
            listPlace={listPlace}
            setSearchTerm={setSearchTerm}
            setPicked={props.setPicked}
            setAddressVal={props.setAddressVal}
            setFullAddress={props.setFullAddress}
          />
        </div>
      )}
    </div>
  );
};

export default SearchAddress;
