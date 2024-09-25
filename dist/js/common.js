"use strict";

/*
	= Common
*/
var isContainElement = function isContainElement(element) {
  return element === document.body ? false : document.body.contains(element);
};

// + openUserControl

var eleOpenUserControl = document.querySelector('.btn-open-usercontrol');
var openUserControl = function openUserControl() {
  $('.btn-open-usercontrol').on('click', function () {
    $('.user-control').toggleClass('on');
  });
};
isContainElement(eleOpenUserControl) ? openUserControl() : false;

/*
 = Side Navigation
 */
// + menu Toggle

var eleSideNav = document.querySelector('#sideNav');
var menuToggle = function menuToggle() {
  var sideNav = $('#sideNav');
  var contentsWrap = $('.content-wrapper');
  var headerWrap = $('.header .wrap');
  var sidebarWidth = 220;
  $('.sidebar-toggle').on('click', function () {
    if ($(sideNav).hasClass('closed') === true) {
      sideNav.removeClass('closed');
      contentsWrap.css('padding-left', sidebarWidth);
      headerWrap.css('padding-left', sidebarWidth);
    } else {
      sideNav.addClass('closed');
      contentsWrap.css('padding-left', 0);
      headerWrap.css('padding-left', 0);
    }
    setTimeout(function () {
      modalTool();
    }, 0);
  });
};
isContainElement(eleSideNav) ? menuToggle() : false;

// + sideMenuToggle

var sideNavigation = document.querySelector('#sideNav');
var sideMenuToggle = function sideMenuToggle() {
  var sideMenuLink = document.querySelectorAll('.sidebar-menu > li > a');
  var sideMenuLinkArr = [],
    menuLength = sideMenuLink.length;
  for (var i = 0; i < menuLength; i++) {
    sideMenuLinkArr.push(sideMenuLink[i]);
  }
  Array.prototype.forEach.call(sideMenuLink, function (selectedLink) {
    selectedLink.addEventListener('click', function () {
      var sideSubMenu = document.querySelectorAll('.sidebar-sub-menu > li > a');
      var chkSubOnchk = false;

      // + 개발자 요청에 따른 개발환경 소스 추가 (230823)
      for (var i = 0; i < sideSubMenu.length; i++) {
        if (sideSubMenu[i].classList.contains('on')) {
          chkSubOnchk = true;
          break;
        }
      }
      var extraSideMenuList = sideMenuLinkArr.filter(function (restLinks) {
        return restLinks !== selectedLink;
      });
      Array.prototype.forEach.call(extraSideMenuList, function (link) {
        link.classList.remove('on');
      });
      // + 개발자 요청에 따른 개발환경 소스 추가 (230823)
      if (!chkSubOnchk) {
        setTimeout(function () {
          selectedLink.classList.toggle('on');
        }, 200);
      }
      // + UI DEV용 Script (UI개발환경에서 이벤트 정상처리를 위한 조건문 추가 )
      // superTitle 클래스 개발 환경에서 추가로 부여된 소스로 개발환경 소스와 UI개발 소스를 구분하기 위함
      else if (!selectedLink.parentElement.classList.contains('superTitle')) {
        setTimeout(function () {
          selectedLink.classList.toggle('on');
        }, 200);
      }
    });
  });
};
isContainElement(sideNavigation) ? sideMenuToggle() : false;

/*
			= Form control
	*/

// + input file
var selectedInputFile = function selectedInputFile() {
  $('.c-input-file').on('change', function (e) {
    var seletedFile = $(e.currentTarget),
      selectedFileList = seletedFile.closest('.c-input-file-group').next('.c-input-file-list');
    var fileName = seletedFile.val().split('\\').pop(),
      listHtml = "<li><div class=\"file-info\"><p class=\"name\">".concat(fileName, "</p>\n\t\t<button type=\"button\" class=\"btn-del\"><span class=\"skip\">\uC0AD\uC81C</span></button>\n\t</div></li>");
    selectedFileList.append(listHtml);
  });
};
var selectedListDelFile = function selectedListDelFile() {
  $('.c-input-file-list .btn-del').on('click', function (e) {
    var target = $(e.currentTarget);
    target.closest('li').remove();
  });
};

