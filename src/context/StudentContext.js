import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { loadStudents, saveStudents } from '../storage/studentStorage';

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents()
      .then(setStudents)
      .finally(() => setLoading(false));
  }, []);

  const persist = useCallback(async (next) => {
    setStudents(next);
    await saveStudents(next);
  }, []);

  // CREATE
  const addStudent = useCallback(
    (data) => {
      const item = { id: Date.now().toString(), ...data };
      return persist([item, ...students]);
    },
    [students, persist]
  );

  // UPDATE
  const updateStudent = useCallback(
    (id, data) => persist(students.map((s) => (s.id === id ? { ...s, ...data } : s))),
    [students, persist]
  );

  // DELETE
  const deleteStudent = useCallback(
    (id) => persist(students.filter((s) => s.id !== id)),
    [students, persist]
  );

  const getStudent = useCallback((id) => students.find((s) => s.id === id), [students]);

  return (
    <StudentContext.Provider
      value={{ students, loading, addStudent, updateStudent, deleteStudent, getStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export const useStudents = () => useContext(StudentContext);
