'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSignIn } from '@clerk/nextjs';
import { useState } from 'react';

export default function CustomSignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [pending, setPending] = useState(false);

  const handleEmailSubmit = async () => {
    if (!isLoaded) return;
    setPending(true);
    try {
      await signIn.create({ identifier: email });
    } catch (err) {
      console.log('Email error', err);
    }
    setPending(false);
  };
  const handleCodeSubmit = async () => {
    if (!isLoaded) return;
    setPending(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code,
      });
      if (result.status === 'complete')
        await setActive({ session: result.createdSessionId });
      else {
        console.log(result);
      }
    } catch (err) {
      console.log('Email error', err);
    }
    setPending(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <section
        className="space-y-2 max-w-6xl mx-auto p-10 border rounded-lg shadow-md 
                   bg-gray-100 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 
                   transition-colors duration-300"
      >
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded bg-gray-100"
        />
        <Button onClick={handleEmailSubmit}
        disabled={pending}
        className="w-full bg-blue-600 text-white rounded py-2">
          Send Code
        </Button>
        <Input
          type="text"
          placeholder="Enter verification code"
          className="w-full border px-3 py-2 rounded bg-gray-100"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button 
        onClick={handleCodeSubmit}
        disabled={pending}
        className="w-full bg-green-600 text-white rounded py-2">
          Sign In
        </Button>
      </section>
    </main>
  );
}
