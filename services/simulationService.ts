import { OutputType, type OutputLine } from '../types';

export const WELCOME_MESSAGE: OutputLine[] = [
  { type: OutputType.SYSTEM, content: 'Initializing Cybersecurity Command Center research prototype…' },
  { type: OutputType.SYSTEM, content: 'DEMO MODE: deterministic synthetic fixtures only. No network requests or security actions are performed.' },
  { type: OutputType.SYSTEM, content: "Type 'help' to inspect the available demonstration commands." },
];

export const HELP_MESSAGE = `
RESEARCH PROTOTYPE — LOCAL DEMONSTRATION COMMANDS
-------------------------------------------------
scan <fictional-label>  Show a fixed synthetic network-observation fixture.
analyze <topic>         Explain a supported security concept from a local reference.
systeminfo              Show fixed synthetic lab metadata.
help                    Display this help.
clear                   Reset the terminal.

Safety: this interface does not scan hosts, crack credentials, execute exploits,
run shell commands, or contact external systems. All scan/system output is synthetic.
Supported analysis topics: sql-injection, xss, phishing, brute-force.
`;

const MAX_ARGUMENT_LENGTH = 80;
const SAFE_LABEL = /^[a-zA-Z0-9._:-]+$/;

function validateLabel(value: string | undefined): string {
  if (!value) return 'demo-lab-node';
  if (value.length > MAX_ARGUMENT_LENGTH || !SAFE_LABEL.test(value)) {
    throw new Error('Use a fictional label of up to 80 letters, numbers, dots, underscores, colons, or hyphens.');
  }
  return value;
}

const concepts: Record<string, string> = {
  'sql-injection': 'SQL injection occurs when untrusted input is incorporated into a database query as executable syntax. Defenses include parameterized queries, least-privilege database accounts, safe error handling, and security testing.',
  xss: 'Cross-site scripting occurs when untrusted content is interpreted as executable script in a user browser. Defenses include context-aware output encoding, safe templating, input handling, and a restrictive Content Security Policy.',
  phishing: 'Phishing is social engineering that attempts to induce disclosure, payment, or execution through deceptive communications. Defenses include reporting workflows, phishing-resistant authentication, user education, and layered email protections.',
  'brute-force': 'A brute-force attack repeatedly tries candidate credentials. Defenses include phishing-resistant MFA, rate limits, breached-password screening, monitoring, and secure account recovery.',
};

export async function runCommandSimulation(command: string, args: string[]): Promise<string> {
  try {
    switch (command) {
      case 'scan': {
        const label = validateLabel(args[0]);
        return [
          'SIMULATION ONLY — FIXED SYNTHETIC FIXTURE',
          'No packets were transmitted. No host was contacted.',
          `Fictional asset: ${label}`,
          'Fixture observations:',
          '  tcp/22   ssh       CLOSED (synthetic fixture)',
          '  tcp/80   http      OPEN   (synthetic fixture)',
          '  tcp/443  https     OPEN   (synthetic fixture)',
          '  tcp/3306 mysql    FILTERED (synthetic fixture)',
          'Interpretation: these values are demonstration data, not measurements.',
        ].join('\n');
      }
      case 'analyze': {
        const topic = (args[0] || 'sql-injection').toLowerCase();
        const explanation = concepts[topic];
        return explanation
          ? `EDUCATIONAL REFERENCE — NOT A LIVE FINDING\nTopic: ${topic}\n\n${explanation}`
          : `Input error: unsupported topic. Supported topics: ${Object.keys(concepts).join(', ')}.`;
      }
      case 'systeminfo':
        return [
          'SIMULATION ONLY — SYNTHETIC LAB METADATA',
          'Hostname: research-demo-node-01',
          'Operating system: Example Research Linux 1.0',
          'CPU architecture: x86_64 (illustrative)',
          'Uptime: 3 days, 04:12 (illustrative)',
          'Memory: 2.1 GiB / 8 GiB (illustrative)',
          'No host operating-system information was collected.',
        ].join('\n');
      default:
        return `Unknown command: ${command}. Type 'help' for supported local demonstration commands.`;
    }
  } catch (error) {
    return `Input error: ${error instanceof Error ? error.message : 'invalid input'}`;
  }
}
