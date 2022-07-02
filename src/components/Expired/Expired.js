import React, { useEffect } from 'react';

import Swal from 'sweetalert2'

function Expired() {

    useEffect(() => {     
        
        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 4700,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            
        })

        Toast.fire({
            icon: 'info',
            title: "Su sesion ha caducado",
            text: "Sera redireccionado a Inicio sesion ",
        }).then(() => {
            window.location.href = '/signin';
          })
    })

  return (
    <div className='Expired'>
        

    </div>
  );
}

export default Expired;
