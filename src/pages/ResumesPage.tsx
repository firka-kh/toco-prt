import React from 'react';
import { Search, MapPin, Filter, Eye, Calendar, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { mockResumes, cities, jobCategories } from '@/data/mockData';
import { ResumeFilter } from '@/types';

const ResumesPage: React.FC = () => {
    const { t, getLocalizedText, language } = useLanguage();
    const [filters, setFilters] = React.useState<ResumeFilter>({});
    const [showFilters, setShowFilters] = React.useState(false);

    const filteredResumes = React.useMemo(() => {
        let results = [...mockResumes];

        if (filters.keywords) {
            results = results.filter(resume =>
                getLocalizedText(resume.position).toLowerCase().includes(filters.keywords!.toLowerCase()) ||
                resume.name.toLowerCase().includes(filters.keywords!.toLowerCase()) ||
                resume.skills.some(skill => skill.toLowerCase().includes(filters.keywords!.toLowerCase()))
            );
        }

        if (filters.location) {
            results = results.filter(resume => resume.location === filters.location);
        }

        if (filters.salaryMin) {
            results = results.filter(resume => resume.expectedSalary.min >= filters.salaryMin!);
        }

        return results;
    }, [filters, getLocalizedText]);

    const updateFilter = (key: keyof ResumeFilter, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {language === 'taj' ? 'Ҷустуҷӯи резюме' : 'Поиск резюме'}
                    </h1>

                    {/* Search Bar */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder={language === 'taj' ? 'Ҷустуҷӯи кандидат, касб ё малака...' : 'Поиск кандидата, профессии или навыка...'}
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
                                    onClick={() => setFilters({})}
                                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                    {language === 'taj' ? 'Пок кардан' : 'Очистить все'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {language === 'taj' ? 'Маоши интизорӣ аз' : 'Ожидаемая зарплата от'}
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
                                        {language === 'taj' ? 'Маоши интизорӣ то' : 'Ожидаемая зарплата до'}
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
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-gray-600">
                                {language === 'taj'
                                    ? `${filteredResumes.length} резюме ёфт шуд`
                                    : `Найдено ${filteredResumes.length} резюме`
                                }
                            </div>
                        </div>

                        {/* Resume Cards */}
                        <div className="space-y-6">
                            {filteredResumes.map(resume => (
                                <div key={resume.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {resume.name}
                                                </h3>
                                                {resume.verified && (
                                                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center space-x-1">
                                                        <Award className="w-3 h-3" />
                                                        <span>{language === 'taj' ? 'Тасдиқшуда' : 'Проверено'}</span>
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-primary-600 font-medium mb-2">
                                                {getLocalizedText(resume.position)}
                                            </p>
                                            <div className="flex items-center text-gray-600 text-sm space-x-4">
                                                <div className="flex items-center space-x-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{resume.location}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{resume.experience} {language === 'taj' ? 'сол таҷриба' : 'лет опыта'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <Eye className="w-4 h-4" />
                                                <span>{resume.views}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-gray-700 line-clamp-2">
                                            {getLocalizedText(resume.summary)}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {resume.skills.slice(0, 4).map(skill => (
                                            <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))}
                                        {resume.skills.length > 4 && (
                                            <span className="text-gray-500 text-sm">
                                                +{resume.skills.length - 4} {language === 'taj' ? 'дигар' : 'ещё'}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="text-primary-600 font-medium">
                                            {language === 'taj' ? 'Маоши интизорӣ:' : 'Ожидаемая зарплата:'} {resume.expectedSalary.min.toLocaleString()} - {resume.expectedSalary.max.toLocaleString()} {resume.expectedSalary.currency}
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="btn-secondary">
                                                {language === 'taj' ? 'Дидан' : 'Посмотреть'}
                                            </button>
                                            <button className="btn-primary">
                                                {language === 'taj' ? 'Даъват кардан' : 'Пригласить'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredResumes.length === 0 && (
                            <div className="text-center py-12">
                                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {language === 'taj' ? 'Резюме ёфт нашуд' : 'Резюме не найдены'}
                                </h3>
                                <p className="text-gray-500">
                                    {language === 'taj'
                                        ? 'Параметрҳои ҷустуҷӯро тағйир диҳед'
                                        : 'Попробуйте изменить параметры поиска'
                                    }
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-80">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                {language === 'taj' ? 'Маслиҳатҳо барои корфармоён' : 'Советы для работодателей'}
                            </h3>
                            <div className="space-y-4">
                                <div className="text-sm text-gray-600">
                                    <h4 className="font-medium text-gray-900 mb-1">
                                        {language === 'taj' ? 'Кандидати идеалӣ' : 'Идеальный кандидат'}
                                    </h4>
                                    <p>
                                        {language === 'taj'
                                            ? 'Малакаҳо ва таҷрибаро дар ҷустуҷӯ муайян кунед'
                                            : 'Четко определите навыки и опыт в поиске'
                                        }
                                    </p>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <h4 className="font-medium text-gray-900 mb-1">
                                        {language === 'taj' ? 'Муошро дуруст муайян кунед' : 'Правильно укажите зарплату'}
                                    </h4>
                                    <p>
                                        {language === 'taj'
                                            ? 'Муоши рақобатпазир бештар кандидон ҷалб мекунад'
                                            : 'Конкурентная зарплата привлекает больше кандидатов'
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

export default ResumesPage;
