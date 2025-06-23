import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, User, Clock, Eye, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { NewsArticle, NewsCategory } from '../types';
import { mockNews } from '../data/mockData';

const NewsPage: React.FC = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<NewsCategory | ''>('');
    const [showFilters, setShowFilters] = useState(false);

    const filteredNews = useMemo(() => {
        return mockNews.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.content.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !selectedCategory || article.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const featuredNews = mockNews.filter(article => article.featured).slice(0, 3);
    const latestNews = filteredNews.slice(0, 10);

    const getCategoryColor = (category: NewsCategory) => {
        switch (category) {
            case 'job_market': return 'bg-blue-100 text-blue-800';
            case 'career_tips': return 'bg-green-100 text-green-800';
            case 'industry_news': return 'bg-purple-100 text-purple-800';
            case 'education': return 'bg-orange-100 text-orange-800';
            case 'government': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.split(' ').length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} ${t.news.readingTime}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.nav.news}</h1>
                    <p className="text-lg text-gray-600">{t.news.subtitle}</p>
                </div>

                {/* Featured News */}
                {featuredNews.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.news.featured}</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {featuredNews.map((article, index) => (
                                <div key={article.id} className={`${index === 0 ? 'lg:col-span-2' : ''}`}>
                                    <Link
                                        to={`/news/${article.id}`}
                                        className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                                    >
                                        <div className="relative">
                                            <img
                                                src={article.imageUrl}
                                                alt={article.title}
                                                className={`w-full object-cover ${index === 0 ? 'h-64' : 'h-48'}`}
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                                                    {t.news.categories[article.category]}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${index === 0 ? 'text-xl' : 'text-lg'}`}>
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <User className="w-4 h-4" />
                                                        <span>{article.author}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{formatDate(article.publishedAt)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{getReadingTime(article.content)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 mb-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={t.news.searchPlaceholder}
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.news.category}
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value as NewsCategory | '')}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">{t.filters.all}</option>
                                    <option value="job_market">{t.news.categories.job_market}</option>
                                    <option value="career_tips">{t.news.categories.career_tips}</option>
                                    <option value="industry_news">{t.news.categories.industry_news}</option>
                                    <option value="education">{t.news.categories.education}</option>
                                    <option value="government">{t.news.categories.government}</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('');
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
                        {t.searchResults.replace('{count}', filteredNews.length.toString())}
                    </p>
                </div>

                {/* News List */}
                <div className="space-y-6">
                    {latestNews.map((article) => (
                        <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="md:flex">
                                <div className="md:w-1/3">
                                    <img
                                        src={article.imageUrl}
                                        alt={article.title}
                                        className="w-full h-48 md:h-full object-cover"
                                    />
                                </div>
                                <div className="md:w-2/3 p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                                            {t.news.categories[article.category]}
                                        </span>
                                        {article.tags && article.tags.length > 0 && (
                                            <div className="flex items-center gap-1">
                                                <Tag className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-500">
                                                    {article.tags.slice(0, 2).join(', ')}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <Link to={`/news/${article.id}`}>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                                            {article.title}
                                        </h3>
                                    </Link>

                                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                <span>{article.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(article.publishedAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{getReadingTime(article.content)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                <span>{article.views}</span>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/news/${article.id}`}
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                            {t.news.readMore}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredNews.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            📰
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.noNews.title}</h3>
                        <p className="text-gray-600">{t.noNews.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsPage;
