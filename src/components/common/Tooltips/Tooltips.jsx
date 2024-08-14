import './style.scss';


export const Tooltips = ({ children, type = "top", value }) => {

    if (!type) {
        return children;
    }

    return (
        value && <div className={type}>
            {children}
            <span className="tooltiptext">{value}</span>
        </div>
    )
}