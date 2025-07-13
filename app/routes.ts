// app/routes.ts
import { route } from '@react-router/dev/routes';

export default [
  route('/auth', './routes/auth/auth-layout.tsx', [
    route('login', './routes/auth/login.tsx'),
    route('forgot-password', './routes/auth/forgot-password.tsx'),
    route('password-setup', './routes/auth/password-setup.tsx'),
  ]),
  route('/', './routes/private-layout.tsx', [
    route('admin', './routes/admin/admin-layout.tsx', [
      // route('user-management', './routes/admin/user-management.tsx'),
      route('user-management', './routes/admin/user-management/layout.tsx', [
        route('', './routes/admin/user-management/index.tsx'),
        route('create-user', './routes/admin/user-management/create-new-user.tsx'),
        route('edit-user/:id', './routes/admin/user-management/edit-user.tsx'),
        route('view-user/:id', './routes/admin/user-management/view-user.tsx'),
      ]),
      // route('user-management-edit', './routes/admin/user-management-edit.tsx'),
      route('log-management', './routes/admin/log-management.tsx'),
    ]),
    route('licensing', './routes/licensing/licensing-layout.tsx', [
      route('application-management', './routes/licensing/application-management/layout.tsx', [
        route('', './routes/licensing/application-management/index.tsx'),
        route(
          'grant-applications',
          './routes/licensing/application-management/grant-application-sections.tsx',
        ),
        route(
          'view-application/:applicationId',
          './routes/licensing/application-management/view-application.tsx',
        ),
      ]),
    ]),
    route('user', './routes/user/user-layout.tsx', [
      route('my-profile', './routes/user/my-profile.tsx'),
      route('notification', './routes/user/notification.tsx'),
      route('view-notification', './routes/user/view-notification.tsx'),
    ]),
  ]),
];
