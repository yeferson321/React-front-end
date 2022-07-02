import React from 'react';
import Swal from 'sweetalert2'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Paypal() {

    return (
        <PayPalScriptProvider options={{ "client-id": "AXdCq5lXL9IBHJ2WlALEfmRPy7x7DMdBOZHsNjfrZTj1siFNSAH2TXgtAEw9eMi19QywQR20A6kBog3v" }}>
            <div className='hola'>
                <div className='hola2'>
                    <PayPalButtons
                        style={{
                            color: 'blue',
                            shape: 'pill',
                            label: 'pay'
                        }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: "3.50",
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {

                                const dat = details;
                                const full_name = details.purchase_units[0].shipping.name.full_name;
                                const payer_id = details.payer.payer_id;
                                const email_address = details.payer.email_address;
                                const id = details.id;
                                const status = details.status;
                                const update_time = details.update_time;
                                const currency_code = details.purchase_units[0].amount.currency_code;
                                const address_line_1 = details.purchase_units[0].shipping.address.admin_area_1;
                                const country_code = details.purchase_units[0].shipping.address.country_code;
                                const final_capture = details.purchase_units[0].payments.captures[0].final_capture;
                                const amount_id = details.purchase_units[0].payments.captures[0].id;
                                const user_payer = details.purchase_units[0].payee.merchant_id;


                                console.log(full_name, email_address, user_payer, payer_id, id, status, update_time, currency_code, address_line_1, country_code, final_capture, amount_id);
                            });

                        }}
                        onCancel={(data, actions) => {
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
                                title: 'Compra cancelada :('
                            })
                        }}
                        onError={(err) => {
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
                                title: 'Ha habido un error en el pago, intenta de nuevo :)'
                            })
                        }}
                    />
                </div>
            </div>

        </PayPalScriptProvider>
    );
}

export default Paypal;
