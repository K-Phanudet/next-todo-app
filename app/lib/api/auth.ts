import Cookies from 'js-cookie'

interface Credentials {
    username: string;
    password: string;
}

interface ErrorResponse {
    message: string;
    error?: string;
}

interface LoginResponse {
    username?: string
    isSuccess: boolean
}

export async function login(credentials: Credentials): Promise<LoginResponse> {
    const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if (!res.ok) {
        try {
            const errorData: ErrorResponse = await res.json();
            throw {
                message: errorData.message || 'Login failed',
                status: res.status,
                error: errorData.error,
            };
        } catch (parseError) {
            throw {
                message: 'An unexpected error occurred. Please try again.',
                status: res.status,
            };
        }
    }

    return res.json();
}
export const getCookie = (name: string) => {
    return Cookies.get(name) || null;
};

export const isAuthenticated = () => {
    return !!Cookies.get('accessToken');
};

export const logout = async () => {
    return fetch('/api/auth/logout', {
        method: 'POST',
    });
};