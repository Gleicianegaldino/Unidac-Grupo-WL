// AdditionalInfoPage.js
import React from 'react';

const AdditionalInfoPage = () => {
  return (
    <div className='container'>
      <h2 className='break-line-left'>Strength Your Team with <br/> Memorable Morning Moments!</h2>

      <div className="subtitle-container">
        <div id="icon-left" className="icon-container">
          <img
            src={process.env.PUBLIC_URL + '/icon1.png'}
            alt="Ícone à esquerda"
            className="icon"
          />
        </div>

        <h4>Breakfast day</h4>

        <div id="icon-right" className="icon-container">
          <img
            src={process.env.PUBLIC_URL + '/icon2.png'}
            alt="Ícone à direita"
            className="icon"
          />
        </div>
      </div>

      <p>Starting the day together, sharing goals and expectations, motivates the team to work together towards success.</p>

      <div className="image-container">
        <img
          src={process.env.PUBLIC_URL + '/foods-back.png'}
          alt="Descrição da imagem"
          style={{ maxWidth: '50%', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default AdditionalInfoPage;
