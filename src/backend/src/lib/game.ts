export const winningCriteria: Record<string, string> = {
  h_spend: 'Highest spend',
  h_trxn_vol: 'Highest transaction volume',
  h_trxn_amt: 'Highest transaction amount',
  h_growth_trxn_vol: 'Highest transaction volume growth',
  h_growth_trxn_vol_p: 'Highest transaction volume growth %',
  h_growth_trxn_amt: 'Highest transaction amount growth',
  h_growth_trxn_amt_p: 'Highest transaction amount growth %',
  l_cancel_rate: 'Lowest cancellation rate',
}

export const winningEvalConfig: Record<string, { scoreKey: string; statKey: string }> = {
  h_spend: { scoreKey: 'trxn_amt', statKey: 'trxn_amt' },
  h_trxn_vol: { scoreKey: 'trxn_vol', statKey: 'trxn_vol' },
  h_trxn_amt: { scoreKey: 'trxn_amt', statKey: 'trxn_amt' },
  h_growth_trxn_vol: { scoreKey: 'trxn_vol', statKey: 'trxn_vol' },
  h_growth_trxn_vol_p: { scoreKey: 'trxn_vol', statKey: 'trxn_vol' },
  h_growth_trxn_amt: { scoreKey: 'trxn_amt', statKey: 'absoluteChange' },
  h_growth_trxn_amt_p: { scoreKey: 'trxn_amt', statKey: 'percentChange' },
  l_cancel_rate: { scoreKey: 'cancel_rate', statKey: 'cancel_rate' },
}
