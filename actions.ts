'use server'

import { createCampaign } from '@/lib/campaigns/create-campaign'
import type { CampaignInput, GenerateCampaignResult } from '@/lib/campaigns/types'

export async function generateCampaign(input: CampaignInput): Promise<GenerateCampaignResult> {
  // Simulated AI latency for the demo; remove once a real generator is connected.
  await new Promise((resolve) => setTimeout(resolve, 1800))
  return createCampaign(input)
}
