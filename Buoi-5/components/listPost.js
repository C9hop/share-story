
const style =`
.list-posts{
    width: 60%;
    margin: auto;
    margin-top: 10px
}
`
import { getDataFromDocs,getDataFromDoc } from "../utils.js";
class ListPost extends HTMLElement{
    constructor(){
        super();
        this._shadowDom = this.attachShadow({mode:'open'})
    }
    async connectedCallback(){
        const res = await firebase
        .firestore()
        .collection('post')
        .where('isShow', '==', true)
        .get()
        this.listenCollectionChange()
        const listPost = getDataFromDocs(res)
        let html =''
        listPost.forEach(element =>{
            html +=`
                <post-item 
                time="${element.createAt}" 
                author="${element.authorName}" 
                content = "${element.content}">
                </post-item>
            `
        })
        this._shadowDom.innerHTML=`
        <style>
         ${style}
        </style>
        <div class= 'list-posts'>
            ${html}
        </div>
        `
    }
    listenCollectionChange(){
        let firstRun = true
        firebase
        .firestore()
        .collection('post')
        .where('isShow', '==', true)
        .onSnapshot((snapShot) =>{
            if(firstRun){
                firstRun = false
                return
            }
            // console.log('Snap shot',snapShot.docChanges())
            const docChange = snapShot.docChanges()
                for(const oneChange of docChange){
                    if(oneChange.type === 'added'){
                        // console.log(getDataFromDoc(oneChange.doc))
                        this.appendPostItem(getDataFromDoc(oneChange.doc))
                    }
                }
        })
    }
    appendPostItem(data){
        const postItem = document.createElement('post-item')
        postItem.setAttribute ('time',data.createAt)
        postItem.setAttribute ('author',data.authorName)
        postItem.setAttribute ('content',data.content)
        const parent= this._shadowDom.querySelector('.list-posts');
        // console.log(parent.firstChild)
        parent.insertBefore(postItem,parent.firstChild)
    }
}
{/* <post-item> */}
window.customElements.define('list-post',ListPost)
