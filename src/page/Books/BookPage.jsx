import { useCallback, useEffect, useRef, useState } from "react";
import { TextEditor } from "../../components/Editor/TextEditor";
import { Content } from '../../components/Content/Content.jsx';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from 'react-hot-toast';
import { getIndividualPage, updatePage } from "../../service/quiries/UserAuth.js";


export const BookPage = ({ currentPage, PostData, isEditAble }) => {
    const [isEdit, setIsEdit] = useState(!!isEditAble);
    const { coverImage, title, desc } = PostData;
    const queryClient = useQueryClient();
    const editorInstance = useRef(null);

    const { isLoading: pageLoading, data: pageData } = useQuery({
        queryKey: ["getindividualpage", currentPage],
        queryFn: () => getIndividualPage(currentPage),
        enabled: !!currentPage,
    });


    const { mutateAsync: updatePagedata } =
        useMutation({
            mutationFn: updatePage,
            onSuccess: (data) => {
                toast.success(data?.msg, { style: { borderRadius: '10px', background: '#333', color: '#fff' } });
                queryClient.invalidateQueries({ queryKey: ["getindividualpage", currentPage] });
                setIsEdit(false);
            },
            onError: (error) => {
                console.log(error);
            },
        });


    const handlePost = useCallback(async () => {
        try {
            const savedData = await editorInstance.current.save();

            if (savedData.blocks.length == 0) {
                toast.error('Please share your thoughts..');
                return;
            } else {
                await updatePagedata({
                    content: savedData?.blocks,
                    url: currentPage,
                });
            }
        } catch (error) {
            toast.error('Something went wrong, please try again');
            console.error('Saving failed:', error);
        }
    }, [currentPage, updatePagedata]);


    useEffect(() => {
        if (isEditAble) {
            if (pageData === null) {
                setIsEdit(true);
            } else {
                setIsEdit(false);
            }
        }
    }, [pageData]);

    if (pageLoading) return <p className="font-Golos text-center text-sm text-black-700">Loading</p>

    return (
        <div className="w-full">
            {currentPage === 'u1no' ?
                <div className="w-full flex flex-col gap-4">
                    {coverImage &&
                        <img
                            className="w-auto max-h-[300px]"
                            src={coverImage}
                        />
                    }

                    <h1 className="font-Golos text-4xl font-bold text-black-700 capitalize">{title || ''}</h1>
                    <p className="font-Golos font-normal text-sm leading-5 text-black-300">{desc || ''}</p>
                </div>
                :
                <div className="w-full h-content relative flex flex-col items-center">
                    {isEditAble && <div className="w-fit fixed z-[100] top-16 right-4">
                        {isEdit ?
                            <button
                                onClick={handlePost}
                                className="w-fit mx-2 py-1 px-3 flex flex-row items-center justify-center cursor-pointer capitalize bg-orange-200 hover:bg-orange-300 active:bg-orange-200 rounded-full font-Golos text-xs text-black-900"
                            >
                                save
                            </button>
                            :
                            <button
                                onClick={() => setIsEdit(true)}
                                className="w-fit mx-2 py-1 px-3 flex flex-row items-center justify-center cursor-pointer capitalize bg-green-100 hover:bg-green-50 active:bg-orange-100 rounded-full font-Golos text-xs text-black-900"
                            >
                                edit
                            </button>
                        }
                    </div>}

                    {isEdit ?
                        <>
                            {/* need to resolve this----------------  */}

                            {/* {pageData ?
                                <TextEditor
                                    editData={pageData?.content}
                                    writeType={'edit'}
                                    editorInstance={editorInstance}
                                />
                                :
                                <TextEditor
                                    writeType={'book'}
                                    editorInstance={editorInstance}
                                />
                            } */}
                        </>
                        :
                        (pageData ?
                            <div className="w-full max-w-[70%] pb-10 flex flex-col items-center gap-5">
                                {pageData?.content?.map((block, ind) => (
                                    <Content key={ind} block={block} />
                                ))}

                            </div>
                            :
                            <div className="w-full mt-20">
                                <h1 className="font-Golos text-center text-3xl font-bold capitalize text-black-700">coming soon</h1>
                                <p className="block font-Golos text-center text-xs font-normal text-black-500">Page is currently in the works and will be available soon...</p>
                            </div>
                        )
                    }
                </div>
            }
            <Toaster />
        </div>
    )
}