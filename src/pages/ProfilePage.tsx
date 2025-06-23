import React, { useState } from 'react';
import { User, Briefcase, BookOpen, Bell, Shield, Settings, Edit3, Save, X, Heart, MessageSquare, FileText, Award, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';

const ProfilePage: React.FC = () => {
    const { t } = useLanguage();
    const { user, addNotification } = useApp();
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: 'Алиджон',
        lastName: 'Рахимов',
        email: 'alidzhon.rahimov@example.com',
        phone: '+992 90 123 4567',
        city: 'Душанбе',
        profession: 'Frontend разработчик',
        experience: '3 года',
        bio: 'Опытный frontend разработчик с 3-летним опытом работы с React, TypeScript и современными веб-технологиями.',
        skills: 'React, TypeScript, JavaScript, CSS, HTML, Node.js, Git',
        education: 'Таджикский национальный университет, Факультет информатики',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const stats = {
        appliedJobs: 12,
        savedJobs: 8,
        profileViews: 45,
        enrolledCourses: 3,
        completedCourses: 1,
        certificates: 2
    };

    const recentActivity = [
        { id: 1, type: 'application', title: 'Подал заявку на вакансию Frontend Developer в IT Solutions', date: '2024-01-15' },
        { id: 2, type: 'course', title: 'Записался на курс "Advanced React Patterns"', date: '2024-01-14' },
        { id: 3, type: 'save', title: 'Сохранил вакансию Backend Developer в TechCorp', date: '2024-01-13' },
        { id: 4, type: 'view', title: 'Просмотрел профиль компании Digital Agency', date: '2024-01-12' }
    ];

    const handleSave = () => {
        // Валидация
        if (activeTab === 'security') {
            if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
                addNotification({
                    type: 'error',
                    message: t.notifications.passwordMismatch
                });
                return;
            }
            if (formData.newPassword && formData.newPassword.length < 6) {
                addNotification({
                    type: 'error',
                    message: t.notifications.passwordTooShort
                });
                return;
            }
        }

        setIsEditing(false);
        addNotification({
            type: 'success',
            message: t.notifications.profileUpdated
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Сброс формы к изначальным значениям
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'application': return <Briefcase className="w-4 h-4 text-blue-600" />;
            case 'course': return <BookOpen className="w-4 h-4 text-green-600" />;
            case 'save': return <Heart className="w-4 h-4 text-red-600" />;
            case 'view': return <Eye className="w-4 h-4 text-gray-600" />;
            default: return <FileText className="w-4 h-4 text-gray-600" />;
        }
    };

    const tabs = [
        { id: 'profile', label: t.profile.tabs.profile, icon: User },
        { id: 'activity', label: t.profile.tabs.activity, icon: MessageSquare },
        { id: 'applications', label: t.profile.tabs.applications, icon: Briefcase },
        { id: 'courses', label: t.profile.tabs.courses, icon: BookOpen },
        { id: 'notifications', label: t.profile.tabs.notifications, icon: Bell },
        { id: 'security', label: t.profile.tabs.security, icon: Shield },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{t.nav.profile}</h1>
                    <p className="text-gray-600 mt-2">{t.profile.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Profile Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">
                                        {formData.firstName[0]}{formData.lastName[0]}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {formData.firstName} {formData.lastName}
                                </h3>
                                <p className="text-gray-600">{formData.profession}</p>
                                <p className="text-sm text-gray-500">{formData.city}</p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h4 className="font-semibold text-gray-900 mb-4">{t.profile.stats.title}</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{t.profile.stats.appliedJobs}</span>
                                    <span className="font-semibold">{stats.appliedJobs}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{t.profile.stats.savedJobs}</span>
                                    <span className="font-semibold">{stats.savedJobs}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{t.profile.stats.profileViews}</span>
                                    <span className="font-semibold">{stats.profileViews}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{t.profile.stats.courses}</span>
                                    <span className="font-semibold">{stats.enrolledCourses}</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="bg-white rounded-lg shadow-md">
                            <nav className="space-y-1 p-2">
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
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-md">
                            {/* Tab Content */}
                            {activeTab === 'profile' && (
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold text-gray-900">{t.profile.personalInfo}</h2>
                                        {!isEditing ? (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                                {t.profile.edit}
                                            </button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleSave}
                                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    <Save className="w-4 h-4" />
                                                    {t.profile.save}
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                    {t.profile.cancel}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.profile.firstName}
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.profile.lastName}
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.profile.email}
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.profile.phone}
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.profile.city}
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.profile.profession}
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.profession}
                                                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.profile.bio}
                                            </label>
                                            <textarea
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                disabled={!isEditing}
                                                rows={4}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.profile.skills}
                                            </label>
                                            <textarea
                                                value={formData.skills}
                                                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                                disabled={!isEditing}
                                                rows={2}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                                                placeholder="React, TypeScript, JavaScript..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'activity' && (
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.profile.recentActivity}</h2>
                                    <div className="space-y-4">
                                        {recentActivity.map((activity) => (
                                            <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="mt-1">
                                                    {getActivityIcon(activity.type)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-900">{activity.title}</p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {new Date(activity.date).toLocaleDateString('ru-RU')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.profile.security}</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.profile.currentPassword}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={formData.currentPassword}
                                                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.profile.newPassword}
                                            </label>
                                            <input
                                                type="password"
                                                value={formData.newPassword}
                                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {t.profile.confirmPassword}
                                            </label>
                                            <input
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <button
                                            onClick={handleSave}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            {t.profile.updatePassword}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Placeholder for other tabs */}
                            {['applications', 'courses', 'notifications'].includes(activeTab) && (
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                        {tabs.find(tab => tab.id === activeTab)?.label}
                                    </h2>
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                            🚧
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">В разработке</h3>
                                        <p className="text-gray-600">Этот раздел находится в разработке и скоро будет доступен.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
