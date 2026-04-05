const total = 5;
let current = 1;

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
    // ✅ localStorage에 저장
    localStorage.setItem('answers', JSON.stringify(answers));
    // 결과 페이지 이동
    window.location.href = 'result.html';
    return;
  }
  updateUI();
}

function updateUI() {
  questionImg.src = `images/question/q_0${current}.png`;
  leftImg.src = `images/question/q_0${current}_a.png`;
  rightImg.src = `images/question/q_0${current}_b.png`;
}
