import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FindMyCollegePage from './pages/FindMyCollegePage';
import ShopPage from './pages/ShopPage';
import FinancingPage from './pages/FinancingPage';
import ResourcesPage from './pages/ResourcesPage';
import SignInPage from './pages/SignInPage';
import GetStartedPage from './pages/GetStartedPage';
import ProfilePage from './pages/ProfilePage';
import MyCoursesPage from './pages/MyCoursesPage';
import PaymentPage from './pages/PaymentPage';
import CourseLearningPage from './pages/CourseLearningPage';
import EnrollPage from './pages/EnrollPage';

function AppContent() {
  const location = useLocation();
  const isLearningPage = location.pathname.includes('/course/') && location.pathname.includes('/learn');

  return (
    <div className="App">
      {!isLearningPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/find-my-college" element={<FindMyCollegePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/financing" element={<FinancingPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/enroll" element={<EnrollPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/course/:courseId/learn" element={<CourseLearningPage />} />
      </Routes>
      {!isLearningPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
