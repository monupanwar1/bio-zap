import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center p-10 dark:from-zinc-930 dark:to-zinc-800">
      <div className=" dark:bg-zinc-930 borderdark:border-zinc-700 rounded-xl ">
        <SignUp appearance={{ elements: { card: 'shadow-none' } }} />
      </div>
    </main>
  );
}
