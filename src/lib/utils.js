export const addRow = (table) => {
    return [...table, Array(table[0].length).fill(0)];
}

export const removeRow = (table, at = -1) => {
    if (table.length === 1) return table;
    if (at === -1) at = table.length - 1;
    return table.filter((_, i) => i !== at);
}

export const addColumn = (table) => {
    if (table[0].length === 5) return table;
    return table.map(row => [...row, 0])
}

export const removeColumn = (table, at = -1) => {
    if (table[0].length === 1) return table;
    if (at === -1) at = table[0].length - 1;
    return table.map(row => {
        row.splice(at, 1);
        return row;
    })
}

export const randomizeTable = (table, min = 0, max = 10) => {
    return table.map(row => row.map(() => Math.floor(Math.random() * (max - min + 1)) + min));
}