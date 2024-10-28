// 새로 만들기
$(document).ready(function() {

    $(document).on('click' , '.create-tasklist-button' , function(){
        // newDiv 는 새로만들기 클릭했을 때, kanban header제목 정해주는 영역임
        var newDiv = $( '<div class="kanban-board__new-tasklist-area">' +
                '<div>' +
                  '<div class="pre-created-tasklist --view-column">' +
                    '<div class="click-area editable-text-field --textfield" role="button" tabindex="0">' +
                        '<input class="tw-editable-text-field__input" type="text" style="border:2px solid #27b6ba; border-radius:8px; color:#696f7a; font-size:14px; font-weight:600; width:207px; padding:2px; padding-left:10px" placeholder="업무리스트 이름">' +
                    '</div>' +
                    '<div class="tw-click-area tw-pre-created-tasklist__icon ax-pre-created-tasklist__icon --clickable" role="button" tabindex="0">' +
                      '<i class="tw-icon bi bi-x-lg" data-icon="close"></i>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' 
          );
        
        $('.create-tasklist-button').closest('.kanban-column').append(newDiv);
        $('.create-tasklist-button').remove();
    })

    // 닫기버튼
    $(document).on('click', '.tw-pre-created-tasklist__icon .bi-x-lg', function() {
        var newElement = $(
            '<div class="click-area create-tasklist-button" role="button" tabindex="0">' +
              '<i class="tw-icon bi bi-plus-lg"></i>' +
              '<span class="projects.button.create-tasklist-button_new_tasklist">새 업무리스트 만들기</span>' +
            '</div>'
          );
        $(this).closest('.kanban-column').append(newElement);
        $(this).closest('.pre-created-tasklist').remove()

    })

})

