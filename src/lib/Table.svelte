<script>
    export let title;
    export let disabled = false;
    export let xLabel = true;
    export let yLabel = true;
    export let xLabels = [];
    export let yLabels = [];

    export let table = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    const cellWidth = "w-14";
    const cellHeight = "h-10";
</script>

<div class="flex flex-col items-center w-fit">
    <div class="ml-auto">
        <h2 class="m-auto text-lg font-bold w-fit flex flex-row justify-center">
            {title}
        </h2>
        {#if xLabel}
            <div class="flex flex-row w-fit">
                {#each table[0] as cell, i (i)}
                    <span class="{cellWidth} my-auto text-center">
                        {xLabels?.[i] ?? i + 1}
                    </span>
                {/each}
            </div>
        {/if}
    </div>

    {#each table as row, i (i)}
        <div class="flex flex-row">
            {#if yLabel}
                <div class="{cellWidth} {cellHeight} flex flex-col justify-center">
                    <span class="w-full h-full my-auto text-center flex flex-col justify-center">
                        {yLabels?.[i] ?? i + 1}
                    </span>
                </div>
            {/if}
            {#each row as cell, j (j)}
                <div class="{cellWidth} {cellHeight} border border-black flex flex-col justify-center">
                    <input
                            type="number"
                            class="w-full h-full text-center {table[i][j] < 0 ? `bg-red-300` : ``}"
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
        </div>
    {/each}
</div>