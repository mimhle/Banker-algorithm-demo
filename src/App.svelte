<script>
    import Table from "./lib/Table.svelte";

    let testTable1 = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    let testTable2 = testTable1;

    $: {
        testTable2 = testTable1.map(row => row.map(cell => parseInt(cell.toString()) + 1));
        console.log(testTable2);
    }
</script>

<main>
    <h1 class="bg-red-500 text-center flex flex-row justify-center">Vite + Svelte</h1>
    <div class="w-full flex flex-row justify-center">
        <Table title="Input" bind:table={testTable1}/>
    </div>
    <br>
    <div class="w-full flex flex-row justify-center">
        <Table title="Output" disabled table={testTable2}/>
    </div>
</main>