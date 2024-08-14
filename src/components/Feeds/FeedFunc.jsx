import { useMutation } from "@tanstack/react-query";
import { Paragraph } from "../common/Paragraph/Paragraph"
import { BsBookmarkPlus } from "react-icons/bs";
import { bookMarkBlog, deletebookMarkBlog } from '../../service/quiries/UserAuth';
import { useErrorHandler } from '../Helper/StatusManager';
import toast, { Toaster } from 'react-hot-toast';

export const FeedFunc = ({ read, blogUrl, bookmarked }) => {
    const handleError = useErrorHandler();

    const {
        mutateAsync: bookmark,
    } = useMutation({
        mutationFn: bookMarkBlog,
        onSuccess: (data) => {
            toast(data?.message, { style: { borderRadius: '10px', background: '#333', color: '#fff', fontSize: '14px' } });
        },
        onError: (error) => {
            handleError(error);
            // console.log(error);
        },
    });

    const handlebookmark = async (event) => {
        event.stopPropagation();

        try {
            await bookmark(blogUrl);
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className="w-full flex flex-row justify-between">
            <div className="w-fit flex flex-row items-center gap-3">
                <p className={`font-Golos text-xs tracking-wide leading-4 font-normal text-black-500`}>View • {read || 0}</p>
            </div>
            {!bookmarked &&<button
                onClick={(event) => handlebookmark(event)}
                className="w-fit p-2 flex flex-row items-center gap-4 rounded-full hover:bg-black-25 active:bg-black-50">
                <BsBookmarkPlus size={'15px'} className="text-black-75" />
            </button>}
            <Toaster />
        </div>

    )
}