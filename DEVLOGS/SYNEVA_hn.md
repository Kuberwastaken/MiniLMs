Follow up post from: https://news.ycombinator.com/item?id=43742639
TLDR: My attempts of jamming a somewhat smart conversational chatbot into a QR code (with a UI)

Here's what makes SYNEVA work:

I went with a pattern-matching approach instead of neural nets or tiny transformers (I tried that in archived versions, we DO NOT have space for this sadly). The entire system is built around our S class that's basically:

S {

  constructor() {

    this.m = this.L() || {};  // Memory/learned responses

    this.v = {};              // Word frequency tracker

    this.c = [];              // Conversation history

    this.h = "";              // Last message

  }
}
*Memory & Learning*

SYNEVA can actually "learn" during conversations! We can't use localstorage because this is a BASE64 URI but we can still use SessionStorage. When you chat, it:

Creates context keys from the last 2 normalized words Stores your input/response pairs in this.m Tracks word frequencies in this.v for relevance scoring Persists this data inside the URL hash

*Response Generation*

For responses, it uses a multi-stage fallback system:

Pattern matching against phrases/questions (the few it has) Context-based lookup from some learned responses Word frequency analysis for fuzzy matching Default responses as last resort if nothing works

This lets it seem somewhat intelligent despite the size constraints.

*UI Layer*

Added a kinda retro looking green-on-black terminal interface and managed to get a typing animation!

Everything's packed into 2.8kb including HTML/CSS/JS and it's all in a QR code

Previous attempts with neural networks went upto 5.3kb even with 8-bit quantization and word-level processing. This pattern-matching approach with context awareness turned out way more efficient while still being somewhat "smart".

You can actually share your "trained" chatbot too - just share the URL with its hash, and your conversation context gets preserved :P

I'd love to know your thoughts or if you can make something better in the constraints, feel free to contribute

