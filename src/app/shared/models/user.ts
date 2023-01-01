import { Photo } from './photo';

export interface User {
  userName: string;
  token: string;
  email: string;
  knownAs?: string;
  roles: string[];
  berNumber?: string;
  clientNumber?: string;
  photoUrl?: string;

  gender?: string;
  age?: number;
  phoneNumber: string;
  created: Date;
  lastActive: Date;
  city: string;
  country: string;
  gdpr?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];

  // id?: number;
}
