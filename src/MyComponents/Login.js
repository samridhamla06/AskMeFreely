import React from 'react'
import GoogleLogin from 'react-google-login'

export const Login = () => {

    const handleLogin = (googleData) => {
        console.log('Try to login',googleData.tokenId);
       fetch("http://localhost:8080/oauth2?tokenID=" + googleData.tokenId, {
            method: "POST",
            body: JSON.stringify({
            token: googleData.tokenId
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then((res) => res.json())
        .catch(
            err => {
              console.log(err);
            });
        // store returned user somehow
      }


    return (
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_KEY}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
