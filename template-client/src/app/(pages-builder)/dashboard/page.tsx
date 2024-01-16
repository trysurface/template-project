'use client'
import React from 'react';
import { SignedIn, SignedOut, SignOutButton, useAuth } from '@clerk/nextjs';
import { axiosInstance } from '~/services/axios';

function DashboardPage() {
  const { getToken } = useAuth();
  const handleClick = async ()=> {
    const token = await getToken();
    console.log("token",token);
    const res = await axiosInstance.get('/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
  }
  return (
    <div>
      <div> Hello</div>
      <SignedIn>
        <div>
          You are signed in
        </div>
        <div>
          <button onClick={handleClick}>Check Api Auth</button>
        </div>
        <SignOutButton/>
      </SignedIn>

      <SignedOut>
        You are signed out
      </SignedOut>
    </div>
  );
}

export default DashboardPage;