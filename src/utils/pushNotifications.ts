// Push notification utility for Wallpaper Wednesday updates

import type { ToastNotification } from '../components/Toast'

const NOTIFICATION_KEY = 'wallpaper-wednesday-notification-shown'

export function initializePushNotifications(onNotification: (notification: ToastNotification) => void) {
  // Show toast notification on first visit
  showWallpaperUpdateNotification(onNotification)
}

export function showWallpaperUpdateNotification(onNotification: (notification: ToastNotification) => void) {
  // Check if we've already shown the notification today
  const lastShown = localStorage.getItem(NOTIFICATION_KEY)
  const now = new Date().toDateString()

  // Show notification only once per day - skip the check for testing
  if (lastShown === now) {
    return
  }

  // Small delay to ensure DOM is ready
  setTimeout(() => {
    // Trigger toast notification
    const notification: ToastNotification = {
      id: `wallpaper-${Date.now()}`,
      message: '🎨 New Wallpaper Wednesday Update Available!',
      type: 'info',
      duration: 3000, // 3 seconds
    }

    onNotification(notification)

    // Mark notification as shown
    localStorage.setItem(NOTIFICATION_KEY, now)
  }, 500)
}

export function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission()
  }
}
