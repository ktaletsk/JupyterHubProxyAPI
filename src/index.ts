import { JupyterFrontEnd, JupyterFrontEndPlugin  } from '@jupyterlab/application';
import { ServerConnection } from '@jupyterlab/services';
import { URLExt } from '@jupyterlab/coreutils';


function proxiedApiRequest<T>(
  url: string,
  settings: ServerConnection.ISettings
): Promise<T> {
  return ServerConnection.makeRequest(url, {}, settings).then(response => {
    if (response.status !== 200) {
      return response.json().then(data => {
        throw new ServerConnection.ResponseError(response, data.message);
      });
    }
    return response.json();
  });
}

/**
 * Activation function for the JupyterHubProxyAPI extension.
 */
function activate(
  app: JupyterFrontEnd,
  paths: JupyterFrontEnd.IPaths,
): void {
  console.log('JupyterLab extension JupyterHubProxyAPI is activated!');

  // Make request to Jupyter API
  const settings = ServerConnection.makeSettings();
  const requestUrl = URLExt.join(settings.baseUrl, '/hub');

  proxiedApiRequest<any>(requestUrl, settings)
    .then(data => {
      console.log(data);
    })
    .catch(() => {
      console.warn(
        'The JupyterHubProxyAPI server extension appears to be missing.'
      );
    });
}

/**
 * Initialization data for the JupyterHubProxyAPI extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'JupyterHubProxyAPI',
  autoStart: true,
  requires: [JupyterFrontEnd.IPaths],
  activate: activate
};

export default extension;