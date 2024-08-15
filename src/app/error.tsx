'use client'; // Error boundaries must be Client Components

import Logo from '@/common/compoment/Logo';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="text-center">
                <div>
                    <Logo
                        height={100}
                        width={100}
                        color='#ed1111'
                    />
                </div>
                <h2 className="mt-4 text-white text-4xl font-bold">Something went wrong!</h2>
                <div className='flex space-x-3'>
                    <button
                        onClick={() => reset()}
                        className="mt-4 px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-300"
                    >
                        Try again
                    </button>
                    <Link href="/document">
                        <button
                            className="mt-4 px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-300"
                        >
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
