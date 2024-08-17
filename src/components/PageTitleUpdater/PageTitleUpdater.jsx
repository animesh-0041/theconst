import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function transformString(input) {
    try {
        if (typeof input !== 'string') {
            return input;
        }

        const cleanedInput = input.startsWith('/') ? input.substring(1) : input;
        const lastPart = cleanedInput.split('/').pop();

        if (lastPart.includes('-')) {
            const withoutId = lastPart.substring(0, lastPart.lastIndexOf('-'));
            return withoutId.replace(/-/g, ' ');
        }

        return lastPart;
    } catch (error) {
        return input;
    }
}

function extractTextFromPath(path) {
    try {
        if (typeof path !== 'string') {
            return path;
        }
        const text = path.startsWith('/') ? path.substring(1) : path;

        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    } catch (error) {
        return path;
    }
}

export const PageTitleUpdater = () => {
    const location = useLocation();
    console.log(location && location.pathname?.split('/')?.pop(), 'location')

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                document.title = 'Const';
                break;
            case '/notification':
                document.title = extractTextFromPath(location.pathname);
                break;
            case '/write':
                document.title = extractTextFromPath(location.pathname);
                break;
            case '/login':
                document.title = extractTextFromPath(location.pathname);
                break;
            case '/register':
                document.title = extractTextFromPath(location.pathname);
                break;
            case '/search':
                document.title = extractTextFromPath(location.pathname);
                break;
            case '/privacypolicy':
                document.title = extractTextFromPath(location.pathname);
                break;
            case '/about':
                document.title = extractTextFromPath(location.pathname);
                break;
            case '/messages':
                document.title = extractTextFromPath(location.pathname);
                break;
            default:
                if (location.pathname.includes('/edit/')) {
                    document.title = extractTextFromPath(location.pathname);
                } else if (location.pathname.includes('/book/')) {
                    document.title = extractTextFromPath(location.pathname);
                } else if (location.pathname.includes('/')) {
                    document.title = transformString(location.pathname?.split('/')?.pop());
                } else {
                    document.title = extractTextFromPath(location.pathname);
                }
                break;
        }
    }, [location.pathname]);

    return null;
};