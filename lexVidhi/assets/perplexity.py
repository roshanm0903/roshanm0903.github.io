from openai import OpenAI

YOUR_API_KEY = "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"

messages = [
    {
        "role": "system",
        "content": (
            "You are an artificial intelligence assistant and you need to "
            "engage in a helpful, detailed, polite conversation with a user."
        ),
    },
    {
        "role": "user",
        "content": (
            "How many stars are in the universe?"
        ),
    },
]

client = OpenAI(api_key=YOUR_API_KEY, base_url="https://api.perplexity.ai")

# chat completion without streaming
response = client.chat.completions.create(
    model="llama-3.1-sonar-small-128k-online",
    messages=messages,
)
# print(response)

# chat completion with streaming
response_stream = client.chat.completions.create(
    model="llama-3.1-sonar-small-128k-online",
    messages=messages,
    stream=True,
)

for response in response_stream:
    print(response)
