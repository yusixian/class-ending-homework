(()=>{"use strict";const e={displayCourseListAll(e){let t=document.getElementById("course-list").getElementsByClassName("course"),s=t.length,l=e?"none":"";for(let e=0;e<s;++e)t[e].style.display=l},refreshCourseList(e){console.log(`refresh by ${e}`);let t=document.getElementById("course-list");if(0===e)this.displayCourseListAll(!1);else{this.displayCourseListAll(!0);let s=t.getElementsByClassName(`tag t${e}`),l=s.length;for(let e=0;e<l;++e)s[e].parentNode.parentNode.parentNode.style.display=""}},fliter(e,t){console.log(e),t.className||(t.parentNode.getElementsByClassName("active")[0].className="",t.className="active",this.refreshCourseList(e))}};window.onload=function(){for(let t=0;t<4;++t)document.getElementById(`fliter-${t}`).addEventListener("click",(function(){console.log(`click id = ${this.id}`),e.fliter(t,this)}))}})();