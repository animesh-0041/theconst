import { TiStarOutline, TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";
import { BsBookmarkPlus } from "react-icons/bs";
import { booklistdata } from '../../../components/Helper/SideStaffData';
import { ellipsisType } from '../../../components/Helper/Tools';
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createBooks, getBookList } from "../../../service/quiries/UserAuth";
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { Loading } from "../../../components/common/Loading/Loading";
import { FaSpinner } from "react-icons/fa";
import { validMyprofile } from "../../../components/Helper/Helper";



export const BookList = ({ user }) => {
    const [bookTitle, setBookTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        mutateAsync: createNewBook,
    } = useMutation({
        mutationFn: createBooks,
        onSuccess: (data) => {
            navigate(`/book/${data?.url}`);
            setLoading(false);
        },
        onError: (error) => {
            setLoading(false);
            console.log(error);
        },
    });

    const {
        // isLoading: PostLoading,
        data: PostData,
    } = useQuery({
        queryKey: ["getBookList", user],
        queryFn: () => getBookList(user),
        enabled: !!user,
    });

    const slugify = (text) => {
        if (typeof text !== 'string') {
            toast.error('Something went wrong, please try again');
            throw new TypeError('Input should be a string');
        }
        return text
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');
    };

    const generateSlug = (text) => {
        const slug = slugify(text);
        const randomUUID = uuidv4().split('-')[0];
        return `${slug}-${randomUUID}`;
    };

    const handleCreateBook = async () => {

        try {
            // start loading
            setLoading(true);

            await createNewBook({
                title: bookTitle,
                url: generateSlug(bookTitle),
            })

        } catch (error) {
            console.log(error)
            // stop loading 
            setLoading(false);
        }
    }

    console.log(PostData, 'PostData')

    return (
        <div className='w-full flex flex-row gap-4'>
            {/* books list */}
            <div className={`w-full grid gap-5 ${validMyprofile(user) ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {PostData && PostData?.map((book, index) => (
                    <div
                        onClick={() => navigate(`/book/${book?.url}`)}
                        key={index}
                        className='w-fit flex flex-col justify-between gap-5 px-3 cursor-pointer rounded-12'>
                        <div className='flex flex-col gap-3'>
                            {book?.coverImage && <div className="w-full h-[200px]">
                                <img
                                    src={book?.coverImage}
                                    loading="lazy"
                                    className="w-full h-full rounded"
                                />
                            </div>}

                            <div className='w-full flex flex-col gap-2'>
                                <div
                                    style={ellipsisType({ line: 3, height: '50px' })}
                                    className='font-Golos text-lg leading-6 font-bold text-black-500 tracking-wide'
                                    dangerouslySetInnerHTML={{ __html: book?.title }}
                                />
                                <div
                                    style={ellipsisType({ line: 3, height: '60px' })}
                                    className='font-Golos text-[11px] tracking-wide leading-5 font-normal text-black-500'
                                    dangerouslySetInnerHTML={{ __html: book?.des }}
                                />
                            </div>
                        </div>

                        <div className='w-full flex flex-row justify-between'>

                            <div className='w-full flex flex-col'>
                                <div className='w-fit flex flex-row items-center gap-2'>
                                    <TiStarFullOutline size={'15px'} className="text-brown-50" />
                                    <TiStarFullOutline size={'15px'} className="text-brown-50" />
                                    <TiStarFullOutline size={'15px'} className="text-brown-50" />
                                    <TiStarHalfOutline size={'15px'} className="text-brown-50" />
                                    <TiStarOutline size={'15px'} className="text-brown-50" />
                                </div>
                                <div className='px-1 font-Golos text-[10px] leading-4 font-normal text-black-300'>299 reviews</div>
                            </div>

                            <div className="flex flex-row items-center gap-4">
                                <BsBookmarkPlus size={'15px'} className="text-black-75" />
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* create book */}
            {validMyprofile(user) && 
            <div className='w-[300px] h-fit px-3 py-5 flex flex-col gap-4 rounded-12 border bg-black-25'>
                <input
                    type="text"
                    value={bookTitle}
                    placeholder="Book Title"
                    onChange={(e) => setBookTitle(e.target.value)}
                    className="w-full h-10 px-4 font-Golos text-xs text-center border border-black-200 text-black-500 rounded-full bg-white"
                />

                <p className='w-full font-Golos font-normal text-[10px] text-center leading-4 capitalize text-black-500'>Unleash your creativity! Write, publish, and share your digital book with ease. Start crafting your story now!</p>

                <button
                    onClick={handleCreateBook}
                    className="w-full h-8 flex flex-row items-center justify-center font-Golos text-sm rounded-full capitalize bg-black-900 hover:bg-black-500 active:bg-black-700 text-white"
                >
                    {loading ? <FaSpinner size={20} className="animate-spin" /> : 'create'}
                </button>
            </div>}
            <Toaster />
        </div>
    )
}