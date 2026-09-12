import { useParams } from 'react-router-dom';

export const Menu = () => {
    const { restaurantId } = useParams();
    return <h1>Menu with {restaurantId}</h1>;
};
