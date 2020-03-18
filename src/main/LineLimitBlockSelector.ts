import { readFileSync } from "fs";
import CodeBlock from "./CodeBlock";
import CodeBlockSelector from "./CodeBlockSelector";

export default class LineLimitBlockSelector {
  private static readonly CONFIG_PATH = "/Users/gbarker/GitHub/CodeAnalyzer/analyzer.json";
  private analyzerConfig: any;
  private codeBlocks: CodeBlock[];
  private blocksOverLimit: CodeBlock[] = [];

  constructor(codeBlocks: CodeBlock[]) {
    const configData = readFileSync(LineLimitBlockSelector.CONFIG_PATH).toString();
    this.analyzerConfig = JSON.parse(configData);
    this.codeBlocks = codeBlocks;
    this.findBlocksOverLineLimit();
  }

  public getBlocksOverLineLimit(): CodeBlock[] {
    return this.blocksOverLimit;
  }

  private findBlocksOverLineLimit(): void {
    const limits: any = this.analyzerConfig["lineLimit"];
    const blockTypes: string[] = Object.keys(limits);
    this.blocksOverLimit = this.getBlocksOverLineLimitForTypes(blockTypes);
  }

  private getBlocksOverLineLimitForTypes(blockTypes: string[]): CodeBlock[] {
    const blocks = blockTypes.map(type => this.getBlocksOverLineLimitOfType(type));
    return Array.prototype.concat.apply([], blocks);
  }

  private getBlocksOverLineLimitOfType(blockType: string): CodeBlock[] {
    const limit: number = this.analyzerConfig["lineLimit"][blockType];
    const codeBlockSelector = new CodeBlockSelector(this.codeBlocks);
    return codeBlockSelector
      .withLengthMoreThan(limit)
      .withType(blockType)
      .getBlocks();
  }
}
