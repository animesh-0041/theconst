import { useQuery } from '@tanstack/react-query';
import { getComment } from '../../service/quiries/UserAuth.js';
import './styles.scss'
import { CommentFeed } from './CommentFeed.jsx';

export const CommentCard = ({ url }) => {
    const {
        isLoading: CommentLoading,
        data: CommentData,
    } = useQuery({
        queryKey: ["CommentGetData", url],
        queryFn: () => getComment(`postId=${url}`),
        enabled: !!url,
    });


    return (
        <div className="w-full flex flex-col gap-6 px-4">
            {CommentLoading && <p className='text-black-500 font-Golos text-xs font-normal leading-4'>Loading...</p>}
            {CommentData && CommentData?.map((comment, ind) => (
                <CommentFeed key={ind} url={url} comment={comment} />
            ))}

        </div>
    )
}


