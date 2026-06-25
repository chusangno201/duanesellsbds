import { useEffect } from "react";

export default function Stats() {

  useEffect(() => {
  const counters = document.querySelectorAll(".counter");
 

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let current = 0;

    const updateCount = () => {
      // tăng ngẫu nhiên 1–5
      const randomIncrease = Math.floor(Math.random() * 5) + 1;

      current += randomIncrease;

      if (current >= target) {
        counter.innerText = target.toLocaleString() + "+";
        return;
      }

      counter.innerText = current.toLocaleString();

      // thời gian ngẫu nhiên 300ms – 1200ms
      const randomDelay = Math.random() * 900 + 300;

      setTimeout(updateCount, randomDelay);
    };

    updateCount();
  });
}, []);

  return (
    <section className="stats">
      <div className="stat-item">
        <h3 className="counter" data-target="1250">0</h3>
        <p>Luxury Listings</p>
      </div>

      <div className="stat-item">
        <h3 className="counter" data-target="300">0</h3>
        <p>Trusted Agents</p>
      </div>

      <div className="stat-item">
        <h3 className="counter1" data-target="2000">1.322+</h3>
        <p>Homes Sold</p>
        
      </div>
       <div className="stat-item">
        <h3 className="counter" data-target="21000">0</h3>
        <p>Subscriber </p>
      </div>
    </section>
  );
}