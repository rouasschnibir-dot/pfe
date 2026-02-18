import { createContext, useContext, useState, useCallback } from 'react';

/**
 * Available roles in the BPMS platform.
 * Each role has an id, display label, description, and color.
 */
export const ROLES = [
  {
    id: 'admin',
    label: 'Administrator',
    shortLabel: 'Admin',
    description: 'Full platform access, organization management',
    color: 'from-[#8e55ea] to-[#b38cf5]',
    textColor: 'text-[#8e55ea]',
    bgColor: 'bg-[#8e55ea]/10',
    companyId: 1, // TechCorp International
  },
  {
    id: 'hr',
    label: 'HR Manager',
    shortLabel: 'HR',
    description: 'Human resources workflows and employee management',
    color: 'from-[#2a85ff] to-[#6cb4ff]',
    textColor: 'text-[#2a85ff]',
    bgColor: 'bg-[#2a85ff]/10',
    companyId: 2, // FinServe Global
  },
  {
    id: 'manager',
    label: 'Team Manager',
    shortLabel: 'Manager',
    description: 'Team oversight, approvals, and process monitoring',
    color: 'from-[#ff9a55] to-[#ffbe7b]',
    textColor: 'text-[#ff9a55]',
    bgColor: 'bg-[#ff9a55]/10',
    companyId: 3, // MediCare Plus
  },
  {
    id: 'employee',
    label: 'Employee',
    shortLabel: 'Employee',
    description: 'Task execution, requests, and personal dashboard',
    color: 'from-[#83bf6e] to-[#a8d99a]',
    textColor: 'text-[#83bf6e]',
    bgColor: 'bg-[#83bf6e]/10',
    companyId: 1, // TechCorp International
  },
];

const RoleContext = createContext(undefined);

export function RoleProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bpms-role');
      const found = ROLES.find(r => r.id === stored);
      if (found) return found;
    }
    return ROLES[0]; // Default to admin
  });

  const switchRole = useCallback((roleId) => {
    const role = ROLES.find(r => r.id === roleId);
    if (role) {
      setCurrentRole(role);
      localStorage.setItem('bpms-role', roleId);
    }
  }, []);

  return (
    <RoleContext.Provider value={{ currentRole, switchRole, roles: ROLES }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}
