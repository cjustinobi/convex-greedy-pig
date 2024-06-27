'use client'
import { ReactNode } from 'react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient((process.env.NEXT_PUBLIC_CONVEX_URL!) as string)

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode
}) {
  // return <ConvexProvider client={convex}>{children}</ConvexProvider>

 return (
   <ClerkProvider publishableKey="pk_test_d29uZHJvdXMtZ29iYmxlci0zNC5jbGVyay5hY2NvdW50cy5kZXYk">
     <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
       {children}
     </ConvexProviderWithClerk>
   </ClerkProvider>
 );
}
