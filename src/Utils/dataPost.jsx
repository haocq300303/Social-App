import { FiEdit, FiSave } from "react-icons/fi";
import {
  IoNotificationsOffOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { MdDeleteOutline, MdOutlineHideImage } from "react-icons/md";
import { RiUserUnfollowLine } from "react-icons/ri";
import { VscReport } from "react-icons/vsc";

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
