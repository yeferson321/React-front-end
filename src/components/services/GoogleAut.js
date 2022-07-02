import React, { useEffect } from "react";
import jwt_decode from 'jwt-decode'

const Init = () => {

    function handleCallbackResponse(response) {
        console.log("encode: " + response.credential)
        var userObject = jwt_decode(response.credential)
        console.log(userObject)
    }

    useEffect(() => {
        /* global google */
        window.google.accounts.id.initialize({
            client_id: '356030088254-na65r360n55bc1e1bkrva3f4cdlstqg7.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        window.google.accounts.id.renderButton(
            document.getElementById("singInDiv"),
            { theme: "outline", size: "large", text: "signup_with", shape: "circle", width: 300, nonce: "biaqbm70g23", context: "signup", itp_support: false }
        )
    })

    return (
        <div>
            <div id="singInDiv" className=""></div>
        </div>
    )
}

export default Init;