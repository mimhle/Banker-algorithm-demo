<script>
    import Table from "./lib/Table.svelte";
    import Solver from "./lib/Solver.js";
    import { addColumn, addRow, randomizeTable, removeRow, removeColumn, randomizeNumber } from "./lib/utils.js";

    let available = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
    ];

    let max = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    let allocation = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    let need = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    let order = [[1], [2], [3]];
    let safeSequence = [-1, -1, -1];

    let xLabels = max[0].map((_, i) => `R${i+1}`);
    let yLabels = max.map((_, i) => `P${i+1}`);

    const addProcess = () => {
        max = addRow(max);
        allocation = addRow(allocation);
    }

    const removeProcess = (i) => {
        max = removeRow(max, i);
        allocation = removeRow(allocation, i);
    }

    const addResource = () => {
        max = addColumn(max);
        allocation = addColumn(allocation);
        available = addColumn(available);
    }

    const removeResource = (i) => {
        max = removeColumn(max, i);
        allocation = removeColumn(allocation, i);
        available = removeColumn(available, i);
    }

    const randomize = () => {
        max = randomizeTable(max, 1, 10);
        allocation = allocation.map((row, i) => row.map((_, j) => randomizeNumber(0, max[i][j])));
        available = randomizeTable(available, 5, 10);
    }

    $: {
        xLabels = max[0].map((_, i) => `R${i+1}`);
        yLabels = max.map((_, i) => `P${i+1}`);

        let banker = new Solver(available, max, allocation);
        need = banker.need;
        available = banker.available;
        order = banker.order.map((e) => [e]);
        safeSequence = banker.safeSequence;
    }
</script>

<main>
    <h1 class="mb-4 p-1 text-2xl font-bold text-center flex flex-row justify-center border-b-2 border-black">
        Banker's Algorithm
    </h1>
    <div class="my-3 w-full flex flex-row justify-center gap-3">
        <button on:click={randomize} class="flex" title="Randomize">
            <i class="fa fa-refresh  fa-lg"></i>
        </button>
        <Table title="Max" bind:table={max} {xLabels} {yLabels} offset disabled={false} onYLabelsClick={removeProcess} onXLabelsClick={removeResource}/>
        <Table title="Allocation" bind:table={allocation} yLabel={false} {xLabels} {yLabels} offset disabled={false} onYLabelsClick={removeProcess} onXLabelsClick={removeResource}/>
        <Table title="Need" bind:table={need} yLabel={false} disabled {xLabels} {yLabels} offset onYLabelsClick={removeProcess} onXLabelsClick={removeResource}/>
        <Table title="Available" bind:table={available} {xLabels} yLabel={false} disabled={available.map((_, i) => i !== 0)} onXLabelsClick={removeResource}/>
        <Table title="&#8288;" bind:table={order} xLabels={["Nₒ."]} yLabel={false} disabled offset/>
        <button on:click={addResource} class="flex" title="Add Resource">
            <i class="fa fa-plus fa-lg"></i>
        </button>
        <button on:click={() => removeResource(-1)} class="flex" title="Remove Resource">
            <i class="fa fa-minus fa-lg"></i>
        </button>
    </div>
    <div class="flex flex-row justify-center gap-3">
        <button on:click={addProcess} title="Add Process">
            <i class="fa fa-plus fa-lg"></i>
        </button>
        <button on:click={() => removeProcess(-1)} title="Remove Process">
            <i class="fa fa-minus fa-lg"></i>
        </button>
    </div>
    <div class="flex flex-row justify-center gap-3 my-3">
        <Table title="Safe sequence" table={[safeSequence.map((v, _) => xLabels[v])]} yLabel={false} xLabel={false} disabled/>
    </div>
</main>