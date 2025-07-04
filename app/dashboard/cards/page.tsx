"use client"
import { getUserCard, removeUserCard } from '@/actions/actions';
import UserCard from '@/components/userCard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AllCardsPage() {
  const router = useRouter();
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    const fetchCard = async () => {
      const result = await getUserCard();
      setCards(result);
    };
    fetchCard();
  }, []);

  const handleRemoveCard = async (id: number) => {
    await removeUserCard(id);
    const result = await getUserCard();
    setCards(result);
    router.refresh();
  };

  return (
    <div className="max-w-6xl mx-auto  justify-center px-4 items-center flex flex-col `">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Cards</h1>

      {cards.length === 0 ? (
        <p className="text-muted-foreground dark:text-gray-300 text-xl">
          You have no cards yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <UserCard
              key={card.id}
              avatarUrl={card.avatarUrl}
              title={card.title}
              links={card.links}
              canDelete
              onDelete={() => handleRemoveCard(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
