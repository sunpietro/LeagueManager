const showNotification = ({title = '', body = '', icon = ''} = {}) => {
    console.log('showNotification', arguments);

    const notification = new Notification(title, {body, icon});
}

export const spawnNotification = (...args) => {
    if (!window.Notification || Notification.permission === 'denied') {
        return;
    }

    if (Notification.permission === 'granted') {
        showNotification(...args);
    }

    Notification.requestPermission(showNotification.bind(this, ...args));
}
