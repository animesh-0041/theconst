import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import debounce from 'lodash.debounce'; // Import debounce from lodash (or implement your own debounce function)
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import ImageTool from '@editorjs/image';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import LinkTool from '@editorjs/link';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import RawTool from '@editorjs/raw';
import Warning from '@editorjs/warning';
import Checklist from '@editorjs/checklist';
import DragDrop from 'editorjs-drag-drop';
import AWS from '../../config/awsConfig';
import InlineImage from 'editorjs-inline-image';
import YouTubeEmbed from 'editorjs-youtube-embed';
import InlineCode from '@editorjs/inline-code';

class CustomYouTubeEmbed {
    constructor({ data, config, api, readOnly }) {
        this.youTubeEmbed = new YouTubeEmbed({ data, config, api, readOnly });
    }

    static get toolbox() {
        const originalToolbox = YouTubeEmbed.toolbox;
        return {
            ...originalToolbox,
            title: 'Video / YouTube',
        };
    }

    render() {
        return this.youTubeEmbed.render();
    }

    save(blockContent) {
        return this.youTubeEmbed.save(blockContent);
    }
}

export const TextEditor = ({ editorInstance = null, writeType, editData, draftData }) => {

    const contentManager = () => {
        switch (writeType) {
            case 'edit':
                return editData;
            case 'book':
                return [
                    {
                        type: 'header',
                        data: {
                            text: 'Page title',
                            level: 2,
                        },
                    },
                    {
                        type: 'paragraph',
                        data: {
                            text: 'Your story matters. Share your thoughts and start writing now!',
                        },
                    },
                ];
            default:
                return draftData ? draftData : [
                    {
                        type: 'header',
                        data: {
                            text: 'BLOG TITLE',
                            level: 2,
                        },
                    },
                    {
                        type: 'paragraph',
                        data: {
                            text: 'Your story matters. Share your thoughts and start writing now!',
                        },
                    },
                ];
        }
    };

    const saveToLocalStorage = debounce((editorInstance) => {
        editorInstance.save().then((outputData) => {
            localStorage.setItem('editorContent', JSON.stringify(outputData.blocks));
            console.log('Data saved to localStorage:', outputData.blocks);
        }).catch((error) => {
            console.error('Saving failed:', error);
        });
    }, 700);

    useEffect(() => {
        const initEditor = () => {
            editorInstance.current = new EditorJS({
                holder: 'editorjs',
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true,
                        config: {
                            placeholder: 'Enter a header',
                        },
                    },
                    paragraph: {
                        class: Paragraph,
                        inlineToolbar: true,
                        config: {
                            placeholder: 'Enter your paragraph',
                        },
                    },
                    inlineImage: {
                        class: InlineImage,
                        inlineToolbar: true,
                        config: {
                            embed: {
                                display: true,
                            },
                        },
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                uploadByFile: handleUpload,
                                uploadByUrl: handleUploadByUrl,
                            },
                        },
                    },
                    code: CodeTool,
                    list: List,
                    quote: Quote,
                    marker: {
                        class: Marker,
                        shortcut: 'CMD+SHIFT+M',
                    },
                    inlineCode: {
                        class: InlineCode,
                        shortcut: 'CMD+SHIFT+C',
                    },
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: 'http://localhost:8008/fetchUrl', // Your endpoint that provides URL metadata
                        },
                    },
                    delimiter: Delimiter,
                    table: Table,
                    raw: RawTool,
                    warning: {
                        class: Warning,
                        config: {
                            titlePlaceholder: 'Title',
                            messagePlaceholder: 'Message',
                        },
                    },
                    checklist: Checklist,
                    youtubeEmbed: {
                        class: CustomYouTubeEmbed,
                        config: {
                            placeholder: 'Enter YouTube video link',
                        },
                    },
                },
                data: {
                    blocks: contentManager(),
                },
                onChange: () => {
                    saveToLocalStorage(editorInstance.current);
                },
                onReady: () => {
                    new DragDrop(editorInstance.current);

                    const headerBlockIndex = 0;
                    const block = editorInstance.current.blocks.getBlockByIndex(headerBlockIndex);
                    if (block) {
                        block.holder.querySelector('.ce-header').focus();
                    }
                },
            });
        };

        initEditor();

        return () => {
            if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        };
    }, [writeType, editData, editorInstance]);

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
            const data = await parallelUploadS3.promise();

            return {
                success: 1,
                file: {
                    url: data.Location,
                },
            };
        } catch (error) {
            console.error('Error uploading file:', error);
            return {
                success: 0,
                file: {
                    url: '',
                },
            };
        }
    };

    const handleUploadByUrl = async (url) => {
        return {
            success: 1,
            file: {
                url: url,
            },
        };
    };

    return (
        <div className='w-full' id='editorjs'></div>
    );
};
