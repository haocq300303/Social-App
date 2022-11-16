import PropTypes from "prop-types";
import AccountItem from "../../AcountItem/AccountItem";

const MessageSearch = ({ data = [] }) => {
  return data.map((item) => (
    <AccountItem avatar={item?.avatar} username={item?.username} />
  ));
};

MessageSearch.propTypes = {
  data: PropTypes.array,
};

export default MessageSearch;
