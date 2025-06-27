import CardPreview from "@/components/userCard";


export default function PreviewPage() {
  return (
    <CardPreview
      avatarUrl="/avatar.jpg" 
      title="Monu Panwar"
      links={[
        {
          label: 'GitHub',
          url: 'https://github.com/monupanwar1',
          icon: 'github',
        },
        {
          label: 'LinkedIn',
          url: 'https://linkedin.com/in/monupanwar',
          icon: 'linkedin',
        },
        { label: 'website', url: 'https://monupanwar.dev', icon: 'globe' },
        { label: 'twitter', url: 'https://x.com/monupanwar', icon: 'twitter' },
      ]}
    />
  );
}
