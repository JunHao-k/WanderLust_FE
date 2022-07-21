import * as yup from 'yup'

export const searchSchema = yup.object().shape({
    search: yup.string("Please enter a valid country or city").required("This field cannot be empty"),
    radioGroup: yup.string().required("Please select either country or city")
})