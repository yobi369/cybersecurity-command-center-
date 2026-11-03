
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

const createPrompt = (command: string, args: string[]): string => {
  const basePrompt = `
    You are an AI simulating a cybersecurity command-line tool for educational purposes.
    Your responses must be fictional and clearly marked as simulations.
    Do NOT provide real, actionable hacking instructions or code.
    The user entered the command: "${command}" with arguments: "${args.join(' ')}".
    Generate a realistic but completely FAKE output for this command.
    Start your entire response with "SIMULATION REPORT:" and nothing else before it.
  `;

  switch (command) {
    case 'scan':
      return `${basePrompt}\nSimulate a port scan on the fictional target "${args[0] || '127.0.0.1'}". List common ports (e.g., 80, 443, 22, 21, 3306) and assign them fictional services and statuses (open/closed). Invent some vulnerabilities.`;
    case 'analyze':
      return `${basePrompt}\nProvide an educational explanation of the vulnerability "${args[0] || 'SQL Injection'}". Describe what it is, its potential impact, and common mitigation strategies. Frame it as an analysis report.`;
    case 'crack':
       return `${basePrompt}\nSimulate cracking a fictional password hash. The input hash is "${args[0] || 'a_dummy_hash'}". Describe a simulated dictionary or brute-force attack process and reveal a common, weak password like "password123". Include a security tip about strong passwords.`;
    case 'exploit':
      return `${basePrompt}\nSimulate an attempt to exploit a fictional vulnerability (e.g., "CVE-2024-12345") on target "${args[0] || 'test.server'}". The output should show a FAILED attempt but explain what a successful exploit might have done. This is to educate on the impact, not to show how to succeed. For example, "Exploit failed. If successful, an attacker might have gained shell access."`;
    case 'systeminfo':
      return `${basePrompt}\nSimulate the output of a system information command. Generate fictional details including Hostname (e.g., "CyberSim-Node-01"), Operating System (e.g., "SecOps Linux v2.4"), Kernel Version, System Uptime, CPU Architecture, and Memory Usage statistics. Format it as a clean, technical status report.`;
    default:
      return `Unknown command: ${command}. Please use 'help' to see available commands.`;
  }
};

export const runCommandSimulation = async (command: string, args: string[]): Promise<string> => {
  if (command === 'help' || command === 'clear') {
    // These are handled client-side
    return '';
  }

  const prompt = createPrompt(command, args);
  if (prompt.startsWith('Unknown command')) {
      return prompt;
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.5,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 1024,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return `Error: Could not generate simulation. Please check your API key and network connection. Details: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
};