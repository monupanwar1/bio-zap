
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaGlobe,
  FaTrashAlt,
  FaPlus,
  FaUserCircle,
} from 'react-icons/fa';
import { editCard, getCardBySlug } from '@/actions/actions'; // Ensure these exist
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const socialIcons = [
  { value: 'github', label: 'GitHub', icon: FaGithub },
  { value: 'twitter', label: 'Twitter', icon: FaTwitter },
  { value: 'linkedin', label: 'LinkedIn', icon: FaLinkedin },
  { value: 'website', label: 'Website', icon: FaGlobe },
];

const linkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  icon: z.string().min(1),
});

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  links: z.array(linkSchema).min(1, 'At least one link required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditCardPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      links: [{ label: '', url: '', icon: 'github' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'links',
  });

  useEffect(() => {
    const fetchData = async () => {
      const card = await getCardBySlug(params.slug); // ✅ implement this in your backend
      if (!card) {
        alert('Card not found');
        router.push('/dashboard/cards');
        return;
      }

      setAvatar(card.avatarUrl);
      form.reset({
        title: card.title,
        links: card.links,
      });
      setLoading(false);
    };

    fetchData();
  }, [params.slug]);

  const onSubmit = async (data: FormValues) => {
    if (!avatar) {
      alert('Avatar is required');
      return;
    }

    const success = await editCard(params.slug, avatar, data.links, data.title);
    if (success) {
      router.push('/dashboard/cards');
    } else {
      alert('Failed to update card');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl mx-auto p-6 border rounded-lg shadow-md bg-gray-100 dark:bg-zinc-800"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center space-y-2">
          {avatar ? (
            <Image
              src={avatar}
              alt="Avatar"
              width={96}
              height={96}
              unoptimized
              className="rounded-full object-cover w-24 h-24 border shadow-md"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400 dark:text-gray-600" />
          )}

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const previewUrl = URL.createObjectURL(file);
                setAvatar(previewUrl);
              }
            }}
            className="w-full max-w-xs"
          />
        </div>

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter card title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Links */}
        {fields.map((field, index) => {
          const Icon =
            socialIcons.find(
              (icon) => icon.value === form.watch(`links.${index}.icon`),
            )?.icon || FaGlobe;

          return (
            <div
              key={field.id}
              className="bg-white dark:bg-zinc-900 p-4 rounded-md border relative space-y-4"
            >
              {fields.length > 1 && (
                <button
                  type="button"
                  className="absolute top-2 right-2 text-red-500"
                  onClick={() => remove(index)}
                >
                  <FaTrashAlt size={18} />
                </button>
              )}

              <div className="flex items-center space-x-2">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Icon size={20} />
                </div>
                <span className="text-sm text-gray-500">
                  Social Icon Preview
                </span>
              </div>

              <FormField
                control={form.control}
                name={`links.${index}.label`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. GitHub" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`links.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/yourname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`links.${index}.icon`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border p-2 rounded">
                        {socialIcons.map((icon) => (
                          <option key={icon.value} value={icon.value}>
                            {icon.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          );
        })}

        {/* Add Link */}
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ label: '', url: '', icon: 'github' })}
        >
          <FaPlus className="mr-2" size={16} />
          Add Another Link
        </Button>

        {/* Submit */}
        <div>
          <Button type="submit">Update Card</Button>
        </div>
      </form>
    </Form>
  );
}
