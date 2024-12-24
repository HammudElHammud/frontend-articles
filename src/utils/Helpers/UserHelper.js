
export function isLogin() {
    const token = localStorage.getItem('access_token')
    return token !== null && token !== undefined && token.length > 0
}

export function logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    window.location.replace('/')
    window.addEventListener('storage', e => {
        if(e.key === 'token' && e.oldValue && !e.newValue) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('email')
            localStorage.removeItem('name')
            window.location.reload(true)
        }
    });

}


export function beingLogin(data) {
    for (let [key, value] of Object.entries(data.data)) {
        if (key === 'user') continue
        if (typeof value == 'object') {
            localStorage.setItem(key, JSON.stringify(value))
        } else {
            localStorage.setItem(key, value)
        }
    }
}
