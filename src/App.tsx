import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import JobsPage from '@/pages/JobsPage';
import JobDetailsPage from '@/pages/JobDetailsPage';
import ResumesPage from '@/pages/ResumesPage';
import ContactPage from '@/pages/ContactPage';

// Placeholder components for other pages
const CompaniesPage = () => <div className="min-h-screen flex items-center justify-center">
  <h1 className="text-2xl">Страница компаний - в разработке</h1>
</div>;

const CoursesPage = () => <div className="min-h-screen flex items-center justify-center">
  <h1 className="text-2xl">Страница курсов - в разработке</h1>
</div>;

const NewsPage = () => <div className="min-h-screen flex items-center justify-center">
  <h1 className="text-2xl">Страница новостей - в разработке</h1>
</div>;

const LoginPage = () => <div className="min-h-screen flex items-center justify-center">
  <h1 className="text-2xl">Страница входа - в разработке</h1>
</div>;

const RegisterPage = () => <div className="min-h-screen flex items-center justify-center">
  <h1 className="text-2xl">Страница регистрации - в разработке</h1>
</div>;

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/resumes" element={<ResumesPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
