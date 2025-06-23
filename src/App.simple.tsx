import React from 'react';

// Простая диагностическая версия для проверки
function App() {
    return (
        <div style={{
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f0f0',
            minHeight: '100vh'
        }}>
            <h1 style={{ color: '#059669' }}>🇹🇯 Портал рынка труда Республики Таджикистан</h1>
            <p>Тестовая версия для проверки работы GitHub Pages</p>
            <div style={{ marginTop: '20px' }}>
                <p>✅ React загружен</p>
                <p>✅ JavaScript работает</p>
                <p>✅ CSS применен</p>
                <p>✅ Базовая функциональность работает</p>
            </div>
            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: 'white', borderRadius: '8px' }}>
                <h3>Информация для отладки:</h3>
                <p><strong>URL:</strong> {window.location.href}</p>
                <p><strong>Path:</strong> {window.location.pathname}</p>
                <p><strong>Hash:</strong> {window.location.hash}</p>
                <p><strong>Host:</strong> {window.location.host}</p>
            </div>
        </div>
    );
}

export default App;
