import { IoSettings } from "react-icons/io5";
import { IoIosHelpCircle, IoMdMailUnread } from "react-icons/io";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import { MdReport, MdDarkMode, MdOutlineLightMode, MdLanguage } from "react-icons/md";
import { RiEnglishInput } from "react-icons/ri";
import { TbMessageLanguage } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";

export const MENU = [
   {
      title: "Settings",
      icon: <IoSettings />,
      subMenu: {
         title: "Settings",
         data: [
            {
               title: "Feed",
               icon: <BsLayoutTextSidebarReverse />,
               to: "/setting-feed",
            },
            {
               title: "Activity log",
               icon: <AiOutlineBars />,
               to: "/setting-activity",
            },
         ]
      }
   },
   {
      title: "Helps",
      icon: <IoIosHelpCircle />,
      subMenu: {
         title: "Helps",
         data: [
            {
               title: "Help center",
               icon: <IoIosHelpCircle />,
               to: "/help-center",
            },
            {
               title: "Support inbox",
               icon: <IoMdMailUnread />,
               to: "/support",
            },
            {
               title: "Report a proplem",
               icon: <MdReport />,
               to: "/report",
            }
         ]
      }
   },
   {
      title: "Display",
      icon: <MdDarkMode />,
      subMenu: {
         title: "Display",
         data: [
            {
               title: "Dark",
               icon: <MdDarkMode />
            },
            {
               title: "Light",
               icon: <MdOutlineLightMode />
            }
         ]
      }
   },
   {
      title: "Language",
      icon: <MdLanguage />,
      subMenu: {
         title: "Language",
         data: [
            {
               title: "English",
               icon: <RiEnglishInput />
            },
            {
               title: "Vietnamese",
               icon: <TbMessageLanguage />
            }
         ]
      }
   },
   {
      title: "Log out",
      icon: <FiLogOut />,
      to: "/login",
   }
];