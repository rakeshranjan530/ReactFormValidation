
const validate = (values) => {
    const errors = {};
    const regex = /\S+@\S+\.\S+/;
    if (!values?.name) {
        errors.name = "Name is required";
    }
    if (!values?.email) {
        errors.email = "Email is required";
    } else if (!regex.test(values?.email)) {
        errors.email = "This is not a valid email";
    }
    if (!values?.password) {
        errors.password = "Password is required";
    }
    if (!values?.confirmPassword) {
        errors.confirmPassword = "Confirm-Password is required";
    } else if (values?.confirmPassword !== values?.password) {
        errors.confirmPassword = "Password doesn't match"
    }
    if (!values?.mobile) {
        errors.mobile = "Mobile no. is required";
    } else if (values?.mobile?.length !== 10) {
        errors.mobile = "Mobile Number not more than 10 digit";
    }
    return errors;
}

export default validate