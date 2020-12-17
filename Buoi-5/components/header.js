const style=`
*{
    padding: 0;
    margin: 0;
}
.branch{
    font-size: 1.5rem;
    color:#fff;
    margin-left: 20px;
    font-weight: 550;
}
.container{
    background-color: #1976D2;
    display: flex;
    height: 64px;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
}
.logo, .user-info{
    display: flex;
    align-items: center;
}
.user-info{
    font-size: 1.8rem;
    color: #fff;
}
.btn{
    background-color: transparent;
    border: none;
    margin-left:20px;
    cursor: pointer;
    outline: none;
}
`
import { removeItemFromLocalStorage } from "../utils.js"
import { redirect } from "../index.js"

class StoryHeader extends HTMLElement{
    constructor(){
        super()
        this._shadowDom = this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this._shadowDom.innerHTML =`
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
        ${style}
        </style>
        <div class="container">
        <div class="logo" >
            <img src="https://png.pngtree.com/template/20191010/ourmid/pngtree-letter-f-logo-design-vector-initials-f-logo-vector-image_316832.jpg" style="width: 40px;" alt="">
            <div class="branch">Share story</div>
        </div>
        <div class="user-info">
            <div class="avatar"><i class="fa fa-user" aria-hidden="true"></i></div>
            <button id="logout-btn" class="btn"><i class="fa fa-sign-out" aria-hidden="true"></i></button>
        </div>
    </div>
        `
        this._shadowDom
        .getElementById('logout-btn')
        .addEventListener("click", () => {
            //xoa currentUser trong localstorage
          removeItemFromLocalStorage("currentUser", "")
          redirect("login")
        })
    }
}
window.customElements.define('story-header',StoryHeader)