export const ellipsisType = ({ line = 2, height = '60px' }) => {
    return (
        { display: '-webkit-box', WebkitLineClamp: line, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: height }
    )
}

export const validatePassword = ({ password, confirmPassword, dispatch }) => {

    const uppercaseRegex = /[A-Z]/;
    // eslint-disable-next-line no-useless-escape
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const numberRegex = /[0-9]/;

    if (password !== confirmPassword) {
        dispatch({
            type: "SET_PASSWORD_ERROR",
            payload: "Password and confirmation do not match",
        });
        return false;
    } else if (password.length < 8) {
        dispatch({
            type: "SET_PASSWORD_ERROR",
            payload: "Password must be at least 8 characters long",
        });
        return false;
    } else if (!uppercaseRegex.test(password)) {
        dispatch({
            type: "SET_PASSWORD_ERROR",
            payload: "Password must contain at least one uppercase letter",
        });
        return false;
    } else if (!specialCharRegex.test(password)) {
        dispatch({
            type: "SET_PASSWORD_ERROR",
            payload: "Password must contain at least one special character",
        });
        return false;
    } else if (!numberRegex.test(password)) {
        dispatch({
            type: "SET_PASSWORD_ERROR",
            payload: "Password must contain at least one number",
        });
        return false;
    } else {
        dispatch({ type: "SET_PASSWORD_ERROR", payload: "" });
        return true;
    }
};

export const validateEmail = ({ email, dispatch }) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
        dispatch({ type: 'SET_EMAIL_ERROR', payload: "Inavlid Email" });
        return false;
    } else {
        dispatch({ type: 'SET_EMAIL_ERROR', payload: "" });
        return true;
    }
};


export const getFilteredData = (data) => {
    let title = null;
    let image = null;
    let paragraph = null;

    for (let item of data) {
        if (item.type === 'title' && !title) {
            title = item;
        } else if (item.type === 'image' && !image) {
            image = item;
        } else if (item.type === 'paragraph' && !paragraph) {
            paragraph = item;
        }

        // Break the loop if all types have been found
        if (title && image && paragraph) {
            break;
        }
    }

    return { title, image, paragraph };
};

export const Statistic = ({ title, value }) => {
    return (
        <div className='w-full flex flex-col items-center gap-2'>
            <h2 className='font-Golos font-medium text-xs md:text-sm leading-5 text-black-700'>{title || ''}</h2>
            <p className='font-Golos font-normal text-xs leading-4 text-black-300'>{value || ''}</p>
        </div>
    )
}