// src/app/admin/login/page.tsx
import { Suspense } from 'react';
import AdminLogin from './AdminLogin';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminLogin />
    </Suspense>
  );
}