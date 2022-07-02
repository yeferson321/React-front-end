import React from 'react';
import styles from './Nav3.module.css';

function Nav3() {

    return (
        <div className='Nav3'>
            <ul className={`${styles.nav} ${"nav justify-content-center"}`}>
                <li className="nav-item">
                    <a className={`${styles.navLink} ${"navLink nav-link disabled"}`}>Vea cómo Gymshark ahorra dinero al tiempo que mejora</a>
                </li>
            </ul>
        </div>
    );
}

export default Nav3;