import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ContactPage: React.FC = () => {
    const { language } = useLanguage();
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        alert(language === 'taj' ? 'Паёми шумо фиристода шуд!' : 'Ваше сообщение отправлено!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: language === 'taj' ? 'Суроға' : 'Адрес',
            content: language === 'taj' ? 'Душанбе, кӯчаи Рӯдакӣ 33' : 'г. Душанбе, ул. Рудаки 33',
            color: 'text-blue-600'
        },
        {
            icon: Phone,
            title: language === 'taj' ? 'Телефон' : 'Телефон',
            content: '+992 37 221-00-00',
            color: 'text-green-600'
        },
        {
            icon: Mail,
            title: language === 'taj' ? 'Почтаи электронӣ' : 'Email',
            content: 'info@toco-prt.tj',
            color: 'text-purple-600'
        },
        {
            icon: Clock,
            title: language === 'taj' ? 'Вақти корӣ' : 'Время работы',
            content: language === 'taj' ? 'Душанбе - Ҷумъа: 9:00 - 18:00' : 'Понедельник - Пятница: 9:00 - 18:00',
            color: 'text-orange-600'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {language === 'taj' ? 'Бо мо тамос гиред' : 'Свяжитесь с нами'}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {language === 'taj'
                            ? 'Мо омодаем барои ҷавобгӯӣ ба саволҳои шумо ва кӯмак дар кори портал'
                            : 'Мы готовы ответить на ваши вопросы и помочь в работе с порталом'
                        }
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {language === 'taj' ? 'Маълумоти тамос' : 'Контактная информация'}
                            </h2>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className={`w-12 h-12 ${info.color} bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0`}>
                                            <info.icon className={`w-6 h-6 ${info.color}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                                            <p className="text-gray-600">{info.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {language === 'taj' ? 'Ҷойгиршавӣ дар харита' : 'Расположение на карте'}
                            </h3>
                            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                                    <p>{language === 'taj' ? 'Харитаи интерактивӣ' : 'Интерактивная карта'}</p>
                                    <p className="text-sm">{language === 'taj' ? 'Душанбе, Тоҷикистон' : 'Душанбе, Таджикистан'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {language === 'taj' ? 'Паёми фиристонед' : 'Отправить сообщение'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {language === 'taj' ? 'Ном' : 'Имя'} *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder={language === 'taj' ? 'Номи шумо' : 'Ваше имя'}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {language === 'taj' ? 'Почтаи электронӣ' : 'Email'} *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder={language === 'taj' ? 'email@misal.com' : 'email@example.com'}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {language === 'taj' ? 'Телефон' : 'Телефон'}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="+992 XX XXX-XX-XX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {language === 'taj' ? 'Мавзӯъ' : 'Тема'} *
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    >
                                        <option value="">
                                            {language === 'taj' ? 'Мавзӯъро интихоб кунед' : 'Выберите тему'}
                                        </option>
                                        <option value="job_search">
                                            {language === 'taj' ? 'Ҷустуҷӯи кор' : 'Поиск работы'}
                                        </option>
                                        <option value="resume_help">
                                            {language === 'taj' ? 'Кӯмак дар резюме' : 'Помощь с резюме'}
                                        </option>
                                        <option value="employer_services">
                                            {language === 'taj' ? 'Хидамоти корфармо' : 'Услуги работодателю'}
                                        </option>
                                        <option value="technical_support">
                                            {language === 'taj' ? 'Дастгирии техникӣ' : 'Техническая поддержка'}
                                        </option>
                                        <option value="other">
                                            {language === 'taj' ? 'Дигар' : 'Другое'}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {language === 'taj' ? 'Паём' : 'Сообщение'} *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="input-field resize-none"
                                    placeholder={language === 'taj'
                                        ? 'Паёми худро дар ин ҷо нависед...'
                                        : 'Напишите ваше сообщение здесь...'
                                    }
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full btn-primary flex items-center justify-center space-x-2"
                            >
                                <Send className="w-5 h-5" />
                                <span>{language === 'taj' ? 'Паём фиристонед' : 'Отправить сообщение'}</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {language === 'taj' ? 'Саволҳои зиёд пурсида мешаванда' : 'Часто задаваемые вопросы'}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                question: language === 'taj' ? 'Чӣ тавр резюме гузоштан мумкин аст?' : 'Как разместить резюме?',
                                answer: language === 'taj'
                                    ? 'Барои гузоштани резюме, қайд шавед ва дар профили худ резюмеро пур кунед'
                                    : 'Для размещения резюме зарегистрируйтесь и заполните резюме в своем профиле'
                            },
                            {
                                question: language === 'taj' ? 'Оё хидамот ройгон аст?' : 'Бесплатна ли услуга?',
                                answer: language === 'taj'
                                    ? 'Ҳа, гузоштани резюме ва ҷустуҷӯи кор пурра ройгон аст'
                                    : 'Да, размещение резюме и поиск работы полностью бесплатны'
                            },
                            {
                                question: language === 'taj' ? 'Чӣ тавр ба корфармо муроҷиат кардан мумкин?' : 'Как связаться с работодателем?',
                                answer: language === 'taj'
                                    ? 'Дар ҳар вазифа тугмаи "Муроҷиат кардан" мавҷуд аст'
                                    : 'У каждой вакансии есть кнопка "Откликнуться"'
                            },
                            {
                                question: language === 'taj' ? 'Чӣ тавр вазифа гузоштан мумкин?' : 'Как разместить вакансию?',
                                answer: language === 'taj'
                                    ? 'Барои корфармоён қайдшавӣ ва гузоштани вазифа ройгон аст'
                                    : 'Для работодателей регистрация и размещение вакансии бесплатны'
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-start space-x-3">
                                    <MessageCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
