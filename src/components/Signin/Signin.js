import React, { useState, useEffect } from 'react';
import { postSigninClient } from '../services/Client';
import { checkboxFunction } from '../Signin/ValiForm';
import { emailFunction } from '../Signin/ValiForm';
import { passwordoneFunction } from '../Signin/ValiForm';
import { disabledFunction } from '../Signin/ValiForm';
import styles from './Signin.module.css';
import Footer1 from '../Footer1/Footer1';
import Nav2 from '../Nav2/Nav2';
import Swal from 'sweetalert2'

function Signin() {

    const btnPassword1 = document.getElementById("password1");
    const [validityEmail1, setValidityEmail1] = useState(true);
    const [validityEmail2, setValidityEmail2] = useState(true);
    const [validityPassword1, setValidityPassword1] = useState(true);

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const email = form.email
    const password1 = form.password

    const validationEmail = () => {
        emailFunction(email, setValidityEmail1, setValidityEmail2)
    }

    const validationPassword1 = () => {
        passwordoneFunction(password1, setValidityPassword1)
    }

    const SwitchCheck = () => {
        checkboxFunction(btnPassword1)
    }

    useEffect(() => {
        const button = document.getElementById('btn');
        disabledFunction(email, password1, button)
    });

    const OnInit = (event) => {
        event.preventDefault();

        postSigninClient(form).then((res) => {

            console.log(res.data.message)
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
                
            } else {

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 7000,
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

    }

    return (
        <div className='signin'>
            <Nav2 />
            <div className={`${styles.container} ${"container"}`}>

                <h1 className={styles.h1}>Iniciar sesión</h1>
                <p className={styles.p}>¿No tienes una cuenta? <a href="http://localhost:3000/signup">Unete.</a></p>

                <form className={`${styles.form} ${"form"}`} onSubmit={OnInit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className={`${styles.formLabel} ${"formLabel form-label"}`}>Correo electronico</label>
                        <input type="text" id='email' className={`${styles.formControl} ${"formControl form-control"}`} aria-describedby="emailHelp"
                            placeholder='No compartimos tu correo electrónico' name='email' onKeyUp={validationEmail} onBlur={validationEmail} onChange={handleInputChange} required />
                        {validityEmail1 ? (<div></div>) : (<label className={`${styles.validity} ${"validity form-label"}`} style={{ color: "#f67d7d" }} >El campo es obligatorio</label>)}
                        {validityEmail2 ? (<div></div>) : (<label className={`${styles.validity} ${"validity form-label"}`} style={{ color: "#f67d7d" }} >Es necesario que su correo contenda un '@' y no cuente con caracteres especiales</label>)}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className={`${styles.formLabel} ${"formLabel form-label"}`}>Password contraseña</label>
                        <input type="password" id='password1' className={`${styles.formControl} ${"formControl form-control"}`} name='password' onKeyUp={validationPassword1} onBlur={validationPassword1} onChange={handleInputChange} required />
                        {validityPassword1 ? (<div></div>) : (<label className={`${styles.validity} ${"validity form-label"}`} style={{ color: "#f67d7d" }} >El campo es obligatorio</label>)}
                    </div>

                    <div className={`${styles.formCheck} ${"mb-3 formCheck form-switch"}`}>
                        <input className="form-check-input" type="checkbox" role="switch" onClick={SwitchCheck} />
                        <label className={`${styles.checkLabel} ${"checkLabel form-check-label"}`} htmlFor="flexSwitchCheckDefault">Mostrar contraseñas</label>
                    </div>

                    <button htmlFor="submit" className={`${styles.btnPrimary} ${"btn btnPrimary btn-primary"}`} id="btn">Continuar</button>
                    <a className={`${styles.forgot}`} href="/forgetpassword">¿Olvidaste tu contraseña?</a>
                </form>

                <div className='singinLogin'>
                    <hr className={styles.line}></hr>

                    <div className={`${styles.mb} ${"mb-1 mb"}`} >
                        <h5>Tambien inicia con</h5>
                    </div>
                </div>

            </div>
            <Footer1 />
        </div>
    );
}

export default Signin;