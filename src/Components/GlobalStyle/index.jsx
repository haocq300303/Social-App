import PropTypes from "prop-types";
import "./GlobalStyle.scss";

const GlobalStyle = ({ children }) => {
   return children;
};

GlobalStyle.propTypes = {
   children: PropTypes.node
};

export default GlobalStyle;
