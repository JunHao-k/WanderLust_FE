import * as yup from 'yup'

export const updateSchema = yup.object().shape({

    type: yup.string("Choose either Attraction , Food or Activity").required("This field cannot be empty"),
    name: yup.string("What is the name of your recommendation?").required("This field cannot be empty"),
    author: yup.string("Let others know that you shared this").required("This field cannot be empty").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
    description1: yup.string("Short description required").required("This field cannot be empty"),
    description2: yup.string("Short description required").required("This field cannot be empty"),
    description3: yup.string("Short description required").required("This field cannot be empty"),
    country: yup.string("Select the country where your recommendation is located").required("This field cannot be empty"),
    city: yup.string("Select the city where your recommendation is located").required("This field cannot be empty").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field"),
    email: yup.string().email("Please enter a valid email").required("This field cannot be empty"),
    article: yup.string("Write a short article for your recommendation").required("This field cannot be empty"),
    ratings: yup.number().required("This field cannot be empty"),
    price: yup.number().required("This field cannot be empty"),
    stars: yup.number().required("This field cannot be empty"),
    tags_id: yup.array().min(1).of(yup.string()).required("This field cannot be empty"),
    image_url: yup.string().url().required("This field cannot be empty")

})