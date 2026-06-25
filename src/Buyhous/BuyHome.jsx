import Header from '../component/Header'
import Footer from '../component/Footer'

const properties = [
  {
    id: 1,
    city: 'Acworth',
    date: 'April 13, 2021',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    city: 'Alpharetta',
    date: 'April 13, 2021',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    city: 'Atlanta',
    date: 'April 13, 2021',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    city: 'Atlantic Station',
    date: 'July 28, 2023',
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    city: 'Brookhaven',
    date: 'July 28, 2023',
    image:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    city: 'Buckhead',
    date: 'July 28, 2023',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 7,
    city: 'Canton',
    date: 'April 13, 2021',
    image:
      'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 8,
    city: 'Cumming',
    date: 'July 28, 2023',
    image:
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 9,
    city: 'Duluth',
    date: 'July 28, 2023',
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 10,
    city: 'Dunwoody',
    date: 'April 13, 2021',
    image:
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 11,
    city: 'Johns Creek',
    date: 'July 28, 2023',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 12,
    city: 'Marietta',
    date: 'July 28, 2023',
    image:
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 13,
    city: 'Roswell',
    date: 'April 13, 2021',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 14,
    city: 'Sandy Springs',
    date: 'July 28, 2023',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 15,
    city: 'Woodstock',
    date: 'April 13, 2021',
    image:
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 16,
    city: 'Sandy Springs',
    date: 'July 28, 2023',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function BuyHome() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <section className="px-0 pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-0">
            {properties.map((property) => (
              <article
                key={property.id}
                className="group border-[3px] border-[#0057b8] bg-[#0057b8]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.city}
                    className="w-full h-[240px] md:h-[280px] xl:h-[300px] object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/10" />

                  <h2 className="absolute inset-x-0 bottom-10 text-center text-white text-3xl md:text-4xl font-serif drop-shadow-md px-4">
                    {property.city}
                  </h2>
                </div>

                <div className="h-[28px] bg-[#0057b8] flex items-center justify-center">
                  <p className="text-[15px] text-[#1f4e8c] font-medium">
                    {property.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