// + tabContentsView
var eleTabContentsView = document.querySelector('.c-tab-list');
var tabContentsView = function tabContentsView() {
  $('.c-tab-list').on('click', 'li', function (e) {
    var target = $(e.currentTarget),
      tabList = target.siblings('li'),
      selectedTabLink = target.children('a'),
      selectedTab = selectedTabLink.attr('aria-controls'),
      seletedContent = $('.tab-cont').siblings("#".concat(selectedTab)),
      tabContents = seletedContent.siblings('.tab-cont');
    if (selectedTabLink.hasClass('is-disable')) {
      return 0;
    } else {
      tabList.removeClass('on').find('a').attr('aria-selected', false);
      target.addClass('on').find('a').attr('aria-selected', true);

      // tabContents.hide();
      // seletedContent.show();

      tabContents.removeClass('on');
      seletedContent.addClass('on');
    }
  });
};
isContainElement(eleTabContentsView) ? tabContentsView() : false;

// + 검진항목 테이블 bg
var eleTblCheckBg = document.querySelector('.tbl-chkup-category');
var tableCheckBg = function tableCheckBg() {
  $('.tbl-chkup-category').children('tbody').find('td:first-child input').on('change', function () {
    // $(this).closest('tr').toggleClass('highlight', this.checked);

    var $row = $(this).closest('tr');
    var row = $row.index();
    var rowspan = $row.find('td[rowspan]').attr('rowspan') || 0;
    var $rows = $row.parent().children().slice(1, row + rowspan);
    row--;
    $rows.each(function (i) {
      var $tr = $(this);
      var rowspan = $tr.find('td[rowspan]').attr('rowspan') || 0;
      if (i < row && rowspan + i > row || i > row) {
        $row = $row.add($tr);
      }
    });
    if ($(this).is(':checked')) {
      $row.addClass('highlight');
    } else if (!$(this).is(':checked')) {
      $row.removeClass('highlight');
    }
  });
};
isContainElement(eleTblCheckBg) ? tableCheckBg() : false;

// + 검진항목 전체 선택 시 Background 제어
var tableAllCheckBg = function tableAllCheckBg() {
  $('.allchk-chkup-tbl').on('change', function (e) {
    var target = $(e.currentTarget),
      targetTblList = target.closest('thead').next('tbody');
    if (target.is(':checked')) {
      targetTblList.find('tr').addClass('highlight');
    } else if (!target.is(':checked')) {
      targetTblList.find('tr').removeClass('highlight');
    }
  });
};

// 검진 예약 상세보기
var floatingRightBox = function floatingRightBox() {
  var fixHeaderHeight = $('.header').height(),
    currentLayoutOffsetY = $('.reservation-detail').offset().top,
    panelMargin = 40;
  $(window).on('scroll', function () {
    var nowScrollY = $(window).scrollTop() + fixHeaderHeight;
    var topPos = parseInt(nowScrollY - 156);
    if (nowScrollY > currentLayoutOffsetY) {
      $('.c-floating-box').stop().animate({
        top: topPos
      }, 300, 'linear');
    } else if (nowScrollY <= currentLayoutOffsetY) {
      $('.c-floating-box').stop().animate({
        top: 0
      }, 300, 'linear');
    }
  });
};

// 고객사 상세보기 (CT_01_002)
var eleMemoDetail = document.querySelector('.c-memo-card');
var memoDetailToggle = function memoDetailToggle() {
  $('.c-memo-card > a').on('click', function (e) {
    e.preventDefault();
    var target = $(e.currentTarget),
      curContent = target.children('.col-cont'),
      defaultContHeight = 24,
      detailContent = curContent.find('.detail-cont').height();
    if (detailContent > defaultContHeight) {
      if (!curContent.hasClass('on')) {
        curContent.addClass('on').stop().animate({
          height: detailContent
        }, 300);
        target.attr('aria-expanded', true).attr('title', '내용 접기');
      } else {
        curContent.removeClass('on').stop().animate({
          height: defaultContHeight
        }, 300);
        target.attr('aria-expanded', false).attr('title', '내용 펼치기');
      }
    }
  });
};
isContainElement(eleMemoDetail) ? memoDetailToggle() : false;

