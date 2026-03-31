exports.chat = async (req, res) => {
    try {
        const { message } = req.body;

        const AI_URL = process.env.AI_URL;
        const response = await fetch(`${AI_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || errorData.error || 'AI Service Error');
        }

        const data = await response.json();
        res.json(data);

    } catch (err) {
        console.error("AI Service Error:", err.message);
        console.error("Attempted URL:", `${AI_URL}/chat`);
        res.status(500).json({ reply: "Sorry, I am having trouble connecting to the server. Please try again later." });
    }
};