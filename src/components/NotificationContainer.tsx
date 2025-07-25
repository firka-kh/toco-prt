import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const NotificationContainer: React.FC = () => {
    const { state, removeNotification } = useApp();

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5" />;
            case 'error':
                return <AlertCircle className="w-5 h-5" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5" />;
            case 'info':
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    const getColorClasses = (type: string) => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800';
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'info':
            default:
                return 'bg-blue-50 border-blue-200 text-blue-800';
        }
    };

    if (state.notifications.length === 0) return null;

    return (
        <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
            {state.notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`
            flex items-center space-x-3 p-4 rounded-lg border shadow-lg transition-all duration-300 animate-slide-up
            ${getColorClasses(notification.type)}
          `}
                >
                    <div className="flex-shrink-0">
                        {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                            {notification.message}
                        </p>
                    </div>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="flex-shrink-0 ml-2 hover:opacity-75 transition-opacity duration-200"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NotificationContainer;
