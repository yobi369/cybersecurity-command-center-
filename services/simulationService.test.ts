import { describe, expect, it } from 'vitest';
import { runCommandSimulation } from './simulationService';

describe('local simulation service', () => {
  it('labels scan output as synthetic and confirms no network activity', async () => {
    const output = await runCommandSimulation('scan', ['demo-node']);
    expect(output).toContain('SIMULATION ONLY');
    expect(output).toContain('No packets were transmitted');
    expect(output).toContain('Fictional asset: demo-node');
  });

  it('rejects malformed fictional asset labels', async () => {
    const output = await runCommandSimulation('scan', ['https://example.com;whoami']);
    expect(output).toContain('Input error:');
  });

  it('bounds fictional asset label length', async () => {
    const output = await runCommandSimulation('scan', ['a'.repeat(81)]);
    expect(output).toContain('Input error:');
  });

  it('returns educational content for a supported topic', async () => {
    const output = await runCommandSimulation('analyze', ['xss']);
    expect(output).toContain('EDUCATIONAL REFERENCE');
    expect(output).toContain('Cross-site scripting');
  });

  it('rejects unsupported analysis topics', async () => {
    const output = await runCommandSimulation('analyze', ['unknown-topic']);
    expect(output).toContain('Input error: unsupported topic');
  });

  it('does not implement exploit or credential-cracking commands', async () => {
    expect(await runCommandSimulation('exploit', ['demo'])).toContain('Unknown command:');
    expect(await runCommandSimulation('crack', ['hash'])).toContain('Unknown command:');
  });

  it('does not claim to inspect the actual host for system information', async () => {
    const output = await runCommandSimulation('systeminfo', []);
    expect(output).toContain('SYNTHETIC LAB METADATA');
    expect(output).toContain('No host operating-system information was collected');
  });
});
