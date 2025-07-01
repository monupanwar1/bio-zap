import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

type Link = {
  label: string;
  url: string;
  icon: string;
};

type CardPreviewProps = {
  avatarUrl: string;
  title: string;
  links: Link[];
};

export default function UserCard({
  avatarUrl,
  title,
  links,
}: CardPreviewProps) {
  return (
    <div className="px-4 py-10 w-full flex justify-center">
      <Card className="w-full max-w-xl border shadow-xl rounded-2xl bg-background text-foreground transition-colors">
        {/* Avatar + Name */}
        <CardHeader className="flex flex-col items-center gap-4 py-8">
          <Image
            src={avatarUrl}
            width={96}
            height={96}
            alt="Avatar"
            className="rounded-full object-cover border-2 border-border shadow-sm"
          />
          <h1 className="text-2xl font-semibold tracking-tight text-center">
            {title}
          </h1>
        </CardHeader>

        {/* Links Section */}
        <CardContent className="flex flex-col gap-4 px-6 pb-8">
          {links.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No links available
            </p>
          ) : (
            links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-4 py-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition"
              >
                <Image
                  src={`/${link.icon}.svg`}
                  alt={`${link.label} icon`}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="font-medium text-sm sm:text-base">
                  {link.label}
                </span>
              </a>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
