import LoginUser from '../models/LoginUser.js';
import RegisterUser from '../models/RegisterUser.js';


const BASE_URL = 'http://localhost:8080/api';

const loginController = async (email, password) => {
    const user = new LoginUser(email, password);

    const response = await axios.post(`${ BASE_URL }/auth/login`, user)
        .then(result => {
            console.log( result.data )
            return result.data;
        })
        .catch(error => {
            console.error('Error:', error.response.data);
            return error.response.data;
        });
    
    return response;
};

const registerController = async (identificationNumber, name, email, password) => {
    const user = new RegisterUser(identificationNumber, name, email, password);

    const response = await axios.post(`${ BASE_URL }/users/register`, user)
        .then(result => {
            console.log( result.data )
            return result.data;
        })
        .catch(error => {
            console.error('Error:', error);
            return error.response.data;
        });
    
    return response;
}


const getUserById = async (idUser, token) => {
    

    const response = await axios.get(`${ BASE_URL }/users/${ idUser }`,
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            }
        })
        .then(result => {
            console.log( result.data )
            return result.data;
        })
        .catch(error => {
            console.error('Error:', error);
            return error.response.data;
        });
    
    return response;
}

export default { loginController, registerController, getUserById };