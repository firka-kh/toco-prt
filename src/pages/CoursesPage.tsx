import React, { useState, useMemo } from 'react';
import { Search, Filter, Clock, Users, Star, BookOpen, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Course, CourseLevel, CourseType } from '../types';
import { mockCourses } from '../data/mockData';

const CoursesPage: React.FC = () => {
    const { t } = useLanguage();
    const { addNotification } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLevel, setSelectedLevel] = useState<CourseLevel | ''>('');
    const [selectedType, setSelectedType] = useState<CourseType | ''>('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
    const [showFilters, setShowFilters] = useState(false);

    const filteredCourses = useMemo(() => {
        return mockCourses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.provider.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLevel = !selectedLevel || course.level === selectedLevel;
            const matchesType = !selectedType || course.type === selectedType;
            const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];

            return matchesSearch && matchesLevel && matchesType && matchesPrice;
        });
    }, [searchTerm, selectedLevel, selectedType, priceRange]);

    const handleEnroll = (courseId: string) => {
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

    const getLevelColor = (level: CourseLevel) => {
        switch (level) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type: CourseType) => {
        switch (type) {
            case 'online': return '💻';
            case 'offline': return '🏢';
            case 'hybrid': return '🔄';
            default: return '📚';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.nav.courses}</h1>
                    <p className="text-lg text-gray-600">{t.courses.subtitle}</p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 mb-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={t.courses.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <Filter className="w-5 h-5" />
                            {t.filters.filters}
                        </button>
                    </div>

                    {/* Filters */}
                    <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.courses.level}
                                </label>
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value as CourseLevel | '')}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">{t.filters.all}</option>
                                    <option value="beginner">{t.courses.levels.beginner}</option>
                                    <option value="intermediate">{t.courses.levels.intermediate}</option>
                                    <option value="advanced">{t.courses.levels.advanced}</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.courses.type}
                                </label>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value as CourseType | '')}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">{t.filters.all}</option>
                                    <option value="online">{t.courses.types.online}</option>
                                    <option value="offline">{t.courses.types.offline}</option>
                                    <option value="hybrid">{t.courses.types.hybrid}</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.courses.priceRange}
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="От"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <input
                                        type="number"
                                        placeholder="До"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedLevel('');
                                        setSelectedType('');
                                        setPriceRange([0, 2000]);
                                    }}
                                    className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    {t.filters.clear}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        {t.searchResults.replace('{count}', filteredCourses.length.toString())}
                    </p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                                        onClick={() => handleEnroll(course.id)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        {t.courses.enroll}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.noCourses.title}</h3>
                        <p className="text-gray-600">{t.noCourses.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;
