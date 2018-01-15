const Api = require('kubernetes-client');
const EventEmitter = require('events');
const config = require('../../config/config');

class KubernetesApi extends EventEmitter {
    constructor() {
        super();
        if (config.kube_api_server.host) {
            this.core = new Api.Core({ ...Api.config.getInCluster(), promises: true });
        } else {
            this.core = new Api.Core({ ...Api.config.fromKubeconfig(), promises: true });
        }
    }

    async pods(predicate) {
        const pods = await this.core.ns('default').pods('').get();
        return pods;
    }
}

module.exports = new KubernetesApi();
