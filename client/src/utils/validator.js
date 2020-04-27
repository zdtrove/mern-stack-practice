import { isEmail, isLength, isEmpty } from "validator";

export const GetErrorMessageOnChange = (name, value, rules) => {
    let err = null;
    for (const key in rules) {
        if (key === name) {
            const fieldName = rules[key];
            if (Array.isArray(value)) {
                if (fieldName.require && value.length === 0) {
                    err = `Please provide ${name} field`;
                }
            } else {
                if (fieldName.require && isEmpty(value)) err = `Please provide ${fieldName.name} field`;
                if (!isEmpty(value)) {
                    if (fieldName.minLength && !isLength(value, {min: fieldName.minLength})) {
                        err = `Please provide ${fieldName.minLength} character long ${fieldName.name}`;
                    }
                    if (fieldName.minLength && !isLength(value, {min: fieldName.minLength})) {
                        err = `Please provide ${fieldName.minLength} character long ${fieldName.name}`;
                    }
                    if (fieldName.isEmail && !isEmail(value)) {
                        err = "Invalid email address";
                    }
                }
            }
        }
    }
    return err;
}

export const GetErrorMessageOnSubmit = (data, rules) => {
    let errs = {};
    for (const key in rules) {
        const fieldName = rules[key];
        const fieldValue = data[key];
        if (Array.isArray(fieldValue)) {
            if (fieldName.require && fieldValue.length === 0) {
                errs[key] = `Please provide ${fieldName.name} field`;
            }
        } else {
            if (fieldName.require && isEmpty(data[key])) errs[key] = `Please provide ${fieldName.name} field`;
            if (!isEmpty(fieldValue)) {
                if (fieldName.minLength && !isLength(fieldValue, {min: fieldName.minLength})) {
                    errs[key] = `Please provide ${fieldName.minLength} character long ${fieldName.name}`;
                }
                if (fieldName.minLength && !isLength(fieldValue, {min: fieldName.minLength})) {
                    errs[key] = `Please provide ${fieldName.minLength} character long ${fieldName.name}`;
                }
                if (fieldName.isEmail && !isEmail(fieldValue)) {
                    errs[key] = "Invalid email address";
                }
                if (fieldName.match && fieldValue !== data[fieldName.match]) {
                    errs[key] = `${fieldName.name} does not match ${rules[fieldName.match].name}`;
                }
            }
        }
    }
    return errs;
}