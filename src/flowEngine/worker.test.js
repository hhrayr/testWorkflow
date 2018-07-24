import Worker from './worker';

describe('worker', () => {
  it('should contain default items', () => {
    const worker = new Worker();
    worker.setupFromStaticSamples();
    expect(worker.findWorker('2_t')).toBeTruthy();
    expect(worker.findWorker('4_f')).toBeTruthy();
  });

  it('shouldn\'t add an existing or broken workers', () => {
    const worker = new Worker();
    worker.setupFromStaticSamples();
    expect(() => { worker.addWorker({}); }).toThrow();
    expect(() => { worker.addWorker({ id: '2_t' }); }).toThrow();
  });

  it('should build workers tree', () => {
    const worker = new Worker();
    worker.setupFromStaticSamples();
    worker.buildWorkerTree();
    const rootWorker = worker.getRootWorker();
    expect(rootWorker.left.id).toBe('2_f');
    expect(rootWorker.right.id).toBe('2_t');
    expect(rootWorker.right.left.id).toBe('3_f');
    expect(rootWorker.right.right.id).toBe('3_t');
  });

  it('shouldn\'t build workers tree', () => {
    const worker = new Worker();
    worker.buildWorkerTree();
    const rootWorker = worker.getRootWorker();
    expect(rootWorker).toBeFalsy();
  });

  it('should detect citcular reference', () => {
    const worker = new Worker();
    worker.addWorker({ "id": "1", "true_id": "2_t", "false_id": "2_f" });
    worker.addWorker({ "id": "2_t", "true_id": "3_t", "false_id": "3_f" });
    worker.addWorker({ "id": "2_f", "true_id": "3_t", "false_id": "3_f" });
    worker.addWorker({ "id": "3_f", "true_id": "2_t" });
    worker.addWorker({ "id": "3_t", "false_id": "2_f" });
    expect(() => {
      worker.buildWorkerTree();
    }).toThrowError(/^(Circular worker reference detected)?/);
  });

  it('should run workers tree', () => {
    const worker = new Worker();
    worker.setupFromStaticSamples();
    worker.buildWorkerTree();
    worker.runWorkerTree();
    const workers = worker.getWorkers();

    expect(workers[0].status).toBe('passed');
    expect(workers[1].status).toBe('passed');
    expect(workers[2].status).toBeFalsy();
    expect(workers[3].status).toBe('failed');
    expect(workers[4].status).toBeFalsy();
    expect(workers[5].status).toBeFalsy();
    expect(workers[6].status).toBe('passed');
  });
});
