Image for day 1: https://i.imgur.com/bQ3Oxc5.png

After I tried to fit DOOM inside a QR code last time (https://news.ycombinator.com/item?id=43729683), I'm trying to continue this "series" to get an actually decent chatbot into a QR code.

This is, of course, not as easy as the former, I could always cheat and make a rule-based ELIZA style chatbot (that I actually dabbled with earlier) but I want to make something actually somewhat useful, I know very little about how LLMs and Transformers fundamentally work so this will also teach me a lot about AI (also, will be public and Open Source when it actually turns into something somewhat cool)

Here's our limitations:
The largest standard QR code (Version 40) holds 2,953 bytes (~2.9 KB). This is very small—e.g.,

a Windows sound file of 1/15th of a second is 11 KB.
A floppy disk (1.44 MB) can store nearly 500 QR codes worth of data.
This post, in plain text is about 

PLUS, we can't directly dump HTML/ JS into the QR code, we need to compress it to BASE64 (or BigInt) which takes up 0.1-0.15Kb as well, so we have about 2.7Kb for the entire thing, yikes 

Here's what I did for day 1:

The first version (v0) was incredibly basic - a simple pattern-matching chatbot with predefined responses. Here's what some of it looked like expanded:

 // Vocabulary array
        const V = "you,I,is,are,do,what,how,why,,...e".split(",");

        // Response patterns (indexes into vocabulary)
        const P = [
            [5,2,0,8],    // what is you like
            [5,4,0,8],    // what do you like....
            [0,8,15,9]    // you like me think
        ];

        // Random number generator

        // Response generation function
        function respond(e) {
            // Normalize input
            e = e.toLowerCase().replace(/[^\w\s]/g, "");
            const t = e.split(/\s+/);
            const n = t.filter(e => V.indexOf(e) >= 0);
            const o = P[rnd(P.length)];
            
            let i = [],
                p = false;
            
            // Response generation function...
            for(let e = 0; e < o.length; e++) {
                if(n.length > 0 && r() < 0.25) {
                    i.push(n[rnd(n.length)]);
                } else {
                    const t = typeof o[e] === "function" ? o[e]() : o[e];
                    i.push(V[t]);
                    if(t == 5 || t == 6 || t == 7) p = true;
                }
            }

this used a pretty basic array of vocabulary words and pattern indices to generate responses.

(v1) added better CSS (Still light theme at this point), some topic memory, sentiment analysis and transition patters, but all this made the file size a bit over 4kb

(v2) was v1 with more compression, lost a couple features but the file size became around 2.8kb

(v2) added a more retro UI because it seemed fitting, ASSCI art (for vibes) and a more simplified text formatting using newline characters to save space, but it was still extremely dumb up until this point, (v4) and (v5) added more cuts to barely get it below the limit (2.85kb)

So I changed the approach slightly for (v6) and went for a trie data structure for response lookups
so basically something like:

```javascript
const t={h:{e:{l:{l:{o:["Hello! How can I help you today?","Hi! What's on your mind?"]}}}}};
```

this allowed for prefix matching under our constraints AND there was no need for pattern matching.

(v7) was trying to optimise it, but it still ended up being around 3.3kb, better than our last implementation but still not very "intelligent"

For (v8), I took a lot of time and switched to a very basic implementation of a 2 layered neural network

Here, each character gets converted to a 6-dimensional vector

// A basic idea of the neural network:
const network = {
    // Character embeddings (70 characters x 6 dimensions)
    embeddings: new Float32Array(c.vSize * c.eDim),
    
    // Hidden layer weights (6 x 12 matrix)
    hidden: new Float32Array(c.eDim * c.hSize),
    
    // Output layer weights (12 x 10 matrix)
    output: new Float32Array(c.hSize * c.oSize),
    
    // Bias terms
    hiddenBias: new Float32Array(c.hSize),
    outputBias: new Float32Array(c.oSize)
};

// Basic Forward Pass Process:
function forward(input) {
    // Convert input to character indices
    const charIndices = input.split('').map(char => vocab[char]);
    
    // Apply said embeddings
    let embedded = [];
    for(let idx of charIndices) {
        embedded.push(embeddings[idx]);
    }
    
    // Average embeddings
    const avgEmbedding = average(embedded);
    
    // Hidden layer
    const hidden = tanh(multiply(avgEmbedding, network.hidden) + network.hiddenBias);
    
    // Output layer
    const output = softmax(multiply(hidden, network.output) + network.outputBias);
    
    // Return most likely response category
    return argmax(output);
}

So this basically gives us a 582 char neural network that's 8 bit quantized
but, as you would expect, this was huge, about 11kb

(v9) and (v10) were basically minifying this further, breaking it down to about 3.2kb, not bad

The last version I worked on today was (v10.5)
I used word level processing here instead of character level with 4D vectors, used some template responses that were also context aware so that it's not all gibberish, better state tracking and added 8 output dimensions for the neural network, also added a repetition penalty (that's currently a little broken and even spots the users repeating) but is actually kind of good.... 5.3kb good.

For Day 2, I'm thinking:
1. Implement better context handling
2. Optimize the neural architecture further (or switch to maybe a tiny transformer if that's in any way possible? I'm trying to learn)
3. Maybe find a way to compress it even more?

Resources:
https://www.youtube.com/watch?v=aircAruvnKk
https://www.youtube.com/watch?v=zhxNI7V2IxM&t=275s
https://github.com/rasbt/LLMs-from-scratch
https://github.com/lionelmessi6410/Neural-Networks-from-Scratch