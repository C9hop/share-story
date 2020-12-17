import '../utils.js'
const style =`
    .register-container{
        width: 100vw;
        height: 100vh;
        background: url('https://file.hstatic.net/1000388534/file/screen_shot_2020-10-14_at_02.16.45_726b836ef811493ba293cd4bdaf9449d.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: flex-end   
    }
    #register-form{
        width: 30%;
        background: #fff;
        height: 100vh;
        padding:0px 20px;
    }
    h1{
        text-align: center;
        color: #333
    }
    button{
        background: #1565C0;
        color: #fff;
        padding:10px 15px;
        border-radius: 5px;
    }
`
import {redirect} from '../index.js'
class RegisterScreen extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this._shadowRoot.innerHTML = `
            <style>
                ${style}
            </style>
            <div class="register-container">
                <form id="register-form">
                    <h1>CI Project</h1>
                    <input-wrapper id="first-name" type="text" placeholder="First name"></input-wrapper>
                    <input-wrapper id="last-name" type="text" placeholder="Last name"></input-wrapper>
                    <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
                    <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
                    <input-wrapper id="confirm-password" type="password" placeholder="Confirm password"></input-wrapper>
                    <button>Register</button>
                    <a id="redirect">Already have an account? login</a>
                </form>
            </div>
        `
        const registerForm = this._shadowRoot.getElementById('register-form')
            registerForm.addEventListener('submit', async (e)=>{
                e.preventDefault()
                const firstName =  this._shadowRoot.getElementById('first-name').Value
                const lastName =  this._shadowRoot.getElementById('last-name').Value
                const email =  this._shadowRoot.getElementById('email').Value
                const password =this._shadowRoot.getElementById('password').Value
                const confirmpassword =this._shadowRoot.getElementById('confirm-password').Value
                let  isValid = true
                if(firstName.trim() === ''){
                    isValid = false
                    this._shadowRoot.getElementById('first-name').setAttribute('error', 'Please input first name')
                }
                if(lastName.trim() === ''){
                    isValid = false

                    this._shadowRoot.getElementById('last-name').setAttribute('error', 'Please input last name')
                }                
                if(email.trim() === ''){
                    isValid = false
                    this._shadowRoot.getElementById('email').setAttribute('error', 'Please input email')
                }                
                if(password.trim() === ''){
                    isValid = false 
                    this._shadowRoot.getElementById('password').setAttribute('error', 'Please input password')
                }
                if(confirmpassword.trim() === ''){
                    isValid = false
                    this._shadowRoot.getElementById('confirm-password').setAttribute('error', 'Please input confirm password')
                }
                if(password !== confirmpassword){
                    isValid = false
                   this.setError('confirm-password', "password didn't match")
                }
                if(!isValid){
                    return
                }

                    const user = {
                        name: firstName +" "+lastName,
                        email: email,
                        password: CryptoJS.MD5(password).toString()
                    }
                    //neu email da ton tai ro thi tra ra true
                    const check = await this.checkEmailExist(email)
                    if(check){
                        alert('email da ton tai')
                    }
                    else{
                        firebase.firestore().collection('users').add(user)
                        alert('Dang ki thanh cong')
                    }
            })
            this._shadowRoot.getElementById('redirect')
            .addEventListener('click', ()=>{
                redirect('login')
            })
    }
    setError(id, message){
        this._shadowRoot.getElementById(id).setAttribute('error',message)
    }
    async checkEmailExist(email){
        const res = await firebase.firestore().collection('users')
        .where('email', '==', email).get()
        return !res.empty
    }
}
window.customElements.define('register-screen',RegisterScreen)