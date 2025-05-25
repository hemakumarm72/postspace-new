/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Client, GatewayIntentBits, TextChannel } from 'discord.js'

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
})

let isConnected = false

const connectDiscordClient = async () => {
  if (!isConnected) {
    await client.login(process.env.DISCORD_TOKEN as string) // Login bot using token
    console.log('Discord connected...')
    return new Promise((resolve, reject) => {
      client.once('ready', () => {
        // console.log('Discord client is ready.');
        isConnected = true
        resolve('Discord client is ready.')
      })
    })
  }
}

client.once('ready', () => {
  console.log('Discord client is ready.')
})

client.on('error', (error) => {
  console.error('Discord client encountered an error:', error)
  isConnected = false
})

export const discordMessage = async (channelId: string, message: string) => {
  try {
    await connectDiscordClient()
    return new Promise((resolve, reject) => {
      const channel = client.channels.cache.get(channelId) as TextChannel
      if (channel) {
        channel
          .send(message)
          .then(() => resolve('Discord message sent'))
          .catch((error) => {
            console.error('Failed to send message:', error)
            reject('Failed to send message')
          })
      } else {
        console.log('Channel not found')
        reject('Channel not found')
      }
    })
  } catch (error) {
    console.error('Error sending Discord message:', error)
    throw new Error('Error sending Discord message')
  }
}
