export const RISK_QUESTIONS = [
  { id: 1, question: 'What is your primary investment goal?', options: [
    { text: 'Protect my money — safety first', score: 1 },
    { text: 'Steady income with some growth', score: 2 },
    { text: 'Balance growth and stability', score: 3 },
    { text: 'Grow wealth, comfortable with some dips', score: 4 },
    { text: 'Maximum growth, comfortable with risk', score: 5 },
  ]},
  { id: 2, question: 'If your portfolio dropped 20% in a month, what would you do?', options: [
    { text: 'Sell everything immediately', score: 1 },
    { text: 'Sell some to reduce exposure', score: 2 },
    { text: 'Hold and wait for recovery', score: 3 },
    { text: 'Hold and maybe invest a little more', score: 4 },
    { text: 'Invest significantly more — great opportunity', score: 5 },
  ]},
  { id: 3, question: 'How long can you stay invested without needing the money?', options: [
    { text: 'Less than 1 year', score: 1 },
    { text: '1–3 years', score: 2 },
    { text: '3–5 years', score: 3 },
    { text: '5–10 years', score: 4 },
    { text: 'More than 10 years', score: 5 },
  ]},
  { id: 4, question: 'What percentage of your monthly income do you invest?', options: [
    { text: 'Less than 5%', score: 1 },
    { text: '5–10%', score: 2 },
    { text: '10–20%', score: 3 },
    { text: '20–30%', score: 4 },
    { text: 'More than 30%', score: 5 },
  ]},
  { id: 5, question: 'Which best describes your investment experience?', options: [
    { text: 'No experience — completely new to investing', score: 1 },
    { text: 'Some experience — only FDs and savings', score: 2 },
    { text: 'Moderate — invested in mutual funds before', score: 3 },
    { text: 'Experienced — equity MFs and some stocks', score: 4 },
    { text: 'Advanced — active investor across asset classes', score: 5 },
  ]},
  { id: 6, question: 'How stable is your monthly income?', options: [
    { text: 'Very uncertain — freelance or variable income', score: 1 },
    { text: 'Somewhat uncertain — business income', score: 2 },
    { text: 'Mostly stable — salaried with some variable', score: 3 },
    { text: 'Stable — fixed salaried job', score: 4 },
    { text: 'Very stable — government / PSU / senior professional', score: 5 },
  ]},
  { id: 7, question: 'What is your age group?', options: [
    { text: 'Above 55', score: 1 },
    { text: '46–55', score: 2 },
    { text: '36–45', score: 3 },
    { text: '26–35', score: 4 },
    { text: '18–25', score: 5 },
  ]},
]

export const MANDATES = [
  {
    id: 'conservative', label: 'Conservative', score_min: 7, score_max: 14,
    color: '#991B1B', bg: '#FEF3F2', border: '#FCA5A5',
    equity_target: 30, debt_target: 60, gold_target: 10,
    equity_min: 20, equity_max: 40,
    allowed: ['Liquid', 'Overnight', 'Ultra Short Duration', 'Short Duration', 'Money Market', 'Conservative Hybrid'],
    avoid: ['Small Cap', 'Mid Cap', 'Sectoral', 'Thematic'],
    max_single_fund: 15,
    description: 'Capital protection with stable returns. Focused on debt and liquid instruments with minimal equity.',
  },
  {
    id: 'moderate', label: 'Moderate', score_min: 15, score_max: 21,
    color: '#92400E', bg: '#FFFBEB', border: '#FCD34D',
    equity_target: 55, debt_target: 35, gold_target: 10,
    equity_min: 45, equity_max: 65,
    allowed: ['Large Cap', 'Balanced Advantage', 'Aggressive Hybrid', 'ELSS', 'Short Duration', 'Corporate Bond'],
    avoid: ['Small Cap', 'Sectoral', 'Thematic'],
    max_single_fund: 20,
    description: 'Balanced growth with stability. Mix of large cap equity and quality debt for steady compounding.',
  },
  {
    id: 'moderate_aggressive', label: 'Moderate Aggressive', score_min: 22, score_max: 28,
    color: '#27500A', bg: '#EAF3DE', border: '#97C459',
    equity_target: 75, debt_target: 20, gold_target: 5,
    equity_min: 65, equity_max: 85,
    allowed: ['Flexicap', 'Large & Midcap', 'ELSS', 'Midcap', 'Large Cap', 'Balanced Advantage'],
    avoid: ['Sectoral only', 'Thematic speculative'],
    max_single_fund: 25,
    description: 'Growth-oriented with equity focus. Diversified across large and mid cap for long-term wealth creation.',
  },
  {
    id: 'aggressive', label: 'Aggressive', score_min: 29, score_max: 35,
    color: '#3C3489', bg: '#EEEDFE', border: '#AFA9EC',
    equity_target: 90, debt_target: 5, gold_target: 5,
    equity_min: 80, equity_max: 100,
    allowed: ['Flexicap', 'Midcap', 'Small Cap', 'ELSS', 'Large & Midcap', 'Sectoral', 'Thematic'],
    avoid: ['Liquid only', 'Pure debt'],
    max_single_fund: 30,
    description: 'Maximum growth with high equity concentration. For long horizon investors comfortable with volatility.',
  },
]

export function getMandateByScore(score: number) {
  return MANDATES.find(m => score >= m.score_min && score <= m.score_max) ?? MANDATES[2]
}
