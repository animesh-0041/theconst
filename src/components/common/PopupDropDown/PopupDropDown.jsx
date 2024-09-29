import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PageNavigation } from '../PageNavigation/PageNavigation';
import { deleteBlog } from '../../../service/quiries/UserAuth';
import { useErrorHandler } from '../../Helper/StatusManager';
import { AnimatePresence, motion } from 'framer-motion';
import { Breaker } from '../Breaker/Breaker';
import { useState } from 'react';
import { DeleteModal } from '../../DeleteModal/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { bookMenuList, chatMenuList, feedmenulist, profilemenulist } from './PopupDropDownList';



const ListHandler = ({ props }) => {
    const { title, icon, color } = props;

    if (title === 'BREAK') {
        return (<Breaker />);
    } else {
        return (
            <div className='w-full py-2 flex flex-row justify-between items-center gap-3 cursor-pointer text-black-500 active:text-black-300 transform transition duration-200'>
                {icon && <div>{icon}</div>}
                <p className={`w-full font-Golos font-normal text-xs md:text-sm capitalize ${color || ''}`}>{title}</p>
            </div>
        );
    }
};

export const PopupDropDown = (props) => {
    const {
        type,
        icon,
        name,
        blogUrl,
        onClick,
        children,
        username,
        redirect, 
        position,
        followers,
        isDisable = false,
        queryType = null,
    } = props;
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const handleError = useErrorHandler();
    const queryClient = useQueryClient();
    const navigation = useNavigate();


    const openDeleteModal = () => {
        setIsDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModal(false);
    };

    const { mutateAsync: blogDelete } = useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            closeDeleteModal();
            queryClient.invalidateQueries({ queryKey: queryType || ["getpostdata"] });

            if (redirect) {
                navigation('/');
            }
        },
        onError: (error) => {
            handleError(error);
        },
    });

    const deleteBlogPost = async () => {
        try {
            await blogDelete(blogUrl);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRedirect = (typeOf) => {
        switch (typeOf) {
            case 'edit':
                return navigation(`/edit/${blogUrl}`);
            case 'delete':
                return openDeleteModal();
            default:
                return null;
        }
    };

    const PopupContent = (open, close) => {
        switch (type) {
            case 'UserProfile':
                return (
                    <AnimatePresence>
                        {open && (
                            <PopoverPanel
                                static
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-[280px] origin-top flex flex-col gap-2 rounded px-4 py-3 bg-white shadow-header shadow-slate-300 [--anchor-gap:8px]"
                                anchor="bottom start"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className='w-full flex flex-col gap-2'>
                                    <div className='w-full flex flex-row justify-between items-center'>
                                        {icon ? (
                                            <img
                                                src={icon}
                                                className="w-12 h-12 rounded-full flex flex-row justify-center items-center"
                                                onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full flex flex-row justify-center items-center bg-green-50 text-xl font-Golos text-semibold text-black-500">
                                                {name[0] || '@'}
                                            </div>
                                        )}
                                        <PageNavigation url={`/${username}`}>
                                            <button className='w-fit px-5 py-2 font-Golos font-normal text-base bg-black-700 hover:bg-black-500 active:bg-black-700 rounded-full text-black-25 transition-colors duration-200'>
                                                Profile
                                            </button>
                                        </PageNavigation>
                                    </div>
                                    <div className='w-full flex flex-col gap-1'>
                                        <p className='w-full font-Golos font-semibold text-sm text-black-500 capitalize'>{name || 'Author'}</p>
                                        <p className='w-full font-Golos font-sm text-sm text-black-500'>{followers || '0'} Followers</p>
                                    </div>
                                </div>
                            </PopoverPanel>
                        )}
                    </AnimatePresence>
                );
            case 'feedMenu':
                return (
                    <AnimatePresence>
                        {open && (
                            <PopoverPanel
                                static
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-[250px] origin-top flex flex-col gap-1 rounded px-4 py-3 bg-white shadow-header shadow-slate-300 [--anchor-gap:8px]"
                                anchor="bottom end"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {feedmenulist && feedmenulist?.map((item, index) => (
                                    <div key={index} className='w-full flex flex-col px-2'>
                                        <ListHandler props={item} />
                                    </div>
                                ))}
                            </PopoverPanel>
                        )}
                    </AnimatePresence>
                );
            case 'profileMenu':
                return (
                    <>
                        <AnimatePresence>
                            {open && (
                                <PopoverPanel
                                    static
                                    as={motion.div}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="w-[200px] origin-top flex flex-col gap-1 rounded px-4 py-2 bg-white shadow-header shadow-slate-300 [--anchor-gap:8px]"
                                    anchor="bottom end"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {profilemenulist && profilemenulist?.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleRedirect(item?.title)}
                                            className='w-full flex flex-col px-2'
                                        >
                                            <ListHandler props={item} />
                                        </div>
                                    ))}
                                </PopoverPanel>
                            )}
                        </AnimatePresence>

                        {/* delete modal */}
                        {isDeleteModal &&
                            <DeleteModal
                                isOpen={isDeleteModal}
                                closeModel={closeDeleteModal}
                                deleteBlogPost={deleteBlogPost}
                            />
                        }
                    </>
                );
            case 'bookMenu':
                return (
                    <AnimatePresence>
                        {open && (
                            <PopoverPanel
                                static
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-[140px] origin-top flex flex-col gap-2 rounded px-1 py-2 bg-white shadow-header shadow-slate-300 [--anchor-gap:8px]"
                                anchor="bottom"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {bookMenuList && bookMenuList?.map((item, index) => (
                                    <div key={index} onClick={onClick?.[index] || null} className='w-full flex flex-col px-2'>
                                        <ListHandler props={item} />
                                    </div>
                                ))}
                            </PopoverPanel>
                        )}
                    </AnimatePresence>
                );
            case 'chatMenu':
                return (
                    <AnimatePresence>
                        {open && (
                            <PopoverPanel
                                static
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-[140px] origin-top flex flex-col gap-2 rounded px-1 py-2 bg-black-700 shadow-header shadow-slate-300 [--anchor-gap:8px]"
                                anchor={position}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {chatMenuList && chatMenuList?.map((item, index) => (
                                    <div
                                        key={index}
                                        className='w-full flex flex-col px-2'
                                        onClick={(event) => { onClick[index](event) || null; close() }}
                                    >
                                        <ListHandler props={item} />
                                    </div>
                                ))}
                            </PopoverPanel>
                        )}
                    </AnimatePresence>
                );

            default:
                return null;
        }
    };

    if(isDisable) return children;

    return (
        <Popover className="relative">
            {({ open, close }) => (
                <>
                    <PopoverButton className="flex items-center gap-2">{children}</PopoverButton>
                    {PopupContent(open, close)}
                </>
            )}
        </Popover>
    );
};
