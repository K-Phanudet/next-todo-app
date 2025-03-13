interface Credentials {
    username: string;
    password: string;
}
  
interface RegisterResponse {
    isSuccess: boolean;  
}

export async function register(credentials: Credentials): Promise<RegisterResponse> {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Register failed');
    }
    return res.json();
  }