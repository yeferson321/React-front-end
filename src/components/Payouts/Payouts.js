import React, { useState } from 'react';
import { postPayoutsClient} from '../services/Client';
import Swal from 'sweetalert2'

function Payouts() {

  const [datos, setDatos] = useState({
    email: '',
    courren: ''
  })

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }

  const OnInit = (event) => {
    event.preventDefault();
    console.log(datos)

    postPayoutsClient(datos).then((res) => {
      const error = (res.data.error?.[0].issue ?? res.data?.message)
      const answer = (res.data?.Respuesta ?? 'Intente de nuevo')
      console.log(error)
      console.log(answer)
      
      if (answer === false) {

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'info',
          title: [ error ],
        })

      } else {

      }
    })
  }

  return (
    <div>
      <div>
        <form onSubmit={OnInit}>
          <label htmlFor="exampleInputEmail1" className="form-label" >courren</label>
          <input type="text"
            name='courren'
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleInputChange} required />
          <label htmlFor="exampleInputEmail1" className="form-label" >email</label>
          <input type="text"
            name='email'
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            onChange={handleInputChange} required />
          <button type='submit'
            className="btn btn-primary">Primary</button>
        </form>
      </div>
    </div>
  );
}

export default Payouts;
