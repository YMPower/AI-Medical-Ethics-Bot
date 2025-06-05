# Medical Ethics Chatbot

This repository contains a simple command-line chatbot that answers common
medical ethics questions using a set of locally stored guidelines. The bot does
not provide medical or legal advice. Always consult qualified professionals for
expert guidance.

## Usage

```
python3 medical_ethics_bot.py
```

Type your question at the prompt. Enter `quit` or `exit` to stop the session.

The bot searches the keywords from your question in `guidelines.json` and
returns the relevant guideline if one is found. If it cannot find a close match,
it advises you to consult a professional.
