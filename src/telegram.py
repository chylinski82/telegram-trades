from telethon import TelegramClient
import asyncio

api_id = 21768067
api_hash = '9890b997331993aab850a1668b7d09c7'
phone_number = '+447552445193'
channel_id = -1225548123

client = TelegramClient('session_name', api_id, api_hash)

client.start(phone_number)

# Fetch the last 10 messages from the channel
async def main():
    messages = await client.get_messages(channel_id, limit=10)
    for message in messages:
        print(message.message)

asyncio.run(main())
