import React from 'react';
import { MapPin, Clock, Eye, Users, Share2, ArrowLeft, Building, Calendar, Award } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Job } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { mockJobs } from '@/data/mockData';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getLocalizedText, t, language } = useLanguage();
  
  // In a real app, this would fetch from API
  const job = mockJobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'taj' ? 'Вазифа ёфт нашуд' : 'Вакансия не найдена'}
          </h1>
          <Link to="/jobs" className="text-primary-600 hover:text-primary-700">
            {language === 'taj' ? 'Ба рӯйхати вазифаҳо баргардед' : 'Вернуться к списку вакансий'}
          </Link>
        </div>
      </div>
    );
  }

  const formatSalary = (min: number, max: number, currency: string) => {
    return `${t('common.from')} ${min.toLocaleString()} ${t('common.to')} ${max.toLocaleString()} ${currency}`;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return t('language') === 'taj' ? 'Имрӯз' : 'Сегодня';
    if (diffDays === 1) return t('language') === 'taj' ? 'Дирӯз' : 'Вчера';
    return `${diffDays} ${t('language') === 'taj' ? 'рӯз пеш' : 'дней назад'}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/jobs" 
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'taj' ? 'Ба вазифаҳо баргаштан' : 'Назад к вакансиям'}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Job Header */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {getLocalizedText(job.title)}
                    </h1>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(job.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {t(`jobTypes.${job.type}`)}
                      </span>
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                        {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                      </span>
                      {job.featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>{language === 'taj' ? 'Махсус' : 'Рекомендуем'}</span>
                        </span>
                      )}
                      {job.urgent && (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                          {language === 'taj' ? 'Зарурӣ' : 'Срочно'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-colors duration-200">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{job.views} {language === 'taj' ? 'бор дида шуд' : 'просмотров'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{job.applications} {language === 'taj' ? 'муроҷиат' : 'откликов'}</span>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {language === 'taj' ? 'Тавсифи вазифа' : 'Описание вакансии'}
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {getLocalizedText(job.description)}
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {language === 'taj' ? 'Талабот' : 'Требования'}
                </h2>
                <ul className="space-y-2">
                  {(language === 'taj' ? job.requirements.taj : job.requirements.rus).map((req, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {language === 'taj' ? 'Бартариҳо' : 'Мы предлагаем'}
                </h2>
                <ul className="space-y-2">
                  {(language === 'taj' ? job.benefits.taj : job.benefits.rus).map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Apply Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-8">
              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4">
                {t('common.apply')}
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                {t('common.save')}
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {language === 'taj' ? 'Дар бораи ширкат' : 'О компании'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {language === 'taj' 
                    ? 'Ширкати пешбар дар соҳаи технологияҳои иттилоотӣ'
                    : 'Ведущая компания в сфере информационных технологий'
                  }
                </p>
                <Link 
                  to={`/companies/${job.company}`}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  {language === 'taj' ? 'Бештар дар бораи ширкат' : 'Подробнее о компании'}
                </Link>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                {language === 'taj' ? 'Вазифаҳои монанд' : 'Похожие вакансии'}
              </h3>
              <div className="space-y-4">
                {mockJobs.filter(j => j.id !== job.id && j.category === job.category).slice(0, 3).map(similarJob => (
                  <Link 
                    key={similarJob.id}
                    to={`/jobs/${similarJob.id}`}
                    className="block hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
                  >
                    <h4 className="font-medium text-gray-900 mb-1">
                      {getLocalizedText(similarJob.title)}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">{similarJob.company}</p>
                    <p className="text-sm text-primary-600">
                      {formatSalary(similarJob.salary.min, similarJob.salary.max, similarJob.salary.currency)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
