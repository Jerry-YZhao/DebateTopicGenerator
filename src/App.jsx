import { useState } from 'react';
import { useEffect } from 'react';
import './style.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

library.add(faRotate);

export default function App() {

  let cnt=0;

  useEffect(() => {

    if (cnt == 0) {
      generate(selectedArea, API_KEY)
      .then(result => {
        setOpacity(1)
        setCurTopic(result)
        setFontSize(resetTitle(curTopic))

        // generate AFFIRMATIVE
        generatePro(result, API_KEY)
          .then(result => {
            setAffirmResult(result)
          })
          .catch(error => {
            setWarning('Cannot provide Affirmative for this topic!')
          });

        // generate NEGATIVE
        generateAgainst(result, API_KEY)
          .then(result => {
            setNegativeResult(result)
          })
          .catch(error => {
            setWarning('Cannot provide Negative for this topic!')
          });
      })
      .catch(error => {
        setWarning('Cannot generate topic!')
      });

      cnt++;
    }

  }, []);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const options = [
    'Architecture',
    'Congress',
    'Economics',
    'Health Care',
    'Kanye West',
    'Machiavelli',
    'Nietzsche',
    'Peacekeeping',
    'Pedagogy',
    'Postmodernism',
    'Rome Empire',
    'Shakespearean Literature',
    'Summon Bonum',
    'The Trolley Problem'
  ];

  const [selectedArea, setSelectedArea] = useState("")
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState([options])
  const [leftText, setLeftText] = useState('Hover to See AI Generated Responses')
  const [rightText, setRightText] = useState('Hover to See AI Generated Responses')
  const [affirmResult, setAffirmResult] = useState('Waiting for response to be generated ...')
  const [negativeResult, setNegativeResult] = useState('Waiting for response to be generated ...')
  const [curTopic, setCurTopic] = useState('First Topic Being Generated ...')
  const [opacity, setOpacity] = useState(0.6)
  const [fontSize, setFontSize] = useState(40)
  const [warning, setWarning] = useState('')


  const handleInputChange = (event) => {
    let userInput = event.target.value;
    setSelectedArea(userInput);

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredOptions(filtered);
    setDropdownVisible(true);
  };

  const handleInputClick = () => {
    setFilteredOptions(options);
    setDropdownVisible(true);
  };

  const handleInputBlur = () => {
    setDropdownVisible(false);
  };

  const handleOptionClick = (option) => {
    setSelectedArea(option);
  };

  const handleInputEnter = () => {
    setDropdownVisible(false);
  }

  const handleLeftEnter = () => {
    setLeftText(affirmResult)
  }

  const handleLeftLeave = () => {
    setLeftText('Hover to See AI Generated Responses')
  }

  const handleRightEnter = () => {
    setRightText(negativeResult)
  }

  const handleRightLeave = () => {
    setRightText('Hover to See AI Generated Responses')
  }

  const handleLeftBtn = () => {
    setAffirmResult('Please Wait ...')

    generatePro(curTopic, API_KEY)
      .then(result => {
        setAffirmResult(result)
        setLeftText(affirmResult)
      })
      .catch(error => {
        setWarning('Cannot provide Affirmative for this topic!')
      });
  }

  const handleRightBtn = () => {
    setNegativeResult('Please Wait ...')

    generatePro(curTopic, API_KEY)
      .then(result => {
        setNegativeResult(result)
        setRightText(affirmResult)
      })
      .catch(error => {
        setWarning('Cannot provide Negative for this topic!')
      });
  }

  const handleCenterBtn = () => {
    setCurTopic('Please Wait ...')
    setAffirmResult('Please Wait ...')
    setNegativeResult('Please Wait ...')
    setFontSize(40)
    setOpacity(0.6)
    setWarning('')

    generate(selectedArea, API_KEY)
      .then(result => {
        setOpacity(1)
        setCurTopic(result)
        setFontSize(resetTitle(curTopic))

        // generate AFFIRMATIVE
        generatePro(result, API_KEY)
          .then(result => {
            setAffirmResult(result)
          })
          .catch(error => {
            setWarning('Cannot provide Affirmative for this topic!')
          });

        // generate NEGATIVE
        generateAgainst(result, API_KEY)
          .then(result => {
            setNegativeResult(result)
          })
          .catch(error => {
            setWarning('Cannot provide Negative for this topic!')
          });
      })
      .catch(error => {
        setWarning('Cannot generate topic')
      });

  }

  return (

    <div className="container">

      <div className="text-blocks">
        <div className="text-block left-text-block"
          onMouseOver={handleLeftEnter}
          onMouseOut={handleLeftLeave}>
          <h2 className="sub-title">Affirmative</h2>
          <p
            className="hidden-text">
            {leftText}
          </p>
          <div className="button">
            <button
              onClick={handleLeftBtn}>
              <FontAwesomeIcon icon={faRotate} />
            </button>
          </div>
        </div>

        <div className="center-box">
          <div className="input-container">
            <div className="selected-topic">
              <span>
                The AI Generated Topic is RELATED to: <br /> Type and 'Enter' for CUSTOM <br /> Leave Blank for RANDOM
              </span>
            </div>
            <input
              type="text"
              id="user-input"
              placeholder="Example Areas"
              value={selectedArea}
              onChange={handleInputChange}
              onFocus={handleInputClick}
              onBlur={handleInputBlur}
              onKeyDown={handleInputEnter}
            />

            {isDropdownVisible && (
              <div className="options-list">
                <ul>
                  {filteredOptions.map(option => (
                    <li key={option} onMouseEnter={() => handleOptionClick(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <span className="down-arrow">&darr;</span>

          <h1
            className="center-title"
            style={{ opacity: opacity, fontSize: fontSize }}
          >{curTopic}</h1>

          <div className="button">
            <button
              onClick={handleCenterBtn}>
              <FontAwesomeIcon icon={faRotate} /> Regenerate
            </button>
          </div>

          <p className="warning">{warning}</p>
        </div>

        <div className="text-block right-text-block"
          onMouseOver={handleRightEnter}
          onMouseOut={handleRightLeave}>
          <h2 className="sub-title">Negative</h2>
          <p
            className="hidden-text">
            {rightText}
          </p>
          <div className="button">
            <button
              onClick={handleRightBtn}>
              <FontAwesomeIcon icon={faRotate} />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

function resetTitle(centerTitle) {
  const titleWords = centerTitle.trim().split(/\s+/).length;
  let fontSize;

  if (0 <= titleWords && titleWords < 10) {
    fontSize = 38;
  } else if (10 <= titleWords && titleWords < 15) {
    fontSize = 32;
  } else if (15 <= titleWords && titleWords < 20) {
    fontSize = 26;
  } else if (20 <= titleWords && titleWords < 25) {
    fontSize = 20;
  } else {
    fontSize = 16;
  }
  return fontSize;
}

// generate random topic baed on area
function generate(area, API_KEY) {
  let prompt = (area != '') ? ('With around 15 words, generate a CREATIVE debating topic that could be argued on both sides (give me only the topic itself) related to ' + area) : ('With around 15 words, generate a CREATIVE debating topic that could be argued on both sides')
  return new Promise((resolve, reject) => {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
    };

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        resolve(result.choices[0].message.content);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// generate AFFIRM side
function generatePro(curTopic, API_KEY) {
  let prompt = 'Limitting each point to one sentence (less than 15 words each), generate five concise reasons (Bullet point structure) to AGREE with the following topic: ' + curTopic;
  return new Promise((resolve, reject) => {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt }
      ],
    };

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        let text = result.choices[0].message.content;
        resolve(text);
      })
      .catch(error => {
        reject(error);
      });
  });
}


// generate NEGATIVE side
function generateAgainst(curTopic, API_KEY) {
  let prompt = 'Limitting each point to one sentence (less than 15 words each), generate five concise reasons (Bullet point structure) to DISAGREE with the following topic: ' + curTopic;
  return new Promise((resolve, reject) => {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt }
      ],
    };

    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        resolve(result.choices[0].message.content);
      })
      .catch(error => {
        reject(error);
      });
  });
}