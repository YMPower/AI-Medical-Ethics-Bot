import json
import difflib
from pathlib import Path


class MedicalEthicsChatbot:
    """Simple chatbot that answers medical ethics questions using a local
    collection of guidelines. The chatbot searches for matching keywords in the
    user's query and responds with the corresponding guideline. If no close
    match is found, it advises the user to consult a professional."""

    def __init__(self, guidelines_path: str = "guidelines.json"):
        path = Path(guidelines_path)
        if not path.is_file():
            raise FileNotFoundError(f"Guidelines file '{guidelines_path}' not found")
        with path.open() as f:
            self.guidelines = json.load(f)

    def _find_response(self, text: str):
        text_lower = text.lower()
        for guideline in self.guidelines:
            for keyword in guideline["keywords"]:
                if keyword in text_lower:
                    return guideline["response"]
        # fallback to fuzzy matching
        for guideline in self.guidelines:
            for keyword in guideline["keywords"]:
                if difflib.SequenceMatcher(None, text_lower, keyword).ratio() > 0.8:
                    return guideline["response"]
        return None

    def get_response(self, text: str) -> str:
        """Return an appropriate guideline or a default disclaimer."""
        result = self._find_response(text)
        if result:
            return result
        return (
            "I'm not certain about that topic. Please consult a qualified medical "
            "ethics professional for specific advice."
        )

    def chat(self):
        print("Medical Ethics Chatbot (type 'quit' to exit)")
        while True:
            try:
                user_input = input("You: ")
            except EOFError:
                break
            if user_input.strip().lower() in {"quit", "exit"}:
                break
            print("Bot:", self.get_response(user_input))


def main():
    bot = MedicalEthicsChatbot()
    bot.chat()


if __name__ == "__main__":
    main()
