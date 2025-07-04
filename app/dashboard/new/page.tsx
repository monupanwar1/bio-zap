'use client';

import { addCard } from '@/actions/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaGlobe,
  FaUserCircle,
  FaTrashAlt,
  FaPlus,
} from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

const socialIcons = [
  { value: 'github', label: 'GitHub', icon: FaGithub },
  { value: 'twitter', label: 'Twitter', icon: FaTwitter },
  { value: 'linkedin', label: 'LinkedIn', icon: FaLinkedin },
  { value: 'website', label: 'Website', icon: FaGlobe },
];

const linkSchema = z.object({
  label: z.string().min(1, 'Label required'),
  url: z.string().url('Invalid URL'),
  icon: z.string().min(1, 'Choose an icon'),
});

const formSchema = z.object({
  title: z.string().min(1, 'Card title is required'),
  links: z.array(linkSchema).min(1, 'At least one link'),
});

type FormValues = z.infer<typeof formSchema>;

export default function MultiLinkForm() {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: 'Card',
      links: [{ label: '', url: '', icon: 'github' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'links',
  });

  const onSubmit = async (data: FormValues) => {
    if (!avatar) return alert('Avatar required');

    try {
      const res = await addCard(avatar, data.links);
      form.reset();
      setAvatar(null);
      if (res?.slug) {
        router.push(`/${res.slug}`);
      }
    } catch (err) {
      console.log('Failed ', err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl mx-auto p-6 border rounded-lg shadow-md 
                   bg-gray-100 dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 
                   transition-colors duration-300"
      >
        {/* Avatar Upload */}
        <div className="flex flex-col items-center space-y-2">
          {avatar ? (
            <Image
              src={avatar}
              alt="Avatar Preview"
              width={96}
              height={96}
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
                setAvatar(URL.createObjectURL(file));
              }
            }}
            className="w-full max-w-xs bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700"
          />
        </div>

        {/* Link Fields */}
        {fields.map((field, index) => {
          const IconComponent =
            socialIcons.find(
              (icon) => icon.value === form.watch(`links.${index}.icon`),
            )?.icon || FaGlobe;

          return (
            <div
              key={field.id}
              className="border p-4 rounded-md space-y-4 bg-white dark:bg-zinc-900 
                         border-gray-300 dark:border-zinc-700 relative transition-colors duration-300 shadow-sm"
            >
              {fields.length > 1 && (
                <button
                  type="button"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
                  onClick={() => remove(index)}
                >
                  <FaTrashAlt size={18} />
                </button>
              )}

              <div className="flex items-center space-x-2">
                <div
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-800 
                                flex items-center justify-center border border-gray-300 dark:border-zinc-700"
                >
                  <IconComponent
                    size={20}
                    className="text-gray-700 dark:text-gray-300"
                  />
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Social Icon Preview
                </span>
              </div>

              {/* Label */}
              <FormField
                control={form.control}
                name={`links.${index}.label`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">Label</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="GitHub"
                        {...field}
                        className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* URL */}
              <FormField
                control={form.control}
                name={`links.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/yourname"
                        {...field}
                        className="bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Icon Select */}
              <FormField
                control={form.control}
                name={`links.${index}.icon`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-white">
                      Select Icon
                    </FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="mt-1 block w-full border p-2 rounded bg-white dark:bg-zinc-800 
                                   text-gray-900 dark:text-white border-gray-300 dark:border-zinc-600"
                      >
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

        {/* Add Link Button */}
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ label: '', url: '', icon: 'github' })}
          className="dark:border-gray-600 dark:text-white"
        >
          <FaPlus className="mr-2" size={16} />
          Add Another Link
        </Button>

        {/* Submit Button */}
        <div>
          <Button type="submit" className="dark:bg-white dark:text-black">
            Save Links
          </Button>
        </div>
      </form>
    </Form>
  );
}
