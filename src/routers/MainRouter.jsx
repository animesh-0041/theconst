import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../page/Home/Home';
import { Notification } from '../page/Notification/Notification';
import { WritePost } from '../page/WritePost/WritePost';
import { Login } from '../page/Login/Login';
import { Register } from '../page/Register/Register';
import { Profile } from '../page/Profile/Profile';
import { IndividualPost } from '../page/IndividualPost/IndividualPost';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute.jsx';
import { SearchPage } from '../page/SearchPage/SearchPage';
import { EditPost } from '../page/EditPost/EditPost';
import { Books } from '../page/Books/Books.jsx';
import { MessagesHome } from '../page/Messages/MessagesHome.jsx';
import { PrivacyPolicy } from '../page/PrivacyPolicy/PrivacyPolicy.jsx';
import { About } from '../page/About/About.jsx';
import { Bookmark } from '../page/Bookmark/Bookmark.jsx';
import { PageTitleUpdater } from '../components/PageTitleUpdater/PageTitleUpdater.jsx';
import { Settings } from '../page/Settings/Settings.jsx';



export const MainRouter = () => {
  return (
    <Router>
      <PageTitleUpdater />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/:author/:url" element={<IndividualPost />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:user" element={<Profile />} />


        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>


        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/write" element={<WritePost />} />
          <Route path="/edit/:url" element={<EditPost />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/messages" element={<MessagesHome />} />
        </Route>


        {/* Catch-all route to handle unknown URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};
