<script>
    export let title;
    export let disabled = false;

    export let table = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    const addRow = () => {
        table = [...table, Array(table[0].length).fill(0)]
    }

    const removeRow = (at = -1) => {
        if (table.length === 1) return;
        if (at === -1) at = table.length - 1;
        table = table.filter((_, i) => i !== at)
    }

    const addColumn = () => {
        table = table.map(row => [...row, 0])
    }

    const removeColumn = (at = -1) => {
        if (table[0].length === 1) return;
        if (at === -1) at = table[0].length - 1;
        table = table.map(row => {
            row.splice(at, 1);
            return row;
        })
    }

    const cellWidth = "w-14";
    const cellHeight = "h-10";
</script>

<div class="flex flex-col items-center w-fit">
    <h2 class="text-lg font-bold w-full flex flex-row justify-center">{title}</h2>
    <div class="flex flex-row w-fit">
        {#each table[0] as cell, i (i)}
            <button class="{cellWidth} my-auto flex flex-col justify-center hover:bg-gray-200 disabled:!bg-inherit"
                    on:click={() => removeColumn(i)}
                    {disabled}
            >
                R{i + 1}
            </button>
        {/each}
    </div>
    {#each table as row, i (i)}
        <div class="flex flex-row">
            <div class="{cellWidth} {cellHeight} flex flex-col justify-center">
                <button class="w-full h-full my-auto flex flex-col justify-center hover:bg-gray-200 disabled:!bg-inherit"
                        on:click={() => removeRow(i)}
                        {disabled}
                >
                    P{i + 1}
                </button>
            </div>
            {#each row as cell, j (j)}
                <div class="{cellWidth} {cellHeight} border border-black flex flex-col justify-center">
                    <input
                            type="number"
                            class="w-full h-full text-center"
                            min="0"
                            max="999"
                            on:blur={(e) => {
                                 e.target.value = Math.min(999, Math.max(0, e.target.value))
                                 table[i][j] = e.target.value
                            }}
                            bind:value={table[i][j]}
                            {disabled}
                    />
                </div>
            {/each}
            <div class="{cellWidth} {cellHeight} flex flex-row justify-center gap-1">
                <button class="m-0 disabled:opacity-50" on:click={() => addColumn()} {disabled}><i
                        class="fa fa-plus"></i></button>
                <button class="m-0 disabled:opacity-50" on:click={() => removeColumn()} {disabled}><i
                        class="fa fa-minus"></i></button>
            </div>
        </div>
    {/each}
    {#if !disabled}
        <div>
            <button class="m-3" on:click={() => addRow()}><i class="fa fa-plus-circle fa-lg"></i></button>
            <button class="m-3" on:click={() => removeRow()}><i class="fa fa-minus-circle fa-lg"></i></button>
        </div>
    {/if}
</div>