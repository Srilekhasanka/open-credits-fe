import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';
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
import MyCoursesListPage from './pages/MyCoursesListPage';
import AllCoursesDashboardPage from './pages/AllCoursesDashboardPage';
import AffiliateDashboardPage from './pages/AffiliateDashboardPage';
import CartDashboardPage from './pages/CartDashboardPage';
import CheckoutDashboardPage from './pages/CheckoutDashboardPage';
import PaymentStatusDashboardPage from './pages/PaymentStatusDashboardPage';
import MyAccountDashboardPage from './pages/MyAccountDashboardPage';
import PaymentPage from './pages/PaymentPage';
import CourseLearningPage from './pages/CourseLearningPage';
import EnrollPage from './pages/EnrollPage';

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const isLearningPage = location.pathname.includes('/course/') && location.pathname.includes('/learn');

  return (
    <div className="App">
      {!isAuthenticated && !isLearningPage && <Header />}
      {isAuthenticated ? (
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<AllCoursesDashboardPage />} />
            <Route path="/dashboard" element={<MyCoursesPage />} />
            <Route path="/my-courses/list" element={<MyCoursesListPage />} />
            <Route path="/my-courses" element={<MyCoursesListPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/find-my-college" element={<FindMyCollegePage />} />
            <Route path="/shop" element={<CartDashboardPage />} />
            <Route path="/financing" element={<FinancingPage />} />
            <Route path="/resources" element={<AffiliateDashboardPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/get-started" element={<GetStartedPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-account" element={<MyAccountDashboardPage />} />
            <Route path="/enroll" element={<EnrollPage />} />
            <Route path="/payment" element={<CheckoutDashboardPage />} />
            <Route path="/payment/status" element={<PaymentStatusDashboardPage />} />
            <Route path="/course/:courseId/learn" element={<CourseLearningPage />} />
          </Routes>
        </DashboardLayout>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/dashboard" element={<MyCoursesPage />} />
          <Route path="/my-courses/list" element={<MyCoursesListPage />} />
          <Route path="/my-courses" element={<MyCoursesListPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/find-my-college" element={<FindMyCollegePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/financing" element={<FinancingPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-account" element={<MyAccountDashboardPage />} />
          <Route path="/enroll" element={<EnrollPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment/status" element={<PaymentPage />} />
          <Route path="/course/:courseId/learn" element={<CourseLearningPage />} />
        </Routes>
      )}
      {!isAuthenticated && !isLearningPage && <Footer />}
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
