import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NotificationContainer from '@/components/NotificationContainer';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import JobsPage from '@/pages/JobsPage';
import JobDetailsPage from '@/pages/JobDetailsPage';
import ResumesPage from '@/pages/ResumesPage';
import CompaniesPage from '@/pages/CompaniesPage';
import ContactPage from '@/pages/ContactPage';
import CoursesPage from '@/pages/CoursesPage';
import NewsPage from '@/pages/NewsPage';
import NewsDetailsPage from '@/pages/NewsDetailsPage';
import ProfilePage from '@/pages/ProfilePage';
import AdminPage from '@/pages/AdminPage';

// Placeholder components for other pages
const LoginPage = () => <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-2xl">Страница входа - в разработке</h1>
</div>;

const RegisterPage = () => <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-2xl">Страница регистрации - в разработке</h1>
</div>;

function App() {
    return (
        <LanguageProvider>
            <AppProvider>
                <Router basename="/toco-prt">
                    <div className="min-h-screen bg-gray-50 flex flex-col">
                        <Header />
                        <main className="flex-1">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/jobs" element={<JobsPage />} />
                                <Route path="/jobs/:id" element={<JobDetailsPage />} />
                                <Route path="/resumes" element={<ResumesPage />} />
                                <Route path="/companies" element={<CompaniesPage />} />
                                <Route path="/courses" element={<CoursesPage />} />
                                <Route path="/news" element={<NewsPage />} />
                                <Route path="/news/:id" element={<NewsDetailsPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/admin" element={<AdminPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                            </Routes>
                        </main>
                        <Footer />
                        <NotificationContainer />
                        <ScrollToTop />
                    </div>
                </Router>
            </AppProvider>
        </LanguageProvider>
    );
}

export default App;
