import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center dark:from-zinc-930 dark:to-zinc-800 p-6">
      <div className="w-full max-w-md dark:bg-zinc-930 borderdark:border-zinc-700 rounded-xl  p-6">
        <SignIn appearance={{ elements: { card: 'shadow-none' } }} />
      </div>
    </main>
  );
}
