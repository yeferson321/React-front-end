import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { postSignupGoogleClient } from '../services/Client';
import styles from './GoogleSignin.module.css';
import Swal from 'sweetalert2';

function GoogleSignin() {

    const handleGoogleSignin = async () => {
        const googleProvider = new GoogleAuthProvider()
        try {

            await signInWithPopup(auth, googleProvider).then((data) =>{
                
                if (data._tokenResponse.emailVerified && data._tokenResponse.emailVerified == true) {

                    const form = {name: data._tokenResponse.displayName, email: data._tokenResponse.email, password: data._tokenResponse.localId}

                    postSignupGoogleClient(form).then((res) => {
        
                        const message = (res.data?.message ?? 'Intente de nuevo')
                        const answer = (res.data?.Respuesta ?? 'Intente de nuevo')
            
                        if (answer === true) {
            
                            localStorage.setItem('token', res.data?.token)
            
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 1500,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
            
                            Toast.fire({
                                icon: 'success',
                                title: [message],
                            }).then(() => {
                                window.location.href = 'welcome'
                            })  
            
                        } else if (answer === false) {
            
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top-end',
                                showConfirmButton: false,
                                timer: 4500,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
            
                            Toast.fire({
                                icon: 'info',
                                title: [message],
                            })
            
                        }
                    })
                } else {
                    console.log("intente mas tarde")
                }
                
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <button type="button" className={`${styles.btn} ${"btn btn-outline-secondary"}`} onClick={handleGoogleSignin}><i className={`${styles.bi} ${"bi bi-google"}`}></i>Continua con google</button>
    )
}

export default GoogleSignin
