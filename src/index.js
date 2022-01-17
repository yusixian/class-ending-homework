require('./css/style.less')
var storage = null;
if(!window.localStorage){
    alert("浏览器不支持localstorage");
} else storage = window.localStorage;
// 持久化存储
function setObjToStorage(key, obj) {
    if(!storage) {
        alert("浏览器不支持localstorage");
        return;
    }
    let data = JSON.stringify(obj);
    storage.setItem(key, data);
    // console.log('setObjToStorage');
    // console.log(storage[key]);
}
// 取得持久化存储的值
function getObjFromStorage(key) {
    if(!storage) {
        alert("浏览器不支持localstorage");
        return null;
    }
    let json = storage.getItem(key);
    let jsonObj = JSON.parse(json);
    // console.log('getObjFromStorage');
    // console.log(jsonObj);
    return jsonObj;
}
function isNameValid(name) {
    let reg=new RegExp('^[\u4e00-\u9fa5a-zA-Z0-9_-]{1,20}$'); //姓名1-20位，汉字字母数字下划线减号
    if(!name){
        alert('姓名为空');
        return false;
    }else{
        if (name && name.length > 0) {
            if(!reg.test(name)){
                alert('姓名输入不合法');
                return false;
            }else{
                return true;
            }
        } else {
            alert('姓名输入不合法');
            return false;
        }
    }
}
function isAgeValid(age) {
    let reg=new RegExp('^(?:[1-9][0-9]?|1[01][0-9]|120)$');     //年龄是1-120之间有效
    if(!age){
        alert('年龄为空');
        return false;
    }else{
        if (age && age.length > 0) {
            if(!reg.test(age)){
                alert('年龄输入不合法');
                return false;
            }else{
                return true;
            }
        } else if(age.length == 0){
            alert('年龄为空');
            return false;
        }else {
            alert('年龄输入不合法');
            return false;
        }
    }
}
function init() {
    let datas = getObjFromStorage('data');
    if(!datas) return;
    console.log(datas);
    let len = datas.length;
    for(let i = 0; i < len; ++i) {
        addDataNode(datas[i]);
    }
}

// 添加data到data-table表格
function addDataNode(data) {
    if(!data) {
        alert('添加失败，请确认信息是否填对');
        return;
    }
    let nowtable = document.getElementById('data-table');
    // console.log(nowtable);
    let tbody = nowtable.getElementsByTagName('tbody')[0];
    // console.log(tbody.rows);
    let tbodyFirstCell = tbody.rows[0].cells[0];
    if(tbodyFirstCell.innerHTML == '现在这里是空滴') {  //清空表格节点，添加新的在第一行
        tbody.deleteRow(0);
        // console.log(tbody.childNodes);
        // tbody.insertRow(0);
        // tbody.rows[0].insertCell(0);
        // tbody.rows[0].cells[0].appendChild(document.createTextNode('name'));
        // tbody.rows[0].insertCell(1);
        // tbody.rows[0].cells[1].appendChild(document.createTextNode('age'));
    } 
    let idx = tbody.rows.length;
    console.log(idx);
    tbody.insertRow(idx);
    tbody.rows[idx].insertCell(0);
    tbody.rows[idx].cells[0].appendChild(document.createTextNode(data.name));
    tbody.rows[idx].insertCell(1);
    tbody.rows[idx].cells[1].appendChild(document.createTextNode(data.age));
}
function storeData(data){
    let datas = getObjFromStorage('data');
    if(datas == null) {
        datas = [];
    }
    datas.push(data);
    setObjToStorage('data', datas);
}
// 添加data到data-table表格
function addDataNode(data) {
    if(!data) {
        alert('添加失败，请确认信息是否填对');
        return;
    }
    let nowtable = document.getElementById('data-table');
    console.log(nowtable);
    let nowNodes = nowtable.childNodes;
    let tbody = nowtable.getElementsByTagName('tbody')[0];
    // console.log(tbody.rows);
    let tbodyFirstCell = tbody.rows[0].cells[0];
    if(tbodyFirstCell.innerHTML == '现在这里是空滴') {  //清空表格节点，添加新的在第一行
        tbody.deleteRow(0);
        // console.log(tbody.childNodes);
        // tbody.insertRow(0);
        // tbody.rows[0].insertCell(0);
        // tbody.rows[0].cells[0].appendChild(document.createTextNode('name'));
        // tbody.rows[0].insertCell(1);
        // tbody.rows[0].cells[1].appendChild(document.createTextNode('age'));
    } 
    let idx = tbody.rows.length;
    console.log(idx);
    tbody.insertRow(idx);
    tbody.rows[idx].insertCell(0);
    tbody.rows[idx].cells[0].appendChild(document.createTextNode(data.name));
    tbody.rows[idx].insertCell(1);
    tbody.rows[idx].cells[1].appendChild(document.createTextNode(data.age));
}

if(!'data' in storage) setObjToStorage('data', [{
    // name: 'test',
    // age: 18
}]);
window.onload = function() {// 加载完后执行脚本
    console.log(getObjFromStorage('data'));
    init();
    let btnAdd = document.getElementById("btn-addrow");
    let btnSubmit = document.getElementById("btn-submit");
    console.log('hello');
    btnAdd.addEventListener('click', function() {
        let nameInput = document.getElementById('submitted-name').value;
        let ageInput = document.getElementById('submitted-age').value;
        console.log('点击了添加');
        // console.log(isNameValid(nameInput));
        // console.log(isAgeValid(ageInput));
        if(isAgeValid(ageInput) && isNameValid(nameInput)) {
            let data = {
                name:nameInput, 
                age:ageInput
            };
            addDataNode(data);
        } else {
            alert('添加失败，请确认信息是否填对');
        }
    }, false)
    btnSubmit.addEventListener('click', function() {
        console.log('点击了上传');
        let nameInput = document.getElementById('submitted-name').value;
        let ageInput = document.getElementById('submitted-age').value;
        // console.log(isNameValid(nameInput));
        // console.log(isAgeValid(ageInput));
        if(isAgeValid(ageInput) && isNameValid(nameInput)) {
            let data = {
                name:nameInput, 
                age:ageInput
            };
            storeData(data);
            addDataNode(data);
            console.log(getObjFromStorage('data'));
        } else {
            alert('上传失败，请确认信息是否填对');
        }
    }, false)
}


