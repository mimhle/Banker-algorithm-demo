<script>
    export let title;
    export let disabled;
    export let xLabel = true;
    export let yLabel = true;
    export let xLabels = [];
    export let yLabels = [];
    export let offset = false;
    export let onXLabelsClick = () => {};
    export let onYLabelsClick = () => {};

    export let table;

    const cellWidth = "w-14";
    const cellHeight = "h-10";
</script>

<div class="flex flex-col items-center w-fit">
    <div class={xLabel ? `ml-auto` : ``}>
        <h2 class="m-auto text-lg font-bold w-fit flex flex-row justify-center">
            {title}
        </h2>
        {#if xLabel}
            <div class="flex flex-row w-fit mx-auto">
                {#each table[0] as cell, i (i)}
                    <button class="{cellWidth} my-auto py-2 text-center hover:bg-gray-200 disabled:!bg-inherit"
                            on:click={() => onXLabelsClick(i)} {disabled}>
                        {xLabels?.[i] ?? i + 1}
                    </button>
                {/each}
            </div>
        {/if}
    </div>
    {#if offset}
        <div class="{cellWidth} {cellHeight}"/>
    {/if}
    {#each table as row, i (i)}
        <div class="flex flex-row">
            {#if yLabel}
                <div class="{cellWidth} {cellHeight} flex flex-col justify-center">
                    <button class="w-full h-full my-auto text-center flex flex-col justify-center hover:bg-gray-200 disabled:!bg-inherit"
                            on:click={() => onYLabelsClick(i)}>
                        {yLabels?.[i] ?? i + 1}
                    </button>
                </div>
            {/if}
            {#each row as cell, j (j)}
                <div class="{cellWidth} {cellHeight} border border-black flex flex-col justify-center">
                    <input
                            type={disabled?.[i] ?? disabled ? "text" : "number"}
                            class="w-full h-full text-center {table[i][j] < 0 ? `bg-red-300` : ``} {disabled?.[i] ?? disabled ? `hide-spin-button` : ``}"
                            min="0"
                            max="999"
                            on:blur={(e) => {
                                 e.target.value = Math.min(999, Math.max(0, e.target.value))
                                 table[i][j] = parseInt(e.target.value.toString())
                            }}
                            value={table[i][j]}
                            on:change={(e) => table[i][j] = parseInt(e.target.value)}
                            disabled={disabled?.[i] ?? disabled}
                    />
                </div>
            {/each}
        </div>
    {/each}
</div>