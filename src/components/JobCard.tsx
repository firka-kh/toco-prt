import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Eye, Users, Bookmark, Share2 } from 'lucide-react';
import { Job } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { getLocalizedText, t } = useLanguage();
  const { saveJob, unsaveJob, applyToJob, isJobSaved, isJobApplied } = useApp();

  const handleSave = () => {
    if (isJobSaved(job.id)) {
      unsaveJob(job.id);
    } else {
      saveJob(job.id);
    }
  };

  const handleApply = () => {
    applyToJob(job.id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + `/jobs/${job.id}`);
    // Add notification would be handled by parent component
  };

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
    <div className="card p-6 hover:shadow-elegant transition-all duration-300">
      <div className="flex justify-between items-start mb-4">        <div className="flex-1">
        <div className="flex items-center space-x-2 mb-2">
          <Link
            to={`/jobs/${job.id}`}
            className="text-lg font-semibold text-gray-900 hover:text-primary-600 cursor-pointer transition-colors duration-200"
          >
            {getLocalizedText(job.title)}
          </Link>
          {job.featured && (
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
              {t('language') === 'taj' ? 'Махсус' : 'Рекомендуем'}
            </span>
          )}
          {job.urgent && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {t('language') === 'taj' ? 'Зарурӣ' : 'Срочно'}
            </span>
          )}
        </div>
        <p className="text-primary-600 font-medium mb-2">{job.company}</p>
        <div className="flex items-center text-gray-600 text-sm space-x-4">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatDate(job.createdAt)}</span>
          </div>
        </div>
      </div>        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className={`p-2 rounded-full transition-colors duration-200 ${isJobSaved(job.id)
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-400 hover:text-primary-500 hover:bg-primary-50'
              }`}
            title={t('common.save')}
          >
            <Bookmark className={`w-5 h-5 ${isJobSaved(job.id) ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-full transition-colors duration-200"
            title={t('common.share')}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 line-clamp-2">
          {getLocalizedText(job.description)}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
          {t(`jobTypes.${job.type}`)}
        </span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{job.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{job.applications} {t('language') === 'taj' ? 'муроҷиат' : 'откликов'}</span>
          </div>
        </div>        <button
          onClick={handleApply}
          disabled={isJobApplied(job.id)}
          className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${isJobApplied(job.id)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
        >
          {isJobApplied(job.id)
            ? (t('language') === 'taj' ? 'Муроҷиат шуд' : 'Отклик отправлен')
            : t('common.apply')
          }
        </button>
      </div>
    </div>
  );
};

export default JobCard;
