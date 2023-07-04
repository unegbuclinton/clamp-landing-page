export const campaigns: Array<{
  title: string;
  opt: number;
  customers: number;
  points: number;
  value: number;
  status: boolean;
  badge: string;
}> = [
  {
    badge: "tier-one",
    title: "1 point for every N1 spent",
    opt: 250,
    customers: 20,
    points: 50,
    value: 250000,
    status: true,
  },
  {
    badge: "tier-two",
    title: "1 point for every N1 spent",
    opt: 250,
    customers: 20,
    points: 50,
    value: 250000,
    status: true,
  },
  {
    badge: "tier-two",
    title: "8 point for every N20 spent",
    opt: 50,
    customers: 120,
    points: 10,
    value: 250000,
    status: true,
  },
  {
    badge: "tier-one",
    title: "5 point for every N2 spent",
    opt: 550,
    customers: 40,
    points: 50,
    value: 100000,
    status: true,
  },
  {
    badge: "tier-one",
    title: "1 point for every N1 spent",
    opt: 250,
    customers: 20,
    points: 50,
    value: 250000,
    status: true,
  },
];
