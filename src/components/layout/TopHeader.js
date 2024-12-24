import React ,{useRef, useState} from 'react'
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Sidebar } from 'primereact/sidebar';
import Login from "../LoginAndRegister/Login";
import {logout} from "../../utils/Helpers/UserHelper";
import Register from "../LoginAndRegister/Register";
import {useHistory} from "react-router-dom";


const TopHeader = (props) => {
    const history = useHistory()
    const [visibleRight, setVisibleRight] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const menuRight = useRef(null);
    const onclickToMenu = (e) => {
        document.body.classList.remove('offcanvas-menu');
    }

    const onclickToMenuToggle = (e) => {
        document.body.classList.add('offcanvas-menu');
    }

    const mobileSingIn = (e) => {
        e.preventDefault();
        document.body.classList.remove('offcanvas-menu');
        setVisibleRight(true)
    }

    const items = [
        {
            items: [
                {
                    label: 'Setting',
                    icon: 'pi pi-cog',
                    command: () => {
                        history.replace('/setting')
                    }
                },
                {
                    label: 'My News feed',
                    icon: 'pi pi-bookmark',
                    command: () => {
                        history.replace('/my-news-feed')
                    }
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        logout()
                    }
                },
            ]
        }
    ];

    const afterLogin = () => {
        setVisibleRight(false)
    }

    const onClickToItem = (e, link) => {
        e.preventDefault();
        document.body.classList.remove('offcanvas-menu');
        history.replace(link)

    }

    return (
        <>
            <Sidebar visible={visibleRight}  position="right" onHide={() => setVisibleRight(false)}>
                <div className='h-100'>
                    {
                        isLogin ?  <Login
                            afterLogin={afterLogin}
                        /> : <Register afterRegister={afterLogin}/>
                    }
                    <div>

                        <p className='sing-in-sub-title'>
                            {
                                !isLogin ? (
                                        <>
                                            Already have an account ? <span className='switch-login'
                                                                            onClick={()=>setIsLogin(true)}
                                        > Sign In </span> now.
                                        </>
                                    ):
                                    (
                                        <>
                                            Don't have an account ? <span className='switch-login'
                                                                          onClick={()=>setIsLogin(false)}
                                        >
                                       Sign Up
                                   </span>  now.
                                        </>
                                    )
                            }
                        </p>
                    </div>
                </div>

            </Sidebar>
            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close" onClick={onclickToMenu}>
                        <span className="icofont-close js-menu-toggle" />
                    </div>
                </div>
                    <div className="site-mobile-menu-body">
                        <ul className="site-nav-wrap">
                            <li>
                                <a href="#" onClick={(e)=>onClickToItem(e, '/')}>Home</a>
                            </li>
                            {
                                localStorage.getItem('access_token') ? (
                                    <>
                                        <li>
                                            <a href="#" onClick={(e)=>onClickToItem(e, '/setting')}>Setting</a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={(e)=>onClickToItem(e, '/my-news-feed')}>New feed</a>
                                        </li>
                                        <li>
                                            <a href="#" onClick={(e)=>{
                                                e.preventDefault();
                                                logout()
                                            }}>Logout</a>
                                        </li>
                                    </>
                                ):  <li>
                                    <a href="#" onClick={(e)=>mobileSingIn(e)}>Sing In</a>
                                </li>
                            }
                        </ul>
                    </div>
            </div>
            <nav className="site-nav">
                <div className="container">
                    <div className="menu-bg-wrap">
                        <div className="site-navigation">
                            <div className="row g-0 align-items-center">
                                <div className="col-2">
                                    <a href="#" onClick={(e)=>onClickToItem(e, '/')} className="logo m-0 float-start">
                                        Blogy<span className="text-primary">.</span>
                                    </a>
                                </div>
                                <div className="col-7 text-center">
                                </div>

                                <div className="col-3 text-end">
                                    <a
                                        href="#"
                                        onClick={onclickToMenuToggle}
                                        className="burger ms-auto float-end site-menu-toggle js-menu-toggle d-inline-block d-lg-none light"
                                    >
                                        <span />
                                    </a>

                                    <div className="user-profile-container mx-3">
                                        <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" className='mt-2' />
                                        <Button
                                            style={{
                                                borderRadius: '20px'
                                            }}
                                            label={localStorage.getItem('email')} icon="pi pi-user"
                                            className="mr-2 btn-info text-white"
                                            onClick={(event) =>{
                                                if (localStorage.getItem('access_token')){
                                                    menuRight.current.toggle(event)
                                                }else {
                                                    setVisibleRight(true)
                                                }

                                            }
                                        }
                                            aria-controls="popup_menu_right" aria-haspopup
                                            rounded text raised aria-label="Filter"
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )

}


export default TopHeader