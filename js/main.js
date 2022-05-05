'use strict'
{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const button = document.getElementById('button');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p')

  const quizSet = shuffle([
    {q: 'ハッサンの初期装備の鎧は?' , c : ['皮の腰巻', 'うろこの鎧' , '旅人の服']},
    {q: 'ドラクエ1ロトの剣の攻撃力は?' , c : ['40', '36' , '42']},
    {q: 'ドラクエ５天空の花嫁の名前は?' , c : ['ビアンカ', 'バーバラ' , 'ゼシカ']},
    {q: 'ドラクエ６馬車の馬の名前は?' , c : ['ファルシオン', 'サントマイム' , 'ククール']},
    {q: 'ドラクエ８仲間になる山賊の名前は?' , c : ['ヤンガス', 'ライアン' , 'ブライ']},
    {q: 'ドラクエ７主人公父の朝食は?' , c : ['アンチョビサンド', 'ハニートースト' , 'ホットミルク']},
    {q: 'ドラクエ３オーブを集めて復活するものの名前は?' , c : ['ラーミア', 'レティス' , 'ケトス']},
    {q: 'ドラクエ9主人公の正体は?' , c : ['天使', '王子' , '盗賊']},
    {q: 'ドラクエ４モンバーバラの姉妹の仇の名は?' , c : ['バルザック', 'キングレオ' , 'デスピサロ']},
    {q: 'FC版ドラクエ2ブリザードがザラキを使用する確率は?' , c : ['50%', '25%' , '33%']},

  ]);

  let currentNum = 0;
  let isAnswered;
  let score = 0;
  
  function checkAnswer(li) {
    if(isAnswered){
      return;
    };
    isAnswered = true;
    if(li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct');
      score++;
    }else{
      li.classList.add('wrong');
    };
    button.classList.remove('disabled');
  }
  

  function shuffle(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
     [arr[j], arr[i]] = [arr[i], arr[j]]
    }
    return arr;
  }
  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;
    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
    }
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);

    if(currentNum === quizSet.length - 1){
      button.textContent = 'Show Score';
    }

    shuffledChoices.forEach(choice => {
    const li = document.createElement('li');
    li.addEventListener('click', () => {
     checkAnswer(li);
   })
    li.textContent = choice;
    choices.appendChild(li);
  });
 }
 setQuiz();

 button.addEventListener('click', () => { 
   if(button.classList.contains('disabled')){
     return;
   }
   button.classList.add('disabled');

   if(currentNum === quizSet.length - 1){
    //  console.log(`Score: ${score} / ${quizSet.length}`);
     scoreLabel.textContent = `正解数: ${score} / ${quizSet.length}`
     result.classList.remove('hidden');
   }else{
     currentNum++;
     setQuiz();
   }
 });
}