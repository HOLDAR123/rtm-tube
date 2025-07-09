import { Route, Routes } from 'react-router-dom';
import { useFetchSubscriptionsByUserId } from './hooks/query/useFetchSubscriptionsByUserId';
import { useFetchMyProfile } from './hooks/query/useFetchMyProfile';

import Layout from 'components/layout/Layout';
import EditSubscription from 'components/settings/EditSubscription';
import MainSettings from 'components/settings/MainSettings';
import ReceiveOnly from 'components/settings/ReceiveOnly';
import Referral from 'components/settings/Referral';
import ThemeList from 'components/settings/ThemeList';
import CatalogPage from 'pages/CatalogPage';
import ChatPage from 'pages/ChatPage';
import EditAiModel from 'pages/EditAiModel';
import LoginPage from 'pages/LoginPage';
import SettingPage from 'pages/SettingPage';
import SignUpBloggerPage from 'pages/SignUpBloggerPage';
import SignUpPage from 'pages/SignUpPage';
import SubscribePage from 'pages/SubscribePage';
import SubscriptionsPage from 'pages/SubscriptionsPage';

export default function Router() {
  const { user } = useFetchMyProfile();
  const { subscriptionsChatData } = useFetchSubscriptionsByUserId(user?.id ?? -1);
  const hasSubscriptions = subscriptionsChatData && subscriptionsChatData.length > 0;

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {hasSubscriptions ? (
              <>
                <Route index element={<ChatPage />} />
                <Route path=":id" element={<ChatPage />} />
              </>
          ) : (
              <Route index element={<CatalogPage />} />
          )}
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />}>
            <Route path=":code" element={<SignUpPage />} />
          </Route>
          <Route path="signup/blogger" element={<SignUpBloggerPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<SubscribePage />} />
          <Route path="settings" element={<SettingPage />}>
            <Route index element={<MainSettings />} />
            <Route path="theme" element={<ThemeList />} />
            <Route path="receive-only" element={<ReceiveOnly />} />
            <Route path="edit-subscription" element={<EditSubscription />} />
            <Route path="edit-ai-model" element={<EditAiModel />} />
            <Route path="referral" element={<Referral />} />
          </Route>
          <Route path="settings/subscriptions" element={<SubscriptionsPage />} />
        </Route>
      </Routes>
  );
}
