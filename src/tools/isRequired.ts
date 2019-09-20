export const isRequired = (paramName: string) => {
  throw new Error(`param ${paramName} is required for this creation`)
}
