import React, { useState, useEffect, useContext } from 'react';
import { postForgetPassword } from '../services/Client'
import { emailFunction } from '../ForgetPassword/ValiForm';
import { disabledFunction } from '../ForgetPassword/ValiForm';
import Swal from 'sweetalert2';
import styles from './Forget.module.css';
import Footer1 from '../Footer1/Footer1';
import Nav2 from '../Nav2/Nav2';
import Check from '../Check/Check.js';
import { DataContext } from '../../context/DataContext';

const Forget = () => {

    const data = useContext(DataContext)
    const [validityEmail1, setValidityEmail1] = useState(true);
    const [validityEmail2, setValidityEmail2] = useState(true);
    const [validitySpinner, setValiditySpinner] = useState(true);
    const [form, setForm] = useState({ email: '' })

    useEffect(() => {
        const email = form.email
        const button = document.getElementById("btn");
        disabledFunction(email, button, data)
    });

    const handleInputChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const validationEmail = () => {
        const email = form.email
        emailFunction(email, setValidityEmail1, setValidityEmail2)
    }

    const validationCheck = () => {
        setValiditySpinner(false)
        postForgetPassword(form).then((res) => {

            const message = (res.data?.message ?? 'Intente de nuevo')
            const type = (res.data?.type ?? 'Intente de nuevo')
            const answer = (res.data?.Respuesta ?? 'Intente de nuevo')

            if (answer === true) {

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: [message],
                })
                setValiditySpinner(true)
                //.then(() => {
                //    window.location.href = '/signin'
                //})

            } else if (answer === false) {

                setTimeout(function(){setValiditySpinner(true);}, 1500);
                
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
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
                <p className={styles.p}>Le enviaremos un enlace a su correo para restablecer su contraseña.</p>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className={`${styles.formLabel} ${"formLabel form-label"}`}>Correo electronico</label>
                    <input type="text" id='email' className={`${styles.formControl} ${"formControl form-control"}`} aria-describedby="emailHelp"
                        placeholder='No compartimos tu correo electrónico' name="email" onKeyUp={validationEmail} onBlur={validationEmail} onChange={handleInputChange} required />
                    {validityEmail1 ? (<div></div>) : (<label className={`${styles.validity} ${"validity form-label"}`} style={{ color: "#f67d7d" }} >El campo es obligatorio</label>)}
                    {validityEmail2 ? (<div></div>) : (<label className={`${styles.validity} ${"validity form-label"}`} style={{ color: "#f67d7d" }} >Es necesario que su correo contenda un '@' y no cuente con caracteres especiales</label>)}
                </div>

                <Check />

                {validitySpinner ? (<button htmlFor="submit" className={`${styles.btnPrimary} ${"btn btnPrimary btn-primary"}`} id="btn" onClick={validationCheck}>Enviar corro electronico</button>) : (                
                <div class="d-flex justify-content-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>)}
            </div>
            <Footer1 />
        </div>
    );
}

export default Forget;