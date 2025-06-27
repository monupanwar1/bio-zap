import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

type Link = {
  label: string;
  url: string;
  icon: string; // e.g. "github", "linkedin", "x", "website"
};

type CardPreviewProps = {
  avatarUrl: string;
  title: string;
  links: Link[];
};

export default function CardPreview({
  avatarUrl,
  title,
  links,
}: CardPreviewProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-14">
      <Card className="w-full md:max-w-2xl shadow-xl border border-border rounded-md h-[600px]">
        {/* Avatar and Title */}
        <CardHeader className="flex flex-col items-center gap-4">
          <Image
            src={avatarUrl}
            width={96}
            height={96}
            alt="Avatar"
            className="rounded-full object-cover border"
          />
          <h1 className="text-xl font-bold">{title}</h1>
        </CardHeader>

        {/* Link List */}
        <CardContent className="flex flex-col gap-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-8 px-4 py-2 border rounded-md hover:bg-accent transition text-foreground"
            >
              <Image
                src={`/${link.icon}.svg`}
                alt={`${link.label} icon`}
                width={20}
                height={20}
                className="object-contain"
              />
              <span className="font-medium">{link.label}</span>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
