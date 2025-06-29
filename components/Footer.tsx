export default function Footer() {
  return (
    <footer className="text-center border-t border-gray-300 dark:border-gray-700 mx-auto py-4 bg-white dark:bg-zinc-950 text-gray-800 dark:text-gray-200 z-50 backdrop-blur-lg">
      {new Date().getFullYear()} Bio-Zap. All rights reserved.
    </footer>
  );
}
