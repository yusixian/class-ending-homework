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
        console.log(`refresh by ${id}`);
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
        console.log(id);
        if(!nowNode.className) {
            let pNode = nowNode.parentNode;
            let activeNode = pNode.getElementsByClassName('active')[0];
            activeNode.className = '';
            nowNode.className = 'active';
            this.refreshCourseList(id);
        }
    }, // step 3:年份选择盒子事件
    selectYear(nowNode) {
        let year = parseInt(nowNode.innerHTML);
        let info = localStorageUtil.getItem('info');
        if(!info) {
            info = {'year': year};
        } else {
            info['year'] = year;
            //找到之前的将其样式改回去
            let yearlist = document.querySelector('.years');
            let preNode = yearlist.querySelector('.item-selected');
            if(preNode) preNode.className = '';
        }
        nowNode.className = 'item-selected';
        localStorageUtil.setItem('info', info);
        // 改变选择区域中的值
        let picker = document.getElementById('date-picker');
        let childNodes = picker.childNodes;
        childNodes[0].textContent = year;
        picker.className = 'selected';
    }, // step 4:省市选择，选择某省市后刷新其右侧列表
    selectArea(nowNode) {
        let area = nowNode.innerHTML;
        let info = localStorageUtil.getItem('info');
        if(!info) {
            info = {'area': area};
        } else {
            info['area'] = area;
            //找到之前的将其样式改回去
            let arealist = document.querySelector('.area-selecter');
            let preNode = arealist.querySelector('.item-selected');
            if(preNode) preNode.className = '';
        }
        nowNode.className = 'item-selected';
        localStorageUtil.setItem('info', info);
        this.refreshSchools(area);
    }, // 滚动到当前选择的大学处
    scrollToSelect() {
        let pNode = document.querySelector('.area-selecter');
        let nodes = pNode.getElementsByTagName('div');
        pNode.scrollTop = 0;
        let len = nodes.length;
        for(let i = 0; i < len; ++i) {
            if(nodes[i].className == 'item-selected') {
                break;
            }
            pNode.scrollTop += 40;
        }
    },
    selectSchool(nowNode) {
        // 在选择学校之前必定选择过省市，故这里无需判断是否存在info
        let school = nowNode.innerHTML;
        let info = localStorageUtil.getItem('info');
        if (info.school) {
            //找到之前的将其样式改回去
            let schoollist = document.querySelector('.schools');
            let preNode = schoollist.querySelector('.item-selected');
            if(preNode) preNode.className = '';
        }
        info['school'] = school;
        nowNode.className = 'item-selected';
        localStorageUtil.setItem('info', info);
        
        // 改变选择区域中的值
        let picker = document.getElementById('school-picker');
        let childNodes = picker.childNodes;
        childNodes[0].textContent = school;
        picker.className = 'selected';
    }, 
    refreshSchools(area) {
        let areaList = localStorageUtil.getItem('areaList');
        let len = areaList.length;
        let idx = 0;
        for(let i = 0; i < len; ++i) {
            if(areaList[i].area == area) {
                console.log(i);
                idx = i;
                break;
            }
        }
        // 判断有无选中学校
        let info = localStorageUtil.getItem('info');
        let preNode = null;
        if (info.school) {
            //找到之前的将其样式改回去
            let schoollist = document.querySelector('.schools');
            preNode = schoollist.querySelector('.item-selected');
            if(preNode) preNode.className = '';
        }

        let allshool = areaList[idx].schools;
        let len2 = allshool.length;
        let schoolList = document.querySelector('.schools');
        schoolList.textContent = '';    // 清空
        const that = this;
        for(let i = 0; i < len2; ++i) {
            let school = document.createElement('div');
            school.innerHTML = allshool[i];
            if(info.school && info.school == allshool[i]) school.className = 'item-selected';
            school.addEventListener('click', function() {
                console.log('click' + this.innerHTML);
                that.selectSchool(this);
            });
            schoolList.appendChild(school);
        }
    },// step5: 报名
    refreshRegisterArea() { //报名成功，刷新报名区域
        let regis = document.querySelector('.regist-area');
        regis.style = 'display:none;';
        console.log('refresh!');
        let rere = document.querySelector('.registed');
        rere.style = 'display:flex';
        document.getElementById('re-regist-btn').addEventListener('click', function() {
            console.log('click rebtn');
            rere.style = 'display:none;';
            regis.style = 'display:flex;';
        });
    },
    promptSuccess(school, year, email) {
        let tips = document.querySelector('.prompt');
        tips.innerHTML = `恭喜您，来自 ${school} ${year}级(${email})同学，您的报名信息已记录，请关注您的邮件`;
        tips.className = 'prompt';
        tips.style = 'display: flex;';
    },
    promptError(errorMsg) {
        let tips = document.querySelector('.prompt');
        tips.innerHTML = errorMsg;
        tips.className = 'prompt error';
        tips.style = 'display: flex;';
    },
    submitInfo() {
        let email = document.getElementById('email-picker');
        let errorMsg = null;
        console.log('click!', email.value);
        //判断邮箱是否有效
        if(!checkUtil.isEmailValid(email.value)) {
            errorMsg = '邮箱地址不符合要求(yourname@host.com) ，请重新输入';
            this.promptError(errorMsg);
            return false;
        } 
        // 判断有无选中学校
        let info = localStorageUtil.getItem('info');
        if (!info || !info.school || !info.year) {
            errorMsg = '未选择学校或入学年份！';
            this.promptError(errorMsg);
            return false;
        }
        info.email = email.value;
        localStorageUtil.setItem('info', info);
        // console.log(info);
        this.promptSuccess(info.school, info.year, email.value);
        this.refreshRegisterArea();
        return true;
    }
};