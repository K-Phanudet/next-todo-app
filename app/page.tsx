import React from 'react';
import Link from 'next/link';
import './globals.css';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  bg-linear-to-bl from-violet-500 to-fuchsia-500">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-radial-[at_25%_25%] from-gray-50 to-gray-200">
          Effortless Task Management
        </h1>
        <p className="text-lg text-white mb-10">
          Organize your daily tasks and boost your productivity with our intuitive Todo app.
        </p>
        <div className="flex justify-center space-x-6">
          <Link href="/login" className="bg-linear-65 from-sky-500 to-indigo-500 hover:bg-linear-65 hover:from-indigo-500 hover:to-sky-500 text-white font-semibold py-4 px-8 rounded-full transition duration-300">
            Login
          </Link>
          <Link href="/register" className="bg-linear-65 from-purple-500 to-pink-500 hover:bg-linear-65 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-4 px-8 rounded-full transition duration-300">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;