// init
function memoCardDetail() {
  $('.c-memo-card').find('.detail-cont').each(function (e) {
    var detailHeight = $(this).height();
    if (detailHeight > 24) {
      $(this).addClass('on');
    } else {
      $(this).removeClass('on');
    }
  });
}

// =  toggleAccordion
var eleToggleAccordion = document.querySelector('.co-accrodion-list');
var toggleAccordion = function toggleAccordion() {
  $(document).on('click', 'a.btn-accrodion', function (e) {
    e.preventDefault();
    var target = $(e.currentTarget),
      accordionBox = target.closest('.co-accordion'),
      accordionPanel = target.next('.accrodion-panel'),
      accordionList = target.closest('.co-accrodion-list');
    if (accordionBox.hasClass('on') && accordionPanel.is(':visible')) {
      accordionBox.removeClass('on').find('.is-blind').text('접기');
      accordionPanel.stop().slideUp(350);
    } else {
      //  only-spread
      if (accordionList.hasClass('only-spread')) {
        accordionList.find('.co-accordion').removeClass('on').children('.accrodion-panel').stop().slideUp(350);
      }
      accordionBox.addClass('on').find('.is-blind').text('펼치기');
      accordionPanel.stop().slideDown(350);
    }
  });
};
isContainElement(eleToggleAccordion) ? toggleAccordion() : false;
if (!Element.prototype.closest) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  Element.prototype.closest = function (s) {
    var el = this;
    var ancestor = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);
    return null;
  };
}

//  = MemoAccordion

// + coMemoToggle
var memoContToggle = function memoContToggle(memoContBtn, memoContList, memoSkipTxt) {
  Array.prototype.forEach.call(memoContBtn, function (btn, index) {
    var memeContList = btn.closest('.memo-list').querySelector('.memo-cont');
    if (memeContList.clientHeight <= 100) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'inline-block';
    }
    btn.addEventListener('click', function (e) {
      var target = e.currentTarget,
        memoList = target.closest('.memo-list'),
        contArea = memoList.querySelector('.memo-cont');
      if (contArea.clientHeight < 100) {
        return 0;
      } else {
        memoList.classList.toggle('active');
        Array.prototype.forEach.call(memoContList, function (memoList, index2) {
          if (index !== index2) {
            memoList.classList.remove('active');
          }
        });
        Array.prototype.forEach.call(memoSkipTxt, function (txt, index) {
          memoContList[index].classList.contains('active') ? txt.innerText = '메모이력접기' : txt.innerText = '메모이력보기';
        });
      }
    });
  });
};

// + targetMemoAccordion()
var targetMemoAccordion = function targetMemoAccordion() {
  var memoContBtn = document.querySelectorAll('.target-memo-cont .memo-cont-btn'),
    memoContList = document.querySelectorAll('.target-memo-cont .memo-list'),
    memoSkipTxt = document.querySelectorAll('.target-memo-cont .memo-cont-btn .skip');
  memoContToggle(memoContBtn, memoContList, memoSkipTxt);
};

// + tblToggleMemoAccordion()

var tblToggleMemoAccordion = function tblToggleMemoAccordion() {
  var tblMemoContBtn = document.querySelectorAll('.c-table.memo-lists .memo-cont-btn'),
    tblMemoContList = document.querySelectorAll('.c-table.memo-lists .memo-list'),
    tblMemoSkipTxt = document.querySelectorAll('.c-table.memo-lists .memo-cont-btn .skip');
  memoContToggle(tblMemoContBtn, tblMemoContList, tblMemoSkipTxt);
};

