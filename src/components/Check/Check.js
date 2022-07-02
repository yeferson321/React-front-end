import React, { useState, useEffect, useContext, useRef } from 'react';
import { checkFunction } from '../ForgetPassword/ValiForm';
import styles from './Check.module.css';
import DataContext from '../../context/DataContext'

const Check = () => {

    const [show, setShow] = useState(true);
    const [form, setForm] = useState({})
    const [mathCode, setmathCode] = useState({})

    useEffect(() => {
        const math = Math.floor(Math.random() * (943838 + 13334));
        setmathCode(math)
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value, });
    };
    const captcha = form.captcha

    const validationCaptcha = () => {
        checkFunction(captcha, mathCode, show, setShow)
    }

    return (

        <div className='check'>

            <DataContext hola={true}/>

            <div className={styles.container}>

                <div className="mb-3 text-center">
                    <label htmlFor="exampleInputPassword1" className={`${styles.formLabel} ${"formLabel form-label"}`} >Captcha de verificacion</label>
                    <input className={`${styles.formControl} ${"formControl form-control text-center"}`} type="text" placeholder={mathCode} aria-label="Disabled input example"
                        disabled></input>
                </div>

                {show ? (
                    <div className={`${styles.botton} ${"botton text-center"}`}>
                        <label htmlFor="exampleInputPassword1" className={`${styles.formLabel} ${"formLabel form-label"}`} >Confirmar captcha de verificacion</label>
                        <input type="text" className={`${styles.formControl} ${"formControl form-control text-center"}`} id="formLabel" name='captcha' style={{}} onKeyUp={validationCaptcha} onChange={handleChange} required />
                    </div>
                ) : (
                    <div className="mb-3 text-center">
                        <label htmlFor="exampleInputPassword1" className={`${styles.formLabel} ${"formLabel form-label"}`} >Codigo correcto</label>
                    </div>
                )}

            </div>

        </div>
    );
}

export default Check;