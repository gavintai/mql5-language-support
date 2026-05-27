import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  CompletionItem,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  InitializeResult,
  Hover,
  MarkupKind,
  Diagnostic,
  DiagnosticSeverity,
  Range,
  Position,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { buildCompletionItems, findSymbol } from './symbols';

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

const completionItems: CompletionItem[] = buildCompletionItems();

connection.onInitialize((_params: InitializeParams): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        resolveProvider: false,
        triggerCharacters: ['.', '(', '#'],
      },
      hoverProvider: true,
    },
  };
});

connection.onCompletion(
  (_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
    return completionItems;
  }
);

connection.onHover((params: TextDocumentPositionParams): Hover | null => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return null;

  const word = getWordAtPosition(document, params.position);
  if (!word) return null;

  const symbol = findSymbol(word);
  if (!symbol) return null;

  return {
    contents: {
      kind: MarkupKind.Markdown,
      value: [`**${symbol.detail}**`, '', symbol.documentation].join('\n'),
    },
  };
});

documents.onDidChangeContent(change => {
  validateDocument(change.document);
});

function validateDocument(document: TextDocument): void {
  const diagnostics: Diagnostic[] = [];
  const text = document.getText();
  const lines = text.split('\n');

  const EVENT_SIGNATURES: Record<string, RegExp> = {
    OnInit: /int\s+OnInit\s*\(\s*\)/,
    OnDeinit: /void\s+OnDeinit\s*\(\s*const\s+int\s+\w+\s*\)/,
    OnTick: /void\s+OnTick\s*\(\s*\)/,
    OnStart: /void\s+OnStart\s*\(\s*\)/,
    OnTimer: /void\s+OnTimer\s*\(\s*\)/,
    OnTrade: /void\s+OnTrade\s*\(\s*\)/,
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip comment lines
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) continue;

    // Check for event handler wrong return type / missing args
    for (const [handler, correctPattern] of Object.entries(EVENT_SIGNATURES)) {
      const handlerIdx = line.indexOf(handler);
      if (handlerIdx === -1) continue;

      // Confirm it looks like a function definition (has opening paren)
      const afterHandler = line.slice(handlerIdx + handler.length).trimStart();
      if (!afterHandler.startsWith('(')) continue;

      // Check across the definition line (may span multiple lines — keep simple: check same line)
      if (!correctPattern.test(line)) {
        diagnostics.push({
          severity: DiagnosticSeverity.Warning,
          range: lineRange(i, handlerIdx, handlerIdx + handler.length),
          message: `${handler} has unexpected signature. Check return type and parameters.`,
          source: 'mql5',
        });
      }
    }

    // Flag missing semicolon heuristic: non-empty line ending without ; { } // that looks like a statement
    const trimmed = line.trimEnd();
    if (
      trimmed.length > 0 &&
      !trimmed.endsWith(';') &&
      !trimmed.endsWith('{') &&
      !trimmed.endsWith('}') &&
      !trimmed.endsWith(',') &&
      !trimmed.endsWith('(') &&
      !trimmed.endsWith(')') &&
      !trimmed.endsWith('\\') &&
      !trimmed.startsWith('//') &&
      !trimmed.startsWith('*') &&
      !trimmed.startsWith('#') &&
      /^\s+(return|break|continue|[a-zA-Z_]\w*\s*[=(+\-*\/&|^~!])/.test(line) &&
      !trimmed.endsWith('//')
    ) {
      // Only flag if next non-empty line doesn't start with an operator (multi-line expression)
      let nextNonEmpty = '';
      for (let j = i + 1; j < lines.length; j++) {
        nextNonEmpty = lines[j].trimStart();
        if (nextNonEmpty.length > 0) break;
      }
      const continuesExpr = nextNonEmpty.startsWith('?') ||
        nextNonEmpty.startsWith(':') ||
        nextNonEmpty.startsWith('&&') ||
        nextNonEmpty.startsWith('||') ||
        nextNonEmpty.startsWith('+') ||
        nextNonEmpty.startsWith('-') ||
        nextNonEmpty.startsWith('*') ||
        nextNonEmpty.startsWith('/') ||
        nextNonEmpty.startsWith(')') ||
        nextNonEmpty.startsWith(']');

      if (!continuesExpr) {
        diagnostics.push({
          severity: DiagnosticSeverity.Hint,
          range: lineRange(i, trimmed.length - 1, trimmed.length),
          message: 'Possible missing semicolon.',
          source: 'mql5',
        });
      }
    }
  }

  connection.sendDiagnostics({ uri: document.uri, diagnostics });
}

function getWordAtPosition(document: TextDocument, position: Position): string | null {
  const text = document.getText();
  const offset = document.offsetAt(position);
  const wordPattern = /[a-zA-Z_][a-zA-Z0-9_]*/g;

  let match: RegExpExecArray | null;
  while ((match = wordPattern.exec(text)) !== null) {
    if (match.index <= offset && offset <= match.index + match[0].length) {
      return match[0];
    }
  }
  return null;
}

function lineRange(line: number, startChar: number, endChar: number): Range {
  return {
    start: { line, character: startChar },
    end: { line, character: endChar },
  };
}

documents.listen(connection);
connection.listen();
