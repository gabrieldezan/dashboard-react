import { useEffect } from 'react';

const Title = ({ value }) => {
    useEffect(() => {
        document.title = `${value} | WD Admin`;
    }, [value]);

    return null;
};

export default Title;