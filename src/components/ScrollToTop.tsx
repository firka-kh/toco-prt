import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollToTop } from '@/hooks';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const scrollToTop = useScrollToTop();

    React.useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Прокрутить вверх"
        >
            <ArrowUp className="w-5 h-5" />
        </button>
    );
};

export default ScrollToTop;
