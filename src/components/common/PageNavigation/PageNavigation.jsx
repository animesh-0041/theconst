import { useNavigate } from "react-router-dom";

export const PageNavigation = (props) => {
    const { children, className, url, full = false, disabled = false } = props;
    const navigation = useNavigate();


    if (children) {
        return (
            <div
                className={`${full && "w-full"} ${className} ${disabled ? "cursor-default" : "cursor-pointer"}`}
                onClick={() => navigation(url)}
            >
                {children}
            </div>
        )
    } else {
        navigation(url)
        return;
    }
}