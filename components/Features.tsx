type Feature = {
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    title: 'Random Redirect',
    description: 'Send user to a new link every time',
  },
  {
    title: 'Perfect for bio',
    description: 'Clean simple work for all socai links',
  },
  { title: 'Manage with ease', description: 'Add or remove link in second' },
];
export default function Features() {
  return (
    <section className="grid gap-8 md:grid:col-3 mt-16 ">
      {features.map((feature, index) => (
        <div
          key={index}
          className="border border-white/40 backdrop-blur-2xl bg-white/40 shadow p-8 hover:bg-gray-50 scale-0.25 transition"
        >
          <h3 className="text-xl font-semibold bm-2 ">{feature.title}</h3>
          <p className="text-gray-700">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}
