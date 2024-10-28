document.addEventListener("DOMContentLoaded", function(){
    const menuButtons = document.querySelectorAll('.tasklist-menu__button');
    const menuPopupLayer = document.querySelector('.popup-layer-menu');
    const moveButtons = document.querySelectorAll('.tasklist-menu__move-tasklist');
    const movePopupLayer = document.querySelector('.popup-layer-move');
    const inputKitHugeRow = document.querySelector('.input-kit-huge-row'); 
    const inputKitWidget = document.querySelector('.project-input-kit'); 
    const buttonsWrapper = document.querySelector('.input-kit-widget__project-buttons-wrapper'); 
    const backIcon = document.querySelectorAll('.input-kit-widget__back-icon'); 
    const sortingButtons = document.querySelectorAll('.active-task-sorting-menu__sort-by');
    const sortingLayer = document.querySelector('.popup-layer-sorting');
    const memberPopup = document.querySelector('.popup-content-wrapper-member');
    const memberOriginCloseButton = document.querySelector('.input-kit-widget__member-origin-buttons-wrapper')
    const memberButtons = document.querySelectorAll('.tasklist-header__input-panel-container .task-properties-panel__member-panel-item');
    const memberButtonsFooter = document.querySelectorAll('.tasklist-footer__task-or-note-input-panel .task-properties-panel__member-panel-item');
    const memberLayer = document.querySelector('.popup-layer-member');
    const memberIniviteButton = document.querySelector('.member-input-widget-invitation-row');
    const memberIniviteContainer = document.querySelector('.member-input-widget-container-inivite');
    const memberCloseButton = document.querySelector('.input-kit-widget__member-buttons-wrapper');
    const tagsPopup = document.querySelector('.popup-content-wrapper-tag');
    const tagsCloseButton = document.querySelector('.input-kit-widget__tag-buttons-wrapper')
    const tagsButtons = document.querySelectorAll('.tasklist-header__input-panel-container .task-properties-panel__tag-panel-item');
    const tagsButtonsFooter = document.querySelectorAll('.tasklist-footer__task-or-note-input-panel .task-properties-panel__tag-panel-item');
    const tagsLayer = document.querySelector('.popup-layer-tag');
    const tagsNewButton = document.querySelector('.input-kit-widget__foot');
    const tagsNewContainer = document.querySelector('.tag-input-widget-new');
    const tagsOrignPopup = document.querySelector('.tag-input-widget-orgin');
    const newTagsCloseButton = document.querySelector('.input-kit-widget__new-tag-buttons-wrapper')
    const tagsUpdateButton = document.querySelectorAll('.tag-input-row__right')
    const tagsUpdateContainer = document.querySelector('.tag-input-widget-update')
    const tagsUpdateCloseButton = document.querySelector('.input-kit-widget__update-tag-buttons-wrapper')

    
    let isMenuPopupOpen = false;
    let isMovePopupOpen = false;
    let isSortingPopupOpen = false;
    let isMemberPopupOpen = false;
    let isTagsPopupOpen = false;

    // header의 더보기 아이콘 클릭
    $(document).ready(function() {
        let secondClass; 
        let clickedElement;
        let clickedIndex;
    
        // ...버튼 클릭했을 때, 전역변수에 지정되어 있던 color class를 box에 넣어주는 이벤트
        // $('.tasklist-menu__button').click(function() {
        $(document).on( 'click' , '.tasklist-menu__button' , function() {
            // 클릭이벤트 일어날때 마다 array 초기화
            secondClass = '';
            clickedElement = $(this); 
            clickedIndex = $('.tasklist-menu__button').index(clickedElement); 
            var check = `<i class="bi bi-check-lg tw-color-label__icon tw-icon"></i>`


            // 누르기 전에 모두 초기화
            $('.color-picker__circle').removeClass('--selected')
            $('.color-label').empty()
    
            $('.tasklist-header').eq(clickedIndex).addClass(secondClass);
            $('.tasklist-header__input-panel-container').eq(clickedIndex).addClass(secondClass);
            
            // dropdown 눌렀을 경우 해당하는 색상 나오도록 만들기
            var color =  $(this).closest('.tasklist-header')
            if (color.length > 0) {
                var colorlabel = color.attr('class');
                var colorlabelColor = colorlabel.split(' ');
            
                if (colorlabelColor.length > 1) {
                    // colorlabelColor를 찾아서 체크해줘야 함.
                    var colorContent =  $('.tasklist-color-selection-menu__color-picker-wrapper').find('.' +  colorlabelColor[1])
                    colorContent.closest('.color-picker__circle').addClass('--selected')
                    colorContent.append(check)
                }
            } else {
                console.log("해당하는 요소를 찾을 수 없습니다.");
            }
        });
    
        // colorpicker를 클릭하면 array에 colorpicker색을 넣어주는 함수
        // $('.color-label').click(function() {
        $(document).on( 'click' , '.color-label' , function() {
            debugger;
            const classesArray = $(this).attr('class').split(' ');
    
            // 가져온 클래스 목록 배열의 두 번째 클래스를 가져옵니다.(color ex) --bg-pink )
            if (classesArray.length >= 2) {
                var secondClass = classesArray[1]; // 두 번째 클래스 이름을 가져와서 변수에 할당
                var allcolor = '--bg-blue2 --bg-blue --bg-pink --bg-purple --bg-sky-blue --bg-green --bg-amber --bg-red --bg-orange --bg-brown --bg-gray --bg-rainbow';
            
                // 클래스를 추가 및 제거할 대상 요소를 선택합니다.
                var $tasklistHeader = $('.tasklist-header').eq(clickedIndex);
                var $inputPanelContainer = $('.tasklist-header__input-panel-container').eq(clickedIndex);
            
                // 클래스 이름 목록을 배열로 분할합니다.
                var classList = allcolor.split(' ');
            
                // 모든 클래스를 제거합니다.
                $tasklistHeader.removeClass(classList);
                $inputPanelContainer.removeClass(classList);
            
                // 두 번째 클래스를 추가합니다.
                $tasklistHeader.addClass(secondClass);
                $inputPanelContainer.addClass(secondClass);
            }
            
        });
    
        // colorpicker 클릭하면 해당하는 색 active해주는 이벤트
        // $('.color-picker__circle').click(function() { 
        $(document).on( 'click' , '.color-picker__circle' , function() {
            secondClass = '';
            $('.color-label .color-label__icon').remove();
            $('.tw-color-label').empty()
            $('.color-picker__circle').removeClass('--selected')
            $(this).addClass('--selected');
            $(this).removeClass('--selectable');
    
            var checkicon = $('<i class="icon color-label__icon"><i class="bi bi-check-lg"></i></i>');
            $(this).find('.color-label').append(checkicon);
        });

        $(document).on('click', '[data-id="delete-conponent"]', function(){
            $('.popup-layer-confirmation').remove();
            // 클릭하면 modal이랑 업무리스트가 삭제되어야함.
            $('.kanban-column').eq(clickedIndex + 1).remove();
        })

    });
  
    // menuButtons.forEach((button) => {
    //     button.addEventListener('click', function(e){
    //         const menuPopup = document.querySelector('.popup-content-wrapper-menu');

    //         if (!menuPopup) {
    //             return;
    //         }
    
    //         const menuButtonRect = button.getBoundingClientRect();
    //         const menuPopupLeft = menuButtonRect.left + window.scrollX + (menuButtonRect.width / 2) - (menuPopup.offsetWidth / 2) - 185;
    //         const menuPopupTop = menuButtonRect.bottom + window.scrollY + 5;
    
    //         menuPopup.style.left = menuPopupLeft + 'px';
    //         menuPopup.style.top = menuPopupTop + 'px';
    //         menuPopup.style.position = 'absolute';
    
    //         if (menuPopupLayer.style.display === 'none' || menuPopupLayer.style.display === '') {
    //         menuPopup.style.display = 'block';
    //         menuPopupLayer.style.display = 'block';
    
    //         isMenuPopupOpen = true;
    
    //         const menuClosePopup = function(event) {
    //             if (!isMenuPopupOpen) {
    //             menuPopup.style.display = 'none';
    //             menuPopupLayer.style.display = 'none';
    //             document.removeEventListener('click', menuClosePopup);
    //             }
    //         };
    
    //         document.addEventListener('click', menuClosePopup);
    //         } else {
    //         menuPopup.style.display = 'none';
    //         menuPopupLayer.style.display = 'none';
    //         }
    
    //         e.stopPropagation(); 
    //     })
    // });

  
    moveButtons.forEach((button) => {
        button.addEventListener('click', function(e){
            const movePopup = document.querySelector('.popup-content-wrapper-move');
    
            const moveButtonRect = button.getBoundingClientRect();
            const movePopupLeft = moveButtonRect.left + window.scrollX + (moveButtonRect.width / 2) - (movePopup.offsetWidth / 2) + 105;
            const movePopupTop = moveButtonRect.bottom + window.scrollY - 35;
    
            movePopup.style.left = movePopupLeft + 'px';
            movePopup.style.top = movePopupTop + 'px';
            movePopup.style.position = 'absolute';
    
            if (movePopupLayer.style.display === 'none' || movePopupLayer.style.display === '') {
            movePopup.style.display = 'block';
            movePopupLayer.style.display = 'block';
    
            isMovePopupOpen = true;
    
            const moveClosePopup = function(event) {
                if (!isMovePopupOpen) {
                movePopup.style.display = 'none';
                movePopupLayer.style.display = 'none';
                document.removeEventListener('click', moveClosePopup);
                }
            };
    
            document.addEventListener('click', moveClosePopup);
            } else {
            movePopup.style.display = 'none';
            movePopupLayer.style.display = 'none';
            }
    
            e.stopPropagation(); 
        })
    });


    inputKitHugeRow.addEventListener('click', function(e) {
        e.stopPropagation();
        inputKitWidget.style.display = 'block';
    });
    // close-button 클릭
    buttonsWrapper.addEventListener('click', function(e) {
        e.stopPropagation();
        inputKitWidget.style.display = 'none';
    });
    // back-icon 클릭 
    backIcon.forEach((backIcon) => {
        backIcon.addEventListener('click', function(e){
            e.stopPropagation();
            inputKitWidget.style.display = 'none';
            memberIniviteContainer.style.display = 'none';
            tagsNewContainer.style.display = 'none';
            tagsOrignPopup.style.opacity = '1';
            tagsUpdateContainer.style.display = 'none'
        })
    })


    sortingButtons.forEach((button) => {
        button.addEventListener('click', function(e){
            const sortingPopup = document.querySelector('.popup-content-wrapper-sorting');
    
            const sortingButtonRect = button.getBoundingClientRect();
            const sortingPopupLeft = sortingButtonRect.left + window.scrollX + (sortingButtonRect.width / 2) - (sortingPopup.offsetWidth / 2) + 105;
            const sortingPopupTop = sortingButtonRect.bottom + window.scrollY - 35;
    
            sortingPopup.style.left = sortingPopupLeft + 'px';
            sortingPopup.style.top = sortingPopupTop + 'px';
            sortingPopup.style.position = 'absolute';
    
            if (sortingLayer.style.display === 'none' || sortingLayer.style.display === '') {
            sortingPopup.style.display = 'block';
            sortingLayer.style.display = 'block';
    
            isSortingPopupOpen = true;
    
            const sortingClosePopup = function(event) {
                if (!isSortingPopupOpen) {
                sortingPopup.style.display = 'none';
                sortingLayer.style.display = 'none';
                document.removeEventListener('click', sortingClosePopup);
                }
            };
    
            document.addEventListener('click', sortingClosePopup);
            } else {
            sortingPopup.style.display = 'none';
            sortingLayer.style.display = 'none';
            }
    
            e.stopPropagation(); 
        })
    });


    memberButtons.forEach((button) => {
        button.addEventListener('click', function(e){
    
            const memberButtonsRect = button.getBoundingClientRect();
            const memberPopupLeft = memberButtonsRect.left + window.scrollX + (memberButtonsRect.width / 2) - (memberPopup.offsetWidth / 2) - 15;
            const memberPopupTop = memberButtonsRect.bottom + window.scrollY;
    
            memberPopup.style.left = memberPopupLeft + 'px';
            memberPopup.style.top = memberPopupTop + 'px';
            memberPopup.style.position = 'absolute';
    
            if (memberLayer.style.display === 'none' || memberLayer.style.display === '') {
            memberPopup.style.display = 'block';
            memberLayer.style.display = 'block';
    
            isMemberPopupOpen = true;
    
            const memberClosePopup = function(event) {
                if (!isMemberPopupOpen) {
                memberPopup.style.display = 'none';
                memberLayer.style.display = 'none';
                document.removeEventListener('click', memberClosePopup);
                }
            };
    
            document.addEventListener('click', memberClosePopup);
            } else {
            memberPopup.style.display = 'none';
            memberLayer.style.display = 'none';
            }
    
            e.stopPropagation(); 
        })
    });

    //close-button 클릭
    memberOriginCloseButton.addEventListener('click', function(e) {
        e.stopPropagation();
        memberPopup.style.display = 'none';
        memberLayer.style.display = 'none';
    });

    memberButtonsFooter.forEach((button) => {
        button.addEventListener('click', function(e){
            const memberPopup = document.querySelector('.popup-content-wrapper-member');
    
            const memberButtonsRect = button.getBoundingClientRect();
            const memberPopupLeft = memberButtonsRect.left + window.scrollX + (memberButtonsRect.width / 2) - (memberPopup.offsetWidth / 2) - 15;
            const memberPopupTop = memberButtonsRect.bottom + window.scrollY - 364;
    
            memberPopup.style.left = memberPopupLeft + 'px';
            memberPopup.style.top = memberPopupTop + 'px';
            memberPopup.style.position = 'absolute';
    
            if (memberLayer.style.display === 'none' || memberLayer.style.display === '') {
            memberPopup.style.display = 'block';
            memberLayer.style.display = 'block';
    
            isMemberPopupOpen = true;
    
            const memberClosePopup = function(event) {
                if (!isMemberPopupOpen) {
                memberPopup.style.display = 'none';
                memberLayer.style.display = 'none';
                document.removeEventListener('click', memberClosePopup);
                }
            };
    
            document.addEventListener('click', memberClosePopup);
            } else {
            memberPopup.style.display = 'none';
            memberLayer.style.display = 'none';
            }
    
            e.stopPropagation(); 
        })
    });

    memberIniviteButton.addEventListener('click', function(e){
        e.stopPropagation();
        memberIniviteContainer.style.display = 'block';
    });
    //멤버 초대하기 close-button 클릭
    memberCloseButton.addEventListener('click', function(e) {
        e.stopPropagation();
        memberIniviteContainer.style.display = 'none';
    });

    
    tagsButtons.forEach((button) => {
        button.addEventListener('click', function(e){
    
            const tagsButtonsRect = button.getBoundingClientRect();
            const tagsPopupLeft =  tagsButtonsRect.left + window.scrollX + ( tagsButtonsRect.width / 2) - (tagsPopup.offsetWidth / 2) - 15;
            const tagsPopupTop =  tagsButtonsRect.bottom + window.scrollY;
    
            tagsPopup.style.left =tagsPopupLeft + 'px';
            tagsPopup.style.top = tagsPopupTop + 'px';
            tagsPopup.style.position = 'absolute';
    
            if (tagsLayer.style.display === 'none' || tagsLayer.style.display === '') {
            tagsPopup.style.display = 'block';
            tagsLayer.style.display = 'block';
    
            isTagsPopupOpen = true;
    
            const tagsClosePopup = function(event) {
                if (!isTagsPopupOpen) {
                tagsPopup.style.display = 'none';
                tagsLayer.style.display = 'none';
                document.removeEventListener('click', tagsClosePopup);
                }
            };
    
            document.addEventListener('click', tagsClosePopup);
            } else {
            tagsPopup.style.display = 'none';
            tagsLayer.style.display = 'none';
            }
    
            e.stopPropagation(); 
        })
    });

    tagsCloseButton.addEventListener('click', function(e) {
        e.stopPropagation();
        tagsPopup.style.display = 'none';
        tagsLayer.style.display = 'none';
    });

    tagsButtonsFooter.forEach((button) => {
        button.addEventListener('click', function(e){
    
            const tagsButtonsRect = button.getBoundingClientRect();
            const tagsPopupLeft =  tagsButtonsRect.left + window.scrollX + ( tagsButtonsRect.width / 2) - (tagsPopup.offsetWidth / 2) - 15;
            const tagsPopupTop =  tagsButtonsRect.bottom + window.scrollY - 536;
    
            tagsPopup.style.left =tagsPopupLeft + 'px';
            tagsPopup.style.top = tagsPopupTop + 'px';
            tagsPopup.style.position = 'absolute';
    
            if (tagsLayer.style.display === 'none' || tagsLayer.style.display === '') {
            tagsPopup.style.display = 'block';
            tagsLayer.style.display = 'block';
    
            isTagsPopupOpen = true;
    
            const tagsClosePopup = function(event) {
                if (!isTagsPopupOpen) {
                tagsPopup.style.display = 'none';
                tagsLayer.style.display = 'none';
                document.removeEventListener('click', tagsClosePopup);
                }
            };
    
            document.addEventListener('click', tagsClosePopup);
            } else {
            tagsPopup.style.display = 'none';
            tagsLayer.style.display = 'none';
            }
    
            e.stopPropagation(); 
        })
    });

    //새 태그 만들기
    tagsNewButton.addEventListener('click', function(e){
        e.stopPropagation();
        tagsNewContainer.style.display = 'block';
        tagsOrignPopup.style.opacity = '0';
    });
    // 새 태그 만들기 close-button 클릭
    newTagsCloseButton.addEventListener('click', function(e) {
        e.stopPropagation();
        tagsNewContainer.style.display = 'none';
        tagsOrignPopup.style.opacity = '1';
    });

    //태그 편집
    tagsUpdateButton.forEach((updateButton) => {
        updateButton.addEventListener('click', function(e){
            e.stopPropagation();
            tagsUpdateContainer.style.display = 'block';
            tagsOrignPopup.style.opacity = '0';
        });
    })   
    //태그 편집 close-button 클릭
    tagsUpdateCloseButton.addEventListener('click', function(e) {
        e.stopPropagation();
        tagsUpdateContainer.style.display = 'none';
        tagsOrignPopup.style.opacity = '1';
    });
 

    // 문서의 다른 부분을 클릭 시 해당 팝업만 닫음
    document.addEventListener('click', function(e) {
        if (!inputKitWidget.contains(e.target) && !buttonsWrapper.contains(e.target) && !memberPopup.contains(e.target) && ! memberOriginCloseButton.contains(e.target) && !memberIniviteContainer.contains(e.target) && !memberCloseButton.contains(e.target) && !tagsPopup.contains(e.target) && !tagsCloseButton.contains(e.target) && !tagsNewContainer.contains(e.target) && !newTagsCloseButton.contains(e.target) && e.target.classList.contains('tasklist-menu__button')) {
            if (isMenuPopupOpen) {
                isMenuPopupOpen = false;
            }
            if (isMovePopupOpen) {
                isMovePopupOpen = false;
            }
            if (isSortingPopupOpen) {
                isSortingPopupOpen = false;
            }
            if (isMemberPopupOpen) {
                isMemberPopupOpen = false;
            }
            if (isTagsPopupOpen) {
                isTagsPopupOpen = false;
            }
            document.querySelector('.popup-content-wrapper-menu').style.display = 'none';
            document.querySelector('.popup-content-wrapper-move').style.display = 'none';
            document.querySelector('.popup-content-wrapper-sorting').style.display = 'none';
            document.querySelector('.popup-content-wrapper-member').style.display = 'none';
            document.querySelector('.popup-content-wrapper-tag').style.display = 'none';
        }
    });

    $(document).ready(function() {
        // tasklist-header__add-icon를 클릭할 때 이벤트 핸들러 추가
        $(document).on('click', '.tasklist-header__add-icon', function() {
            // 클릭된 아이콘과 관련된 패널을 보여줍니다.
            $(this).closest('.kanban-column').find('.tasklist-header__input-panel-container').css('display', 'block');
        });
    
        // task-or-note-input-panel__cancel-button를 클릭할 때 이벤트 핸들러 추가
        $(document).on('click', '.task-or-note-input-panel__cancel-button', function() {
            // 클릭된 버튼과 관련된 패널을 숨깁니다.
            $(this).closest('.tasklist-header__input-panel-container').css('display', 'none');
        });

        // tasklist-menu를 클릭할 때 이벤트 핸들러 추가
        $(document).on('click', '.tasklist-menu', function() {
            $('.popup-layer-menu').css('display', 'block');
            
            const menuPopup = $('.popup-content-wrapper-menu');
            const menuButtonRect = $(this).get(0).getBoundingClientRect();

            const menuPopupLeft = menuButtonRect.left + window.scrollX + (menuButtonRect.width / 2) - (menuPopup.width() / 2) - 85;
            const menuPopupTop = menuButtonRect.bottom + window.scrollY + 5;

            menuPopup.css({
                display: 'block',
                position: 'absolute',
                left: menuPopupLeft + 'px',
                top: menuPopupTop + 'px',
            });

            $(document).on('click', function(e) {
                if (!$(e.target).closest('.tasklist-menu').length) {
                    // 클릭된 요소와 그 부모들 중 tasklist-menu를 가진 것이 없을 경우
                    $('.popup-layer-menu').css('display', 'none');
                    $('.popup-content-wrapper-menu').css('display', 'none');
                }
            });
        });

        // member-panel-item을 클릭할 때 이벤트 핸들러 추가
        $(document).on('click', '.task-properties-panel__member-panel-item', function() {
            $('.popup-layer-member').css('display', 'block');
            
            const menuPopup = $('.popup-content-wrapper-member');
            const menuButtonRect = $(this).get(0).getBoundingClientRect();

            const menuPopupLeft = menuButtonRect.left + window.scrollX + (menuButtonRect.width / 2) - (menuPopup.width() / 2) + 160;
            const menuPopupTop = menuButtonRect.bottom + window.scrollY ;

            menuPopup.css({
                display: 'block',
                position: 'absolute',
                left: menuPopupLeft + 'px',
                top: menuPopupTop + 'px',
            });

            $(document).on('click', '.input-kit-widget__buttons-wrapper', function() {
                $('.popup-layer-member').css('display', 'none');
                $('.popup-content-wrapper-member').css('display', 'none');
            });
        });

        // tag-panel-item을 클릭할 때 이벤트 핸들러 추가
        $(document).on('click', '.task-properties-panel__tag-panel-item', function() {
            $('.popup-layer-tag').css('display', 'block');
            
            const menuPopup = $('.popup-content-wrapper-tag');
            const menuButtonRect = $(this).get(0).getBoundingClientRect();

            const menuPopupLeft = menuButtonRect.left + window.scrollX + (menuButtonRect.width / 2) - (menuPopup.width() / 2) + 160;
            const menuPopupTop = menuButtonRect.bottom + window.scrollY ;

            menuPopup.css({
                display: 'block',
                position: 'absolute',
                left: menuPopupLeft + 'px',
                top: menuPopupTop + 'px',
            });

            $(document).on('click', '.input-kit-widget__buttons-wrapper', function() {
                $('.popup-layer-tag').css('display', 'none');
                $('.popup-content-wrapper-tag').css('display', 'none');
            });
        });

        // header-title mouseover시 이벤트 핸들러 추가
        $(document).on('mouseover', '.tasklist-header__left-section', function() {
            const icon = $(this).find('.editable-text-field__icon');
            icon.css('display', 'block');
        });
        $(document).on('mouseout', '.tasklist-header__left-section', function() {
            const icon = $(this).find('.editable-text-field__icon');
            icon.css('display', 'none');
        });
    });


    // 모달(note) HTML 파일 경로 설정
    const modalHtmlPath = 'modal-note.html';

    function openModal() {
       
        const xhr = new XMLHttpRequest();
        xhr.open('GET', modalHtmlPath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
            const modalHtml = xhr.responseText;
            displayModal(modalHtml);
            }
        };
        xhr.send();
    }

    // 모달을 화면에 표시하는 함수
    function displayModal(modalHtml) {
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('custom-modal'); 
        modalContainer.innerHTML = modalHtml; 

        document.body.appendChild(modalContainer);

        // 닫기 버튼 클릭 이벤트 처리
        const closeButton = modalContainer.querySelector('.modal__rest-buttons');
        closeButton.addEventListener('click', closeModal);

        // 모달 외부 클릭 시 닫기
        modalContainer.addEventListener('click', function (e) {
            if (e.target === modalContainer) {
            closeModal();
            }
        });

        modalContainer.style.display = 'block';
    }

    // 모달 닫기 함수
    function closeModal() {
        const modalContainer = document.querySelector('.custom-modal');
        if (modalContainer) {
            modalContainer.style.display = 'none';
            document.body.removeChild(modalContainer);
        }
        }

        //tasklist-menu__create-note 버튼 클릭 시 모달 열기
        const createNoteButton = document.querySelector('.tasklist-menu__create-note');
        createNoteButton.addEventListener('click', function (e) {
        e.stopPropagation();
        openModal();
    });


     // 모달(create) HTML 파일 경로 설정
    const createModalHtmlPath = 'modal-create.html';

    function openCreateModal() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', createModalHtmlPath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const createmodalHtml = xhr.responseText;
                displayCreateModal(createmodalHtml);
            }
        };
        xhr.send();
    }

    function displayCreateModal(createmodalHtml) {
        const createmodalContainer = document.createElement('div');
        createmodalContainer.classList.add('custom-createmodal'); 
        createmodalContainer.innerHTML = createmodalHtml; 

        document.body.appendChild(createmodalContainer);

        // 닫기 버튼 클릭 이벤트 처리
        const closeButton = createmodalContainer.querySelector('.button-v-2');
        closeButton.addEventListener('click', closeCreateModal);

        // 모달 외부 클릭 시 닫기
        createmodalContainer.addEventListener('click', function (e) {
            if (e.target === createmodalContainer) {
                closeCreateModal();
            }
        });

        createmodalContainer.style.display = 'block';
    }

    // 모달 닫기 함수
    function closeCreateModal() {
        const createmodalContainer = document.querySelector('.custom-createmodal');
        if (createmodalContainer) {
            createmodalContainer.style.display = 'none';
            document.body.removeChild(createmodalContainer);
        }
    }

    // tasklist-menu__create-tasklist 버튼 클릭 시 모달 열기
    const createTasklistButton = document.querySelector('.tasklist-menu__create-tasklist');
    createTasklistButton.addEventListener('click', function (e) {
        e.stopPropagation();
        openCreateModal();
    });

    
    // 모달(duplicate) HTML 파일 경로 설정
    const duplicateModalHtmlPath = 'modal-duplicate.html';

    function openduplicateModal() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', duplicateModalHtmlPath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const duplicatemodalHtml = xhr.responseText;
                displayduplicateModal(duplicatemodalHtml);
            }
        };
        xhr.send();
    }

    function displayduplicateModal(duplicatemodalHtml) {
        const duplicatemodalContainer = document.createElement('div');
        duplicatemodalContainer.classList.add('custom-duplicatemodal'); 
        duplicatemodalContainer.innerHTML = duplicatemodalHtml; 

        document.body.appendChild(duplicatemodalContainer);

        //duplicateModal 안에 locationPopup
        const locationButton = duplicatemodalContainer.querySelector('.tasklist-location-selector__location-container');
        const locationPopup = document.querySelector('.popup-container__popup-loation')

        locationButton.addEventListener('click', function (){

            const locationButtonRect = locationButton.getBoundingClientRect();
            const locationPopupLeft = locationButtonRect.left + window.scrollX + (locationButtonRect.width / 2) - (locationPopup.offsetWidth / 2) - 45 ;
            const locationPopupTop = locationButtonRect.bottom + window.scrollY - 210;
    
            locationPopup.style.left = locationPopupLeft + 'px';
            locationPopup.style.top = locationPopupTop + 'px';
            locationPopup.style.position = 'absolute';

            locationPopup.style.display = 'block';
        })

        const locationCloseButton = document.querySelector('.input-kit-widget__modal-location-buttons-wrapper button');
        
        locationCloseButton.addEventListener('click', function () {
            locationPopup.style.display = 'none';
        });

        const locationProjectButton = document.querySelector('.input-kit-huge-row-location');
        const locationProjectContainer = document.querySelector('.popup-container__popup-location-project')

        locationProjectButton.addEventListener('click', function(){

            const locationProjectButtonRect = locationProjectButton.getBoundingClientRect();
            const locationProjectPopupLeft = locationProjectButtonRect.left + window.scrollX + (locationProjectButtonRect.width / 2) - (locationProjectContainer.offsetWidth / 2) - 175 ;
            const locationProjectPopupTop = locationProjectButtonRect.bottom + window.scrollY - 270;
    
            locationProjectContainer.style.left = locationProjectPopupLeft + 'px';
            locationProjectContainer.style.top = locationProjectPopupTop + 'px';
            locationProjectContainer.style.position = 'absolute';

            locationProjectContainer.style.display = 'block';
        })

        const locationProjectCloseButton = document.querySelector('.input-kit-widget__project-location-buttons-wrapper');
        const locationProjectBackButton = document.querySelector('.input-kit-widget__back-button-location');
        
        locationProjectBackButton.addEventListener('click', function () {
            locationProjectContainer.style.display = 'none';
        });
        locationProjectCloseButton.addEventListener('click', function () {
            locationProjectContainer.style.display = 'none';
        });

        const closeButton = duplicatemodalContainer.querySelector('.button-v-2');
        closeButton.addEventListener('click', closeduplicateModal);

        duplicatemodalContainer.addEventListener('click', function (e) {
            if (e.target === duplicatemodalContainer) {
                closeduplicateModal();
            }
        });

        duplicatemodalContainer.style.display = 'block';
    }

    function closeduplicateModal() {
        const duplicatemodalContainer = document.querySelector('.custom-duplicatemodal');
        if (duplicatemodalContainer) {
            duplicatemodalContainer.style.display = 'none';
            document.body.removeChild(duplicatemodalContainer);
        }
    }

    const duplicateTasklistButton = document.querySelector('.tasklist-menu__duplicate');
    duplicateTasklistButton.addEventListener('click', function (e) {
        e.stopPropagation();
        openduplicateModal();
    });


    // 모달(email) HTML 파일 경로 설정
    const emailModalHtmlPath = 'modal-email.html';

    function openemailModal() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', emailModalHtmlPath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const emailmodalHtml = xhr.responseText;
                displayemailModal(emailmodalHtml);
            }
        };
        xhr.send();
    }

    function displayemailModal(emailmodalHtml) {
        const emailmodalContainer = document.createElement('div');
        emailmodalContainer.classList.add('custom-emailmodal'); 
        emailmodalContainer.innerHTML = emailmodalHtml; 

        document.body.appendChild(emailmodalContainer);

        const closeButton = emailmodalContainer.querySelector('.modal__rest-buttons');
        closeButton.addEventListener('click', closeemailModal);

        emailmodalContainer.addEventListener('click', function (e) {
            if (e.target === emailmodalContainer) {
                closeemailModal();
            }
        });

        emailmodalContainer.style.display = 'block';
    }

    function closeemailModal() {
        const emailmodalContainer = document.querySelector('.custom-emailmodal');
        if (emailmodalContainer) {
            emailmodalContainer.style.display = 'none';
            document.body.removeChild(emailmodalContainer);
        }
    }

    const emailTasklistButton = document.querySelector('.tasklist-menu__email');
    emailTasklistButton.addEventListener('click', function (e) {
        e.stopPropagation();
        openemailModal();
    });


    // 모달(confirmation) HTML 파일 경로 설정
    const confirmationModalHtmlPath = 'modal-confirmation.html';

    function openconfirmationModal() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', confirmationModalHtmlPath, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const confirmationmodalHtml = xhr.responseText;
                displayconfirmationModal(confirmationmodalHtml);
            }
        };
        xhr.send();
    }

    function displayconfirmationModal(confirmationmodalHtml) {
        const confirmationmodalContainer = document.createElement('div');
        confirmationmodalContainer.classList.add('custom-confirmationmodal'); 
        confirmationmodalContainer.innerHTML = confirmationmodalHtml; 

        document.body.appendChild(confirmationmodalContainer);

        const closeButton = confirmationmodalContainer.querySelector('.button-v-2');
        closeButton.addEventListener('click', closeconfirmationModal);

        confirmationmodalContainer.addEventListener('click', function (e) {
            if (e.target === confirmationmodalContainer) {
                closeconfirmationModal();
            }
        });

        confirmationmodalContainer.style.display = 'block';
    }

    function closeconfirmationModal() {
        const confirmationmodalContainer = document.querySelector('.custom-confirmationmodal');
        if (confirmationmodalContainer) {
            confirmationmodalContainer.style.display = 'none';
            document.body.removeChild(confirmationmodalContainer);
        }
    }

    const confirmationTasklistButton = document.querySelector('.menu__item.--danger');
    confirmationTasklistButton.addEventListener('click', function (e) {
        e.stopPropagation();
        openconfirmationModal();
    });
    
});