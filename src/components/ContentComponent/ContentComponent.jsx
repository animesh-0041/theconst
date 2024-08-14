

export const ContentComponent = ({contents}) => {
    return (
        <div className='w-full max-w-[700px] m-auto flex flex-col gap-8 h-full pb-6 pt-10 px-8'>
            {contents && contents?.map((content, index) => {
                if (content?.type === 'header') {
                    return (
                        <h1
                            key={index}
                            className='font-Golos text-[30px] leading-6 font-bold text-black-700'
                        >
                            {content?.value}
                        </h1>
                    )
                }
                if (content?.type === 'text') {
                    return (
                        <p
                            key={index}
                            className='font-Golos text-xs md:text-sm leading-5 font-normal text-black-500'
                        >
                            {content?.value}
                        </p>
                    )
                }
            })
            }
        </div>
    );
}