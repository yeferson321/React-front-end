export async function nameFunction(name, setValidityName1, setValidityName2) {
    if (name == "") {
        setValidityName1(!true)
    } else {
        setValidityName1(true)
    }

    if (name && name.search(/^[a-zA-Z\s]+$/)) {
        setValidityName2(!true)
    } else {
        setValidityName2(true)
    }
}

export async function emailFunction(email, setValidityEmail1, setValidityEmail2 ) {
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

export async function checkFunction(checkbox, setValidityCheck) {
    if (checkbox === true) {
        setValidityCheck(!true)
    } else {
        setValidityCheck(true)
    }
}

export async function disabledFunction(name, email, password1, password2, checkbox, button) {
    if (name !== "" && !name.search(/^[a-zA-Z\s]+$/) && email !== "" && !email.search(/^[a-zA-Z0-9_.+-\ñ]+@[a-zA-Z]+\.[a-zA-Z.]+$/) && password1 !== "" && password1 === password2 && password2 !== ""  && !password1.search(/^.{8,12}$/) && checkbox !== "" && checkbox === true && !name.match(/<script>/gi) && !email.match(/<script>/gi) && !password1.match(/<script>/gi) && !password2.match(/<script>/gi)) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}