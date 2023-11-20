import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
    const cookieStore = cookies();
    const token = cookieStore.get('access_token');

    if (token) {
        redirect('/note');
    } else {
        redirect('/login');
    }
}
