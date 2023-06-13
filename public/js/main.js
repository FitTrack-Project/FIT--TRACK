'use strict'




/**
 * 순서대로 나타나는 기능
 */
// 나타날 요소들(.fade-in) 찾기.
const fadeEls = document.querySelectorAll('.visual .fade-in')
// 나타날 요소들을 하나씩 반복해서 처리!
fadeEls.forEach(function (fadeEl, index) {
  // 각 요소들을 순서대로(delay) 보여지게 함!
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7,
    opacity: 1
  })
})


/**
 * 슬라이드 요소 관리
 */
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 수직 슬라이드
  autoplay: {
    delay: 2000
  }, // 자동 재생 여부
  loop: true // 반복 재생 여부
})

new Swiper('.awards .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: {
    delay: 2000
  }, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 0, // 슬라이드 사이 여백
  slidesPerView: 1, // 한 번에 보여줄 슬라이드 개수
  // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
//   navigation: { // 슬라이드 이전/다음 버튼 사용 여부
//     prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
//     nextEl: '.awards .swiper-next' // 다음 버튼 선택자
//   }
})


