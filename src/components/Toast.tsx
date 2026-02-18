import { useEffect } from 'react'
import './Toast.css'

export interface ToastNotification {
  id: string
  message: string
  type?: 'info' | 'success' | 'error' | 'warning'
  duration?: number
}

interface ToastProps {
  notification: ToastNotification
  onClose: (id: string) => void
}

export function Toast({ notification, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id)
    }, notification.duration || 3000)

    return () => clearTimeout(timer)
  }, [notification, onClose])

  return (
    <div className={`toast toast--${notification.type || 'info'}`}>
      <div className="toast__content">
        {notification.type === 'info' && <span className="toast__icon">ℹ️</span>}
        {notification.type === 'success' && <span className="toast__icon">✓</span>}
        {notification.type === 'error' && <span className="toast__icon">✕</span>}
        {notification.type === 'warning' && <span className="toast__icon">⚠</span>}
        <p className="toast__message">{notification.message}</p>
      </div>
      <button
        className="toast__close"
        onClick={() => onClose(notification.id)}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  )
}

interface ToastContainerProps {
  notifications: ToastNotification[]
  onClose: (id: string) => void
}

export function ToastContainer({ notifications, onClose }: ToastContainerProps) {
  return (
    <div className="toast-container">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  )
}
