import { Model } from "../../../components/common/Model/Model"
import { useEffect, useReducer, useState } from "react";
import { ProfileEditBox } from "./ProfileEditBox.jsx";
import { MultiTagEdit } from '../../../components/Editor/MultiTagEdit.jsx'
import { HiOfficeBuilding } from "react-icons/hi";
import { FaSchool, FaSpinner } from "react-icons/fa";
import { IoSchool, IoHome } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { FaBirthdayCake, FaUser } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileBlog, updateProfile } from "../../../service/quiries/UserAuth.js";
import { BiSolidPencil } from "react-icons/bi";


const editProfile = [
    {
        name: "skills",
        label: "skills",
        value: ['html', 'css', 'react', 'node.js', 'mongooDB', 'AWS', 'typeScripts'],
    },
    {
        name: "work",
        label: "work",
        value: [
            { name: 'company', label: 'company', icon: <HiOfficeBuilding size={'18px'} className="text-black-75" /> },
        ]
    },
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
];


const initialEditDetails = {
    skills: [],
    company: '',
    collage: '',
    school: '',
    current_city: '',
    add_hometown: '',
    email: '',
    phoneNumber: '',
    gender: '',
    birthday: '',
}

function editReducer(state, action) {
    switch (action.type) {
        case "SET_SKILLS":
            return { ...state, skills: action.payload };
        case "SET_COMPANY":
            return { ...state, company: action.payload };
        case "SET_COLLAGE":
            return { ...state, collage: action.payload };
        case "SET_SCHOOL":
            return { ...state, school: action.payload };
        case "SET_CURRENT_CITY":
            return { ...state, current_city: action.payload };
        case "SET_ADD_HOMETOWN":
            return { ...state, add_hometown: action.payload };
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        case "SET_PHONENUMBER":
            return { ...state, phoneNumber: action.payload };
        case "SET_GENDER":
            return { ...state, gender: action.payload };
        case "SET_BIRTHDAY":
            return { ...state, birthday: action.payload };
        case "CLOSE_MODAL":
            return initialEditDetails;
        default:
            return state;
    }
}

export const ProfileEdit = ({ user, isOpen, closeModel }) => {
    const [editDetails, dispatch] = useReducer(editReducer, initialEditDetails);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [skills, setSkills] = useState([]);
    const queryClient = useQueryClient();

    const {
        data: profileBlogData,
    } = useQuery({
        queryKey: ["getprofiledata", user, 'about'],
        queryFn: () => getProfileBlog(`username=${user}&category=about`),
        enabled: !!user,
        retry: 2,
    });

    const {
        mutateAsync: profileUpdate,
    } = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            setUpdateLoading(false);
            queryClient.invalidateQueries({ queryKey: ["getprofiledata"] });
            closeModel();
        },
        onError: (error) => {
            setUpdateLoading(false);
            console.log(error);
        },
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
    };

    const handleUpdate = async () => {
        try {
            setUpdateLoading(true);
            await profileUpdate(editDetails);
        } catch (error) {
            setUpdateLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (profileBlogData) {
            setSkills(profileBlogData?.skills);
            dispatch({ type: "SET_SKILLS", payload: profileBlogData?.skills || [] });
            dispatch({ type: "SET_COMPANY", payload: profileBlogData?.company || '' });
            dispatch({ type: "SET_COLLAGE", payload: profileBlogData?.collage || '' });
            dispatch({ type: "SET_SCHOOL", payload: profileBlogData?.school || '' });
            dispatch({ type: "SET_CURRENT_CITY", payload: profileBlogData?.current_city || '' });
            dispatch({ type: "SET_ADD_HOMETOWN", payload: profileBlogData?.add_hometown || '' });
            dispatch({ type: "SET_EMAIL", payload: profileBlogData?.email || '' });
            dispatch({ type: "SET_PHONENUMBER", payload: profileBlogData?.phoneNumber || '' });
            dispatch({ type: "SET_GENDER", payload: profileBlogData?.gender || '' });
            dispatch({ type: "SET_BIRTHDAY", payload: profileBlogData?.birthday || '' });
        }
    }, [profileBlogData]);

    useEffect(() => {
        if (skills) {
            dispatch({ type: "SET_SKILLS", payload: skills });
        }
    }, [skills]);

    return (
        <Model isOpen={isOpen} closeModel={closeModel} type="right-side">
            <div className="w-full h-content flex flex-col justify-between gap-4">
                <div id="hide_scrollbar" className="w-full h-[calc(100vh-100px)] flex flex-col gap-4 overflow-scroll">
                    {editProfile && editProfile?.map((edit, index) => (
                        <div key={index} className="w-full flex flex-col gap-3">
                            <div className="w-full flex flex-row items-center gap-1">
                                <p className="font-Golos font-medium text-sm leading-5 capitalize text-black-700">{edit.name}</p>
                                {/* <BiSolidPencil size={12} className="text-black-500" /> */}
                            </div>

                            <div className={`w-full flex ${edit.name === 'skills' ? 'flex-row gap-2' : 'flex-col gap-4'}`}>
                                {edit.name === 'skills' ? (
                                    <MultiTagEdit
                                        profileBar
                                        postType={skills}
                                        setPostType={setSkills}
                                    />
                                ) : (
                                    edit?.value?.map((item, ind) => (
                                        <div key={ind} className="w-full flex flex-col gap-[2px]">
                                            <ProfileEditBox
                                                item={item}
                                                onChange={handleChange}
                                                editDetails={editDetails}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleUpdate}
                    className="w-full py-3 h-12 font-Golos font-normal text-sm leading-5 capitalize rounded-12 text-white bg-black-900 hover:bg-black-700 active:bg-black-900">
                    {updateLoading ?
                        <p className='flex flex-row justify-center items-center p-2'>
                            <FaSpinner size={15} className="animate-spin" />
                        </p>
                        :
                        "save"
                    }
                </button>
            </div>
        </Model>
    );
}
