export type PrizeTicket = {
  id: string;
  prizeName: string;
  createdAt: number;
  redeemed: boolean;
};

const KEY_CREDITS = "pslots:credits";
const KEY_TICKETS = "pslots:tickets";

export function loadCredits(): number {
  const raw = localStorage.getItem(KEY_CREDITS);
  return raw ? Number(raw) : 0;
}

export function saveCredits(v: number) {
  localStorage.setItem(KEY_CREDITS, String(v));
}

export function loadTickets(): PrizeTicket[] {
  const raw = localStorage.getItem(KEY_TICKETS);
  return raw ? (JSON.parse(raw) as PrizeTicket[]) : [];
}

export function saveTickets(t: PrizeTicket[]) {
  localStorage.setItem(KEY_TICKETS, JSON.stringify(t));
}

export function genTicketId(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}
