import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetIndividualPostData } from "../../service/quiries/UserAuth";
import { WritePost } from "../WritePost/WritePost";
import { BlogUser, validMyprofile } from "../../components/Helper/Helper";
import { useEffect } from "react";


export const EditPost = () => {
    const { url } = useParams();

    const {
        isLoading: PostLoading,
        data: PostData,
    } = useQuery({
        queryKey: ["getindividualpostdata", url],
        queryFn: () => GetIndividualPostData(url),
        enabled: !!url,
    });


    const validEdit = () => {
        if (!validMyprofile(PostData?.username)) {
            window.location = `/${PostData?.username}/${url}`;
        }
    }

    useEffect(() => {
        if (PostData) {
            validEdit();
        }
    }, [PostData]);

    if (PostLoading) {
        return <h1 className="text-center font-Golos font-bold text-lg">Loading...</h1>;
    }

    return (
        <div>
            {PostData &&
                <WritePost
                    url={url}
                    writeType="edit"
                    editData={PostData?.content}
                />
            }
        </div>
    )
}
