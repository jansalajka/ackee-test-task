export const listStyles = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 0,
    justifyItems: 'stretch',
    '@media (min-width: 768px)': {
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        justifyContent: 'center',
    },
    '@media (min-width: 1024px)': {
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        maxWidth: '100%',
    },
};

export const listItemStyles = {
    width: '100%',
};

