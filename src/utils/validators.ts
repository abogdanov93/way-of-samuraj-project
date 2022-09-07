type validatorsType = (value: string) => string | undefined;

export const required: validatorsType = value => value ? undefined : "Field is required";

export const maxLengthCreator = (maxLength: number): validatorsType => value => {
    return value && value.length <= maxLength
        ? undefined
        : `The maximum limit is ${maxLength} symbols`;
}