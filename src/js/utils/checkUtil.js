
export default {
    // 验证邮箱是否有效
    isEmailValid(email) {
        console.log(email);
        // 匹配以字母/数字/_-为开头的 中间必须要有@ 然后字母数字-_加.加字母数字-_
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return reg.test(email);
    },
    // 上个作业封装的验证姓名年龄的
    isNameValid(name) {
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
    },
    isAgeValid(age) {
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
}