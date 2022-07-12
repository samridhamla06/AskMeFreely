import { ACCESS_TOKEN, GOOGLE_AUTH_URL, LOGGED_IN_NAME, LOGGED_IN_EMAIL } from '../constants/url';
import swal from 'sweetalert';

export const validateTokenAndLogin = (tokenId, updateUser) => {
    fetch(GOOGLE_AUTH_URL, {
        method: "POST",
        body: JSON.stringify({
            token: tokenId
        }),
        headers: {
            "Content-Type": "application/json",
            "authorization": tokenId
        }
    })
        .then((res) => res.json())
        .then((res) => {
            // store returned user somehow
            console.log('Update the user', res);
            if(res.errorCode){
                handleLogout(updateUser);
                return;
            }
            //update user state
            updateUser(res, true);
            //add token to local storage
            localStorage.setItem(ACCESS_TOKEN, tokenId);
            localStorage.setItem(LOGGED_IN_NAME, res.name);
            localStorage.setItem(LOGGED_IN_EMAIL, res.email);
        })
        .catch(
            err => {
                console.log('the error with the token', err);
            });
}

export const handleLoginFailure = (result) => {
    //swal("Google Login Failed", "error");
}

export const handleLogin = (googleData, updateUser) => {
    console.log('Try to login', googleData);

    if (!googleData.tokenId) {
        console.log('Token NOT present');
        return;
    }

    console.log('local storage is', localStorage);

    validateTokenAndLogin(googleData.tokenId, updateUser);
}

export const handleLogout = (updateUser) => {
    console.log('logout is called');
    updateUser(null, false);
    //delete the access token as well
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(LOGGED_IN_EMAIL);
    localStorage.removeItem(LOGGED_IN_NAME);
}

export const checkTokenFromResponse = (response, updateUser) => {
    if(response.errorCode && response.errorCode === '400-001'){
        swal("Oops!", "Your session is expired, Please Log in again", "error");
        handleLogout(updateUser);  
        return true;
    }
    return false;
}

