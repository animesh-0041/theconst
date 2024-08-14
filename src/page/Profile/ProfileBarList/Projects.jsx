import { MdKeyboardArrowRight } from "react-icons/md";


const projectList = [
    {
        title: 'ZARA',
        image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: 'A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph.',
        url: 'https://zingy-concha-41e163.netlify.app/',
    },
    {
        title: 'FASHIQUE',
        image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: 'A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph.',
        url: 'https://fashque-sou842.vercel.app/',
    },
    {
        title: 'ELECTRO',
        image: 'https://images.pexels.com/photos/3153199/pexels-photo-3153199.jpeg?auto=compress&cs=tinysrgb&w=600',
        description: 'A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph.',
        url: 'https://electro-yzzdz9yh7-sou842.vercel.app/',
    }
]


export const Projects = () => {


    return (
        <div className="w-full flex flex-row gap-5">
            {projectList && projectList?.map((item, index) => (
                <div key={index} className="relative w-full max-w-[200px]">
                    <img
                        className="block w-full h-[130px] object-cover rounded-lg"
                        src={item.image}
                        alt={item.title}
                    />

                    <button
                        onClick={() => window.open(item.url)}
                        className="w-fit absolute bottom-1 right-1 bg-white rounded-full"
                    >
                        <MdKeyboardArrowRight size={27} className="text-black-700" />
                    </button>
                </div>
            ))}
        </div>
    )
}