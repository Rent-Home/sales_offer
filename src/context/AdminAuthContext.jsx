import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkAdmin() {
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setAdmin(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
  .from("admin_users")
  .select("*")
  .eq("id", session.user.id)
  .maybeSingle();

    if (error || !data) {
      setAdmin(null);
    } else {
      setAdmin(data);
    }

    setLoading(false);
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}