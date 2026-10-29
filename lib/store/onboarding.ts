import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OnboardingState {
  // Profile
  name: string
  email: string
  mobile: string
  pan: string
  userType: 'investor' | 'rm' | ''
  // Risk
  riskScore: number
  riskProfile: string
  riskAnswers: number[]
  // Mandate
  mandateId: string
  mandateConfirmed: boolean
  // Portfolio
  holdings: any[]
  // Actions
  setProfile: (data: Partial<OnboardingState>) => void
  setRisk: (score: number, profile: string, answers: number[]) => void
  setMandate: (id: string) => void
  confirmMandate: () => void
  setHoldings: (holdings: any[]) => void
  reset: () => void
}

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set) => ({
      name: '', email: '', mobile: '', pan: '', userType: '',
      riskScore: 0, riskProfile: '', riskAnswers: [],
      mandateId: '', mandateConfirmed: false,
      holdings: [],
      setProfile: (data) => set((s) => ({ ...s, ...data })),
      setRisk: (score, profile, answers) => set({ riskScore: score, riskProfile: profile, riskAnswers: answers }),
      setMandate: (id) => set({ mandateId: id }),
      confirmMandate: () => set({ mandateConfirmed: true }),
      setHoldings: (holdings) => set({ holdings }),
      reset: () => set({ name: '', email: '', mobile: '', pan: '', userType: '', riskScore: 0, riskProfile: '', riskAnswers: [], mandateId: '', mandateConfirmed: false, holdings: [] }),
    }),
    {
      name: 'wm-onboarding',
      // R-23: persist only non-sensitive flow state. Name, email, mobile, PAN, holdings and
      // risk answers stay in memory and are never written to localStorage.
      partialize: (state) => ({
        userType: state.userType,
        riskScore: state.riskScore,
        riskProfile: state.riskProfile,
        mandateId: state.mandateId,
        mandateConfirmed: state.mandateConfirmed,
      }),
    }
  )
)
