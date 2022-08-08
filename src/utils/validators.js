export const required = value => value ? undefined : "Field is required";

export const maxLengthCreator = maxLength => value => {
    return value && value.length <= maxLength
        ? undefined
        : `The maximum limit is ${maxLength} symbols`;
}