import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import ReactPlayer from 'react-player/youtube';



export const Content = ({ block }) => {

    const ImageSizeFormatHandler = (props) => {
        const {
            withBorder = false,
            withBackground = false,
            stretched = false
        } = props;

        const format = `${withBackground ? 'bg-[#cecece]' : ''} ${stretched ? 'w-full h-full' : 'w-full h-full'} ${withBorder ? 'p-1 border border-black-50 rounded' : ''}`
        return format;
    };

    return (
        <React.Fragment>
            {(() => {
                switch (block.type) {
                    case 'header':
                        return <h2 className='w-full font-Golos text-2xl md:text-3xl font-bold text-black-700' dangerouslySetInnerHTML={{ __html: block.data.text }} />;
                    case 'paragraph':
                        return <p className='w-full font-Golos text-sm md:text-sm leading-5 font-normal text-black-500' dangerouslySetInnerHTML={{ __html: block.data.text }} />;
                    case 'image':
                        return (
                            <div className={`w-full h-auto flex flex-col gap-2 items-center ${ImageSizeFormatHandler({ withBorder: block.data.withBorder, withBackground: block.data.withBackground, stretched: block.data.stretched })}`}>
                                <img
                                    className='w-full rounded'
                                    loading='lazy'
                                    src={block.data.file.url}
                                    alt={block.data.file.url || 'captions'}
                                />
                                {block.data.file.caption &&
                                    <p className='font-Golos text-sm md:text-base font-semibold text-black-500' dangerouslySetInnerHTML={{ __html: block.data.caption }} />
                                }
                            </div>
                        );
                    case 'inlineImage':
                        return (
                            <div className={`w-full h-auto flex flex-col gap-2 items-center ${ImageSizeFormatHandler({ withBorder: block.data.withBorder, withBackground: block.data.withBackground, stretched: block.data.stretched })}`}>
                                <img
                                    className='w-full rounded'
                                    loading='lazy'
                                    src={block.data.url}
                                    alt={block.data.url || 'captions'}
                                />
                                {block.data.caption &&
                                    <p className='font-Golos text-sm md:text-base font-semibold text-black-500' dangerouslySetInnerHTML={{ __html: block.data.caption }} />
                                }
                            </div>
                        );
                    case 'youtubeEmbed':
                        return (
                            <div className='w-full flex flex-col gap-2'>
                                <ReactPlayer width={'100%'} url={block.data.url} controls={true} />
                            </div>
                        );
                    case 'list':
                        return (
                            <div className='w-full flex flex-col gap-2 ml-6'>
                                {block.data.items.map((item, index) => (
                                    <div key={index} className='w-full flex flex-row items-center gap-3'>
                                        <p className={`${block.data.style === 'ordered' ? "min-w-6 text-sm md:text-base font-normal" : 'font-Golos text-2xl font-semibold'} flex flex-row items-center text-black-700`}>
                                            {block.data.style === 'ordered' ? `${index + 1}.` : '•'}
                                        </p>
                                        <p className='font-Golos text-sm md:text-base font-normal text-black-500' dangerouslySetInnerHTML={{ __html: item }} />
                                    </div>
                                ))}
                            </div>
                        );
                    case 'code':
                        return (
                            <div className='w-full text-sm md:text-base'>
                                <CopyBlock
                                    id="hide_scrollbar"
                                    text={block?.data?.code}
                                    language={'jsx'}
                                    showLineNumbers={false}
                                    wrapLines={true}
                                    codeBlock={true}
                                    theme={dracula}
                                />
                            </div>
                        );
                    case 'raw':
                        return (
                            <div className='w-full text-sm md:text-base'>
                                <CopyBlock
                                    id="hide_scrollbar"
                                    text={block?.data?.html}
                                    language={'html'}
                                    showLineNumbers={false}
                                    wrapLines={true}
                                    codeBlock={true}
                                    theme={dracula}
                                />
                            </div>
                        );
                    case 'quote':
                        return (
                            <blockquote className='w-full flex flex-col gap-2'>
                                <p
                                    className='font-Golos text-xs md:text-base font-normal px-4 py-3 text-black-700 bg-[#d3d3d32f] border-l-[4px] border-[#ccc]'
                                    dangerouslySetInnerHTML={{ __html: block.data.text }}
                                />
                                {block.data.caption &&
                                    <footer
                                        className='border rounded px-4 py-3 font-Golos text-xs md:text-base font-normal text-black-500'
                                        dangerouslySetInnerHTML={{ __html: block.data.caption }}
                                    />
                                }
                            </blockquote>
                        );
                    case 'delimiter':
                        return <div className='w-full flex flex-row justify-center items-center py-5 text-2xl font-bold text-[#0a0a0a]'>* * *</div>;
                    case 'warning':
                        return (
                            <div className='w-full flex flex-col gap-2'>
                                {block.data.title &&
                                    <h3
                                        className='font-Golos text-xs md:text-base font-normal px-4 py-3 text-black-700 bg-[#ffa7a717] border-l-[4px] border-[#ff8282]'
                                        dangerouslySetInnerHTML={{ __html: block.data.title }}
                                    />
                                }
                                {block.data.message &&
                                    <p
                                        className='font-Golos text-xs md:text-base font-normal px-4 py-3 text-black-500 bg-[#ffa7a717]'
                                        dangerouslySetInnerHTML={{ __html: block.data.message }}
                                    />
                                }
                            </div>
                        );
                    case 'checklist':
                        return (
                            <div className='w-full px-4 py-1'>
                                {block.data.items.map((item, index) => (
                                    <div className='w-full flex flex-row gap-4 items-center' key={index}>
                                        <input type="checkbox" checked={item.checked} readOnly />
                                        <span className='font-Golos text-xs md:text-sm leading-5 font-normal text-black-500'>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        );
                    case 'table':
                        return (
                            <table className='w-full border'>
                                <tbody className='border'>
                                    {block.data.content.map((row, rowIndex) => {
                                        if (rowIndex === 0 && block.data.withHeadings === true) {
                                            return (
                                                <tr className='border' key={rowIndex}>
                                                    {row.map((cell, cellIndex) => (
                                                        <th
                                                            key={cellIndex}
                                                            dangerouslySetInnerHTML={{ __html: cell }}
                                                            className='border font-Golos text-start px-3 py-[6px] overflow-hidden text-[#252525]'
                                                        />
                                                    ))}
                                                </tr>
                                            )
                                        } else {
                                            return (<tr className='border' key={rowIndex}>
                                                {row.map((cell, cellIndex) => (
                                                    <td
                                                        key={cellIndex}
                                                        dangerouslySetInnerHTML={{ __html: cell }}
                                                        className='border font-Golos text-start px-3 py-[6px] overflow-hidden text-black-500'
                                                    />
                                                ))}
                                            </tr>)
                                        }
                                    })}
                                </tbody>
                            </table>
                        );
                    default:
                        return null;
                }
            })()}
        </React.Fragment>
    )
}