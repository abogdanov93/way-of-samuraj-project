type ValidatorsType = (value: string) => string | undefined

export const required: ValidatorsType = value => value ? undefined : "Field is required"

export const maxLengthCreator = (maxLength: number): ValidatorsType => value => {
    return value && value.length <= maxLength
        ? undefined
        : `The maximum limit is ${maxLength} symbols`
}