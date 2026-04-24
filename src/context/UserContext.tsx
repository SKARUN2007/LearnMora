"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Course } from "@/lib/courses";
import { supabase, fetchUserLibrary, syncCourseStatus } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface UserContextType {
  user: User | null;
  library: { [id: string]: "interested" | "in-progress" | "completed" };
  comparisonList: Course[];
  updateStatus: (id: string, status: "interested" | "in-progress" | "completed") => void;
  addToComparison: (course: Course) => void;
  removeFromComparison: (id: string) => void;
  isFollowing: (type: string, target: string) => boolean;
  toggleFollow: (type: string, target: string) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [library, setLibrary] = useState<{ [id: string]: "interested" | "in-progress" | "completed" }>({});
  const [comparisonList, setComparisonList] = useState<Course[]>([]);
  const [following, setFollowing] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Check for active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      // Sync from Supabase on login
      fetchUserLibrary(user.id).then(data => setLibrary(data));
    } else {
      // Fallback to local
      const saved = localStorage.getItem("learnmora_user");
      if (saved) {
        const data = JSON.parse(saved);
        setLibrary(data.library || {});
        setFollowing(data.following || {});
      }
    }
  }, [user]);

  const updateStatus = async (id: string, status: "interested" | "in-progress" | "completed") => {
    setLibrary(prev => ({ ...prev, [id]: status }));
    if (user) {
      await syncCourseStatus(user.id, id, status);
    } else {
      localStorage.setItem("learnmora_user", JSON.stringify({ library: { ...library, [id]: status }, following }));
    }
  };

  const addToComparison = (course: Course) => {
    if (comparisonList.length < 3 && !comparisonList.find(c => c.id === course.id)) {
      setComparisonList(prev => [...prev, course]);
    }
  };

  const removeFromComparison = (id: string) => {
    setComparisonList(prev => prev.filter(c => c.id !== id));
  };

  const isFollowing = (type: string, target: string) => !!following[`${type}:${target}`];

  const toggleFollow = (type: string, target: string) => {
    const key = `${type}:${target}`;
    setFollowing(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setLibrary({});
  };

  return (
    <UserContext.Provider value={{ 
      user,
      library, 
      comparisonList, 
      updateStatus, 
      addToComparison, 
      removeFromComparison,
      isFollowing,
      toggleFollow,
      signOut
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
