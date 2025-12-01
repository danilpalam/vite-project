import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button } from '@mui/material';
import Dashboard from './components/Dashboard';
import NotificationSystem from './components/NotificationSystem';
import { lightTheme, darkTheme } from './theme/theme';

// Начальные данные технологий
const initialTechnologies = [
  {
    id: 1,
    title: 'React',
    description: 'Библиотека для создания пользовательских интерфейсов',
    category: 'frontend',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Node.js',
    description: 'Среда выполнения JavaScript на сервере',
    category: 'backend',
    status: 'in-progress'
  },
  {
    id: 3,
    title: 'MongoDB',
    description: 'Документоориентированная база данных',
    category: 'database',
    status: 'not-started'
  },
  {
    id: 4,
    title: 'Material-UI',
    description: 'Библиотека React компонентов по гайдлайнам Material Design',
    category: 'ui-library',
    status: 'completed'
  },
  {
    id: 5,
    title: 'Express.js',
    description: 'Минималистичный веб-фреймворк для Node.js',
    category: 'backend',
    status: 'in-progress'
  },
  {
    id: 6,
    title: 'PostgreSQL',
    description: 'Реляционная база данных',
    category: 'database',
    status: 'not-started'
  },
  {
    id: 7,
    title: 'Vue.js',
    description: 'Прогрессивный фреймворк для создания пользовательских интерфейсов',
    category: 'frontend',
    status: 'not-started'
  },
  {
    id: 8,
    title: 'Ant Design',
    description: 'Библиотека компонентов для корпоративных приложений',
    category: 'ui-library',
    status: 'in-progress'
  }
];

function App() {
  const [technologies, setTechnologies] = useState(initialTechnologies);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Загрузка темы из localStorage при загрузке приложения
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Сохранение темы в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prevTech =>
      prevTech.map(tech =>
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );

    // Добавляем уведомление об изменении статуса
    const tech = technologies.find(t => t.id === id);
    addNotification({
      message: `Статус технологии "${tech.title}" изменен на "${getStatusText(newStatus)}"`,
      type: 'info'
    });
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      type: 'info',
      autoHide: true,
      ...notification,
      open: true
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      default: return 'Не начато';
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    addNotification({
      message: `${!darkMode ? 'Тёмная' : 'Светлая'} тема активирована`,
      type: 'success'
    });
  };

  // Функция для демонстрации разных типов уведомлений
  const showDemoNotifications = () => {
    // Success уведомление
    addNotification({
      message: 'Операция выполнена успешно!',
      type: 'success'
    });

    // Error уведомление
    addNotification({
      message: 'Произошла ошибка при сохранении данных',
      type: 'error'
    });

    // Warning уведомление
    addNotification({
      message: 'Не все данные были заполнены',
      type: 'warning'
    });

    // Info уведомление с действием
    addNotification({
      message: 'Новые обновления доступны',
      type: 'info',
      action: (
        <Button 
          color="inherit" 
          size="small" 
          onClick={() => addNotification({
            message: 'Обновление начато',
            type: 'success'
          })}
        >
          Обновить
        </Button>
      )
    });
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        
        {/* Кнопка для демонстрации уведомлений */}
        <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
          <Button 
            variant="contained" 
            color="secondary"
            onClick={showDemoNotifications}
            sx={{ mb: 2 }}
          >
            Тест уведомлений
          </Button>
        </Box>

        <Dashboard 
          technologies={technologies} 
          onStatusChange={handleStatusChange}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onShowNotification={addNotification}
        />
        
        <NotificationSystem 
          notifications={notifications}
          onRemoveNotification={removeNotification}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;