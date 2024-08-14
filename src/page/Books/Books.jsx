import React, { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PopupDropDown } from '../../components/common/PopupDropDown/PopupDropDown';
import { deletePage, getIndividualBook, updateBook } from '../../service/quiries/UserAuth.js';
import { Layout } from '../../components/layout/Layout.jsx';
import { GoKebabHorizontal } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import { BookPage } from './BookPage.jsx';
import { v4 as uuidv4 } from 'uuid';
import { IoIosAdd } from "react-icons/io";
import { validMyprofile } from '../../components/Helper/Helper.js'
import toast, { Toaster } from 'react-hot-toast';


export const Books = () => {
    const [booklistData, setBooklistData] = useState();
    const [editingPageId, setEditingPageId] = useState(null);
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentPage, setCurrentPage] = useState('u1no');
    const queryClient = useQueryClient();
    const { url } = useParams();
    const inputRef = useRef(null);

    const { isLoading: bookLoading, data: bookData } = useQuery({
        queryKey: ["getindividualbook", url],
        queryFn: () => getIndividualBook(url),
        enabled: !!url,
    });

    const { mutateAsync: updatebookdata } = useMutation({
        mutationFn: updateBook,
        onSuccess: (data) => {
            // toast.success(data?.msg, { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
            // console.log(data, 'follow');
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const { mutateAsync: deletepagedata } = useMutation({
        mutationFn: deletePage,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["getindividualbook", url] });
            queryClient.invalidateQueries({ queryKey: ["getindividualpage", currentPage] });
            toast.success(data?.msg, { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const handleTitleChange = (id, newTitle) => {
        setBooklistData(prevData => ({
            ...prevData,
            pages: prevData.pages.map(page =>
                page.id === id ? { ...page, title: newTitle } : page
            ),
        }));
        setCurrentTitle(newTitle);
    };

    const handleEditClick = (id, title) => {
        setEditingPageId(id);
        setCurrentTitle(title);
    };

    const handleSaveClick = async () => {
        if (!currentTitle.trim()) return;

        try {
            await updatebookdata({ body: booklistData, url: url });
            setEditingPageId(null);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddPage = async () => {
        const randomUUID = uuidv4();

        const updatedBooklistData = {
            ...booklistData,
            pages: [...booklistData.pages, { title: `page ${booklistData?.pages?.length + 1}`, id: randomUUID, bookurl: url }],
        };

        setBooklistData(updatedBooklistData);

        try {
            await updatebookdata({ body: updatedBooklistData, url: url });
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveClick();
        }
    };

    const activePage = (page) => {
        if (currentPage === page) {
            return 'font-Golos text-xs font-semibold text-green-500 capitalize bg-green-50 hover:bg-green-100';
        }
        return 'font-Golos text-xs text-black-700 hover:bg-green-100 capitalize';
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        if (bookData) {
            setBooklistData(bookData);
        }
    }, [bookData]);

    useEffect(() => {
        if (editingPageId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingPageId]);

    const handleFilter = (id) => {
        // return booklistData?.pages?.filter(item => item.id !== id);

        const data = { ...booklistData };
        data.pages = booklistData?.pages?.filter(page => page?.id !== id);
        return data;
    }

    const handleDeletePage = async (id) => {
        try {
            await deletepagedata({
                pageurl: id,
                bookurl: url,
                data: handleFilter(id),
            })
        } catch (error) {
            console.log(error)
        }
    }

    // console.log(booklistData, 'booklistData');

    return (
        <Layout>
            {bookLoading && <div className='w-full text-center font-Golos text-sm text-black-700'>Loading...</div>}
            {bookData &&
                <div className='w-full px-4 pt-4 flex flex-row gap-2 justify-between overflow-visible'>
                    <div id='hide_scrollbar' className='w-[220px] h-content flex flex-col gap-2 overflow-y-auto'>
                        <div
                            onClick={() => setCurrentPage('u1no')}
                            className={`w-full min-h-8 p-2 flex flex-row items-center cursor-pointer rounded ${activePage('u1no')}`}
                        >
                            • INTRODUCTION
                        </div>

                        <div className='w-full'>
                            {booklistData && booklistData?.pages.map((page, ind) => (
                                <div
                                    key={ind}
                                    onClick={() => setCurrentPage(page?.id || '')}
                                    className={`w-full min-h-8 p-2 flex flex-row items-center cursor-pointer rounded ${activePage(page?.id || '')}`}
                                >
                                    {validMyprofile(bookData?.username) ?
                                        <>
                                            {editingPageId === page?.id ? (
                                                <>
                                                    <input
                                                        ref={inputRef}
                                                        type='text'
                                                        value={currentTitle}
                                                        onChange={(e) => handleTitleChange(page?.id, e.target.value)}
                                                        onKeyPress={handleKeyPress}
                                                        className={`w-full font-Golos font-medium leading-5 capitalize bg-transparent`}
                                                        placeholder='Page title'
                                                    />
                                                    <button
                                                        onClick={handleSaveClick}
                                                        className='font-Golos font-medium text-[10px] leading-4 text-green-50 bg-green-500 hover:bg-green-200 active:bg-green-500 rounded-full px-2'
                                                        disabled={!currentTitle.trim()}
                                                    >
                                                        Save
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <p className={`w-full`}>{page.title}</p>
                                                    <button
                                                        disabled={editingPageId !== null}
                                                    >
                                                        <PopupDropDown type={'bookMenu'} onClick={[() => handleEditClick(page?.id, page?.title), () => handleDeletePage(page?.id)]} >
                                                            <div className="px-3">
                                                                <GoKebabHorizontal size={'15px'} className="text-black-75" />
                                                            </div>
                                                        </PopupDropDown>
                                                    </button>
                                                </>
                                            )}
                                        </>
                                        :
                                        <p className={`w-full`}>{page.title}</p>
                                    }
                                </div>
                            ))}
                        </div>

                        {validMyprofile(bookData?.username) &&
                            <button
                                onClick={handleAddPage}
                                className='w-full flex flex-row gap-3 items-center justify-start min-h-8 p-2 hover:bg-green-100 rounded'
                                disabled={editingPageId !== null}
                            >
                                <IoIosAdd size={20} className='text-green-500' />
                                <p className='font-Golos font-medium text-xs text-center leading-5 text-black-700 capitalize'>Add a new page</p>
                            </button>
                        }
                    </div>

                    <div id='hide_scrollbar' className='w-[calc(100%-220px)] h-content overflow-y-auto'>
                        {bookData &&
                            <BookPage
                                currentPage={currentPage}
                                PostData={bookData}
                                isEditAble={validMyprofile(bookData?.username)}
                            />
                        }
                    </div>
                </div>
            }
            <Toaster />
        </Layout>
    );
};
