const total = 5;
let current = 1;

const questionImg = document.getElementById('questionImg');
const leftImg = document.getElementById('leftImg');
const rightImg = document.getElementById('rightImg');

const choices = document.querySelectorAll('.choice-wrap');
let answers = [];

choices.forEach(choice => {
  choice.addEventListener('click', () => {

    // 전체 초기화
    choices.forEach(c => {
      c.classList.remove('active', 'inactive');
    });

    // 선택된 것 표시
    choice.classList.add('active');

    // 선택 안된 것 표시
    choices.forEach(c => {
      if (c !== choice) c.classList.add('inactive');
    });

    // 한 번 선택되면 더 이상 클릭 막기
    choices.forEach(c => c.classList.add('disabled'));

    const selected = choice.dataset.choice;
    answers.push({ question: current, answer: selected });

    setTimeout(() => {
      nextQuestion();

      // 다음 문제 넘어갈 때 초기화
      choices.forEach(c => {
        c.classList.remove('active', 'inactive', 'disabled');
      });
    }, 1500);
  });
});

function nextQuestion() {
  current++;

  if (current > total) {
    console.log(answers);
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
