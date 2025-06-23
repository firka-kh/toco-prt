import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, Eye, ArrowLeft, Share2, BookmarkPlus, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { mockNews } from '../data/mockData';

const NewsDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useLanguage();
    const { addNotification } = useApp();

    const article = mockNews.find(news => news.id === id);
    const relatedArticles = mockNews
        .filter(news => news.id !== id && news.category === article?.category)
        .slice(0, 3);

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.newsNotFound.title}</h1>
                    <p className="text-gray-600 mb-6">{t.newsNotFound.description}</p>
                    <Link
                        to="/news"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        {t.goBack}
                    </Link>
                </div>
            </div>
        );
    }

    const getCategoryColor = (category: string) => {
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

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            addNotification({
                type: 'success',
                message: t.notifications.linkCopied
            });
        }
    };

    const handleBookmark = () => {
        addNotification({
            type: 'success',
            message: t.notifications.newsBookmarked
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back button */}
                <Link
                    to="/news"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    {t.news.backToNews}
                </Link>

                {/* Article */}
                <article className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Header */}
                    <div className="relative">
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                        <div className="absolute top-6 left-6">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                                {t.news.categories[article.category as keyof typeof t.news.categories]}
                            </span>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        {/* Title and meta */}
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
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
                                <span>{article.views} {t.news.views}</span>
                            </div>
                        </div>

                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                            <div className="flex items-center gap-2 mb-6">
                                <Tag className="w-4 h-4 text-gray-400" />
                                <div className="flex flex-wrap gap-2">
                                    {article.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                                {t.news.share}
                            </button>
                            <button
                                onClick={handleBookmark}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <BookmarkPlus className="w-5 h-5" />
                                {t.news.bookmark}
                            </button>
                        </div>

                        {/* Excerpt */}
                        <div className="text-lg text-gray-700 mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                            {article.excerpt}
                        </div>

                        {/* Content */}
                        <div className="prose max-w-none">
                            {article.content.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </article>

                {/* Related articles */}
                {relatedArticles.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.news.relatedArticles}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((relatedArticle) => (
                                <Link
                                    key={relatedArticle.id}
                                    to={`/news/${relatedArticle.id}`}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                                >
                                    <img
                                        src={relatedArticle.imageUrl}
                                        alt={relatedArticle.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(relatedArticle.category)}`}>
                                            {t.news.categories[relatedArticle.category as keyof typeof t.news.categories]}
                                        </span>
                                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {relatedArticle.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">{relatedArticle.excerpt}</p>
                                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                                            <Calendar className="w-3 h-3" />
                                            <span>{formatDate(relatedArticle.publishedAt)}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsDetailsPage;
