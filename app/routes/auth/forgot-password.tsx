import { useNavigate } from 'react-router';
import { ForgotPassword } from '~/pages/auth/forgot-password';
import { useAuth } from '~/providers/AuthProvider';

export default function ForgotPasswordRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user === undefined) {
    return null;
  }

  if (user) {
    return navigate('/');
  }
  return <ForgotPassword />;
}
