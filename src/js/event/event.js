export default {
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
    }
};