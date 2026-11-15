const fs = require('fs');
const transcript = fs.readFileSync('C:/Users/USER/.gemini/antigravity/brain/6ff99c76-716a-4485-a3bb-4cd10c9e6e35/.system_generated/logs/transcript.jsonl', 'utf8');
const lines = transcript.split('\n');
for (const line of lines) {
    if (!line.trim()) continue;
    const obj = JSON.parse(line);
    if (obj.step_index === 34) {
        console.log('Step 34 content:', obj.content);
    }
    if (obj.step_index === 35 || obj.step_index === 36 || obj.step_index === 37 || obj.step_index === 38) {
        if (obj.thinking && obj.thinking.includes('847')) {
            console.log('Step', obj.step_index, 'thinking:', obj.thinking);
        }
    }
}
