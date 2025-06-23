import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building, Users, Briefcase, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { companies, cities } from '@/data/mockData';

const CompaniesPage: React.FC = () => {
    const { getLocalizedText, language } = useLanguage();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedCity, setSelectedCity] = React.useState('');

    const filteredCompanies = React.useMemo(() => {
        let results = [...companies];

        if (searchQuery) {
            results = results.filter(company =>
                company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                getLocalizedText(company.description).toLowerCase().includes(searchQuery.toLowerCase()) ||
                company.industry.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCity) {
            results = results.filter(company => company.location === selectedCity);
        }

        return results;
    }, [searchQuery, selectedCity, getLocalizedText]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {language === 'taj' ? 'Ширкатҳо' : 'Компании'}
                    </h1>
                    <p className="text-gray-600 mb-6">
                        {language === 'taj'
                            ? 'Ширкатҳои беҳтаринро пайдо кунед ва дар бораи онҳо маълумот гиред'
                            : 'Найдите лучшие компании и узнайте о них подробнее'
                        }
                    </p>

                    {/* Search Bar */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder={language === 'taj' ? 'Ҷустуҷӯи ширкат ё соҳа...' : 'Поиск компании или отрасли...'}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">{language === 'taj' ? 'Ҳама шаҳрҳо' : 'Все города'}</option>
                                        {cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        {language === 'taj'
                            ? `${filteredCompanies.length} ширкат ёфт шуд`
                            : `Найдено ${filteredCompanies.length} компаний`
                        }
                    </p>
                </div>

                {/* Companies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCompanies.map(company => (
                        <div key={company.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
                            {/* Company Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <Building className="w-6 h-6 text-primary-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                                            <p className="text-sm text-gray-500">{company.industry}</p>
                                        </div>
                                    </div>
                                </div>
                                {company.website && (
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-400 hover:text-primary-500 rounded-full hover:bg-primary-50 transition-colors duration-200"
                                        title={language === 'taj' ? 'Вебсайти ширкат' : 'Сайт компании'}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>

                            {/* Company Info */}
                            <div className="mb-4">
                                <p className="text-gray-700 text-sm line-clamp-3">
                                    {getLocalizedText(company.description)}
                                </p>
                            </div>

                            {/* Company Details */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-gray-600 text-sm">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>{company.location}</span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <Users className="w-4 h-4 mr-2" />
                                    <span>{company.size}</span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <Briefcase className="w-4 h-4 mr-2" />
                                    <span>
                                        {company.jobsCount} {language === 'taj' ? 'вазифаи кушод' : 'открытых вакансий'}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-2">
                                <Link
                                    to={`/companies/${company.id}`}
                                    className="flex-1 btn-secondary text-center"
                                >
                                    {language === 'taj' ? 'Дидан' : 'Подробнее'}
                                </Link>
                                <Link
                                    to={`/jobs?company=${company.name}`}
                                    className="flex-1 btn-primary text-center"
                                >
                                    {language === 'taj' ? 'Вазифаҳо' : 'Вакансии'}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredCompanies.length === 0 && (
                    <div className="text-center py-12">
                        <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {language === 'taj' ? 'Ширкатҳо ёфт нашуданд' : 'Компании не найдены'}
                        </h3>
                        <p className="text-gray-500">
                            {language === 'taj'
                                ? 'Параметрҳои ҷустуҷӯро тағйир диҳед'
                                : 'Попробуйте изменить параметры поиска'
                            }
                        </p>
                    </div>
                )}

                {/* Company Statistics */}
                <div className="mt-16 bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        {language === 'taj' ? 'Омори ширкатҳо' : 'Статистика компаний'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary-600 mb-2">1,234</div>
                            <div className="text-gray-600">
                                {language === 'taj' ? 'Ширкатҳои қайдшуда' : 'Зарегистрированных компаний'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">2,543</div>
                            <div className="text-gray-600">
                                {language === 'taj' ? 'Вазифаҳои фаъол' : 'Активных вакансий'}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">15</div>
                            <div className="text-gray-600">
                                {language === 'taj' ? 'Соҳаҳои гуногун' : 'Различных отраслей'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Industries */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {language === 'taj' ? 'Соҳаҳои маъмул' : 'Популярные отрасли'}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            'IT и технологии',
                            'Финансы',
                            'Здравоохранение',
                            'Образование',
                            'Строительство',
                            'Производство',
                            'Торговля',
                            'Туризм',
                            'Транспорт',
                            'Сельское хозяйство',
                            'Телекоммуникации',
                            'Энергетика'
                        ].map((industry, index) => (
                            <button
                                key={index}
                                onClick={() => setSearchQuery(industry)}
                                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center group"
                            >
                                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary-200 transition-colors duration-200">
                                    <Building className="w-4 h-4 text-primary-600" />
                                </div>
                                <div className="text-sm font-medium text-gray-900">{industry}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompaniesPage;
