import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useStoreUser } from "@/hooks/useStoreUser";

function App() {
  const { isLoading, isAuthenticated } = useStoreUser();
  return (
    <main>
      {isLoading && <>Loading...</>}
      {!isAuthenticated && <SignInButton />}
      {isAuthenticated && (
        <>
          <UserButton />
          <Content />
        </>
      )}
    </main>
  );
}

function Content() {
  // const messages = useQuery(api.auth.getForCurrentUser);
  return <div>Authenticated content: </div>;
}

export default App;