// kanban 차트에서 + 클릭시 contents 생성
$(document).ready(function() {
    dividedIndex = null;

    // 페이지 로딩할 때 숫자 계산 해 주는 함수
    var number = $('.tasklist__frame-bottom').length
    for (let i = 0; i < number; i++) {
        changeDoneProjectNumber(i)
    }


    // component만드는 함수
    function makeNewProject(title, clickindex) {
        var dataIndex = $('.task').length;

        var newComponent = $('<div class="task__outer" draggable="true">').append(
            $('<div class="task__wrapper">').append(
                $('<section class="task" data-task-index="' + dataIndex + '">').append(
                    $('<div class="task-color task__task-color"></div>'),
                    $('<div class="task__except-color">').append(
                        $('<div class="task__front">').append(
                            $('<div class="sapcer" style="flex-direction: row; gap: 5px; align-items: stretch; justify-content: start;"></div>')
                        ),
                        $('<div class="task__inner">').append(
                            $('<div class="task__main">').append(
                                $('<div class="task-header" style=" animation-duration: 0.5s; animation-composition: inherit; animation-name: tw-popup-container__fade-bottom;">').append(
                                    $('<div class="task-header__checkbox">').append(
                                        $('<div class="click-area task-checkbox --medium" role="button" tabindex="0">').append(
                                            $('<i class="icon task-checkbox__check-mark bi bi-check"></i>')
                                        )
                                    ),
                                    $('<span class="task-header__title">'+ title +'</span>')
                                ),
                                $('<div class="task-body"></div>')
                            )
                        )
                    )
                )
            )
        );

        // list 밑에 있는 완료된 업무란 만들기
        var doneProject = `<div class="tasklist__frame-bottom">
            <div class="tasklist-footer --compact --expanded">
                <section class="task-or-note-input-panel tasklist-footer__task-or-note-input-panel" style="display: none;">
                    <textarea class="task-or-note-input-panel__input-box hack-scrollbar" placeholder="새 업무 만들기" style="height: inherit;"></textarea>
                    <div class="task-or-note-input-panel__panels">
                        <div class="task-or-note-input-panel__panel-left">
                            <div class="task-properties-panel">
                                <div class="click-area task-properties-panel__member-panel-item" role="button" tabindex="0">
                                    <i class="icon bi bi-person-plus"></i>
                                </div>
                                <div class="click-area task-properties-panel__tag-panel-item" role="button" tabindex="0">
                                    <i class="icon bi bi-tag"></i>
                                </div>
                                <div class="click-area task-properties-panel__calendar-panel-item" role="button" tabindex="0">
                                    <i class="icon bi bi-calendar4-week"></i>
                                </div>
                            </div>
                        </div>
                        <div class="task-or-note-input-panel__panel-right">
                            <button class="button --size-28 --secondary task-or-note-input-panel__cancel-button" type="button">
                                <div class="button__main-container">
                                    <span class="tasks.buttonns.cancel">취소</span>
                                </div>
                            </button>
                            <button class="button --size-28 task-or-note-input-panel__create-button" type="button" disabled="">
                                <div class="button__main-container">
                                    <span class="tasks.buttonns.create">만들기</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </section>
                <div class="tasklist-footer__wrapper">
                    <div class="tasklist-footer__left-section">
                        <div class="hbox" style="align-items: center; margin-left: -13px;">
                            <div class="box-item" style="margin-left: 13px; flex-grow: 0; flex-shrink: 0;">
                                <div class="hbox" style="align-items: center; margin-left: -5px;">
                                    <div class="box-item tasklist-footer__task-icon" style="margin-left: 5px; flex-grow: 0; flex-shrink: 0;">
                                        <i class="bi bi-check2-circle"></i>
                                    </div> 
                                    <div class="box-item tasklist-footer__active-task-count" style="margin-left: 5px; flex-grow: 0; flex-shrink: 0;">5</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tasklist-footer__right-section">
                        <div class="click-area tasklist-footer__toggle-completed-tasks-link" role="button" tabindex="0">완료된 업무 1개 보기</div>
                        <div class="tasklist-footer__add-task-separator"></div>
                        <div class="click-area tasklist-footer__add-task-button" role="button" tabindex="0">
                            <i class="bi bi-plus fs-4"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

        // 완료된 업무들이 들어가는 완료된 업무 란
        var doneProjectList = `<div class="tasklist__completed-taks-header" style="height: unset; width: 100%; display: none;">
                <div class="tasklist__header-done">
                    <span class="task_lists.completed_tasks">완료된 업무</span>
                </div>
                <div class="click-area completed-task-sorting-menu__sort-by" role="button" tabindex="0">
                    <i class="icon completed-task-sorting-menu__sorting-icon">
                        <i class="bi bi-sort-up"></i>
                    </i>
                    <span class="tasks.task_lists.menu.sort">정렬</span>
                    <i class="icon completed-task-sorting-menu__arrow-down-icon">
                        <i class="bi bi-chevron-down"></i>
                    </i>
                </div>
            </div>`

        // 조건 만약 task__outer의 length가 0보다 작을 경우 완료된 업무 란 을 만들어 줘야함.
        if ($('.tasklist').eq(clickindex).find('.tasklist__frame-bottom').length <= 0) {
            $('.tasklist__inner-container').eq(clickindex).prepend(newComponent);
            $('.task-or-note-input-panel__input-box').val('')
            $('.task-or-note-input-panel__create-button').eq(clickindex).removeClass('active');
            $('.task-or-note-input-panel__create-button').eq(clickindex).prop('disabled', true);
            $('.tasklist').eq(clickindex).append(doneProject)
            $('.tasklist__inner-container').eq(clickindex).append( doneProjectList);
        }else{
            $('.tasklist__inner-container').eq(clickindex).prepend(newComponent);
            $('.task-or-note-input-panel__input-box').val('')
            $('.task-or-note-input-panel__create-button').eq(clickindex).removeClass('active');
            $('.task-or-note-input-panel__create-button').eq(clickindex).prop('disabled', true);
        }
    }
    
    // 업무 생성될 때 마다 / 업무 완료될때 마다 숫자 바뀌도록 만들어 주는 함수 
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

    
    // 버튼 클릭시 컴포넌트 생성하는 이벤트
    $(document).on('click', '.task-or-note-input-panel__create-button', function() {
        componentTextbox = $(this).closest('.task-or-note-input-panel').find('.task-or-note-input-panel__input-box');
        kanbanColumn = $(this).closest('.tasklist');
        var tasklist = $(this).closest('.tasklist');
        var index = $('.tasklist').index(tasklist);

        var componentTitle = componentTextbox.val()

        if (kanbanColumn.find('.tasklist__inner-container').length <= 0) {
            var makeKanban = $('<div class="kanban-items hack-scrollbar">' + 
            '<div class="tasklist__container" style ="overflow: hidden; height: 0px; width: 0px;">'+
                '<div class="tasklist__inner-container" style="position: relative; height: 520px; width: 300px; overflow: auto; will-change: trasform; direction: 1tr;">' + 
                '</div>' + 
            '</div>' +
            '</div>'
            ) 
            kanbanColumn.append(makeKanban);
            makeNewProject(componentTitle , index );
            changeDoneProjectNumber(index);
        }else{
            makeNewProject(componentTitle , index);
            changeDoneProjectNumber(index);
        }
    })

    $(document).on('keydown', '.task-or-note-input-panel__input-box', function(event) {
        if (event.which === 13) {
            if ($(this).val().length !== 0) {
                event.preventDefault();
                var componentTitle = $(this).val();
                var tasklist = $(this).closest('.tasklist');
                var index = $('.tasklist').index(tasklist);
                kanbanColumn = $(this).closest('.tasklist');
                if (kanbanColumn.find('.tasklist__inner-container').length <= 0) {
                    var makeKanban = $('<div class="kanban-items hack-scrollbar">' + 
                    '<div class="tasklist__container" style ="overflow: hidden; height: 0px; width: 0px;">'+
                    '<div class="tasklist__inner-container" style="position: relative; height: 630px; width: 300px; overflow: auto; will-change: trasform; direction: 1tr;">' + 
                    '</div>' + 
                    '</div>' +
                    '</div>'
                    ) 
                    kanbanColumn.append(makeKanban);
                    makeNewProject(componentTitle , index );
                    changeDoneProjectNumber(index);
                }else{
                    makeNewProject(componentTitle , index);
                    changeDoneProjectNumber(index);
                }
            }else if(event.keyCode === 13){
                event.preventDefault();
            }
        }
    });

})