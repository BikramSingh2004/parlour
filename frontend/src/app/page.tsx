"use client";

export default function HomePage() {
  const dummyImages = [
    "https://plus.unsplash.com/premium_photo-1664048713210-9db5ee2a7e08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFybG91cnxlbnwwfHwwfHx8MA%3D%3D/300x200?text=Image+1",
    "https://images.unsplash.com/photo-1669845187353-7615a1bdca8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRhdG9vJTIwcGFybG91cnxlbnwwfHwwfHx8MA%3D%3D/300x200?text=Image+2",

    "https://plus.unsplash.com/premium_photo-1661681652909-e47f21d3eabc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hc3NhZ2UlMjBwYXJsb3VyfGVufDB8fDB8fHww/300x200?text=Image+3",

    "https://plus.unsplash.com/premium_photo-1669675935372-d76b0b8808df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFybG91cnxlbnwwfHwwfHx8MA%3D%3D/300x200?text=Image+4",

    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFybG91cnxlbnwwfHwwfHx8MA%3D%3D/300x200?text=Image+5",
    "https://images.unsplash.com/photo-1660301097350-f4bea023e246?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFybG91cnxlbnwwfHwwfHx8MA%3D%3D/300x200?text=Image+6",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Parlour Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {dummyImages.map((src, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow-lg border border-gray-700 bg-gray-800"
          >
            <img
              src={src}
              alt={`Image ${i + 1}`}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
