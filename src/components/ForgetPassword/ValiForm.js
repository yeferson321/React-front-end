export async function checkFunction(captcha, code, show, setShow) {
    if (captcha == code) {
        setShow(!show);
    }
}

export async function emailFunction(email, setValidityEmail ) {
    if (email == "") {
        setValidityEmail(!true)
    } else {
        setValidityEmail(true)
    }
}

export async function disabledFunction(email, button) {
    if (!email == "" && !email.search(/^[a-zA-Z0-9_.+-\ñ]+@[a-zA-Z]+\.[a-zA-Z.]+$/)) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}