// =  toggleAccordion

// + side Notify Toggle
var eleNoticeSideBar = document.querySelector('#noticeSideNav');
var closeNoticeSideBar = function closeNoticeSideBar() {
  var noticeSideNav = $('#noticeSideNav');
  $('.btn-close-notice-sidebar').on('click', function () {
    noticeSideNav.removeClass('open');
  });
};
isContainElement(eleNoticeSideBar) ? closeNoticeSideBar() : false;
var openNoticeSideBar = function openNoticeSideBar() {
  var noticeSideNav = $('#noticeSideNav');
  $('.btn-open-notice-sidebar').on('click', function () {
    noticeSideNav.addClass('open');
  });
};
isContainElement(eleNoticeSideBar) ? openNoticeSideBar() : false;
var modRsvScrollbarCustom = function modRsvScrollbarCustom() {
  var temsScrollCnt = $('.rsvdtl-popup-type01 .modrsv-scroll').length;
  if (temsScrollCnt > 0) {
    for (var i = 0; i < temsScrollCnt; i++) {
      $('.rsvdtl-popup-type01 .modrsv-scroll').eq(i).children('.inner').addClass("scroll-effect".concat(i));
      window.Scrollbar.init(document.querySelector(".scroll-effect".concat(i)));
    }
  }
};

// + 예약 진행 현황 (예약 변경 설정)
var modRsvScrollbarStatus = function modRsvScrollbarStatus() {
  var temsScrollCnt02 = $('.reservation-dtl-status-layout .modrsv-scroll').length;
  if (temsScrollCnt02 > 0) {
    for (var j = 0; j < temsScrollCnt02; j++) {
      $('.reservation-dtl-status-layout .modrsv-scroll').eq(j).children('.inner').addClass("scroll-effect".concat(j));
      window.Scrollbar.init(document.querySelector(".scroll-effect".concat(j)));
    }
  }
};

// + 공지하기 등록
var noticeEnrollment = function noticeEnrollment() {
  var Scrollbar = window.Scrollbar;
  Scrollbar.init(document.querySelector('.list-send-person'));
};

// + Table Vh Scroll
var eleTblVhField = document.querySelector('.c-tbl-vh-field');
var tableVhScroll = function tableVhScroll() {
  var table = document.querySelector('.c-table-field');
  if (table === null) {
    return 0;
  } else {
    if (table.classList.contains('c-tbl-vh-field')) {
      var tableField = document.querySelector('.c-tbl-vh-field');
      var theadwidth = tableField.querySelector('thead').clientWidth;
      document.querySelector('.c-table').addEventListener('scroll', function () {
        tableField.querySelector('thead').classList.add('scroll');
        tableField.querySelector('thead').style.width = theadwidth;
      });
    }
  }
};
isContainElement(eleTblVhField) ? tableVhScroll() : false;

// + Form Element Align
var formElemAlign = function formElemAlign() {
  var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
  var target = arguments.length > 1 ? arguments[1] : undefined;
  var addWrapSelector = '',
    inputListSelecotor = '.c-article.input-list',
    inputListSelecotor02 = '.c-article.input-list02';

  // modal 내 input 요소 처리

  if (elem === 'default') {
    addWrapSelector = 'section.contents';
    if (document.querySelectorAll(inputListSelecotor).length > 0) {
      document.querySelector(addWrapSelector).classList.add('type-horizontal');
    }
  } else if (elem === 'modal') {
    addWrapSelector = "#".concat(target);
    if (document.querySelectorAll(inputListSelecotor).length > 0 || document.querySelectorAll(inputListSelecotor02).length > 0) {
      document.querySelector(addWrapSelector).classList.add('type-horizontal');
    }
  }
};

