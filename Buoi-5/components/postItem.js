const style =`
*{
    padding: 0;
    margin: 0;
}
html{
    font-size: 16px;
}
.list-posts{
    width: 60%;
    margin: auto;
}
.post-item{
    border: 1px solid #dbdbdb;
    padding: 20px;
    border-radius: 10px;
    margin-bottom:15px;
    font-size:16px;
}
.author-name{
    font-weight: 600;
    margin-bottom: 5px;
}
.time{
    font-size: 12px;
    margin-bottom: 10px;
}
`
import {converDate} from '../utils.js'
class PostItem extends HTMLElement{
    constructor(){
        super()
        this._shadowDom = this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.author = this.getAttribute('author')
        this.time =converDate(this.getAttribute('time'))
        this.content = this.getAttribute('content')
        this._shadowDom.innerHTML=`
        <style>
            ${style}
        </style>
            <div class="post-item">
                <div class="author-name">${this.author}</div>
                <div class="time">${this.time}</div>
                <div class="content">
                ${this.content}
                </div>
            </div>
        `
    }
}
window.customElements.define('post-item',PostItem)