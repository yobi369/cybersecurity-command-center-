
export enum OutputType {
  INPUT = 'input',
  OUTPUT = 'output',
  ERROR = 'error',
  SYSTEM = 'system',
}

export interface OutputLine {
  type: OutputType;
  content: string;
}
