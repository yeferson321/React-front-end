import React, { useState, useEffect, useContext } from 'react';
import { checkFunction } from '../Check/ValiForm';
import styles from './Check.module.css';
import { DataContext } from '../../context/DataContext';

const Check = () =>  {

    const {addData}  = useContext(DataContext);
    const [show, setShow] = useState(true);
    const [form, setForm] = useState({})
    const [validityCaptcha, setValidityCaptcha] = useState(true);
    const [math, setMath] = useState(Math.random().toString(36).slice(2, 8))

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value, });
    };
    
    const captcha = form.captcha;

    useEffect(() => {
        const data = { math: math, captcha: captcha}
        addData(data);
    },[captcha]);

    const validationCaptcha = () => {
        checkFunction(captcha, math, show, setShow, setValidityCaptcha)
    }

    return (

        <div className='check'>

            <div className={styles.container}>

                <div className="mb-3 text-center">
                    <label htmlFor="exampleInputPassword1" className={`${styles.formLabel} ${"formLabel form-label"}`} >Captcha de verificacion</label>
                    <input className={`${styles.formControl} ${"formControl form-control text-center"}`} type="text" placeholder={math} aria-label="Disabled input example"
                        disabled></input>
                </div>

                {show ? (
                    <div className={`${styles.botton} ${"botton text-center"}`}>
                        <label htmlFor="exampleInputPassword1" className={`${styles.formLabel} ${"formLabel form-label"}`} >Confirmar captcha de verificacion</label>
                        <input type="text" className={`${styles.formControl} ${"formControl form-control text-center"}`} id="formLabel" name='captcha' style={{}} onKeyUp={validationCaptcha} onBlur={validationCaptcha} onChange={handleChange} required />
                        {validityCaptcha ? (<div></div>) : (<label className={`${styles.validity} ${"validity form-label"}`} style={{ color: "#f67d7d" }} >El campo es obligatorio</label>)}
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