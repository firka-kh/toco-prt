import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Building,
  ArrowRight,
  Star
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { mockJobs, jobCategories } from '@/data/mockData';
import JobCard from '@/components/JobCard';

const HomePage: React.FC = () => {
  const { t, getLocalizedText, language } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');

  const featuredJobs = mockJobs.filter(job => job.featured).slice(0, 3);
  const topCategories = jobCategories.slice(0, 6);

  const stats = [
    { 
      icon: Briefcase, 
      value: '2,543', 
      label: language === 'taj' ? 'Вазифаҳои фаъол' : 'Активных вакансий',
      color: 'text-blue-600'
    },
    { 
      icon: Users, 
      value: '8,921', 
      label: language === 'taj' ? 'Корҷӯён' : 'Соискателей',
      color: 'text-green-600'
    },
    { 
      icon: Building, 
      value: '1,234', 
      label: language === 'taj' ? 'Ширкатҳо' : 'Компаний',
      color: 'text-purple-600'
    },
    { 
      icon: TrendingUp, 
      value: '156', 
      label: language === 'taj' ? 'Вазифаҳои нав имрӯз' : 'Новых вакансий сегодня',
      color: 'text-orange-600'
    },
  ];

  const handleSearch = () => {
    // Navigate to jobs page with search params
    console.log('Searching for:', searchQuery, 'in', selectedLocation);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-gradient">{t('hero.title')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-elegant p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={t('hero.searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                    />
                  </div>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg appearance-none bg-white"
                  >
                    <option value="">{t('common.location')}</option>
                    <option value="dushanbe">Душанбе</option>
                    <option value="khujand">Худжанд</option>
                    <option value="bokhtar">Бохтар</option>
                    <option value="istaravshan">Истаравшан</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="w-full mt-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
              >
                {t('hero.searchButton')}
              </button>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {topCategories.map((category) => (
              <Link
                key={category.id}
                to={`/jobs?category=${category.id}`}
                className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow duration-200 group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary-200 transition-colors duration-200">
                  <Briefcase className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">
                  {getLocalizedText(category.name)}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'taj' ? 'Вазифаҳои махсус' : 'Рекомендуемые вакансии'}
              </h2>
              <p className="text-gray-600">
                {language === 'taj' 
                  ? 'Беҳтарин вазифаҳо аз ширкатҳои маъруф' 
                  : 'Лучшие вакансии от известных компаний'
                }
              </p>
            </div>
            <Link 
              to="/jobs" 
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <span>{t('common.viewAll')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'taj' ? 'Чӣ гуна кор мекунад' : 'Как это работает'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {language === 'taj' 
                ? 'Танҳо се қадам барои пайдо кардани кори идеалӣ' 
                : 'Всего три шага для поиска идеальной работы'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: language === 'taj' ? 'Қайд шавед' : 'Зарегистрируйтесь',
                description: language === 'taj' 
                  ? 'Профили худро эҷод кунед ва резюмеатонро бор кунед'
                  : 'Создайте свой профиль и загрузите резюме'
              },
              {
                step: 2,
                title: language === 'taj' ? 'Вазифа ёбед' : 'Найдите вакансию',
                description: language === 'taj' 
                  ? 'Аз ҳазорҳо вазифаҳо муносибтаринро интихоб кунед'
                  : 'Выберите подходящую из тысяч вакансий'
              },
              {
                step: 3,
                title: language === 'taj' ? 'Муроҷиат кунед' : 'Откликнитесь',
                description: language === 'taj' 
                  ? 'Бо ширкат алоқа барқарор кунед ва кор шурӯъ кунед'
                  : 'Свяжитесь с компанией и начните работу'
              }
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === 'taj' 
              ? 'Ҳозир кори худро пайдо кунед!' 
              : 'Найдите свою работу прямо сейчас!'
            }
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            {language === 'taj' 
              ? 'Ҳар рӯз ҳазорҳо вазифаҳои нав илова мешаванд. Интизор нашавед!' 
              : 'Каждый день добавляются тысячи новых вакансий. Не ждите!'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/jobs" 
              className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              {language === 'taj' ? 'Вазифаҳоро дидан' : 'Посмотреть вакансии'}
            </Link>
            <Link 
              to="/register" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              {language === 'taj' ? 'Резюме гузоштан' : 'Разместить резюме'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
