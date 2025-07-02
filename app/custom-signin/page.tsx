'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignIn } from '@clerk/nextjs';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function CustomSignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSignInWithPassword = async () => {
    if (!isLoaded) return;
    setPending(true);
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Password sign-in error:', err);
    }
    setPending(false);
  };

  const handleSendCode = async () => {
    if (!isLoaded) return;
    setPending(true);
    try {
      await signIn.create({
        identifier: email,
        strategy: 'email_code',
      });
    } catch (err) {
      console.error('Email code send error:', err);
    }
    setPending(false);
  };

  const handleVerifyCode = async () => {
    if (!isLoaded) return;
    setPending(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        window.location.href = '/';
      }
    } catch (err) {
      console.error('OTP verification error:', err);
    }
    setPending(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <section className="space-y-4 max-w-md w-full p-8 border rounded-xl shadow-lg bg-white dark:bg-zinc-900">
        <h2 className="text-3xl font-semibold text-center">Sign In</h2>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-[38px] right-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>

        <Button
          className="w-full"
          disabled={pending}
          onClick={handleSignInWithPassword}
        >
          Sign In with Password
        </Button>

        <div className="flex items-center justify-between py-2">
          <span className="h-px flex-grow bg-gray-300 dark:bg-gray-600" />
          <span className="px-2 text-sm text-muted-foreground">OR</span>
          <span className="h-px flex-grow bg-gray-300 dark:bg-gray-600" />
        </div>

        <Button
          className="w-full"
          variant="secondary"
          onClick={handleSendCode}
          disabled={pending}
        >
          Send OTP to Email
        </Button>

        <div className="space-y-2">
          <Label htmlFor="otp">Enter OTP</Label>
          <Input
            id="otp"
            type="text"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <Button
          className="w-full"
          variant="default"
          onClick={handleVerifyCode}
          disabled={pending}
        >
          Verify OTP
        </Button>
      </section>
    </main>
  );
}
