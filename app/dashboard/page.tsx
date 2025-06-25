import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="flex flex-col items-center text-center  p-40 ">
      <section className=" ">
        <div className="flex flex-col space-y-2">
          <h1 className="font-bold lg:text-6xl text-5xl  mb-4 z-10 ">
            WeclomeBack
          </h1>
          <p className=" text-xl z-10 text-gray-700 ">
            Manage your bio card with ease here
          </p>
        </div>
      </section>
      {/* navigationCard
       */}
      <section className="grid  md:grid-cols-2 gap-6 p-4 mt-10 ">
        <Link href="/dashboard/new">
          <div className="p-12 sm:p-14 md:p-24 bg-blue-50 hover:bg-blue-100 border border-blue-200 cursor-pointer transition rounded-md text-nowrap">
            <h1 className="text-2xl font-bold mb-1">Add new Card</h1>
            <p className="text-lg text-gray-800">
              Add a new Card with your links
            </p>
          </div>
        </Link>
        <Link href="/dashboard/cards">
          <div className=" p-12 md:p-24 sm:p-14 bg-purple-50 hover:bg-purple-100 border border-purple-200 cursor-pointer transition rounded-md text-nowrap">
            <h1 className="text-2xl font-bold  mb-1">View My cards</h1>
            <p className="text-lg text-gray-800">
              Edit or delete your existing card
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}
