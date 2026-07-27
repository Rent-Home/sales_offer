import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

const BusinessAuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Listen for login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    loading,
  };

  return (
    <BusinessAuthContext.Provider value={value}>
      {children}
   </BusinessAuthContext.Provider>
  );
}

export function useBusinessAuth() {
  return useContext(BusinessAuthContext);
}