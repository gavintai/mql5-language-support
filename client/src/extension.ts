import * as path from 'path';
import { ExtensionContext, workspace } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext): void {
  const serverModule = context.asAbsolutePath(
    path.join('server', 'out', 'server.js')
  );

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: { execArgv: ['--nolazy', '--inspect=6009'] },
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: 'file', language: 'mql5' },
    ],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/*.{mq5,mqh}'),
    },
  };

  client = new LanguageClient(
    'mql5LanguageServer',
    'MQL5 Language Server',
    serverOptions,
    clientOptions
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
