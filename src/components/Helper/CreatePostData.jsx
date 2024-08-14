import { MdDelete, MdPhotoSizeSelectActual } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { ImParagraphLeft } from "react-icons/im";
import { PiSubtitlesFill } from "react-icons/pi";
import { GoPlusCircle } from "react-icons/go";

export const EditCategoryOption = [
    { type: "title", logo: <PiSubtitlesFill size={'25px'} className="text-black-75" /> },
    { type: "paragraph", logo: <ImParagraphLeft size={'25px'} className="text-black-75" /> },
    { type: "code", logo: <FaCode size={'25px'} className="text-black-75" /> },
    { type: "image", logo: <MdPhotoSizeSelectActual size={'25px'} className="text-black-75" /> },
    { type: "gallery", logo: <GrGallery size={'25px'} className="text-black-75" /> },
];

export const EditCategoryOptionHover = [
    { type: "title", logo: <PiSubtitlesFill size={'20px'} className="text-black-75" /> },
    { type: "paragraph", logo: <ImParagraphLeft size={'20px'} className="text-black-75" /> },
    { type: "code", logo: <FaCode size={'20px'} className="text-black-75" /> },
    { type: "image", logo: <MdPhotoSizeSelectActual size={'20px'} className="text-black-75" /> },
    { type: "gallery", logo: <GrGallery size={'20px'} className="text-black-75" /> },
    { type: "delete", logo: <MdDelete size={'20px'} className="text-black-75" /> },
    { type: "create", logo: <GoPlusCircle size={'20px'} className="text-black-75" /> },
];

export const TypeOfPost = ['blog', 'tech', 'bugs', 'science', 'error', 'bussines', 'programing', 'economic'];

export const TypeOfSearch = ['stories', 'people'];
