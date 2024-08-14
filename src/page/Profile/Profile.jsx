import { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout'
import { Feeds } from './ProfileBarList/Feeds.jsx'
import { useParams } from 'react-router-dom';
import { validMyprofile } from '../../components/Helper/Helper.js';
import { useQuery } from '@tanstack/react-query';
import { getProfile, getProfileBlog } from '../../service/quiries/UserAuth.js';
import { ProfileBanner } from './ProfileBanner.jsx';
import { About } from './ProfileBarList/About.jsx';
import { BookList } from './ProfileBarList/BookList.jsx';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { ProfileEdit } from './ProfileEdit/ProfileEdit.jsx';
import { MdEdit } from "react-icons/md";

const profileType = ['about', 'stories'];


export const Profile = () => {
    const [activeprofileBar, setActiveProfileBar] = useState('');
    const [isOpenEditModel, setIsOpenEditModel] = useState(false);
    const { user } = useParams();

    const {
        // isLoading: ProfileLoading,
        data: profileData,
    } = useQuery({
        queryKey: ["getprofiledata", user],
        queryFn: () => getProfile(`username=${user}`),
        enabled: !!user,
        retry: 2,
    });

    const {
        // isLoading: ProfileBlogLoading,
        data: profileBlogData,
    } = useQuery({
        queryKey: ["getprofiledata", user, activeprofileBar],
        queryFn: () => getProfileBlog(`username=${user}&category=${activeprofileBar}`),
        enabled: !!user,
        retry: 2,
    });


    const Profilebar = () => {
        switch (activeprofileBar) {
            case 'stories':
                return <Feeds
                    profileData={profileBlogData}
                    userData={profileData}
                    queryType={["getprofiledata", user, activeprofileBar]}
                />
            case 'about':
                return <About
                    profileData={profileBlogData}
                    userData={profileData}
                />
            case 'books':
                return <BookList user={user} />
            default:
                return null;
        }
    }

    const handleChangeProfileBar = (props) => {
        localStorage.setItem('activeProfileBar', props);
        setActiveProfileBar(props);
    }

    const openEditModel = () => {
        setIsOpenEditModel(true);
    }

    const closeEditModel = () => {
        setIsOpenEditModel(false);
    }

    useEffect(() => {
        const storedValue = localStorage.getItem('activeProfileBar');
        storedValue ? setActiveProfileBar(storedValue) : setActiveProfileBar('about');

        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <div id='hide_scrollbar' className='w-full h-content px-4 md:px-10 pt-4 overflow-y-scroll relative flex flex-col gap-12'>

                <ProfileBanner
                    user={user}
                    id={profileData?._id}
                    name={profileData?.name}
                    profileData={profileData}
                    image={profileData?.photoURL}
                    myprofile={validMyprofile(user)}
                />

                <div className='w-full flex flex-row justify-between items-center'>
                    <div>
                        {profileType && profileType?.map((item, ind) => (
                            <button
                                key={ind}
                                onClick={() => handleChangeProfileBar(item)}
                                className={`w-fit px-5 py-[6px] font-Golos text-xs md:text-sm font-normal whitespace-nowrap capitalize ${activeprofileBar !== item ? 'text-black-700 border-0' : 'text-black-900 border-b border-black-500'}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {validMyprofile(user) && <button onClick={openEditModel}>
                        <MdEdit size={30} className='text-black-700 rounded-full hover:bg-black-25 p-1' />
                    </button>}

                </div>

                <div className='w-full h-content flex flex-col gap-4 pb-10'>
                    {Profilebar()}
                </div>

            </div>

            {isOpenEditModel &&
                <ProfileEdit
                    user={user}
                    isOpen={isOpenEditModel}
                    closeModel={closeEditModel}
                />
            }
        </Layout>
    )
}