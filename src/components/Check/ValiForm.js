export async function checkFunction(captcha, math, show, setShow, setValidityCaptcha) {
    if (captcha == math) {
        setShow(!show);
    }

    if (captcha == null || captcha == "") {
        setValidityCaptcha(!true)
    } else {
        setValidityCaptcha(true)
    }
}