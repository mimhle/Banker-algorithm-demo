<script>
    import Table from "./lib/Table.svelte";
    import Solver from "./lib/Solver.js";
    import { addColumn, addRow, randomizeTable } from "./lib/utils.js";

    let available = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
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

    let xLabels = max[0].map((_, i) => `R${i+1}`);
    let yLabels = max.map((_, i) => `P${i+1}`);

    const addProcess = () => {
        available = addRow(available);
        max = addRow(max);
        allocation = addRow(allocation);
    }

    const addResource = () => {
        available = addColumn(available);
        max = addColumn(max);
        allocation = addColumn(allocation);
    }

    const randomize = () => {
        available = randomizeTable(available);
        max = randomizeTable(max);
        allocation = randomizeTable(allocation);
    }

    $: {
        let banker = new Solver(available, max, allocation);
        xLabels = max[0].map((_, i) => `R${i+1}`);
        yLabels = max.map((_, i) => `P${i+1}`);
        need = banker.need;
    }
</script>

<main>
    <h1 class="mb-4 p-1 text-2xl font-bold text-center flex flex-row justify-center border-b-2 border-black">
        Banker's Algorithm
    </h1>
    <button on:click={addProcess}>
        Add Process
    </button>
    <button on:click={addResource}>
        Add Resource
    </button>
    <button on:click={randomize}>
        Randomize
    </button>
    <div class="my-3 w-full flex flex-row justify-center gap-3">
        <Table title="Max" bind:table={max} {xLabels} {yLabels}/>
        <Table title="Allocation" bind:table={allocation} yLabel={false} {xLabels} {yLabels}/>
        <Table title="Need" bind:table={need} yLabel={false} disabled {xLabels} {yLabels}/>
        <Table title="Available" bind:table={available} {xLabels} yLabel={false} disabled/>
    </div>
</main>