import '../utils.js'
const style =`
    .login-container{
        width: 100vw;
        height: 100vh;
        background: url('https://file.hstatic.net/1000388534/file/screen_shot_2020-10-14_at_02.16.45_726b836ef811493ba293cd4bdaf9449d.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: flex-end   
    }
    #login-form{
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
import { getDataFromDoc, getDataFromDocs, saveTolocalStorage }  from "../utils.js"
class loginScreen extends HTMLElement{
    constructor(){
        super()
        this._shadowRoot = this.attachShadow({mode: 'open'})
    }
    connectedCallback(){
        this._shadowRoot.innerHTML = `
            <style>
                ${style}
            </style>
            <div class="login-container">
                <form id="login-form">
                    <h1>CI Project</h1>
                    <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper>
                    <input-wrapper id="password" type="password" placeholder="Password"></input-wrapper>
                    <button>Login</button>
                    <a id ="redirect">Don't have an account? Register</a>
                </form>
            </div>
        `
        const loginForm = this._shadowRoot.getElementById('login-form')
            loginForm.addEventListener('submit', async (e)=>{
                e.preventDefault()
                const email =  this._shadowRoot.getElementById('email').Value
                const password =this._shadowRoot.getElementById('password').Value
                let  isValid = true
         
                if(email.trim() === ''){
                    isValid = false
                    this._shadowRoot.getElementById('email').setAttribute('error', 'Please input email')
                }                
                if(password.trim() === ''){
                    isValid = false 
                    this._shadowRoot.getElementById('password').setAttribute('error', 'Please input password')
                }
                if(!isValid){
                    return
                }
                const user = await firebase.firestore().collection('users')
                .where('email', '==', email)
                .where('password', '==', CryptoJS.MD5(password).toString())
                .get()
                // console.log(user)
                if(user.empty){
                    alert('Sai email/ password')
                }else{
                    saveTolocalStorage('currentUser', getDataFromDocs(user)[0])
                    redirect('story')
                    // console.log(getDataFromDocs(user)[0])
                }

                    // const user = {
                    //     name: firstName +" "+lastName,
                    //     email: email,
                    //     password: CryptoJS.MD5(password).toString()
                    // }
                    // //neu email da ton tai ro thi tra ra true
                    // const check = await this.checkEmailExist(email)
                    // if(check){
                    //     alert('email da ton tai')
                    // }
                    // else{
                    //     firebase.firestore().collection('users').add(user)
                    //     alert('Dang ki thanh cong')
                    // }
            })
            this._shadowRoot.getElementById('redirect')
            .addEventListener('click', ()=>{
                redirect('register')
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
window.customElements.define('login-screen',loginScreen)