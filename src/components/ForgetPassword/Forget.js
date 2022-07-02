import React, { useState, useEffect, useContext } from 'react';
import { postForgetPassword } from '../services/Client'
import { emailFunction } from '../ForgetPassword/ValiForm';
import { disabledFunction } from '../ForgetPassword/ValiForm';
import Swal from 'sweetalert2';
import styles from './Forget.module.css';
import Footer1 from '../Footer1/Footer1';
import Nav2 from '../Nav2/Nav2';
import Check from '../Check/Check.js';
import {DataContext} from '../../context/DataContext';

const Forget = () => {

    const {data} = useContext(DataContext);
    const [validityEmail, setValidityEmail] = useState(true);
    const [form, setForm] = useState({ email: '' })
    console.log("this is componet forget", data)

    useEffect(() => {
        const email = form.email
        const button = document.getElementById("btn");
        disabledFunction(email, button)
    });

    const handleInputChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const validationEmail = () => {
        const email = form.email
        emailFunction(email, setValidityEmail)
    }

    const validationCheck = () => {
        postForgetPassword(form).then((res) => {
            console.log(form)

            const message = (res.data?.message ?? 'Intente de nuevo')
            const type = (res.data?.type ?? 'Intente de nuevo')
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
                }).then(() => {
                    document.getElementById(type).focus();
                })

            }
        })
    }

    return (
        <div className='Nav2'>
            <Nav2 />
            <div className={`${styles.container} ${"container"}`}>

                <h1 className={styles.h1}>¿Tienes problemas para iniciar sesión?</h1>
                <p className={styles.p}>Se enviara un codigo de verificion a tu correo</p>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className={`${styles.formLabel} ${"formLabel form-label"}`}>Correo electronico</label>
                    <input type="text" id='email' className={`${styles.formControl} ${"formControl form-control"}`} aria-describedby="emailHelp"
                        placeholder='No compartimos tu correo electrónico' name="email" onKeyUp={validationEmail} onBlur={validationEmail} onChange={handleInputChange} required />
                    {validityEmail ? (<div></div>) : (<label className={`${styles.validity} ${"validity form-label"}`} style={{ color: "#f67d7d" }} >El campo es obligatorio</label>)}
                </div> 

                <Check/>

                <button htmlFor="submit" className={`${styles.btnPrimary} ${"btn btnPrimary btn-primary"}`} id="btn" onClick={validationCheck}>Enviar codigo</button>
            </div>
            <Footer1 />
        </div>
    );
}

export default Forget;