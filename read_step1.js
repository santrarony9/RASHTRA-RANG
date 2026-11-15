const fs = require('fs');
const transcript = fs.readFileSync('C:/Users/USER/.gemini/antigravity/brain/6ff99c76-716a-4485-a3bb-4cd10c9e6e35/.system_generated/logs/transcript.jsonl', 'utf8');
const lines = transcript.split('\n');
for (const line of lines) {
    if (!line.trim()) continue;
    const obj = JSON.parse(line);
    if (obj.step_index === 1 || obj.step_index === 2) {
        console.log('Step', obj.step_index, 'tool_calls:', JSON.stringify(obj.tool_calls));
    }
}
