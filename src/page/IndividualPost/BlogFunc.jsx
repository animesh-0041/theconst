import { FaHeart } from "react-icons/fa"
import { RiHeart3Line } from "react-icons/ri"


export const BlogFunc = ({ renderType, type, onClick, }) => {

    switch (type) {
        case 'like':
            return (
                renderType ?
                    <FaHeart onClick={onClick} className='cursor-pointer text-black-500' size={'24px'} />
                    :
                    <RiHeart3Line onClick={onClick} className='cursor-pointer text-black-75' size={'24px'} />

            )
        default:
            return null
    }
}