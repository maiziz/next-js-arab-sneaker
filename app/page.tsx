import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex min-h-screen flex-col items-center justify-center p-24 flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] bg-gradient-to-r from-indigo-900 to-indigo-700 text-white">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center justify-center text-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                أحذية رياضية فاخرة
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                اكتشف مجموعتنا الحصرية من الأحذية الرياضية
              </p>
              <a
                href="/products"
                className="inline-block bg-white text-indigo-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors"
              >
                تسوق الآن
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Fast Delivery */}
              <div className="bg-white p-6 rounded-lg shadow-sm hover:-translate-y-1 transition-transform duration-200">
                <div className="text-indigo-900 mb-4">
                  <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">توصيل سريع</h3>
                <p className="text-gray-600 text-center">توصيل إلى جميع ولايات الوطن</p>
              </div>

              {/* Secure Payment */}
              <div className="bg-white p-6 rounded-lg shadow-sm hover:-translate-y-1 transition-transform duration-200">
                <div className="text-indigo-900 mb-4">
                  <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">دفع آمن</h3>
                <p className="text-gray-600 text-center">طرق دفع متعددة وآمنة</p>
              </div>

              {/* Customer Support */}
              <div className="bg-white p-6 rounded-lg shadow-sm hover:-translate-y-1 transition-transform duration-200">
                <div className="text-indigo-900 mb-4">
                  <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">دعم متواصل</h3>
                <p className="text-gray-600 text-center">فريق دعم متواجد على مدار الساعة</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
