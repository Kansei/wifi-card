import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from './components/Card';
import './style.css';
import logo from '../src/images/wifi-qrcode-icon.png';

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <h1 style={{ display: 'flex', alignItems: 'center' }}>
        <img alt="icon" src={logo} height="40" />
        <span style={{ marginLeft: 15 }}>{t('title')}</span>
      </h1>

      {/* <div>
        <label>{t('select')}</label>
        <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
          <option value="ja">日本語</option>
          <option value="en-US">en-US</option>
          <option value="简体中文">简体中文</option>
          <option value="es">es</option>
        </select>
      </div> */}

      <p className="tag">{t('desc.use')}</p>

      <p className="tag">
        {t('desc.privacy')}{' '}
        <a href="https://github.com/Kansei/wifi-qrcode">{t('desc.source')}</a>
      </p>

      <Card />
    </div>
  );
}

export default App;
