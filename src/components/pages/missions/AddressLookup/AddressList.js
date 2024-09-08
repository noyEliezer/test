import "./AddressList.css";

const AddressList = (props) => {
  return (
    <>
      {props.listPlace.length !== 0 && (
        <ul className="searchAddressListUl">
          {props.listPlace.map((item) => {
            return (
              <li
                className="searchAddressList"
                key={item.place_id}
                onClick={() => {
                  props.setSearchTerm(item.display_name);
                  props.setPicked(true);
                  props.setAddressVal(item.display_name);
                  props.setFullAddress(item);
                }}
              >
                {item.display_name}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
export default AddressList;
