import { HiOfficeBuilding } from "react-icons/hi";
import { FaSchool } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { FaBirthdayCake } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export const stuctures = {
    "AboutList" : [
        {
            name: "skills",
            label: "skills",
            value: [],
        },
        {
            name: "work",
            label: "work",
            value: [
                { name: 'company', label: 'company', icon: <HiOfficeBuilding size={'18px'} className="text-black-75" /> },
            ]
        },
        // add after the functionality impelement
        // {
        //     name: "projects",
        //     label: 'projects'
        // },
        {
            name: "education",
            label: "education",
            value: [
                { name: 'school', label: 'school', icon: <FaSchool size={'18px'} className="text-black-75" /> },
                { name: 'collage', label: 'collage', icon: <IoSchool size={'18px'} className="text-black-75" /> },
            ]
        },
        {
            name: "place lived",
            label: "place lived",
            value: [
                { name: 'current_city', label: 'current city', icon: <MdLocationPin size={'18px'} className="text-black-75" /> },
                { name: 'add_hometown', label: 'add hometown', icon: <IoHome size={'18px'} className="text-black-75" /> },
            ]
        },
        {
            name: "contant info",
            label: "contant info",
            value: [
                { name: 'email', label: 'email', icon: <HiOutlineMail size={'18px'} className="text-black-75" /> },
                { name: 'phoneNumber', label: 'phone', icon: <HiDevicePhoneMobile size={'18px'} className="text-black-75" /> },
            ]
        },
        {
            name: "basic info",
            label: "basic info",
            value: [
                { name: 'gender', label: 'gender', icon: <FaUser size={'18px'} className="text-black-75" /> },
                { name: 'birthday', label: 'birthday', icon: <FaBirthdayCake size={'18px'} className="text-black-75" /> },
            ]
        },
    ],
}