import staticData from './staticData.json';

export default class Worker {
  constructor() {
    this.workers = [];
    this.rootWorker = null;
  }

  setupFromStaticSamples() {
    this.workers = staticData.workers;
  }

  getRootWorker() {
    return this.rootWorker;
  }

  getWorkers() {
    return this.workers;
  }

  addWorker(worker) {
    if (!worker.id) {
      throw new Error('worker must contain ID');
    }
    if (this.findWorker(worker.id)) {
      throw new Error('worker with the given ID already exists');
    }
    this.workers.push(worker)
  }

  addWorkers(workers) {
    workers.forEach((w) => { this.addWorker(w); });
  }
  
  buildWorkerTree(root) {
    if (!root) {
      if (this.workers.length) {
        root = this.rootWorker = Worker.cloneWorkerNode(this.workers[0]);
      } else {
        return;
      }
    } else {
      let rootParent = root.parent;
      while(rootParent) {
        if (rootParent.id === root.id) {
          throw new Error(`Circular worker reference deteced ${root.id}`);
        }
        rootParent = rootParent.parent;
      }
    }
    
    root.right = Worker.cloneWorkerNode(this.findWorker(root.true_id), root);
    if (root.right) {
      this.buildWorkerTree(root.right);
    }
    root.left = Worker.cloneWorkerNode(this.findWorker(root.false_id), root);
    if (root.left) {
      this.buildWorkerTree(root.left);
    }
  }

  runWorkerTree() {
    let worker = this.rootWorker;
    while(worker) {
      let funcRes = false;
      try {
        funcRes = new Function('obj', worker.body)(worker.param);
      } catch(err) {
        funcRes = err;
      } finally {
        this.setWorkerStatus(worker.id, funcRes);
        worker = funcRes ? worker.right : worker.left;
      }
    }
  }

  setWorkerStatus(id, status) {
    const worker = this.findWorker(id);
    if (worker) {
      if (typeof status === 'boolean') {
        worker.status = status ? 'passed' : 'failed';
      } else {
        worker.status = status;
      }
    }
  }

  static cloneWorkerNode(worker, parent) {
    if (worker) {
      const res = Object.assign({}, worker);
      if (parent) {
        res.parent = parent;
      }
      return res
    }
    return null;
  }

  findWorker(id) {
    if (id) {
      const filteredWorkers = this.workers.filter(w => w.id === id);
      if (filteredWorkers.length) {
        return filteredWorkers[0];
      }
    }
    return null;
  }
}
