import axios from 'axios'

const POLLING_INTERVAL = 3000

export async function pollToTriggerStatusUpdate({
  n = 10,
  t = 100000,
}: {
  n: number
  t: number
}): Promise<void> {
  const url = 'http://localhost:8080/clamp-api/gamification/games/periodic-updates'
  let timeLeft = t
  await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL))
  await axios.post(url)
  console.log(`Polling for status update. ${n} polls left. ${timeLeft}ms left\n`)
  timeLeft -= POLLING_INTERVAL
  if (n > 1 && timeLeft > 1000) {
    await pollToTriggerStatusUpdate({ n: n - 1, t: timeLeft })
  }
}
