import React from 'react';
import { Search, Filter, MapPin, Briefcase, DollarSign, Clock, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { mockJobs, jobCategories, cities } from '@/data/mockData';
import { JobFilter } from '@/types';
import JobCard from '@/components/JobCard';

const JobsPage: React.FC = () => {
  const { t, getLocalizedText, language } = useLanguage();
  const [filters, setFilters] = React.useState<JobFilter>({});
  const [showFilters, setShowFilters] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'date' | 'salary' | 'relevance'>('date');

  const filteredJobs = React.useMemo(() => {
    let results = [...mockJobs];

    // Apply filters
    if (filters.keywords) {
      results = results.filter(job =>
        getLocalizedText(job.title).toLowerCase().includes(filters.keywords!.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.keywords!.toLowerCase()) ||
        getLocalizedText(job.description).toLowerCase().includes(filters.keywords!.toLowerCase())
      );
    }

    if (filters.location) {
      results = results.filter(job => job.location === filters.location);
    }

    if (filters.category) {
      results = results.filter(job => job.category === filters.category);
    }

    if (filters.type) {
      results = results.filter(job => job.type === filters.type);
    }

    if (filters.salaryMin) {
      results = results.filter(job => job.salary.min >= filters.salaryMin!);
    }

    if (filters.salaryMax) {
      results = results.filter(job => job.salary.max <= filters.salaryMax!);
    }

    // Apply sorting
    switch (sortBy) {
      case 'date':
        results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'salary':
        results.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case 'relevance':
        results.sort((a, b) => b.views - a.views);
        break;
    }

    return results;
  }, [filters, sortBy, getLocalizedText]);

  const updateFilter = (key: keyof JobFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'taj' ? 'Ҷустуҷӯи вазифаҳо' : 'Поиск вакансий'}
          </h1>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t('hero.searchPlaceholder')}
                    value={filters.keywords || ''}
                    onChange={(e) => updateFilter('keywords', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filters.location || ''}
                    onChange={(e) => updateFilter('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">{t('common.location')}</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <Filter className="w-5 h-5" />
                <span>{t('common.filter')}</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {language === 'taj' ? 'Филтрҳои иловагӣ' : 'Дополнительные фильтры'}
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  {language === 'taj' ? 'Пок кардан' : 'Очистить все'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('common.category')}
                  </label>
                  <select
                    value={filters.category || ''}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">{language === 'taj' ? 'Ҳама категорияҳо' : 'Все категории'}</option>
                    {jobCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {getLocalizedText(category.name)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'taj' ? 'Навъи кор' : 'Тип занятости'}
                  </label>
                  <select
                    value={filters.type || ''}
                    onChange={(e) => updateFilter('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">{language === 'taj' ? 'Ҳама навъҳо' : 'Все типы'}</option>
                    <option value="full-time">{t('jobTypes.full-time')}</option>
                    <option value="part-time">{t('jobTypes.part-time')}</option>
                    <option value="remote">{t('jobTypes.remote')}</option>
                    <option value="contract">{t('jobTypes.contract')}</option>
                  </select>
                </div>

                {/* Salary Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'taj' ? 'Маош аз' : 'Зарплата от'}
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.salaryMin || ''}
                    onChange={(e) => updateFilter('salaryMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'taj' ? 'Маош то' : 'Зарплата до'}
                  </label>
                  <input
                    type="number"
                    placeholder="10000"
                    value={filters.salaryMax || ''}
                    onChange={(e) => updateFilter('salaryMax', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-600">
                {language === 'taj'
                  ? `${filteredJobs.length} вазифа ёфт шуд`
                  : `Найдено ${filteredJobs.length} вакансий`
                }
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {language === 'taj' ? 'Мураттаб кунед:' : 'Сортировать:'}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                >
                  <option value="date">
                    {language === 'taj' ? 'Аз рӯи сана' : 'По дате'}
                  </option>
                  <option value="salary">
                    {language === 'taj' ? 'Аз рӯи маош' : 'По зарплате'}
                  </option>
                  <option value="relevance">
                    {language === 'taj' ? 'Аз рӯи мувофиқат' : 'По релевантности'}
                  </option>
                </select>
              </div>
            </div>            {/* Job Cards */}
            <div className="space-y-6">
              {filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                />
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'taj' ? 'Вазифаҳо ёфт нашуд' : 'Вакансии не найдены'}
                </h3>
                <p className="text-gray-500">
                  {language === 'taj'
                    ? 'Параметрҳои ҷустуҷӯро тағйир диҳед ё баъдтар кӯшиш кунед'
                    : 'Попробуйте изменить параметры поиска'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'taj' ? 'Категорияҳои маъмул' : 'Популярные категории'}
              </h3>
              <div className="space-y-2">
                {jobCategories.slice(0, 8).map(category => (
                  <button
                    key={category.id}
                    onClick={() => updateFilter('category', category.id)}
                    className="w-full text-left px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                  >
                    {getLocalizedText(category.name)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'taj' ? 'Маслиҳатҳо' : 'Советы'}
              </h3>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {language === 'taj' ? 'Ҷустуҷӯро беҳтар кунед' : 'Улучшите поиск'}
                  </h4>
                  <p>
                    {language === 'taj'
                      ? 'Калимаҳои калидиро муайян кунед ва филтрҳоро истифода баред'
                      : 'Используйте ключевые слова и фильтры для лучших результатов'
                    }
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {language === 'taj' ? 'Резюмеатонро нав кунед' : 'Обновите резюме'}
                  </h4>
                  <p>
                    {language === 'taj'
                      ? 'Резюмеи навшуда шумро дар рӯйхатҳои пешин нишон медиҳад'
                      : 'Свежее резюме показывается выше в результатах поиска'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
