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

export async function passwordoneFunction(password1, setValidityPassword1) {
    if (password1 == "") {
        setValidityPassword1(!true)
    } else {
        setValidityPassword1(true)
    }
}

export async function checkboxFunction(btnPassword1) {
    if (btnPassword1.type == "password") {
        btnPassword1.type = "text"
    } else {
        btnPassword1.type = "password"
    }
}

export async function disabledFunction(email, password1, button) {
    if (email !== "" && password1 !== "" && !email.search(/^[a-zA-Z0-9_.+-\ñ]+@[a-zA-Z]+\.[a-zA-Z.]+$/) && !email.match(/<script>/gi) && !password1.match(/<script>/gi)) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}