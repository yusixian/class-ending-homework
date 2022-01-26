// require('./Picker.css')
function loadStyle(url) {
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    let head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
}
loadStyle('./src/component/Prompt/Prompt.css');

export class Prompt {
    name;
    root = null;
    successMsg = '这是成功的提示';
    errorMsg = '这是失败的提示';
    constructor(name, successMsg, errorMsg) {
        // console.log(name);
        this.name = name;
        if(successMsg) this.successMsg = successMsg;
        if(errorMsg) this.errorMsg = errorMsg;
        this.root = document.querySelector(name);
        // console.log(this.root);
    }
    promptSuccess(school, year, email) {
        if(!this.root) return;
        this.successMsg = `恭喜您，来自 ${school} ${year}级(${email})同学，您的报名信息已记录，请关注您的邮件`;
        this.root.className = 'prompt';
        this.root.style = 'display: flex;';
        this.root.innerHTML = this.successMsg;
    }
    promptError(errorMsg) {
        if(!this.root) return;
        this.errorMsg = errorMsg;
        this.root.className = 'prompt error';
        this.root.style = 'display: flex;';
        this.root.innerHTML = this.errorMsg;
    }
    
}