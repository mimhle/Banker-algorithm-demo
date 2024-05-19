<script>
    let table = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1]
    ]

    const addRow = () => {
        table = [...table, Array(table[0].length).fill(0)]
    }

    const removeRow = () => {
        if (table.length === 1) {
            return
        }
        table = table.slice(0, -1)
    }

    const addColumn = () => {
        table = table.map(row => [...row, 0])
    }

    const removeColumn = () => {
        if (table[0].length === 1) {
            return
        }
        table = table.map(row => row.slice(0, -1))
    }

    $: {
        if (table.every(row => row.every(cell => cell !== null))) {
            console.log(table)
        }
    }

    const cellWidth = "w-32"
    const cellHeight = "h-24"
</script>

<div class="flex flex-col items-center w-fit">
    <h2 class="w-full flex flex-row justify-center">Table</h2>
    <div class="flex flex-row w-fit">
        {#each table[0] as cell, i (i)}
            <span class="{cellWidth} my-auto flex flex-row justify-center">Column {i + 1}</span>
        {/each}
    </div>
    {#each table as row, i (i)}
        <div class="flex flex-row">
            <span class="m-3 my-auto flex flex-row justify-center">Row {i + 1}</span>
            {#each row as cell, j (j)}
                <div class="{cellWidth} {cellHeight} p-5 border border-black flex flex-col justify-center">
                    <input
                            type="number"
                            class="w-12 m-auto"
                            min="0"
                            max="999"
                            on:blur={(e) => {
                                 e.target.value = Math.min(999, Math.max(0, e.target.value))
                            }}
                            bind:value={table[i][j]}
                    />
                </div>
            {/each}
            <div>
                <button class="m-3" on:click={addColumn}><i class="fa fa-plus"></i></button>
                <button class="m-3" on:click={removeColumn}><i class="fa fa-minus"></i></button>
            </div>
        </div>
    {/each}
    <div class="">
        <button class="m-3" on:click={addRow}><i class="fa fa-plus-circle fa-lg"></i></button>
        <button class="m-3" on:click={removeRow}><i class="fa fa-minus-circle fa-lg"></i></button>
    </div>
</div>