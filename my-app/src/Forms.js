import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
const UserForm = ({ errors, touched, values, handleSubmit, status }) => {
        const [users, setUsers] = useState([]);
        console.log(users);
     useEffect(() => {
        if (status) {
            setUsers([...users, status]);
}
}, [status]);
console.log(status);

        return (
            <div className="ui container">
            <h1>MATRIX</h1>
                <Form className="ui form">
                <Field className="field"
                type="text"
                name="name"
                placeholder="NAME"/>
                {touched.name && errors.name && (
                <p className="error">{errors.name}</p>
                    )}
             <Field className="field"
                    type="email"
                    name="email"
                    placeholder="EMAIL"
                    />
                {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
        )}
               <Field 
                className="ui selection dropdown"
                component="select"
                name="role">

               <option>PILL OPTION</option>
               <option value="Blue Pill">Blue Pill</option>
               <option value="Red Pill">Red Pill</option>
               

        </Field>

           <Field className="field"
                  type="password"
                  name="password"
                  placeholder="PASSWORD"
                    />
                {touched.password && errors.password && (
                <p className="error">{errors.password}</p>
                )}
                <label className="checkbox-container">

                 <h3>FOLLOW THE RABBIT</h3>

                <Field
                 className="field"
                type="checkbox"
                name="serviceterms"
                checked={values.serviceterms}
                    />
             <span className="ui checkbox" />
             </label>
             <button className="ui button" type="submit">ENTER</button>
            </Form>
            {users.map(user => (
            <div>
            <h1>{user.name}</h1>
            <h1>{user.role}</h1>
            <h1>{user.email}</h1>
            </div>
 ))}
         
</div>
 )};
const FormUser = withFormik({
    mapPropsToValues({ name, email, role, password, serviceterms }) {
     return {
            name: name || '',
            email: email || '',
            role: role || '',
            password: password || '',
            serviceterms: serviceterms || false
        };
    },
validationSchema: Yup.object().shape({
        name: Yup.string().required('Please enter your full name.'),
        email: Yup.string().email('This email is not valid.').required('Please enter your email address.'),
        password: Yup.string().min(8, 'Your password must be at least 8 characters long.')
        .required('Please enter a password.'),
        serviceterms: Yup.boolean().test(
         'is-true',
        'Please agree to the terms of service to continue.',
        value => value === true
)
}),
        handleSubmit(values, { setStatus }) {
        axios
        .post('https://reqres.in/api/users/', values)
        .then(res => {
        setStatus(res.data);
    })
        .catch(error => console.log(error.response));
}
})(UserForm);
export default FormUser;