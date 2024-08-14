import { useQuery } from "@tanstack/react-query";
import { ellipsisType } from "../../Helper/Tools";
import { getAuthorRecommend } from "../../../service/quiries/UserAuth";
import { PageNavigation } from "../../common/PageNavigation/PageNavigation";


export const AuthorRecommend = () => {

    const {
        // isLoading: AuthorRecommendLoading,
        data: authorRecommend,
    } = useQuery({
        queryKey: ["authorRecommendation"],
        queryFn: getAuthorRecommend,
        staleTime: Infinity,
        retry: 2,
    });

    console.log(authorRecommend, 'authorRecommend');

    return (
        <div className="w-full flex flex-col gap-5">
            {authorRecommend && authorRecommend?.map((item, index) => (
                <div key={index} className="w-full flex flex-row justify-between items-center gap-3">
                    <img
                        className="block w-10 h-10 rounded-full"
                        src={item?.photoURL || 'https://cdn-icons-png.flaticon.com/128/847/847969.png'}
                        onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/128/1999/1999625.png'}
                    />
                    <div className="w-full flex flex-col">
                        <h2 className="font-Golos text-sm font-normal text-black-500 capitalize">{item?.name || ''}</h2>
                        <p
                            style={ellipsisType({ line: 2, height: '60px', border: '1px solid red' })}
                            className="font-Golos text-[11px] font-normal text-black-300"
                        >
                            {item?.bio || ''}
                        </p>
                    </div>
                    <PageNavigation url={`/${item?.username}`}>
                        <button
                            className="w-fit px-2 py-1 border border-black-200 rounded-full font-Golos text-[10px] font-normal text-ellipsis capitalize cursor-pointer text-black-500"
                        >
                            view
                        </button>
                    </PageNavigation>
                </div>
            ))}
        </div>
    )
}