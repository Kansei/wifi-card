import QRCode from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../src/images/wifi.png';

import './style.css';

export const Card = ({ style }) => {
  const firstLoad = useRef(true);
  const [qrvalue, setQrvalue] = useState('');
  const [network, setNetwork] = useState({
    ssid: '',
    encryptionMode: 'WPA',
    password: '',
    hidePassword: false,
  });
  const [portrait, setPortrait] = useState(false);
  const [screenshotMode, setScreenshotMode] = useState(false);

  const { t } = useTranslation();
  const escape = (v) => {
    const needsEscape = ['"', ';', ',', ':', '\\'];

    let escaped = '';
    for (let i = 0; i < v.length; i++) {
      let c = v[i];
      if (needsEscape.includes(c)) {
        c = '\\' + c;
      }
      escaped += c;
    }

    return escaped;
  };

  const onPrint = () => {
    if (network.ssid.length > 0) {
      if (network.password.length < 8 && network.encryptionMode === 'WPA') {
        alert(t('wifi.alert.password.8'));
      } else if (
        network.password.length < 5 &&
        network.encryptionMode === 'WEP'
      ) {
        alert(t('wifi.alert.password.5'));
      } else {
        window.print();
      }
    } else {
      alert(t('wifi.alert.name'));
    }
  };

  useEffect(() => {
    if (firstLoad.current && window.innerWidth < 500) {
      firstLoad.current = false;
      setPortrait(true);
    }

    const ssid = escape(network.ssid);
    const password = escape(network.password);
    setQrvalue(`WIFI:T:${network.encryptionMode};S:${ssid};P:${password};;`);
  }, [network]);

  return (
    <div>
      <fieldset
        id="print-area"
        style={{
          borderColor: screenshotMode && 'white',
        }}
      >
        <div style={{ textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
          <img alt="icon" src={logo} height="92" />
          <h1 style={{ textAlign: 'center', marginTop: 10 }}>Wi-Fi</h1>
        </div>
        <div
          className="details"
          style={{
            flexDirection: portrait ? 'column' : 'row',
            alignItems: portrait ? 'center' : 'flex-start',
            width: '80%',
            margin: 'auto',
          }}
        >
          <QRCode
            className="qrcode"
            style={{
              marginRight: portrait ? 0 : 25,
              marginBottom: portrait ? 30 : 0,
            }}
            value={qrvalue}
            size={155}
          />

          <div className="inputs" style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: portrait ? 'row' : 'column',
                marginBottom: 10,
              }}
            >
              <div className="label-block">
                <label className="input-label">{t('wifi.name')}</label>
              </div>
              <textarea
                id="ssid"
                type="text"
                maxLength="32"
                placeholder={t('wifi.name.placeholder')}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                value={network.ssid}
                onChange={(e) =>
                  setNetwork({ ...network, ssid: e.target.value })
                }
                style={{
                  padding: '0px 5px',
                  margin: 0,
                  backgroundColor: screenshotMode && 'white',
                  marginTop: portrait && -3,
                }}
              />
            </div>

            <div
              style={{
                flexDirection: portrait ? 'row' : 'column',
                marginBottom: 10,
                display:
                  network.hidePassword || network.encryptionMode === 'nopass'
                    ? 'none'
                    : 'flex',
              }}
            >
              <div className="label-block">
                <label className="input-label">{t('wifi.password')}</label>
              </div>

              <textarea
                id="password"
                type="text"
                className={`
                  ${network.hidePassword && 'no-print hidden'}
                  ${network.encryptionMode === 'nopass' && 'hidden'}
                `}
                style={{
                  height:
                    portrait && network.password.length > 40 ? '5em' : 'auto',
                  padding: '0px 5px',
                  margin: 0,
                  backgroundColor: screenshotMode && 'white',
                  marginTop: portrait && -3,
                }}
                maxLength="63"
                placeholder={t('wifi.password.placeholder')}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                value={network.password}
                onChange={(e) => {
                  setNetwork({ ...network, password: e.target.value });
                }}
              />
            </div>

            <div
              className="no-print"
              style={{ display: screenshotMode && 'none' }}
            >
              <input
                type="checkbox"
                id="hide-password-checkbox"
                className={network.encryptionMode === 'nopass' ? 'hidden' : ''}
                onChange={() =>
                  setNetwork({
                    ...network,
                    hidePassword: !network.hidePassword,
                  })
                }
              />
              <label
                for="hide-password-checkbox"
                className={network.encryptionMode === 'nopass' ? 'hidden' : ''}
              >
                {t('wifi.password.hide')}
              </label>
            </div>

            <div
              className="no-print"
              style={{ display: screenshotMode && 'none' }}
            >
              <label>{t('wifi.password.encryption')}:</label>
              <input
                type="radio"
                name="encrypt-select"
                id="encrypt-none"
                value="nopass"
                onChange={(e) => {
                  setNetwork({
                    ...network,
                    encryptionMode: e.target.value,
                    password: '',
                  });
                }}
              />
              <label for="encrypt-none">None</label>
              <input
                type="radio"
                name="encrypt-select"
                id="encrypt-wpa-wpa2"
                value="WPA"
                onChange={(e) =>
                  setNetwork({ ...network, encryptionMode: e.target.value })
                }
                defaultChecked
              />
              <label for="encrypt-wpa-wpa2">WPA/WPA2</label>
              <input
                type="radio"
                name="encrypt-select"
                id="encrypt-wep"
                value="WEP"
                onChange={(e) =>
                  setNetwork({ ...network, encryptionMode: e.target.value })
                }
              />
              <label for="encrypt-wep">WEP</label>
            </div>
          </div>
        </div>
        <hr />
        <p style={{ textAlign: 'center' }}>
          <span role="img" aria-label="mobile-phone">
            📸📱
          </span>
          {t('wifi.tip')}
        </p>
      </fieldset>

      <div className="buttons">
        <button id="rotate" onClick={() => setPortrait(!portrait)}>
          {t('button.rotate')}
        </button>

        <button
          id="screenshot"
          onClick={() => setScreenshotMode(!screenshotMode)}
        >
          {screenshotMode
            ? t('button.screenshot.disable')
            : t('button.screenshot')}
        </button>

        <button id="print" onClick={onPrint}>
          {t('button.print')}
        </button>
      </div>
    </div>
  );
};
