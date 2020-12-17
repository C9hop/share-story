export function getDataFromDoc(doc){   
    const data = doc.data()
    data.id = doc.id
    return data
 }
 //lay du lieu tu get manyu document
 export function getDataFromDocs(data){
     // const docs = data.docs
     
     // const listRes = []
     // for (const item of docs) {
     //     listRes.push(getDataFromDoc(item))
     // }
     // return listRes
     return data.docs.map(getDataFromDoc)
 }
 /**
  * 
  * @param {string} key 
  * @param {object} value 
  */
 export function saveTolocalStorage(key,value){
     localStorage.setItem(key,JSON.stringify( value))
 }
 export function getItemlocalStorage(key){
    return JSON.parse( localStorage.getItem(key))
}
export function removeItemFromLocalStorage(key){
    localStorage.removeItem(key)
}

export function converDate(dateStr){
        const date = new Date(dateStr)
        const day = date.getDate()
        const month = validateNiceNumber(date.getMonth() + 1)
        const year = date.getFullYear()
        const hour = validateNiceNumber(date.getHours())
        const minutes = validateNiceNumber(date.getMinutes())
        return `${day}/${month}/${year} ${hour}:${minutes}`

}
export function validateNiceNumber(number){
    return number < 10 ? ('0' + number) : (number)
}
