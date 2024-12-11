import type { User } from '../types/user';
import type { Reference } from '../types/reference';

// Mock users with passwords (in a real app, passwords would be hashed)
export const mockUsers: User[] = [
  {
    id: "user1",
    email: "sarah.tech@example.com",
    password: "password", // In a real app, this would be hashed
    name: "Sarah Chen",
    firstName: "Sarah",
    lastName: "Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    title: "Senior Software Engineer",
    bio: "Full-stack developer with 8 years of experience building scalable web applications",
    location: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/sarahchen",
    skills: [
      { name: "JavaScript", type: "hard", endorsements: 15 },
      { name: "React", type: "hard", endorsements: 12 },
      { name: "Node.js", type: "hard", endorsements: 10 },
      { name: "Leadership", type: "soft", endorsements: 8 },
      { name: "Problem Solving", type: "soft", endorsements: 7 }
    ],
    availability: {
      status: 'open',
      isAvailable: true,
      positionsInterestedIn: ['Tech Lead', 'Engineering Manager'],
      workStyles: ['hybrid', 'remote']
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "user2",
    email: "michael.product@example.com",
    password: "password", // In a real app, this would be hashed
    name: "Michael Rodriguez",
    firstName: "Michael",
    lastName: "Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    title: "Product Manager",
    bio: "Product leader focused on building user-centric solutions that drive business growth",
    location: "New York, NY",
    linkedin: "https://linkedin.com/in/mrodriguez",
    skills: [
      { name: "Product Strategy", type: "hard", endorsements: 20 },
      { name: "Agile", type: "hard", endorsements: 18 },
      { name: "User Research", type: "hard", endorsements: 15 },
      { name: "Communication", type: "soft", endorsements: 12 },
      { name: "Team Leadership", type: "soft", endorsements: 10 }
    ],
    availability: {
      status: 'not-looking',
      isAvailable: false
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock data store
class MockDataStore {
  private users: Map<string, User>;
  private references: Map<string, Reference>;

  constructor() {
    this.users = new Map(mockUsers.map(user => [user.id, user]));
    this.references = new Map();
  }

  getUserByEmailAndPassword(email: string, password: string): User | null {
    const user = Array.from(this.users.values()).find(user => 
      user.email === email && user.password === password
    );
    
    if (user) {
      // Don't return the password in the response
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  getUser(id: string): User | null {
    const user = this.users.get(id);
    if (user) {
      // Don't return the password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  getUserReferences(userId: string): Reference[] {
    return Array.from(this.references.values())
      .filter(ref => ref.recipient.id === userId);
  }

  createReference(data: Omit<Reference, 'id' | 'createdAt' | 'updatedAt'>): string {
    const id = `ref_${Date.now()}`;
    const reference: Reference = {
      id,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.references.set(id, reference);
    return id;
  }

  updateReferenceStatus(id: string, status: 'approved' | 'rejected'): void {
    const reference = this.references.get(id);
    if (reference) {
      this.references.set(id, {
        ...reference,
        status,
        updatedAt: new Date().toISOString()
      });
    }
  }
}

export const mockStore = new MockDataStore();