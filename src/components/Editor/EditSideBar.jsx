import { EditCategoryOption } from "../../components/Helper/CreatePostData.jsx"
import { Button } from '../common/Button/Button.jsx'

export const EditSideBar = (props) => {
    const { content, setContent } = props

    const addCategory = ({ type, data }) => {
        const newContent = { type: type, content: data || ``, placeholder: 'Write paragraph' };
        const updatedContent = [
            ...content,
            newContent
        ];
        setContent(updatedContent);
    };

    const handleClick = (type) => {
        if (type === 'image') {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        addCategory({ type, data: event.target.result });
                    };
                    reader.readAsDataURL(file);
                }
            };
            fileInput.click();
            return;
        } else if (type === 'gallery') {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.multiple = true;
            fileInput.onchange = (e) => {
                const files = Array.from(e.target.files);
                const promises = files.map((file) => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            resolve(event.target.result);
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                });

                Promise.all(promises)
                    .then((images) => {
                        addCategory({ type, data: images });
                    })
                    .catch((error) => {
                        console.error('Error reading files: ', error);
                    });
            };
            fileInput.click();
            return;
        } else {
            addCategory({ type, data: `` });
        }
    }

    return (
        <div className="w-fit flex flex-col gap-5 px-4 py-4 mt-6">
            {EditCategoryOption && EditCategoryOption?.map((item, ind) => (
                <Button key={ind} onClick={() => handleClick(item.type)} className="hover:bg-black-25 rounded">
                    {item.logo}
                </Button>
            ))}
        </div>
    )
}