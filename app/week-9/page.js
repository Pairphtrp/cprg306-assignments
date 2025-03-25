"use client";
import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleContinue = () => {
    router.push("/week-9/shopping-list");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white">
      {!user ? (
        <>
          <h1 className="text-3xl mb-4">Welcome to the App</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
            onClick={gitHubSignIn}
          >
            Login with GitHub
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl mb-4">Welcome, {user.displayName}!</h1>
          <p className="text-xl mb-6">You are logged in as: {user.email}</p>
          <div className="flex gap-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded"
              onClick={handleContinue}
            >
              Continue to Shopping List
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded"
              onClick={firebaseSignOut}
            >
              Log Out
            </button>
          </div>
        </>
      )}
    </main>
  );
}
