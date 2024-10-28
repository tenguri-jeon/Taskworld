// 드래그 앤 드롭 이벤트 리스너 등록
document.addEventListener("dragstart", function (e) {
  if (e.target.classList.contains("task__outer") && !e.target.classList.contains("completed-task")) {
    e.target.classList.add("is-dragging");
  }
});

document.addEventListener("dragend", function (e) {
  if (e.target.classList.contains("task__outer")) {
    e.target.classList.remove("is-dragging");
  }
});

// .tasklist__inner-container 요소에 대한 이벤트 위임 설정
document.addEventListener("dragover", function (e) {
  e.preventDefault();
  const curTask = document.querySelector(".is-dragging");

  if (curTask && !curTask.classList.contains("completed-task")) {
    const zone = e.target.closest(".tasklist__inner-container");

    if (zone) {
      const bottomTask = insertAboveTask(zone, e.clientY);

      if (!bottomTask) {
        if (curTask.parentElement !== zone) {
          // 새로운 부모 노드로 이동
          zone.appendChild(curTask);
        }
      } else {
        if (bottomTask !== curTask.previousSibling) {
          // 같은 부모 노드 내에서 위치 변경
          zone.insertBefore(curTask, bottomTask);
        }
      }
    }
  }

  // 페이지 로딩할 때 숫자 계산 해 주는 함수
  var number = $('.tasklist__frame-bottom').length
  for (let i = 0; i < number; i++) {
      changeDoneProjectNumber(i)
  }
  // 페이지 로딩할 때 숫자 계산 해 주는 함수
  var number = $('.tasklist__frame-bottom').length
  for (let i = 0; i < number; i++) {
      changeDoneProjectNumber(i)
  }
});

function changeDoneProjectNumber(clickindex){
  var totaltaskN = $('.tasklist__inner-container').eq(clickindex).find('.task').length
  var donetaskN = $('.tasklist__inner-container').eq(clickindex).find('.task.--done').length
  var hallProject = $('.task').length
  var doneProject = $('.task.--done').length
  var progress = Math.round((doneProject / hallProject) * 100);

  var tasknumber = totaltaskN - donetaskN
  $('.tasklist-footer__active-task-count').eq(clickindex).text(tasknumber);
  $('.tasklist-footer__toggle-completed-tasks-link').eq(clickindex).text('완료된 업무 '+ donetaskN +' 개 보기' )

  $('.project-footer__right span').eq(1).text( progress + '%' + '업무 완료')
  $('.project-footer__right span').eq(2).text( doneProject + '/' +  hallProject)
  $('.project-footer__completion-bar-inner').css({
      'width' : progress + '%'
  })
}

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};


