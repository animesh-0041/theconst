import React, { useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { GetIndividualPostData, likedPost } from '../../service/quiries/UserAuth';
import { FaRegCommentDots } from "react-icons/fa";
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { GoKebabHorizontal } from 'react-icons/go';
import { PopupDropDown } from '../../components/common/PopupDropDown/PopupDropDown';
import { CommentEditor } from '../../components/Comments/CommentEditor.jsx';
import { Tooltips } from '../../components/common/Tooltips/Tooltips';
import { CommentCard } from '../../components/Comments/CommentCard.jsx';
import { FormatDate } from '../../components/common/FormatDate/FormatDate.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { PiLinkBold } from "react-icons/pi";
import { BlogFunc } from './BlogFunc';
import { PageNavigation } from '../../components/common/PageNavigation/PageNavigation.jsx';
import { useErrorHandler } from '../../components/Helper/StatusManager.jsx';
import { Content } from '../../components/Content/Content.jsx';
import { validMyprofile } from '../../components/Helper/Helper.js';



export const IndividualPost = () => {
    const handleError = useErrorHandler();
    const { url } = useParams();

    const {
        isLoading: PostLoading,
        data: PostData,
    } = useQuery({
        queryKey: ["getindividualpostdata", url],
        queryFn: () => GetIndividualPostData(url),
        enabled: !!url,
    });

    const {
        mutateAsync: postlike,
    } = useMutation({
        mutationFn: () => likedPost(url),
        onSuccess: (data) => {
            // console.log(data, 'tara-')
        },
        onError: (error) => {
            PostData.isLikeByUser = !PostData.isLikeByUser
            handleError(error);
        },
    });

    const CopyToClipboard = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL);
        toast.success('Post link copied!!', { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
    }


    const handleLiked = async () => {
        try {
            if (PostData) {
                PostData.isLikeByUser = !PostData.isLikeByUser
            }
            await postlike();
        } catch (error) {
            handleError(error);
        }
    }

    const AuthorProfile = ({ PostData }) => {
        return (
            <div className='w-full flex flex-row justify-between items-center border-y border-black-50 py-4'>
                <div className='w-fit flex flex-row items-center gap-4'>
                    <PageNavigation url={`/${PostData?.userDetails?.username}`}>
                        <img
                            src={PostData?.userDetails?.photoURL || 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                            className='w-10 h-10 block rounded'
                            onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                        />
                    </PageNavigation>

                    <div className='w-fit flex flex-col gap-1'>
                        <h2 className='font-Golos font-semibold text-sm leading-4 capitalize text-black-500'>{PostData?.userDetails?.name || 'Author'}</h2>
                        <p className='font-Golos font-normal text-xs leading-4 text-black-300'>Published On {FormatDate({ dateString: PostData?.createdAt || '' })}</p>
                    </div>
                </div>

                <div className='block md:hidden'>
                    <BlogFunc type={'like'} onClick={() => handleLiked()} renderType={PostData?.isLikeByUser} />
                </div>
                <div onClick={CopyToClipboard} className='w-fit hidden md:flex flex-row items-center gap-4'>
                    <Tooltips value={'Copy Link'}>
                        <PiLinkBold className='cursor-pointer text-black-75' size={'20px'} />
                    </Tooltips>
                </div>
            </div>
        );
    };

    const validMenuType = () => {
        if (validMyprofile(PostData?.username)) {
            return 'profileMenu'
        } else {
            return "feedMenu"
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <Layout>
            <div id="hide_scrollbar" className='relative w-full h-content px-4 flex flex-col items-end md:items-center gap-5 overflow-x-scroll'>
                {PostLoading && <div className='w-fit m-auto'>Loading...</div>}

                {PostData && <div className='fixed bottom-3 left-4 md:right-3 md:left-0 z-[5] font-Golos font-normal text-[11px] leading-3 text-black-200'>Author • {PostData.createdBy}</div>}

                {PostData && <div className='w-full md:w-[60%] flex flex-col items-center gap-4 md:gap-5 mt-6 md:mt-10'>
                    {PostData && PostData?.content.map((block, ind) => (
                        <Content key={ind} block={block} />
                    ))}
                    <>
                        <div className='w-full flex flex-row justify-center items-center py-5 text-2xl font-bold text-black-75'>- - -</div>
                    </>
                </div>}

                <div className='hidden w-full md:w-fit md:absolute top-1/2 left-4 transform -translate-y-1/2 md:flex flex-row md:flex-col items-center justify-between md:justify-center gap-8'>
                    {PostData &&
                        <PopupDropDown
                            type={'UserProfile'}
                            name={PostData?.userDetails?.name}
                            icon={PostData?.userDetails?.photoURL}
                            username={PostData?.userDetails?.username}
                            followers={'7'}
                        >
                            <img
                                src={PostData?.userDetails?.photoURL || ''}
                                className='w-8 h-8 block rounded-full'
                                onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                            />
                        </PopupDropDown>
                    }
                    {/* like */}
                    <BlogFunc type={'like'} onClick={() => handleLiked()} renderType={PostData?.isLikeByUser} />
                    {/* comment */}
                    <a href='#comment_section'>
                        <FaRegCommentDots className='cursor-pointer text-black-75' size={'21px'} />
                    </a>
                    {/* menu */}
                    <PopupDropDown type={validMenuType()} blogUrl={url} redirect>
                        <GoKebabHorizontal className='cursor-pointer text-black-75' size={'21px'} />
                    </PopupDropDown>
                </div>

                {PostData &&
                    <div className='w-full md:w-[60%] flex flex-col items-center gap-5 mt-10 pb-20'>
                        <AuthorProfile PostData={PostData} />

                        {/* comment editor */}
                        <div className='w-full flex flex-col gap-4'>
                            <CommentEditor url={PostData?._id} />
                        </div>

                        {/* comment sections */}
                        <div id='comment_section' className='md:w-full w-full flex flex-col gap-4'>
                            <CommentCard url={PostData?._id} />
                        </div>
                    </div>
                }
            </div>

            <Toaster />
        </Layout>
    );
};
