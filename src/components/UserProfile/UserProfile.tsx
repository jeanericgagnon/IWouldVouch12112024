import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BasicInfo } from './sections/BasicInfo';
import { Skills } from './sections/Skills';
import { Portfolio } from './sections/Portfolio';
import { References } from './sections/References';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfile } from '../../hooks/useUser';
import { mockUsers } from '../../data/mockData';

export function UserProfile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const {
    user,
    loading,
    error,
    updateUser,
  } = useUserProfile(mockUsers[0]);

  const isOwner = currentUser?.id === user?.id;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">
          {error || 'Profile not found'}
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <BasicInfo 
            user={user} 
            isOwner={isOwner} 
            onEditProfile={() => {}} 
          />
          <Skills skills={user.skills} />
          <Portfolio 
            items={user.portfolioItems || []} 
            isOwner={isOwner}
          />
          <References 
            references={user.referencesReceived || []}
            pendingReferences={user.pendingReferences || []}
            isOwner={isOwner}
          />
        </div>
      </main>
    </div>
  );
}