window.addEventListener('load', () => {
  playAnimation();
});

const total = 5;
let current = 1;
const candidateMap = { left: 'JJISUNI', right: 'TTORA' };

const questionImg = document.getElementById('questionImg');
const leftImg = document.getElementById('leftImg');
const rightImg = document.getElementById('rightImg');

const choices = document.querySelectorAll('.choice-wrap');
let answers = [];

// 클릭 이벤트
choices.forEach(choice => {
  choice.addEventListener('click', () => {

    // 전체 초기화
    choices.forEach(c => c.classList.remove('active', 'inactive'));

    // 선택 표시
    choice.classList.add('active');
    choices.forEach(c => { if(c !== choice) c.classList.add('inactive'); });

    // 선택값 저장
    const selected = choice.dataset.choice; // 'left' 또는 'right'
    answers.push({ question: current, answer: selected });

    // API 투표 제출 (fire-and-forget)
    const sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      apiSubmitVote(sessionId, current, candidateMap[selected]);
    }

    // 다음 문제로 넘어가기 전 클릭 막기
    choices.forEach(c => c.classList.add('disabled'));

    setTimeout(() => {
      nextQuestion();
      // 다음 문제 초기화
      choices.forEach(c => c.classList.remove('active', 'inactive', 'disabled'));
    }, 800);
  });
});

function nextQuestion() {
  current++;
  if(current > total){

    localStorage.setItem('answers', JSON.stringify(answers));

    window.location.href = 'result-countdown.html';
    return;
  }
  updateUI();
}

function playAnimation(){
  const title = document.querySelector('.question-title');
  const vs = document.querySelector('.vs-container');


  title.classList.remove('show');
  vs.classList.remove('show');


  void title.offsetWidth;

  setTimeout(() => title.classList.add('show'), 100);
  setTimeout(() => vs.classList.add('show'), 200);
}

function updateUI() {
  questionImg.src = `images/question/q_0${current}.png`;
  leftImg.src = `images/question/q_0${current}_a.png`;
  rightImg.src = `images/question/q_0${current}_b.png`;

  playAnimation();
}
