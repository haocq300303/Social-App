import routes from "../Config/routes";
import { TiHomeOutline } from "react-icons/ti";
import { CgCloseR, CgProfile } from "react-icons/cg";
import {
  RiEnglishInput,
  RiMessengerLine,
  RiUserUnfollowLine,
} from "react-icons/ri";
import { TbMessageLanguage, TbPhoto } from "react-icons/tb";
import { SiNintendogamecube } from "react-icons/si";
import {
  IoHome,
  IoNotificationsOffOutline,
  IoNotificationsOutline,
  IoSettings,
  IoSettingsOutline,
  IoTransgender,
  IoTrashOutline,
} from "react-icons/io5";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { AiOutlineBars } from "react-icons/ai";
import { IoIosHelpCircle, IoMdMailUnread } from "react-icons/io";
import {
  MdCake,
  MdDarkMode,
  MdDeleteOutline,
  MdDescription,
  MdLanguage,
  MdOutlineHideImage,
  MdOutlineLightMode,
  MdPlace,
  MdReport,
} from "react-icons/md";
import { FiEdit, FiLogOut, FiSave } from "react-icons/fi";
import { VscReport } from "react-icons/vsc";

// data Nav
export const dataNav = [
  {
    icon: <TiHomeOutline />,
    title: "Home",
    path: routes.home,
  },
  {
    icon: <CgProfile />,
    title: "Profile",
    path: routes.profile,
  },
  {
    icon: <RiMessengerLine />,
    title: "Chats",
    path: routes.chat,
  },
  {
    icon: <TbPhoto />,
    title: "Stories",
    path: routes.stories,
  },
  {
    icon: <SiNintendogamecube />,
    title: "Gaming",
    path: routes.gaming,
  },
  {
    icon: <IoSettingsOutline />,
    title: "Settings",
    path: routes.setting,
  },
];

// data Menu
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
      ],
    },
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
        },
      ],
    },
  },
  {
    title: "Display",
    icon: <MdDarkMode />,
    subMenu: {
      title: "Display",
      data: [
        {
          title: "Dark",
          icon: <MdDarkMode />,
        },
        {
          title: "Light",
          icon: <MdOutlineLightMode />,
        },
      ],
    },
  },
  {
    title: "Language",
    icon: <MdLanguage />,
    subMenu: {
      title: "Language",
      data: [
        {
          title: "English",
          icon: <RiEnglishInput />,
        },
        {
          title: "Vietnamese",
          icon: <TbMessageLanguage />,
        },
      ],
    },
  },
  {
    title: "Log out",
    icon: <FiLogOut />,
    to: "/login",
  },
];

// data FeatureMessage
export const features = [
  {
    title: "Open in Messenger",
    icon: <RiMessengerLine />,
  },
  {
    title: "Mute Notifications",
    icon: <IoNotificationsOutline />,
  },
  {
    title: "View Profile",
    icon: <CgProfile />,
  },
  {
    title: "Archive Chat",
    icon: <CgCloseR />,
  },
  {
    title: "Delete Chat",
    icon: <IoTrashOutline />,
  },
];

// data post
export const dataUserPost = [
  {
    title: "Save post",
    icon: <FiSave />,
    action: "save",
  },
  {
    title: "Turn on notifications",
    icon: <IoNotificationsOutline />,
    action: "turnOn",
  },
  {
    title: "Hide post",
    icon: <MdOutlineHideImage />,
    action: "hide",
  },
  {
    title: "Unfollow admin post",
    icon: <RiUserUnfollowLine />,
    action: "unfollow",
  },
  {
    title: "Report post",
    icon: <VscReport />,
    action: "report",
  },
];

export const dataAdminPost = [
  {
    title: "Turn off notifications",
    icon: <IoNotificationsOffOutline />,
    action: "turnOn",
  },
  {
    title: "Edit post",
    icon: <FiEdit />,
    action: "edit",
  },
  {
    title: "Hide post",
    icon: <MdOutlineHideImage />,
    action: "hide",
  },
  {
    title: "Delete post",
    icon: <MdDeleteOutline />,
    action: "delete",
  },
];

// data Profile
export const dataProfile = [
  {
    title: "Lives in",
    icon: <IoHome />,
  },
  {
    title: "From",
    icon: <MdPlace />,
  },
  {
    title: "Description",
    icon: <MdDescription />,
  },
  {
    title: "Birthday",
    icon: <MdCake />,
  },
  {
    title: "Gender",
    icon: <IoTransgender />,
  },
];

// data Shortcuts
export const dataShortcuts = [
  {
    image:
      "https://res.cloudinary.com/dsvfqgd20/image/upload/v1666276816/Social%20app/game1_ywpn6w.png",
    title: "8 Ball Pool",
  },
  {
    image:
      "https://res.cloudinary.com/dsvfqgd20/image/upload/v1666276825/Social%20app/game2_jsro7d.png",
    title: "Dragon City",
  },
  {
    image:
      "https://res.cloudinary.com/dsvfqgd20/image/upload/v1666276832/Social%20app/game3_jruade.png",
    title: "Pirate Kings",
  },
];
