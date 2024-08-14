import { useState } from 'react';
import { FormatDate } from '../../components/common/FormatDate/FormatDate.jsx';
import { CommentEditor } from './CommentEditor.jsx';
import { GoKebabHorizontal } from "react-icons/go"



export const CommentValue = (props) => {
    const { comment, reply, closeReply, tag, url, parentCommentId } = props;
    const [isOpen, setIsOpen] = useState(false);


    const handleReply = () => {
        setIsOpen(!isOpen);
        closeReply();
    }

    const closeisOpenReply = () => {
        setIsOpen(false);
    }

    return (
        <div className={`flex flex-col gap-2 p-2 rounded-12`}>
            <div className='flex flex-row justify-between items-center gap-2'>
                <div className='flex flex-col md:flex-row items-center md:gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                        <img
                            src={comment?.userDetails?.photoURL || 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                            className={`${reply ? 'w-6 h-6' : 'w-8 h-8'} block rounded-full`}
                        />

                        <p className='font-Golos font-normal text-xs leading-4 text-black-500'>
                            {comment?.userDetails?.name || 'Author'} • {comment?.createdAt && FormatDate({ dateString: comment.createdAt || '' })}
                        </p>
                    </div>

                    {comment?.tags && <p className='font-Golos text-xs font-norma text-green-500 cursor-pointer'>replied to @{comment?.tags}</p>}
                </div>

                <div>
                    <GoKebabHorizontal className='cursor-pointer text-black-75' />
                </div>
            </div>

            <div
                id="comment"
                dangerouslySetInnerHTML={{ __html: comment.text }}
            />

            {reply && <button
                onClick={handleReply}
                className='w-fit border border-black-500 ml-6 px-2 py-[2px] z-10 rounded-full text-black-500 font-Golos text-[10px] font-normal leading-4 cursor-pointer'
            >
                Reply
            </button>}

            {isOpen &&
                <CommentEditor
                    url={url}
                    reply={reply}
                    parentCommentId={parentCommentId}
                    tag={tag}
                    closeisOpenReply={closeisOpenReply}
                />
            }
        </div>
    )
}