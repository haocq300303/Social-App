import { useState, useRef, useEffect } from "react";
import useDebounce from "../../../Hooks/useDebounce.jsx";
import axios from "axios";

import { IoIosCloseCircle } from "react-icons/io";
import { AiOutlineReload } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

import Tippy from "@tippyjs/react/headless";
import PopperWrapper from "../../../Components/Popper/Popper.jsx";

import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import AccountItem from "../../../Components/AcountItem/AccountItem.jsx";

const cx = classNames.bind(styles);
const Search = () => {
   const [valueSearch, setValueSearch] = useState("");
   const [resultSearch, setResultSearch] = useState([]);
   const [showResult, setShowResult] = useState(true);
   const [loading, setLoading] = useState(false);
   const inputRef = useRef();

   const debounce = useDebounce(valueSearch, 800);
   useEffect(() => {
      if (!debounce.trim()) {
         setResultSearch([]);
         return;
      }
      setLoading(false);
      const fetchApi = async () => {
         try {
            setLoading(true);
            const res = await axios.get(`http://localhost:8080/api/users/search/${debounce}`);
            setResultSearch(res.data);
            setLoading(false);
         } catch (error) {
            console.log(error);
         }
      }
      fetchApi();
   }, [debounce])

   const handleChange = (e) => {
      const value = e.target.value;
      if (!valueSearch.startsWith(" ")) {
         setValueSearch(value);
      }
   }

   const handleClear = () => {
      setValueSearch("");
      inputRef.current.focus();
      setResultSearch([]);
   }
   return (
      <>
         <Tippy
            interactive
            visible={showResult && resultSearch.length > 0}
            render={(attrs) => (
               <div className={cx('result-search')} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                     <h4 className={cx('result-header')}>Result</h4>
                     {resultSearch.map((result) => (
                        <AccountItem key={result.id} avatar={result.avatar} username={result.username} />
                     ))}
                  </PopperWrapper>
               </div>
            )}
            onClickOutside={() => setShowResult(false)}
         >
            <div className={cx("wrapper")}>
               <input
                  ref={inputRef}
                  type="text"
                  value={valueSearch}
                  spellCheck={false}
                  placeholder="Search Social"
                  onChange={handleChange}
                  onFocus={() => setShowResult(true)}
               />

               {valueSearch && !loading &&
                  <button className={cx("icon-clear")} onClick={handleClear}>
                     <IoIosCloseCircle />
                  </button>
               }

               {loading && <button className={cx("icon-loading")}>
                  <AiOutlineReload />
               </button>}

               <button className={cx("btn-search")}>
                  <BsSearch />
               </button>
               <span className={cx("span-search")}></span>
            </div>
         </Tippy>
      </>
   )
};

export default Search;
