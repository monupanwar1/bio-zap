import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className="flex items-center justify-center p-10 dark:from-zinc-930 dark:to-zinc-800">
      <div className=" dark:bg-zinc-930 borderdark:border-zinc-700 rounded-xl ">
        <SignIn appearance={{ elements: { card: 'shadow-none' } }} />
      </div>
    </main>
  );
}
