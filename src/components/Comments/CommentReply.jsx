import { useQuery } from "@tanstack/react-query";
import { CommentEditor } from "./CommentEditor"
import { getComment } from "../../service/quiries/UserAuth";
import { CommentValue } from "./CommentValue";
import { FaSpinner } from "react-icons/fa";

export const CommentReply = (props) => {
    const { url, reply, parentCommentId, isfetch, closeReply, tag } = props;

    const {
        isLoading: CommentLoading,
        data: CommentData,
    } = useQuery({
        queryKey: ["ChildCommentGetData", url, parentCommentId],
        queryFn: () => getComment(`postId=${url}&commentId=${parentCommentId}`),
        enabled: isfetch,
    });

    return (
        <div className="relative w-[90%] h-full flex flex-col gap-3 justify-between">
            {CommentLoading && <p className='flex flex-row justify-center items-center p-2'>
                <FaSpinner size={20} className="animate-spin" />
            </p>}

            {reply && <div className="w-full">
                <CommentEditor
                    url={url}
                    tag={tag}
                    reply={reply}
                    closeReply={closeReply}
                    parentCommentId={parentCommentId}
                />
            </div>}

            {CommentData && <div className="flex flex-col gap-2 ">
                {CommentData?.map((comment, ind) => (
                    <CommentValue
                        key={ind}
                        url={url}
                        reply={true}
                        tag={comment?.userDetails?.username || 'unknown'}
                        comment={comment}
                        closeReply={closeReply}
                        parentCommentId={parentCommentId}
                    />
                ))}
            </div>}

        </div>
    )
}