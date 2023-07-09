interface campiagn {
  id: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  rules: Array<{
    id: string;
    asset: {
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
    };
    trigger: {
      id: string;
      eventName: string;
      customerId: string;
      payload: { product_id: string; quantity: number };
    };
    qty: number;
    conditions: Array<{ key: string; operator: string; value: string }>;
  }>;
  status?: string;
}

export const campaigns: campiagn[] = [
  {
    id: "1",
    name: "Campaign 1",
    startDate: "2023-01-01",
    endDate: "2023-01-31",
    rules: [
      {
        id: "1",
        asset: {
          id: "1",
          name: "Asset 1",
          category: "Category 1",
          type: "Type 1",
          tags: ["Tag 1", "Tag 2"],
          value: "Value 1",
          monetaryValue: "100",
          currency: "USD",
          pointValue: "1",
          data: "Data 1",
          status: "Active",
          createdAt: "2023-01-01",
          updatedAt: "2023-01-01",
        },
        trigger: {
          id: "1",
          eventName: "Event 1",
          customerId: "1",
          payload: { product_id: "1", quantity: 1 },
        },
        qty: 10,
        conditions: [
          { key: "Key 1", operator: "==", value: "Value 1" },
          { key: "Key 2", operator: ">=", value: "Value 2" },
        ],
      },
    ],
    status: "Active",
  },
  // Add more campaign objects as needed
];
