// 👉 질문 데이터
const questions = [
  {
    title: "탕수육을 먹을 때 당신은?",
    left: {
      text: "나는 무조건 찍먹파!",
      img: "../images/mouse.png",
      type: "A"
    },
    right: {
      text: "나는 무조건 부먹파!",
      img: "../images/rabbit.png",
      type: "B"
    }
  },
  {
    title: "치킨을 먹을 때 당신은?",
    left: {
      text: "바삭한 후라이드!",
      img: "../images/mouse.png",
      type: "A"
    },
    right: {
      text: "달달한 양념!",
      img: "../images/rabbit.png",
      type: "B"
    }
  }
  // 👉 총 5개 넣으면 끝
];

let current = 0;

// 👉 점수 저장
let score = {
  A: 0,
  B: 0
};

// 👉 질문 렌더링
function renderQuestion() {
  const q = questions[current];

  document.querySelector('.q-title').innerText = q.title;

  document.querySelector('.left .text').innerText = q.left.text;
  document.querySelector('.left .character').src = q.left.img;

  document.querySelector('.right .text').innerText = q.right.text;
  document.querySelector('.right .character').src = q.right.img;

  // 체크 초기화
  document.querySelectorAll('.select-box').forEach(el => {
    el.classList.remove('active');
  });
}

// 👉 선택 이벤트
document.querySelectorAll('.choice').forEach((el, index) => {
  el.addEventListener('click', () => {

    const q = questions[current];

    // 체크 표시
    document.querySelectorAll('.select-box').forEach(box => {
      box.classList.remove('active');
    });

    el.querySelector('.select-box').classList.add('active');

    // 점수 누적
    if (index === 0) {
      score[q.left.type]++;
    } else {
      score[q.right.type]++;
    }

    // 다음 질문
    setTimeout(() => {
      current++;

      if (current < questions.length) {
        renderQuestion();
      } else {
        // 👉 결과 페이지 이동 + 데이터 전달
        localStorage.setItem('result', JSON.stringify(score));
        location.href = 'result.html';
      }
    }, 400);
  });
});

// 시작
renderQuestion();
