import React, {useEffect, useState} from 'react'
import {createAxios} from "../../utils/Helpers/AxiosHelper";
import {toast} from "react-toastify";
import {InputText} from "primereact/inputtext";
import {FloatLabel} from "primereact/floatlabel";
import {Password} from 'primereact/password';

import {Button} from "primereact/button";
import {beingLogin} from "../../utils/Helpers/UserHelper";
import {validateEmail} from "../../utils/Helpers/StringHelpers";

const api = createAxios()
const Register = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {

    }, [])


    const isValid = () => {
        return (
            isEmailValid() === true &&
            isPasswordAndNameValid()
        )
    }

    const isPasswordAndNameValid = () => {
        return !(
            name.length === 0 ||
            password.length === 0
        )
    }

    const isEmailValid = () => {
        return email.length > 0
            ? validateEmail(email.trim())
                ? true
                : 'Please enter valid email address'
            : true
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        if (isValid()) {
            api.post('register', {
                name: name,
                password: password,
                password_confirmation: password_confirmation,
                email: email,
            }).then((response) => {
                const data = response.data
                beingLogin(data)
                props.afterRegister()
                toast('Successfully Registered', {
                    type: 'success',
                    autoClose: 1000,
                })
            })
                .catch((error) => {
                    console.log({error: error?.response?.data?.message})
                    toast(error?.response?.data?.message + 'Getting error while Registering', {
                        type: 'error',
                        autoClose: 2000,
                    })
                }).finally(() => {
                setIsSubmitting(false);
            });

        } else {
            toast('Your enter invalid data please recheck', {
                type: 'error',
                autoClose: 1000,
            })
        }

    }

    const isConfirmPasswordValid = () => {
        if (password_confirmation.trim() === '') {
            return false
        } else if (password_confirmation === null) {
            return false
        } else if (password_confirmation.length === 0) {
            return "Confirm password can't be empty"
        } else if (password_confirmation.length < 8) {
            return ' Confirm Password must be longer or equal to 8 character'
        } else if (password !== password_confirmation) {
            return 'Confirm password must be same as password'
        }

        return true
    }

    const validStringName = (value) => {
        let regExp = /^[a-zA-Z\s]*$/

        if (!regExp.test(value)) {
            value = value.replace(value[value.length - 1], '')
        }
        return value
    }

    const handleName = (e) => {
        const ele = e.target
        if (validStringName(ele.value).length > 12) {
            toast('Name is very long', {
                type: 'error',
                autoClose: 1000,
            })
        } else {
            setName(validStringName(ele.value))
        }
    }

    return (
        <>
            <div className='p-0 m-0'>
                <form
                    action=""
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit(e)
                    }}
                >
                    <h2 className='sing-in-title my-5'>Sign Up Now!</h2>
                    <div className="card flex justify-content-center">
                        <FloatLabel>
                            <InputText id="name"
                                       value={name}
                                       className='w-100'
                                       onChange={(e) => handleName(e)}/>
                            <label htmlFor={"name"} className='login-input-label'>Name *</label>
                        </FloatLabel>
                    </div>
                    <div className="card flex justify-content-center mt-5">
                        <FloatLabel>
                            <InputText id="username"
                                       value={email}
                                       className='w-100'
                                       onChange={(e) => setEmail(e.target.value)}/>
                            <label htmlFor={"username"} className='login-input-label'>Email *</label>
                        </FloatLabel>
                    </div>
                    <div className="card flex justify-content-center mt-5">
                        <FloatLabel>
                            <Password id="password"
                                      value={password}
                                      inputClassName={'password-input'}
                                      onChange={(e) => setPassword(e.target.value)}
                                      toggleMask
                                      feedback={true}
                            />
                            <label htmlFor={"password"} className='login-input-label'>Password *</label>
                        </FloatLabel>
                    </div>

                    <div className="card flex justify-content-center mt-5">
                        <FloatLabel>
                            <Password id="password_confirmation"
                                      value={password_confirmation}
                                      inputClassName={'password-input'}
                                      onChange={(e) => setPassword_confirmation(e.target.value)}
                                      toggleMask
                                      feedback={false}
                            />
                            <label htmlFor={"password_confirmation"} className='login-input-label'>Password Confirmation
                                *</label>
                        </FloatLabel>

                    </div>
                    <span className="d-inline-block ml-3 mt-0 mb-4 text-danger">
							{isConfirmPasswordValid()}
						</span>
                    <div className="flex justify-content-center mt-5">
                        <Button
                            style={{
                                borderRadius: '20px'
                            }}
                            label="Sing Up" icon=""
                            className="btn sing-in-button"
                            onClick={(event) => {
                                onSubmit(event)
                            }}
                            disabled={!isValid() || isSubmitting}
                            aria-haspopup
                            rounded text raised aria-label=""
                        />
                    </div>
                </form>
            </div>
        </>
    )

}


export default Register