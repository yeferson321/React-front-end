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

export async function passwordoneFunction(password1, setValidityPassword, setValidityPassword1) {
    if (password1 == "") {
        setValidityPassword(!true)
    } else (
        setValidityPassword(true)
    )

    if (password1 && password1.search(/^.{8,12}$/)) {
        setValidityPassword1(!true)
    } else (
        setValidityPassword1(true)
    )
}

export async function passwordtwoFunction(password1, password2, setValidityPassword2) {
    if (password2 == "" || password1 !== password2 ) {
        setValidityPassword2(!true)
    } else (
        setValidityPassword2(true)
    )
}

export async function checkboxFunction(btnPassword1, btnPassword2) {
    if (btnPassword1.type == "password") {
        btnPassword1.type = "text"
        btnPassword2.type = "text"
    } else {
        btnPassword1.type = "password"
        btnPassword2.type = "password"
    }
}

export async function disabledFunction(email, password1, password2, button) {
    if (email !== "" && !email.search(/^[a-zA-Z0-9_.+-\ñ]+@[a-zA-Z]+\.[a-zA-Z.]+$/) && !email.match(/<script>/gi) && password1 !== "" && !password1.match(/<script>/gi) && !password1.search(/^.{8,12}$/) && password2 !== "" && !password2.match(/<script>/gi) && password1 == password2) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}