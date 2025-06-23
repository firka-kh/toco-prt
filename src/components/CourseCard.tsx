import React from 'react';
import { Clock, Users, Star, MapPin, Calendar, BookOpen } from 'lucide-react';
import { Course } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const { t } = useLanguage();
    const { addNotification } = useApp();

    const handleEnroll = () => {
        addNotification({
            type: 'success',
            message: t.notifications.courseEnrollSuccess
        });
    };

    const formatPrice = (price: number) => {
        return `${price.toLocaleString()} ${t.currency}`;
    };

    const formatDuration = (hours: number) => {
        if (hours < 24) {
            return `${hours} ${t.courses.hours}`;
        }
        const days = Math.floor(hours / 8);
        return `${days} ${t.courses.days}`;
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'online': return '💻';
            case 'offline': return '🏢';
            case 'hybrid': return '🔄';
            default: return '📚';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                        {t.courses.levels[course.level]}
                    </span>
                </div>
                <div className="absolute top-4 right-4">
                    <span className="bg-white px-2 py-1 rounded-full text-sm">
                        {getTypeIcon(course.type)} {t.courses.types[course.type]}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(course.rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600">
                        ({course.studentsCount} {t.courses.students})
                    </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.provider}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(course.duration)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{course.studentsCount} {t.courses.students}</span>
                    </div>
                    {course.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{course.location}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(course.startDate).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">
                        {formatPrice(course.price)}
                    </div>
                    <button
                        onClick={handleEnroll}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {t.courses.enroll}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
