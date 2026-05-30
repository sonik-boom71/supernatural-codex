import type { Metadata } from 'next';
import { AuthForm } from '@/components/auth/AuthForm';

export const metadata: Metadata = { title: 'Вход' };

export default function LoginPage() {
  return (
    <div className="container-page py-20">
      <AuthForm mode="login" />
    </div>
  );
}
