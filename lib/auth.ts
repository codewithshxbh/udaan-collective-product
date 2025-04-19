import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_dev_only';
// Removed JWT_EXPIRES_IN constant as we're removing token expiry

// Interface for user data
export interface UserData {
  id: number;
  email: string;
  name: string;
  user_type: 'individual' | 'ngo' | 'company';
}

// Function to generate JWT token
export function generateToken(user: UserData): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      user_type: user.user_type
    },
    JWT_SECRET
    // Removed expiresIn option to make tokens never expire
  );
}

// Function to verify JWT token
export function verifyToken(token: string): UserData | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserData;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Function to hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Function to compare password with hash
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Middleware to authenticate requests
export function withAuth(handler: Function) {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      // Extract token from Authorization header or cookies
      const authHeader = req.headers.get('authorization');
      let token;
      
      if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extract token from Authorization header
        token = authHeader.substring(7);
      } else {
        // Try to get from cookies
        const cookieToken = req.cookies.get('token')?.value;
        if (!cookieToken) {
          return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }
        token = cookieToken;
      }

      // Verify token
      const user = verifyToken(token);
      if (!user) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
      }

      // Attach user to request
      (req as any).user = user;

      // Call the original handler
      return handler(req, ...args);
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }
  };
}