import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { postNewPassword } from '../services/Client';
import { emailFunction } from '../NewPassword/ValiForm';
import { passwordoneFunction } from '../NewPassword/ValiForm';
import { passwordtwoFunction } from '../NewPassword/ValiForm';
import { disabledFunction } from '../NewPassword/ValiForm';
import { checkboxFunction } from '../NewPassword/ValiForm';
import styles from './New.module.css';
import Footer1 from '../Footer1/Footer1';
import Nav2 from '../Nav2/Nav2';
import Swal from 'sweetalert2';
import { isExpired, decodeToken } from "react-jwt";

function Newpassword() {

    let params = useParams();
    const [validityToken, setValidityToken] = useState(isExpired(params.token));
    const [token, setToken] = useState(params.token);
    const [validityEmail1, setValidityEmail1] = useState(true);
    const [validityEmail2, setValidityEmail2] = useState(true);
    const [validityPassword, setValidityPassword] = useState(true);
    const [validityPassword1, setValidityPassword1] = useState(true);
    const [validityPassword2, setValidityPassword2] = useState(true);
    const btnPassword1 = document.getElementById("password1");
    const btnPassword2 = document.getElementById("password2");
    console.log(token)
    
    const [form, setForm] = useState({ email: '', password1: '', password2: '', token: token })

    const handleInputChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const email = form.email
    const password1 = form.password1
    const password2 = form.password2

    const validationEmail = () => {
        emailFunction(email, setValidityEmail1, setValidityEmail2)
    }

    const validationPassword1 = () => {
        passwordoneFunction(password1, setValidityPassword, setValidityPassword1)
    }

    const validationPassword2 = () => {
        passwordtwoFunction(password1, password2, setValidityPassword2)
    }

    const SwitchCheck = () => {
        checkboxFunction(btnPassword1, btnPassword2)
    }

    useEffect(() => {
        const button = document.getElementById("btn");
        disabledFunction(email, password1, password2, button)
    });

    const OnInit = (event) => {
        event.preventDefault();

        postNewPassword(form).then((res) => {

            const message = (res.data?.message ?? 'Intente de nuevo')
            const type = (res.data?.type ?? 'Intente de nuevo')
            const answer = (res.data?.Respuesta ?? 'Intente de nuevo')

            if (answer === true) {

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
                    window.location.href = '/signin'
                })

            } else {

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
        <div className='Newpassword'>
            <Nav2 />
            {validityToken ? (
                <div className={`${styles.containerTwo} ${"containerTwo"}`}>
                    <p className={styles.p}>Los enlaces de restablecimiento de contraseña caducan después de 10 minutos. Genere uno nuevo en la página de olvidaste tu contraseña.</p> 
                    <a class={`${styles.btnPrimary} ${styles.btnPrimarytwo} ${"btnPrimary btnPrimarytwo btn btn-primary"}`} href="/" role="button">Volver al inicio</a>
                </div>
            ) : (
                <div className={`${styles.container} ${"container"}`}>

                    <h1 className={styles.h1}>Restablecer la contraseña</h1>
                    <p className={styles.p}>Ingrese su correo electrónico registrado y su nueva contraseña</p>

                    <form className={`${styles.form} ${"form"}`} onSubmit={OnInit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className={`${styles.formLabel} ${"formLabel form-label"}`}>Correo electronico</label>
                            <input type="text" id='email' className={`${styles.formControl} ${"formControl form-control"}`} aria-describedby="emailHelp"
                                placeholder="No compartimos tu correo con nadie" name='email' onKeyUp={validationEmail} onBlur={validationEmail} onChange={handleInputChange} required />
                            {validityEmail1 ? (<div></div>) : (<label className={`${styles.validity} ${"validity form-label"}`} style={{ color: "#f67d7d" }} >El campo es obligatorio</label>)}
                            {validityEmail2 ? (<div></div>) : (<label className={`${styles.validity} ${"validity form-label"}`} style={{ color: "#f67d7d" }} >Es necesario que su correo contenda un '@' y no cuente con caracteres especiales</label>)}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className={`${styles.formLabel} ${"formLabel form-label"}`}>Nueva contraseña</label>
                            <input type="password" id='password1' className={`${styles.formControl} ${"formControl form-control"}`} name='password1' onKeyUp={validationPassword1} onBlur={validationPassword1} onChange={handleInputChange} required />
                            {validityPassword ? (<div></div>) : (<label className={`${styles.validity} ${"validity form-label"}`} style={{ color: "#f67d7d" }} >El campo es obligatorio</label>)}
                            {validityPassword1 ? (<div></div>) : (<label className={`${styles.validity} ${"validity form-label"}`} style={{ color: "#f67d7d" }}>La contraseña debe tener minimo 8 caracteres y maximo 12, prueba con una combinación de letras y números</label>)}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className={`${styles.formLabel} ${"formLabel form-label"}`}>Confirma contraseña nueva</label>
                            <input type="password" id='password2' className={`${styles.formControl} ${"formControl form-control"}`} name='password2' onKeyUp={validationPassword2} onBlur={validationPassword2} onChange={handleInputChange} required />
                            {validityPassword2 ? (<div></div>) : (<label className={`${styles.validity} ${"validity form-label"}`} style={{ color: "#f67d7d" }} >Las contraseñas no coinciden</label>)}
                        </div>

                        <div className={`${styles.formCheck} ${"mb-3 formCheck form-switch"}`}>
                            <input className="form-check-input" type="checkbox" role="switch" onClick={SwitchCheck} />
                            <label className={`${styles.checkLabel} ${"checkLabel form-check-label"}`} htmlFor="flexSwitchCheckDefault">Mostrar contraseñas</label>
                        </div>

                        <button htmlFor="submit" className={`${styles.btnPrimary} ${"btn btnPrimary btn-primary"}`} id="btn">Continuar</button>
                    </form>

                </div>
            )}

            <Footer1 />
        </div>
    )
}

export default Newpassword