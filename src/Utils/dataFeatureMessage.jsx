import { RiMessengerLine } from "react-icons/ri";
import { IoNotificationsOutline, IoTrashOutline } from "react-icons/io5";
import { CgProfile, CgCloseR } from "react-icons/cg";

export const feature = [
   {
      title: "Open in Messenger",
      icon: <RiMessengerLine />
   },
   {
      title: "Mute Notifications",
      icon: <IoNotificationsOutline />
   },
   {
      title: "View Profile",
      icon: <CgProfile />
   },
   {
      title: "Archive Chat",
      icon: <CgCloseR />
   },
   {
      title: "Delete Chat",
      icon: <IoTrashOutline />
   }
];