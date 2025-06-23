import React, { useState } from 'react';
import { BarChart3, Users, Briefcase, Building2, BookOpen, Newspaper, TrendingUp, Eye, UserPlus, FileText, Activity, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AdminPage: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('dashboard');

    // Mock data for admin dashboard
    const stats = {
        totalUsers: 15847,
        totalJobs: 2341,
        totalCompanies: 456,
        totalCourses: 89,
        totalNews: 156,
        monthlyGrowth: {
            users: 12.5,
            jobs: 8.3,
            companies: 15.7,
            applications: 25.2
        },
        recentActivity: [
            { id: 1, type: 'user', action: 'Новый пользователь зарегистрирован', time: '5 минут назад', user: 'Алиджон Рахимов' },
            { id: 2, type: 'job', action: 'Добавлена новая вакансия', time: '15 минут назад', user: 'TechSoft Solutions' },
            { id: 3, type: 'application', action: 'Отправлена заявка на вакансию', time: '25 минут назад', user: 'Зарина Каримова' },
            { id: 4, type: 'course', action: 'Записался на курс программирования', time: '1 час назад', user: 'Бахтиёр Саидов' },
            { id: 5, type: 'company', action: 'Новая компания зарегистрирована', time: '2 часа назад', user: 'Digital Innovation' }
        ]
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'user': return <UserPlus className="w-4 h-4 text-blue-600" />;
            case 'job': return <Briefcase className="w-4 h-4 text-green-600" />;
            case 'application': return <FileText className="w-4 h-4 text-orange-600" />;
            case 'course': return <BookOpen className="w-4 h-4 text-purple-600" />;
            case 'company': return <Building2 className="w-4 h-4 text-red-600" />;
            default: return <Activity className="w-4 h-4 text-gray-600" />;
        }
    };

    const tabs = [
        { id: 'dashboard', label: 'Панель управления', icon: BarChart3 },
        { id: 'users', label: 'Пользователи', icon: Users },
        { id: 'jobs', label: 'Вакансии', icon: Briefcase },
        { id: 'companies', label: 'Компании', icon: Building2 },
        { id: 'courses', label: 'Курсы', icon: BookOpen },
        { id: 'news', label: 'Новости', icon: Newspaper },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <h1 className="text-2xl font-bold text-gray-900">Административная панель</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">Последнее обновление: {new Date().toLocaleString()}</span>
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">А</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-6">
                    {/* Sidebar */}
                    <div className="w-64 bg-white rounded-lg shadow-md p-4">
                        <nav className="space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${activeTab === tab.id
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {activeTab === 'dashboard' && (
                            <div className="space-y-6">
                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Пользователи</p>
                                                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                                                <p className="text-sm text-green-600 flex items-center mt-1">
                                                    <TrendingUp className="w-4 h-4 mr-1" />
                                                    +{stats.monthlyGrowth.users}%
                                                </p>
                                            </div>
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Users className="w-6 h-6 text-blue-600" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Вакансии</p>
                                                <p className="text-3xl font-bold text-gray-900">{stats.totalJobs.toLocaleString()}</p>
                                                <p className="text-sm text-green-600 flex items-center mt-1">
                                                    <TrendingUp className="w-4 h-4 mr-1" />
                                                    +{stats.monthlyGrowth.jobs}%
                                                </p>
                                            </div>
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                                <Briefcase className="w-6 h-6 text-green-600" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Компании</p>
                                                <p className="text-3xl font-bold text-gray-900">{stats.totalCompanies.toLocaleString()}</p>
                                                <p className="text-sm text-green-600 flex items-center mt-1">
                                                    <TrendingUp className="w-4 h-4 mr-1" />
                                                    +{stats.monthlyGrowth.companies}%
                                                </p>
                                            </div>
                                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <Building2 className="w-6 h-6 text-purple-600" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Заявки</p>
                                                <p className="text-3xl font-bold text-gray-900">8,542</p>
                                                <p className="text-sm text-green-600 flex items-center mt-1">
                                                    <TrendingUp className="w-4 h-4 mr-1" />
                                                    +{stats.monthlyGrowth.applications}%
                                                </p>
                                            </div>
                                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-6 h-6 text-orange-600" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Charts and Recent Activity */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Chart Placeholder */}
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Динамика регистраций</h3>
                                        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                                <p className="text-gray-500">График статистики</p>
                                                <p className="text-sm text-gray-400">Интеграция с Chart.js</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Последняя активность</h3>
                                        <div className="space-y-4">
                                            {stats.recentActivity.map((activity) => (
                                                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <div className="mt-1">
                                                        {getActivityIcon(activity.type)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                        <p className="text-sm text-gray-600">{activity.user}</p>
                                                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <Briefcase className="w-5 h-5 text-blue-600" />
                                            <span className="font-medium">Добавить вакансию</span>
                                        </button>
                                        <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <Newspaper className="w-5 h-5 text-green-600" />
                                            <span className="font-medium">Создать новость</span>
                                        </button>
                                        <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                            <BookOpen className="w-5 h-5 text-purple-600" />
                                            <span className="font-medium">Добавить курс</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Placeholder for other tabs */}
                        {activeTab !== 'dashboard' && (
                            <div className="bg-white rounded-lg shadow-md p-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        🚧
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {tabs.find(tab => tab.id === activeTab)?.label}
                                    </h3>
                                    <p className="text-gray-600 mb-4">Этот раздел находится в разработке</p>
                                    <p className="text-sm text-gray-500">
                                        Здесь будет интерфейс для управления {tabs.find(tab => tab.id === activeTab)?.label.toLowerCase()}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
