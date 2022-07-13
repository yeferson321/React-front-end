export async function emailFunction(email, setValidityEmail1, setValidityEmail2) {
    if (email == "") {
        setValidityEmail1(!true)
    } else {
        setValidityEmail1(true)
    }

    if (email && email.search(/^[a-zA-Z0-9_.+-\ñ]+@[a-zA-Z]+\.[a-zA-Z.]+$/)) {
        setValidityEmail2(!true)
    } else {
        setValidityEmail2(true)
    }
}

export async function disabledFunction(email, button, data) {
    if (!email == "" && !email.search(/^[a-zA-Z0-9_.+-\ñ]+@[a-zA-Z]+\.[a-zA-Z.]+$/) && !email.match(/<script>/gi) && data.data.math == data.data.captcha) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}