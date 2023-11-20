import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

export interface UserDetails {
    id: number;
    username: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN';
    name: string;
    class: string;
}

export const getToken = () => {
    const token = Cookies.get('access_token');

    return token;
}

export const getUserDetails = async () => {
    const token = getToken();
    const userDetails: UserDetails = jwt.decode(token);
    console.log(userDetails);

    return userDetails;
}

export const getRole = () => {
    const token = getToken();
    const userDetails: UserDetails = jwt.decode(token);

    return userDetails.role;
}

export const tokenIsValid = (token: string) => {
    if (!token) {
        const token = getToken();
    }
    const decodedToken: any = jwt.decode(token);
    console.log(decodedToken.exp);

    return decodedToken.exp * 1000 > Date.now();
}

export const logout = () => {
    Cookies.remove('access_token');
}
