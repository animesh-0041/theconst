import React, { useState, useRef, useCallback } from 'react';
import ReactQuill from 'react-quill';
import { IoIosSend } from "react-icons/io";
import AWS from '../../config/awsConfig.js';
import { FaSpinner } from "react-icons/fa";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from '../../service/quiries/UserAuth.js';
import 'react-quill/dist/quill.snow.css'; // import styles
import { useErrorHandler } from '../Helper/StatusManager.jsx';
const s3 = new AWS.S3();


const uploadImageToS3 = (file) => {
    const params = {
        // eslint-disable-next-line no-undef
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: file.name,
        Body: file,
        ContentType: file.type || 'image/png',
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading image:', err);
                reject(err);
            } else {
                resolve(data.Location);
            }
        });
    });
};

export const CommentEditor = (props) => {
    const { url, reply, closeisOpenReply, closeReply, tag = null, parentCommentId = null } = props
    const [value, setValue] = useState('Share your thoughts!!');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleError = useErrorHandler();
    const queryClient = useQueryClient();
    const quillRef = useRef(null);


    const {
        mutateAsync: CommentPost,
    } = useMutation({
        mutationFn: postComment,
        onSuccess: () => {
            queryClient.invalidateQueries(["CommentGetData", url]);
            setLoading(false);
            setValue('');
            closeReply && closeReply();
            closeisOpenReply  && closeisOpenReply();
        },
        onError: (error) => {
            handleError(error);
            setLoading(false);
            setValue('');
        },
    });

    const handleChange = (content) => {
        setValue(content);
    };

    const handleFocus = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        if (!value) {
            setIsEditing(false);
        }
    };

    const handleSend = async () => {
        try {
            if (!value) return console.log('no value');
            setLoading(true);

            const comment = {
                postId: url,
                text: value,
                tags: tag,
                parentCommentId: parentCommentId,
            };

            await CommentPost(comment);
            setIsEditing(false);
        } catch (err) {
            console.log(err)
        }
    };

    const imageHandler = useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const range = quillRef.current.getEditor().getSelection();
            try {
                setLoading(true);
                const url = await uploadImageToS3(file);
                quillRef.current.getEditor().insertEmbed(range.index, 'image', url);
            } catch (error) {
                console.error('Image upload failed:', error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
    }, []);

    const modules = {
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', { list: 'bullet' }, 'image', 'link', 'code-block', { 'color': [] }],
                [{ header: [1, 2, 3, false] }],
            ],
            handlers: {
                image: imageHandler,
            },
            placeholder: 'Compose an epic...',
            theme: 'snow',
        },
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'color', 'background', 'align', 'script',
    ];

    // console.log(value, 'value')

    return (
        <div className={`w-full relative border overflow-hidden ${isEditing ? 'rounded-12' : 'rounded-full'}`}>
            {isEditing ? (
                <>
                    {loading && (
                        <button className="absolute top-2 right-2 z-20 w-8 h-8 flex justify-center items-center bg-black-900 text-white rounded-full">
                            <FaSpinner size={20} className="animate-spin" />
                        </button>
                    )}
                    <ReactQuill
                        ref={quillRef}
                        value={value}
                        onChange={handleChange}
                        modules={modules}
                        formats={formats}
                        onBlur={handleBlur}
                    />
                    <button
                        className='absolute top-2 right-2 z-10 w-8 h-8 flex flex-row justify-center items-center bg-black-900 hover:bg-black-700 active:bg-black-500 text-white rounded-full font-Golos font-bold text-xs'
                        onClick={handleSend}
                    >
                        <IoIosSend size={20} className='text-white' />
                    </button>
                </>
            ) : (
                <div onFocus={handleFocus}>
                    <input
                        type="text"
                        className={`w-full ${reply ? 'h-8' : 'h-12'} pl-4 pr-12 py-1 text-black-500 border-0 bg-black-25 bg-opacity-90 text-sm`}
                        placeholder="Write a comment..."
                    />
                    <button
                        className={`${reply ? "w-6 h-6 top-1 right-1" : "w-8 h-8 top-2 right-2"} absolute  flex flex-row justify-center items-center bg-black-900 hover:bg-black-700 active:bg-black-500 text-white rounded-full font-Golos font-bold text-xs`}
                    >
                        <IoIosSend size={reply ? 16 : 20} className='text-white' />
                    </button>
                </div>
            )}
        </div>
    );
};
