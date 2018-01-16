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

    async podsRaw() {
        return this.core.ns('default').pods('').get();
    }
    async pods() {
        const pods = await this.core.ns('default').pods('').get();
        const res = pods.items.map(p => ({
            name: p.metadata.name,
            uid: p.metadata.uid,
            namespace: p.metadata.namespace,
            containers: p.spec.containers.map(c => ({
                name: c.name,
            })),
            status: p.status.phase,
            hostIP: p.status.hostIP,
            podIP: p.status.podIP,

        }));
        return res;
    }
}

module.exports = new KubernetesApi();