// + 개인정보수집 약관 modal
var modalTerms = function modalTerms() {
  var modalBtn = document.querySelectorAll('.c-modal-btn');
  var modalCloseBtn = document.querySelectorAll('.c-modal-wrap .c-popup-close-btn');
  var modalTool = document.querySelectorAll('.modal-tool');
  var modalWrap = document.querySelector('.c-modal-wrap');

  // modal open
  Array.prototype.forEach.call(modalBtn, function (btn) {
    btn.addEventListener('click', function (e) {
      var modalDataSet = e.currentTarget.dataset.modal;
      var modalDataValue = document.querySelector(modalDataSet);
      modalDataValue.parentNode.classList.add('open');
      modalDataValue.setAttribute('aria-hidden', false);
      if (modalTool.length > 0) {
        var btnTop = btn.getBoundingClientRect().top;
        var btnRight = btn.getBoundingClientRect().right;
        var btnLeftX = btnRight + "px";
        var btnTopY = btnTop + "px";
        modalWrap.style.top = btnTopY;
        modalWrap.style.left = btnLeftX;
      }
    });
  });

  // modal close
  Array.prototype.forEach.call(modalCloseBtn, function (item) {
    item.addEventListener('click', function (e) {
      var modalDataSet2 = e.currentTarget.closest('.c-modal-cont');
      var modalDataSetValue = modalDataSet2.parentNode;
      modalDataSetValue.classList.remove('open');
      modalDataSet2.setAttribute('aria-hidden', true);
      modalWrap.removeAttribute('style');
    });
  });
};

// modal tool open
var modalToolWrap = document.querySelector('.modal-tool');
var modalTool = function modalTool() {
  var modalToolOpen = document.querySelector('.modal-tool.open');
  if (modalToolOpen) {
    var modalId = document.querySelector('.modal-tool.open .c-modal-cont').id,
      dataModal = document.querySelector("[data-modal=\"#".concat(modalId, "\"")),
      // 버튼
      dataModalRect = dataModal.getBoundingClientRect(),
      btnPosY2 = dataModalRect.top,
      btnPosX3 = dataModalRect.right,
      modalIdStyle = document.querySelector("#".concat(modalId)).parentNode.style;
    modalIdStyle.top = "".concat(btnPosY2, "px");
    modalIdStyle.left = "".concat(btnPosX3, "px");
  } else {
    return 0;
  }
};
isContainElement(modalToolWrap) ? modalTool() : false;
window.addEventListener('resize', function () {
  modalTool();
});

// + DataTable Library Control
var DefaultDateOptionBasic = {
  scrollX: true,
  paging: false,
  searching: false,
  ordering: false,
  reponsive: true,
  info: false,
  autoWitdh: false,
  language: {
    zeroRecords: '데이터가 없습니다.',
    loadingRecods: '로딩중...',
    processing: '처리중',
    infoEmpty: '데이터가 없습니다.'
  }
};

// + 연기 검사 팝업
var delayExamModal = document.querySelector('.delayexamination-info-popup'),
  delayExamModalList = document.querySelectorAll('.delayexamination-info-popup'),
  btndelayExamModal = document.querySelectorAll('.btn-open-delayexam-popup'),
  delayPopupStyle = 'display:block; z-index:1049',
  delayDefatuPopupStyle = 'display:block; z-index:-1';
Array.prototype.forEach.call(delayExamModalList, function (e) {
  e.style.cssText = delayDefatuPopupStyle;
});
var initDelayExamModal = function initDelayExamModal() {
  Array.prototype.forEach.call(btndelayExamModal, function (btn) {
    btn.addEventListener('click', function () {
      var modallTaget = btn.dataset.target,
        showBoolean = delayExamModal.classList.contains('show');
      if (!showBoolean) {
        document.querySelector("".concat(modallTaget)).style.cssText = delayPopupStyle;
      } else {
        document.querySelector("".concat(modallTaget)).style.cssText = '';
      }
    });
  });
};
isContainElement(delayExamModal) ? initDelayExamModal() : false;

// = function list
modRsvScrollbarCustom();
modalTerms();
//# sourceMappingURL=maps/common.js.map
