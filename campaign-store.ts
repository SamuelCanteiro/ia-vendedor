'use client'

import useSWR, { mutate } from 'swr'
import type { GeneratedCampaign } from '@/lib/campaigns/types'

const STORAGE_KEY = 'ia-vendedor:campaigns'

// Temporary browser-session persistence. Replace these functions with API/database calls later.
function readAll(): Record<string, GeneratedCampaign> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

export const campaignStore = {
  async get(id: string): Promise<GeneratedCampaign | null> {
    return readAll()[id] ?? null
  },
  async save(campaign: GeneratedCampaign) {
    const all = readAll()
    all[campaign.id] = campaign
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    await mutate(['campaign', campaign.id], campaign, { revalidate: false })
  },
}

export function useCampaign(id: string) {
  return useSWR(['campaign', id], ([, campaignId]) => campaignStore.get(campaignId), {
    revalidateOnFocus: false,
  })
}
