import { useCallback, useEffect, useRef, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { useMutation } from "@tanstack/react-query";
import { BlogWrite, editBlog } from "../../service/quiries/UserAuth";
import { TextEditor } from "../../components/Editor/TextEditor";
import { MultiTagEdit } from '../../components/Editor/MultiTagEdit';
import toast, { Toaster } from 'react-hot-toast';
import { PostDetailsModel } from "./PostDetailsModel";
import { FaBug } from "react-icons/fa6";
import { v4 as uuidv4 } from 'uuid';
import { PostUpload } from "./PostUpload";

export const WritePost = ({ writeType, editData, url }) => {
    const [contentData, setContentData] = useState();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isUploadModal, setIsUploadModal] = useState(false);
    const [isBugShow, setIsBugShow] = useState(false);
    const [postType, setPostType] = useState(["blog"]);
    const [specificTag, setSpecificTag] = useState([]);
    const editorInstance = useRef(null);


    const openModel = () => {
        setIsModelOpen(true);
    }

    const closeModel = () => {
        setIsModelOpen(false);
    }

    const openUploadModal = () => {
        setIsUploadModal(true);
    }

    const closeUploadModal = () => {
        setIsUploadModal(false);
    }

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

    function findFirstElements(dataArray) {
        let firstHeader = null;
        let firstParagraph = null;
        let firstImage = null;

        for (let item of dataArray) {
            if (!firstHeader && item.type === 'header') {
                firstHeader = item;
            }

            if (!firstParagraph && item.type === 'paragraph') {
                firstParagraph = item;
            }

            if (!firstImage && (item.type === 'image' || item.type === 'inlineImage')) {
                firstImage = item;
            }

            if (firstHeader && firstParagraph && firstImage) {
                break;
            }
        }

        return {
            header: firstHeader,
            paragraph: firstParagraph,
            image: firstImage
        };
    }

    const handleUploadPost = useCallback(async () => {
        try {
            const savedData = await editorInstance?.current?.save();

            if (savedData.blocks.length == 0) {
                toast.error('Please share your thoughts..');
                return;
            } else {
                const firstElements = findFirstElements(savedData?.blocks);
                if (!firstElements?.header || firstElements?.header?.data?.text === '') {
                    toast.error('Blog should have a title!');
                    return;
                } else {

                    setContentData({
                        content: savedData?.blocks,
                        tag: postType,
                        blogHeader: firstElements,
                    });

                    openUploadModal();
                }

                // if (writeType === 'edit') {
                //     await editUserBlog({
                //         params: url,
                //         body: {
                //             content: savedData?.blocks,
                //             tag: postType,
                //             blogHeader: firstElements,
                //         },
                //     })
                // } else {
                //     await BlogSend({
                //         content: savedData?.blocks,
                //         tag: postType,
                //         blogHeader: firstElements,
                //         url: generateSlug(firstElements?.header?.data?.text || ''),
                //     });
                // }

            }
        } catch (error) {
            toast.error('Something went wrong, please try again');
            console.error('Saving failed:', error);
        }
    }, [postType, writeType]);

    useEffect(() => {
        if (postType.includes('error') || postType.includes('bugs')) {
            setIsBugShow(true);
        } else {
            setIsBugShow(false);
        }
    }, [postType])

    return (
        <Layout search={false} isWrite writeType={writeType} handlePost={() => handleUploadPost()}>
            <div className="w-full h-content relative flex flex-col gap-3 p-4">
                <div>
                    <TextEditor
                        editorInstance={editorInstance}
                        writeType={writeType}
                        editData={editData} />
                </div>

                <div className="md:w-full w-[95%] max-w-[700px] h-10 fixed bottom-3 left-1/2 transform -translate-x-1/2 z-10">
                    <MultiTagEdit
                        postType={postType}
                        setPostType={setPostType}
                    />
                </div>

                {isBugShow && <div
                    onClick={openModel}
                    className="w-9 h-9 fixed bottom-4 right-5 z-[10] flex flex-row justify-center items-center text-green-500 bg-green-50 hover:bg-green-100 active:bg-black-25 rounded-full p-1 border border-green-500 cursor-pointer"
                >
                    <FaBug size={'18px'} />
                </div>}
            </div>

            {isModelOpen &&
                <PostDetailsModel
                    isOpen={isModelOpen}
                    specificTag={specificTag}
                    closeModel={closeModel}
                    setSpecificTag={setSpecificTag}
                />
            }

            {isUploadModal &&
                <PostUpload
                    url={url}
                    writeType={writeType}
                    contentData={contentData}
                    isOpen={isUploadModal}
                    closeModel={closeUploadModal}
                />
            }
            <Toaster />
        </Layout>
    );
};
