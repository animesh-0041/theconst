import React, { useState } from 'react';
import { CommentReply } from './CommentReply.jsx';
import { CommentValue } from './CommentValue.jsx';
import './styles.scss';

export const CommentFeed = ({ url, comment }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [reply, setReply] = useState(false);


    const handleOpenReply = () => {
        setIsOpen(true);
        setReply(!reply);
    }

    const handleViewReply = () => {
        setIsOpen(true);
        setReply(false);
    }

    const closeReplyList = () => {
        setIsOpen(false);
        setReply(false);
    }

    const closeReply = () => {
        setReply(false);
    }

    return (
        <div className='flex flex-col gap-2'>
            <CommentValue comment={comment} />

            <div className='w-full relative px-3 flex flex-row justify-between items-center gap-2'>
                <button onClick={handleOpenReply} className='border border-black-500 ml-6 px-2 py-1 z-10 rounded-full text-black-500 font-Golos text-xs font-normal leading-4 cursor-pointer'>Reply</button>

                <div className='w-full absolute bottom-1 flex flex-row justify-center items-center'>
                    {comment.repliesCount ?
                        (!isOpen ?
                            <button onClick={handleViewReply} className='rounded-full text-black-500 font-Golos text-xs font-normal leading-4 cursor-pointer'>View {comment.repliesCount} replies</button>
                            :
                            <button onClick={closeReplyList} className='rounded-full text-black-500 font-Golos text-xs font-normal leading-4 cursor-pointer'>View less</button>
                        )
                        : null
                    }
                </div>
            </div>

            {isOpen && <div className='flex flex-row-reverse'>
                <CommentReply
                    url={url}
                    reply={reply}
                    parentCommentId={comment?._id}
                    isfetch={!!comment.repliesCount}
                    tag={comment?.userDetails?.username ||'unknown'}
                    closeReply={closeReply}
                />
            </div>}
        </div>
    );
}

