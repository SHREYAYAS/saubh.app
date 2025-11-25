// app/get-started/page.tsx

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Welcome to SaubhApp
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            You're moments away from boosting your productivity. Create an account or explore the features below.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#features"
              className="rounded-lg bg-white px-6 py-3 text-indigo-600 font-semibold border border-indigo-600 hover:bg-indigo-50 transition"
            >
              Explore Features
            </a>
            <a
              href="#"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
