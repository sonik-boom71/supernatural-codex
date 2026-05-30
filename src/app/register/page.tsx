import type { Metadata } from 'next';
import { AuthForm } from '@/components/auth/AuthForm';

export const metadata: Metadata = { title: 'Регистрация' };

export default function RegisterPage() {
  return (
    <div className="container-page py-20">
      <AuthForm mode="register" />
    </div>
  );
}
