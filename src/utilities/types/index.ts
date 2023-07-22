export interface CampaignInterface {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  rules: Rule[];
  status: string;
}

interface Rule {
  id: string;
  asset: Asset;
  trigger: Trigger;
  qty: number;
  conditions: Condition[];
}

interface Asset {
  id: string;
  name: string;
  category: string;
  type: string;
  tags: string[];
  value: string;
  monetaryValue: string;
  currency: string;
  pointValue: string;
  data: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Trigger {
  id: string;
  eventName: string;
  customerId: string;
  payload: {
    product_id: string;
    quantity: number;
  };
}

interface Condition {
  key: string;
  operator: string;
  value: string;
}
