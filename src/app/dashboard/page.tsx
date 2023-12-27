import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Dashboard from '@/components/Dashboard';
import { db } from '@/services/db';
import { redirect } from 'next/navigation';

const Page = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) redirect('/api/auth/register?origin=dashboard');

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id
        }
    });

    if (!dbUser) redirect('/auth-callback?origin=dashboard');

    return <Dashboard />;
};

export default Page;
