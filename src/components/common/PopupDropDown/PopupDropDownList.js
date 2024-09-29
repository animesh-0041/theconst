import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { GoShare } from "react-icons/go";
import { HiReply } from "react-icons/hi";
import { MdContentCopy } from "react-icons/md";
import { CgMailForward } from "react-icons/cg";

export const feedmenulist = [
    { title: "Recommend more stories like this to me.", icon: <IoIosAddCircleOutline size={"22px"} className='text-black-75' /> },
    { title: "Recommend fewer stories like this to me.", icon: <IoIosAddCircleOutline size={"22px"} className='text-black-75' /> },
    { title: "BREAK", icon: "" },
    { title: "Follow Author", icon: "" },
    { title: "Copy Link", icon: "" },
];

export const profilemenulist = [
    { title: "edit", icon: <LiaEditSolid size={"22px"} className='text-black-75' /> },
    { title: "share", icon: <GoShare size={"22px"} className='text-black-75' /> },
    { title: "delete", icon: <MdOutlineDelete size={"22px"} className='text-red-400' />, color: 'text-red-400 active:text-red-300' },
];

export const bookMenuList = [
    { title: "rename", icon: <LiaEditSolid size={"22px"} className='text-black-75' /> },
    { title: "delete", icon: <MdOutlineDelete size={"22px"} className='text-red-400' />, color: 'text-red-400 active:text-red-300' },
];

export const chatMenuList = [
    { title: "select", icon: <LiaEditSolid size={"16px"} className='text-black-50' />, color: 'text-black-50' },
    { title: "reply", icon: <HiReply size={"16px"} className='text-black-50' />, color: 'text-black-50' },
    { title: "copy", icon: <MdContentCopy size={"16px"} className='text-black-50' />, color: 'text-black-50' },
    { title: "forward", icon: <CgMailForward size={"16px"} className='text-black-50' />, color: 'text-black-50' },
    { title: "BREAK", icon: "" },
    { title: "delete", icon: <MdOutlineDelete size={"16px"} className='text-red-400' />, color: 'text-red-400 active:text-red-300' },
];
