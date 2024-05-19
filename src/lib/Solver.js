class Solver {
    constructor(available, max, allocation) {
        this.available = available;
        this.max = max;
        this.allocation = allocation;
        this.need = this._need();
        this.order = this.max.map((_, __) => 0);
        this.solve();
    }

    _need = () => {
        let need = [];
        for (let i = 0; i < this.max.length; i++) {
            need[i] = [];
            for (let j = 0; j < this.max[i].length; j++) {
                need[i][j] = this.max[i][j] - this.allocation[i][j];
            }
        }
        return need;
    }

    solve = () => {
        let finished = this.max.map((_, __) => false);
        this.available = this.available.slice(0, 1);
        let result = [];

        while (result.length < this.max.length) {
            let found = false;
            for (let i = 0; i < this.max.length; i++) {
                if (finished[i]) continue;
                if (this.need[i].every((_, j) => this.need[i][j] <= this.available.at(-1)[j])) {
                    result.push(i);
                    this.available.push(this.allocation[i].map((_, j) => this.available.at(-1)[j] + this.allocation[i][j]));
                    finished[i] = true;
                    found = true;
                }
            }
            if (!found) break;
        }
        this.order = result;

        while (this.available.length <= this.max.length) {
            this.available.push(this.available.at(-1).map(() => -1));
        }

        while (this.order.length < this.max.length) {
            this.order.push(-1);
        }
    }
}

export default Solver;