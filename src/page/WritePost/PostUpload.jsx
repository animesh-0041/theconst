import { useState, useRef } from "react";
import { Model } from "../../components/common/Model/Model";
import AWS from '../../config/awsConfig';
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { BlogWrite, editBlog } from "../../service/quiries/UserAuth";
import toast, { Toaster } from 'react-hot-toast';
import { Loading } from "../../components/common/Loading/Loading";
import { v4 as uuidv4 } from 'uuid';

export const PostUpload = ({ isOpen, closeModel, contentData, url, writeType }) => {
  const [blogContent, setBlogContent] = useState(contentData || {});
  const [isWriteLoading, setIsWriteLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const {
    mutateAsync: BlogSend,
  } = useMutation({
    mutationFn: BlogWrite,
    onSuccess: () => {
      closeModel();
      setIsWriteLoading(false);
      toast.success('Blog posted successfully');
      navigate('/');
    },
    onError: (error) => {
      toast.error('Something went wrong, please try again');
      setIsWriteLoading(false);
      console.log(error);
    },
  });

  const {
    mutateAsync: editUserBlog,
  } = useMutation({
    mutationFn: editBlog,
    onSuccess: () => {
      closeModel();
      setIsWriteLoading(false);
      navigate('/');
    },
    onError: (error) => {
      toast.error('Something went wrong, please try again');
      setIsWriteLoading(false);
      console.log(error);
    },
  });

  const handleTitleChange = (e) => {
    setBlogContent((prevData) => ({
      ...prevData,
      blogHeader: {
        ...prevData.blogHeader,
        header: {
          ...prevData.blogHeader.header,
          data: {
            ...prevData.blogHeader.header.data,
            text: e.target.value,
          },
        },
      },
    }));
  }

  const handleParagraphChange = (e) => {
    setBlogContent((prevData) => ({
      ...prevData,
      blogHeader: {
        ...prevData.blogHeader,
        paragraph: {
          ...prevData.blogHeader.paragraph,
          data: {
            ...prevData.blogHeader.paragraph.data,
            text: e.target.value,
          },
        },
      },
    }));
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);

      const uploadResult = await handleUpload(file);
      if (uploadResult.success) {
        setBlogContent((prevData) => ({
          ...prevData,
          blogHeader: {
            ...prevData.blogHeader,
            image: {
              data: {
                url: uploadResult.file.url,
              },
            },
          },
        }));
      }

      setIsUploading(false);
    }
  }

  const handleUpload = async (file) => {
    if (!file) return;

    const params = {
      // eslint-disable-next-line no-undef
      Bucket: process.env.REACT_APP_BUCKET_NAME,
      Key: file.name,
      Body: file,
      ContentType: file.type || 'image/png',
    };

    try {
      const parallelUploadS3 = new AWS.S3.ManagedUpload({ params });

      // Start the upload
      const data = await parallelUploadS3.promise();

      // Reset states after upload completes
      return {
        success: 1,
        file: {
          url: data.Location,
        },
      };
    } catch (error) {
      // Handle errors
      console.error('Error uploading file:', error);
      return {
        success: 0,
        file: {
          url: '',
        },
      };
    }
  };

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

  const handlePublish = async () => {
    try {
      setIsWriteLoading(true);

      if (writeType === 'edit') {
        await editUserBlog({
          params: url,
          body: blogContent,
        });
      } else {
        const dataObject = blogContent;
        dataObject['url'] = generateSlug(blogContent?.blogHeader?.header?.data?.text || ''),

          await BlogSend(blogContent);
      }
    } catch (error) {
      setIsWriteLoading(false);
      console.log(error, 'error');
    }
  }

  return (
    <Model type={'pop-up-full'} isOpen={isOpen} closeModel={closeModel}>
      {blogContent ?
        <div className="w-full h-full flex flex-col md:flex-row gap-3 md:gap-2">
          <div className="w-full flex flex-col gap-4 justify-between">
            <div className="w-full h-full flex flex-col gap-2">
              <img
                className={'block mx-auto w-full h-full max-w-[400px] max-h-[350px] rounded bg-black-25'}
                src={blogContent?.blogHeader?.image?.data?.url || blogContent?.blogHeader?.image?.data?.file?.url || ''}
              />
              <div className="w-full flex flex-row justify-end gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  disabled={isUploading}
                  className="w-fit px-3 py-1 font-Golos text-xs font-normal rounded-12 text-black-500 border border-black-500"
                >
                  {isUploading ? 'Uploading...' : 'Change'}
                </button>
              </div>
            </div>

            <p className="w-full font-Golos text-[11px] text-normal text-black-300">
              Select specific tags to ensure your blog reaches the right audience. Tags connect your content with the communities that matter most, maximizing visibility and engagement with the right readers.
            </p>
          </div>

          <div className="w-full h-full flex flex-col justify-between gap-4 md:px-4">
            <div className="w-full h-fit flex flex-col gap-4">
              <input
                disabled={true}
                onChange={handleTitleChange}
                placeholder="Please enter your blog title.."
                value={blogContent?.blogHeader?.header?.data?.text || ''}
                className="w-full px-2 py-3 rounded font-Golos text-base font-normal text-black-300 border border-black-50 bg-black-25"
              />

              <textarea
                placeholder="Please enter your blog title.."
                value={blogContent?.blogHeader?.paragraph?.data?.text || ''}
                onChange={handleParagraphChange}
                className="w-full min-h-[100px] max-h-[200px] p-2 rounded font-Golos text-xs font-normal text-black-700 border border-black-50 "
              />
            </div>

            <div className="w-full flex flex-row justify-end gap-2">
              <button
                onClick={() => closeModel()}
                className="w-fit py-2 px-4 rounded-full font-Golos text-xs capitalize transform duration-200 text-green-200 border border-white hover:border-green-200"
              >
                review
              </button>
              <button
                onClick={handlePublish}
                disabled={isWriteLoading || isUploading}
                className={`w-fit min-w-24 px-2 flex flex-row gap-1 justify-center items-center whitespace-nowrap rounded-full font-Golos text-xs transform duration-200 capitalize text-white bg-green-200 hover:bg-green-300 active:bg-green-500 ${(isWriteLoading || isUploading) && 'bg-green-300'}`}
              >
                {writeType === 'edit' ? 'Update' : 'Publish'}
                {isWriteLoading && <Loading />}
              </button>
            </div>
          </div>
        </div>
        :
        <p className="block m-auto font-Golos text-sm text-normal text-black-500">Loading...</p>
      }
      <Toaster />
    </Model>
  )
}
