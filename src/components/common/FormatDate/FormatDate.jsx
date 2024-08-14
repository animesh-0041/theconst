import { format, isValid } from 'date-fns';


export const FormatDate = ({ dateString }) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    return date.toLocaleDateString('en-US', options);
};

export const ChatTimeFormater = (dateString) => {
    const date = new Date(dateString);
    if (!isValid(date)) {
        return '';
    }
    return format(date, 'hh:mm a');
}

export const FormatString = (str) => {
    if (typeof str !== 'string' || !str) {
        return 'author';
    }
    return str.toLowerCase().trim().replace(/\s+/g, '-');
};


export const formatDateTime = (dateTimeStr) => {
    try {
        const date = new Date(dateTimeStr);
        if (isNaN(date)) return ("---");

        const optionsDate = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', optionsDate);

        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

        return `${formattedDate} • ${formattedTime}`;
    } catch (error) {
        return ("---");
    }
}