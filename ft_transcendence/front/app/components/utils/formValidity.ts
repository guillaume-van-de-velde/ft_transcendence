export function emailValid(email: string): boolean {
    // const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    // if (regex.test(email) && email.length <= 320)
    //     return true;
    // return false;
    return true;
}

export function passwordValid(password: string): boolean {
    // if (password.length >= 3 && password.length <= 64)
    //     return true;
    // return false;
    return true;
}

export function pseudoValid(pseudo: string): boolean {
    if (pseudo.length >= 1 && pseudo.length <= 10)
        return true;
    return false;
}