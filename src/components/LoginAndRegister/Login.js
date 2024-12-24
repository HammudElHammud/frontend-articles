import React, {useEffect, useState} from 'react'
import {createAxios} from "../../utils/Helpers/AxiosHelper";
import {toast} from "react-toastify";
import {InputText} from "primereact/inputtext";
import {FloatLabel} from "primereact/floatlabel";
import {Password} from 'primereact/password';
import {Checkbox} from "primereact/checkbox";

import {Button} from "primereact/button";
import {beingLogin} from "../../utils/Helpers/UserHelper";

const api = createAxios()
const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [keepLogin, setKeepLogin] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {

    }, [])


    const isValid = () => {
        if (email.length === 0 || password.length === 0) {
            return false
        } else {
            // TODO: need to add password and email validation here to make it more secure
            // 		and user friendly
        }
        return true
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        api.post('/login', {
            email: email,
            password: password,
        }).then((response) => {
            const data = response.data
            beingLogin(data)
            toast('Successfully Logged In', {
                type: 'success',
                autoClose: 1000,
            })
            props.afterLogin()
        }).catch((error) => {
                toast('Getting error while login', {
                    type: 'error',
                    autoClose: 1000,
                })
            }).finally(() => {
            setIsSubmitting(false);
        });
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
                    <h2 className='sing-in-title'>Sign In</h2>
                    <p className='sing-in-sub-title'>Enter your email and password to sign in!
                    </p>

                    <div className="card flex justify-content-center">
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
                                      feedback={false}
                            />
                            <label htmlFor={"password"} className='login-input-label'>Password *</label>
                        </FloatLabel>
                    </div>
                    <div className="flex justify-content-between mt-5">
                        <div className="flex align-items-center">
                            <Checkbox inputId="ingredient1" name="keep login" value="Cheese" onChange={() => {
                                setKeepLogin(!keepLogin)
                            }} checked={keepLogin}/>
                            <label htmlFor="ingredient1" className="ml-2 mx-1">Keep me logged in</label>
                        </div>
                    </div>
                    <div className="flex justify-content-center mt-5">
                        <Button
                            style={{
                                borderRadius: '20px'
                            }}
                            label={isSubmitting ? 'Logging in...' : 'Login'} icon=""
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


export default Login