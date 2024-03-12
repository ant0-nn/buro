import React, { useState } from 'react';
import './style.scss';
import icon from './img/icon.svg';

const questionData = [
  {
    number: '01',
    title: 'Яка мінімальна вартість Ваших послуг?',
    answer:
      'Послуга «Міні-проєкт» має нижчу ціну за «Авторський проєкт в українському етностилі» і вартує 25$ за метр квадратний, проте у послугу не включені деякі більшість кресленнь, які спростять процес ремонту. ',
  },
  {
    number: '02',
    title: 'Який термін виконання дизайн проекту?',
    answer:
      'Середній термін виконання авторського проєкту в українському етностилі - 2-3 місяці. Термін виконання міні-проєкту - близько 1 місяця. ',
  },
  {
    number: '03',
    title: 'Чи можна замовити тільки візуалізації/креслення електрики, а все інше ми самі?',
    answer:
      'Ми підходимо до процесу створення дизайн проєкту лише комплексно. Візуалізації, як і креслення один без одного не показують всю картину та деталі проєкту, тому ми вважаємо, що це марна трата коштів. ',
  },
  {
    number: '04',
    title: 'Чи виконуємо ми проєкти поза Києвом (інші міста України або інші країни)?',
    answer:
      'Ми виконуємо проекти для усіх бажаючих та підлаштовуємося під замовників. На жаль, поки що закордоном не маємо змоги вести авторський супровід, а лише розробляємо проєкт українською мовою та будь-якою іншою, окрім російської! Не співпрацюємо з країною агресором росією та білорусією. ',
  },
  {
    number: '05',
    title: 'Чи маєте Ви свою бригаду майстрів?',
    answer:
      'Так, ми маємо перевірених часом та ділом надійних майстрів та прораба, який виконує технічний нагляд на обʼєкті. Також ми маємо надійних підрядників по сантехніці, освітленню, виробників меблів та усього необхідного для здачі обʼєкту.',
  },
];

function FAQs() {
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  const toggleQuestion = (index) => {
    if (expandedQuestions.includes(index)) {
      setExpandedQuestions(expandedQuestions.filter((item) => item !== index));
    } else {
      setExpandedQuestions([...expandedQuestions, index]);
    }
  };

  return (
    <section className="question" id="FAQs">
      <div className="question-container">
        <h2 className="question-container--title">Найчастіші запитання</h2>
        <div className="question-container--scrollable">
          {questionData.map((question, index) => (
            <div
              key={question.number}
              className={`question-container--list ${
                expandedQuestions.includes(index) ? 'expanded' : ''
              }`}>
              <p className="question-container--number">{question.number}</p>
              <button onClick={() => toggleQuestion(index)} className="question-container--button">
                <span
                  className={`question-container--text`}
                  style={{ fontWeight: expandedQuestions.includes(index) ? 700 : 500 }}>
                  {question.title}
                </span>
              </button>
              <img
                loading="lazy"
                onClick={() => toggleQuestion(index)}
                src={icon}
                alt=""
                className={`arrow-icon ${
                  expandedQuestions.includes(index) ? 'arrow-up' : 'arrow-down'
                }`}
              />

              <p
                className="question-container--answer"
                style={{
                  maxHeight: expandedQuestions.includes(index) ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.5s ease-in-out',
                }}>
                {question.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(FAQs);
