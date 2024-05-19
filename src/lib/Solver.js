class Solver {
    constructor(available, max, allocation) {
        this.available = available;
        this.max = max;
        this.allocation = allocation;
    }

    get need() {
        let need = [];
        for (let i = 0; i < this.max.length; i++) {
            need[i] = [];
            for (let j = 0; j < this.max[i].length; j++) {
                need[i][j] = this.max[i][j] - this.allocation[i][j];
            }
        }
        return need;
    }
}

export default Solver;