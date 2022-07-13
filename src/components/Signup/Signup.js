import React, { useState, useEffect } from 'react';
import { postSignupClient } from '../services/Client';
import { nameFunction } from '../Signup/ValiForm';
import { emailFunction } from '../Signup/ValiForm';
import { checkFunction } from '../Signup/ValiForm';
import { checkboxFunction } from '../Signup/ValiForm';
import { passwordoneFunction } from '../Signup/ValiForm';
import { passwordtwoFunction } from '../Signup/ValiForm';
import { disabledFunction } from '../Signup/ValiForm';
import Footer1 from '../Footer1/Footer1';
import Nav2 from '../Nav2/Nav2';
import GoogleSignin from '../GoogleSignin/GoogleSignin'
import Swal from 'sweetalert2';
import styles from './Signup.module.css';

function Signup() {

    const [validityName1, setValidityName1] = useState(true);
    const [validityName2, setValidityName2] = useState(true);
    const [validityEmail1, setValidityEmail1] = useState(true);
    const [validityEmail2, setValidityEmail2] = useState(true);
    const [validityPassword, setValidityPassword] = useState(true);
    const [validityPassword1, setValidityPassword1] = useState(true);
    const [validityPassword2, setValidityPassword2] = useState(true);
    const [validityCheck, setValidityCheck] = useState(false);

    const [form, setForm] = useState({ name: '', email: '', password1: '', password2: '', checkbox: '' })

    const handleInputChange = (event) => {setForm({ ...form, [event.target.name]: event.target.value }); }
    const handleInputCheck = (event) => { setForm({ ...form, [event.target.name]: event.target.checked }); }

    const name = form.name
    const email = form.email
    const password1 = form.password1
    const password2 = form.password2
    const checkbox = form.checkbox

    useEffect(() => {
        const button = document.getElementById("btn");
        disabledFunction(name, email, password1, password2, checkbox, button)
    });

    const validationName = () => {
        nameFunction(name, setValidityName1, setValidityName2)
    }

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
        const btnPassword1 = document.getElementById("password1");
        const btnPassword2 = document.getElementById("password2");
        checkboxFunction(btnPassword1, btnPassword2)
    }

    const validationCheck = () => {
        checkFunction(checkbox, setValidityCheck)
    }

    const OnInit = (event) => {
        event.preventDefault();

        postSignupClient(form).then((res) => {

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
        <div className='Registration'>
            <Nav2 />

            <div className={styles.container}>

                <h1 className={styles.h1}>Crear cuenta</h1>
                <p className={styles.p}>¿Ya tienes una cuenta? <a className='link' href="http://localhost:3000/signin">Inicia sesión.</a></p>

                <form onSubmit={OnInit}>
                    <div className="mb-3">
                        <label htmlFor="inputName" className={`${styles.formLabel} ${"form-label"}`} >Nombre completo</label>
                        <input type="text" className={`${styles.formControl} ${"form-control"}`}
                            name='name' id='name' value={form.name} onKeyUp={validationName} onBlur={validationName} onChange={handleInputChange}/>
                        {validityName1 ? (<div></div>) : (<label className={`${styles.validity} ${"form-label"}`} style={{ color: "#f67d7d" }} >El campo es obligatorio</label>)}
                        {validityName2 ? (<div></div>) : (<label className={`${styles.validity} ${"form-label"}`} style={{ color: "#f67d7d" }} >Su nombre no debe contener numeros o caracteres especiales, solo se permiten letras (a-z)</label>)}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className={`${styles.formLabel} ${"form-label"}`}>Correo electronico</label>
                        <input type="text" className={`${styles.formControl} ${"form-control"}`} aria-describedby="emailHelp"
                            placeholder='No compartimos tu correo electrónico' name='email' id='email' value={form.email} onKeyUp={validationEmail} onBlur={validationEmail} onChange={handleInputChange}  />
                        {validityEmail1 ? (<div></div>) : (<label className={`${styles.validity} ${"form-label"}`} style={{ color: "#f67d7d" }} >El campo es obligatorio</label>)}
                        {validityEmail2 ? (<div></div>) : (<label className={`${styles.validity} ${"form-label"}`} style={{ color: "#f67d7d" }} >Es necesario que su correo contenda un '@' y no cuente con caracteres especiales</label>)}                  
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className={`${styles.formLabel} ${"form-label"}`}>Contraseña</label>
                        <input type="password" className={`${styles.formControl} ${"form-control"}`} 
                            name='password1' id='password1' value={form.password1} onKeyUp={validationPassword1} onBlur={validationPassword1} onChange={handleInputChange}  />
                        {validityPassword ? (<div></div>) : (<label className={`${styles.validity} ${"form-label"}`} style={{ color: "#f67d7d" }} >El campo es obligatorio</label>)}
                        {validityPassword1 ? (<div></div>) : (<label className={`${styles.validity} ${"form-label"}`} style={{ color: "#f67d7d" }}>La contraseña deber tener minimo 8 caracteres y maximo 12, prueba con una combinación de letras y números</label>)}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className={`${styles.formLabel} ${"form-label"}`} >Confirmar contraseña</label>
                        <input type="password" className={`${styles.formControl} ${"form-control"}`} 
                            name='password2' id='password2' value={form.password2} onKeyUp={validationPassword2} onBlur={validationPassword2} onChange={handleInputChange}  />
                        {validityPassword2 ? (<div></div>) : (<label className={`${styles.validity} ${"form-label"}`} style={{ color: "#f67d7d" }} >Las contraseñas no coinciden</label>)}
                    </div>

                    <div className={`${styles.formCheck} ${"mb-3 form-switch"}`}>
                        <input className="form-check-input" type="checkbox" role="switch" onClick={SwitchCheck} />
                        <label className={`${styles.checkLabel} ${"form-check-label"}`}  htmlFor="flexSwitchCheckDefault">Mostrar contraseñas</label>
                    </div>

                    <div className={`${styles.formCheck} ${"mb-3 form-switch"}`}>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitch" name='checkbox' onClick={validationCheck} onChange={handleInputCheck} />
                        <label className={`${styles.checkLabel} ${"form-check-label"}`} htmlFor="flexSwitchCheckDefault">Al registrarte confirmas que has leido los <a className='link'
                            href="http://localhost:3000/">Terminos y Condiciones</a></label>
                        {validityCheck ? (<div></div>) : (<label className={`${styles.validity} ${"form-label"}`} style={{ color: "#f67d7d" }} >Acepta las condiciones</label>)}
                    </div>

                    <button htmlFor="submit" className={`${styles.btnPrimary} ${"btn btn-primary"}`} id="btn">Continuar</button>

                </form>

                <div>
                    <hr className={styles.line}></hr>
                    <h5 className={`${styles.h5}`}>Tambien registrate con</h5>
                    <GoogleSignin />
                </div>

            </div>
            <Footer1 />
        </div>
    );
}

export default Signup;