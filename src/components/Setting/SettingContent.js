import React, {useState} from 'react'
import {toast} from "react-toastify";
import {FloatLabel} from "primereact/floatlabel";
import {Password} from 'primereact/password';
import {Button} from "primereact/button";
import {beingLogin} from "../../utils/Helpers/UserHelper";
import {createAxios} from "../../utils/Helpers/AxiosHelper";

const api = createAxios()

const SettingContent = (props) => {
    const [old_password, setOld_password] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        api.post('/update-password', {
            old_password: old_password,
            password: password,
            password_confirmation: password_confirmation,
        }).then((response) => {
            const data = response.data
            beingLogin(data)
            toast('Successfully Updated', {
                type: 'success',
                autoClose: 1000,
            })
            setPassword_confirmation('')
            setOld_password('')
            setPassword('')
        })
            .catch((error) => {
                toast(error?.response?.data?.message + 'Getting error while update password', {
                    type: 'error',
                    autoClose: 2000,
                })
            }).finally(() => {
            setIsSubmitting(false);
        });

    }

   const isValid = () => {
        return (
            isNotEmpty() === true &&
            isConfirmPasswordValid() === true
        )
    }


    const isNotEmpty = () => {
        if (old_password.length === 0 || password.length === 0 || password_confirmation.length === 0) {
            return false
        }
        return true
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

    return (
        <>
            <div className="hero overlay inner-page bg-primary py-5">
                <div className="container">
                    <div className="row align-items-center justify-content-center text-center">
                        <div className="col-lg-6">
                            <h1 className="heading text-white mb-3" data-aos="fade-up">Setting</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 my-2 mb-lg-0" data-aos="fade-up" data-aos-delay={100}>
                            <FloatLabel>
                                <Password
                                    inputId="oldPassword"
                                    value={old_password}
                                    onChange={(e) => setOld_password(e.target.value)}
                                    toggleMask
                                    feedback={false}
                                />
                                <label htmlFor="oldPassword">Old Password</label>
                            </FloatLabel>
                        </div>
                        <div className="col-lg-3 my-2" data-aos="fade-up" data-aos-delay={200}>
                            <FloatLabel>
                                <Password
                                    inputId="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    toggleMask
                                    feedback={true}
                                />
                                <label htmlFor="Password">Password</label>
                            </FloatLabel>
                        </div>
                        <div className="col-lg-3 my-2" data-aos="fade-up" data-aos-delay={200}>
                            <FloatLabel>
                                <Password
                                    inputId="password_confirmation"
                                    value={password_confirmation}
                                    className='w-100'
                                    onChange={(e) => setPassword_confirmation(e.target.value)}
                                    toggleMask
                                    feedback={false}
                                />
                                <label htmlFor="password_confirmation">Confirm Password</label>
                            </FloatLabel>
                            <span className="d-inline-block ml-3 mt-0 mb-4 text-danger">
							{isConfirmPasswordValid()}
						</span>
                        </div>
                        <div className='col-9 d-flex justify-content-start mt-2'>
                            <Button label="Submit" icon="pi pi-check" style={{
                                borderRadius: '20px'
                            }} loading={isSubmitting}
                                    disabled={!isValid() || isSubmitting}
                                    onClick={onSubmit}/>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}

export default SettingContent