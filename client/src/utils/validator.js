import { isEmail, isLength, isEmpty } from "validator";

export const GetErrorMessage = (fieldName, ruleName, rules, data) => {
	let error = null;
	if (ruleName === 'check_length') {
        if (!isLength(data, {min: rules.min})) error = `Please provide ${rules.min} character long ${fieldName}`;
        if (!isLength(data, {max: rules.max})) error = `Please provide a ${fieldName} shorter than ${rules.max} characters`;
    }
    if (ruleName === 'check_email') {
        if (!isEmail(data)) error = 'Invalid email address';
    }
	return error;
}

export const GetErrorMessage2 = (name, value, rules) => {
    const mapName = {
        userName: 'Username',
        email: 'Email address',
        password: 'Password',
        passwordConfirm: 'Password Confirm'
    }
    let error = null;

    if (isEmpty(value)) {
        error = `Please provide ${mapName[name]} field`;
    } else {
        rules.map(rule => {
            if (name === rule[0]) {
                error = rule;
            }
        });
    }
    

	return error;
}