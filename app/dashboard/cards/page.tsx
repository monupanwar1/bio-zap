import { getUserCard } from '@/actions/actions';
import UserCard from '@/components/userCard';

export default async function AllCardsPage() {
  const cards = await getUserCard();

  return (
    <div className="max-w-6xl mx-auto  justify-center px-4 items-center flex flex-col `">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Cards</h1>

      {cards.length === 0 ? (
        <p className="text-muted-foreground dark:text-gray-300 text-xl">You have no cards yet.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {cards.map((card) => (
            <UserCard
              key={card.id}
              avatarUrl={card.avatarUrl}
              title={card.title}
              links={card.links}
            />
          ))}
        </div>
      )}
    </div>
  );
}
