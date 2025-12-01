import React from 'react';
import {
  Snackbar,
  Alert,
  IconButton,
  Box
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';

function NotificationSystem({ notifications, onRemoveNotification }) {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const handleClose = (id, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onRemoveNotification(id);
  };

  React.useEffect(() => {
    notifications.forEach(notification => {
      if (notification.open && notification.autoHide !== false) {
        const timer = setTimeout(() => {
          onRemoveNotification(notification.id);
        }, 6000);
        
        return () => clearTimeout(timer);
      }
    });
  }, [notifications, onRemoveNotification]);

  return (
    <Box sx={{ position: 'fixed', bottom: 16, left: 16, zIndex: 9999 }}>
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={notification.open}
          onClose={(event, reason) => handleClose(notification.id, reason)}
          anchorOrigin={{ 
            vertical: 'bottom', 
            horizontal: 'left' 
          }}
          sx={{ 
            position: 'relative',
            marginBottom: index > 0 ? 1 : 0
          }}
        >
          <Alert
            severity={notification.type}
            variant="filled"
            icon={getIcon(notification.type)}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => handleClose(notification.id)}
                sx={{ ml: 1 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{
              width: '100%',
              minWidth: { xs: 300, sm: 350, md: 400 },
              maxWidth: { xs: '90vw', sm: 500 },
              alignItems: 'center'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {notification.message}
            </Box>
            {notification.action && (
              <Box sx={{ mt: 1 }}>
                {notification.action}
              </Box>
            )}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
}

export default NotificationSystem;