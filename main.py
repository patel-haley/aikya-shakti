import openai

openai.api_key = "" 

def chat_with_gpt(prompt):
    response = openai.completions.create(
        model="gpt-3.5-turbo",
        prompt=prompt,
        max_tokens=150 
    )

    return response['choices'][0]['text'].strip()

if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["quit", "exit", "bye"]:
            break
            
        response = chat_with_gpt(user_input)
        print("Chatbot: ", response)
