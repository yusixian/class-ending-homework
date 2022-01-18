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