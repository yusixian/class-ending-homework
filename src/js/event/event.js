import localStorageUtil from "../utils/localStorageUtil.js"
import checkUtil from "../utils/checkUtil.js"
const STORAGE_KEY = '__indexData';   //当前网页数据
export default {
    // step 2: 课程筛选事件
    displayCourseListAll(isHidden){
        let courseList = document.getElementById('course-list');
        let courses = courseList.getElementsByClassName('course');
        let len = courses.length;
        let hide = (isHidden? 'none':'');
        for(let i = 0; i < len; ++i) {
            courses[i].style.display = hide;
        }
    },  
    refreshCourseList(id) {
        // console.log(`refresh by ${id}`);
        let courseList = document.getElementById('course-list');
        if(id === 0) {
            this.displayCourseListAll(false);
        } else {
            this.displayCourseListAll(true);    //全部隐藏先
            let tList = courseList.getElementsByClassName(`tag t${id}`);
            let len = tList.length;
            for(let i = 0; i < len; ++i) {
                let pNode = tList[i].parentNode.parentNode.parentNode;
                pNode.style.display = '';
            }
        }
    },
    fliter(id, nowNode) {    
        // console.log(id);
        if(!nowNode.className) {
            let pNode = nowNode.parentNode;
            let activeNode = pNode.getElementsByClassName('active')[0];
            activeNode.className = '';
            nowNode.className = 'active';
            this.refreshCourseList(id);
        }
    },// step5: 报名
    refreshRegisterArea() { //报名成功，刷新报名区域
        let regis = document.querySelector('.regist-area');
        regis.style = 'display:none;';
        // console.log('refresh register!');
        let rere = document.querySelector('.registed');
        rere.style = 'display:flex';
        document.getElementById('re-regist-btn').addEventListener('click', function() {
            // console.log('click rebtn');
            rere.style = 'display:none;';
            regis.style = 'display:flex;';
        });
    },
    submitInfo(prompt) {
        let email = document.getElementById('email-picker');
        let errorMsg = null;
        // console.log('click!', email.value);
        //判断邮箱是否有效
        if(!checkUtil.isEmailValid(email.value)) {
            errorMsg = '邮箱地址不符合要求(yourname@host.com) ，请重新输入';
            prompt.promptError(errorMsg);
            return false;
        } 
        let info = localStorageUtil.getItem('info');
        const nowYear = info?info.year:null;
        const nowSchool = info?info.school:null;
        // 判断有无选中学校
        if (!info || !nowYear || !nowSchool) {
            errorMsg = '未选择学校或入学年份！';
            prompt.promptError(errorMsg);
            return false;
        }
        info['email'] = email.value;
        localStorageUtil.setItem('info', info);
        // console.log(info);
        prompt.promptSuccess(nowSchool, nowYear, email.value);
        this.refreshRegisterArea();
        return true;
    }
};