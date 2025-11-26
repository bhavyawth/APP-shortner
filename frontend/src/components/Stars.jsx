export default function Stars() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-black"></div>

      {/* Static stars */}
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/3k2vC0T/stars.png')] opacity-40"></div>

      {/* Falling meteors */}
      {[...Array(20)].map((_, i) => (
        <span
          key={i}
          className="meteor"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animationDelay: Math.random() * 5 + "s",
          }}
        ></span>
      ))}
    </div>
  );
}
